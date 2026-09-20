/* -------------------------------------------------------------------------- */
/*  STUDY HUB — DEEP PROJECT DETAIL (index-aligned to studyProjects)           */
/*  Per project: concept explanations, architecture, detailed steps, outcomes. */
/* -------------------------------------------------------------------------- */

interface ProjectDetail {
  conceptDetails: { name: string; detail: string }[];
  architecture: string;
  steps: string[];
  outcomes: string[];
}

export const studyProjectDetails: Record<string, ProjectDetail[]> = {
  "databricks-data-engineer-associate": [
    {
      /* P1 — Insurance policy & claims medallion pipeline */
      conceptDetails: [
        { name: "Medallion architecture", detail: "A layered design where data flows Bronze (raw as-ingested) → Silver (cleaned, deduplicated, conformed) → Gold (aggregated, business-ready), so each layer has a clear contract and can be reprocessed independently." },
        { name: "Delta Lake", detail: "Parquet files plus an ordered transaction log that adds ACID transactions, versioning/time travel, and schema enforcement — the reliable storage format for every layer here." },
        { name: "Spark SQL transformations", detail: "CTAS, joins, and aggregations expressed in SQL to cleanse Silver and build Gold KPIs like written premium and loss ratio." },
        { name: "Managed vs external tables", detail: "Managed tables let Databricks own the storage lifecycle (drop deletes data); external tables (LOCATION) keep files if dropped — Bronze often external over a landing zone, Gold managed." },
        { name: "Schema enforcement", detail: "Delta rejects writes that don't match the table schema, preventing bad/mistyped data from silently corrupting downstream reports." },
      ],
      architecture: "Landing zone (cloud storage) → Bronze Delta (raw policy & claims, +ingest metadata) → Silver Delta (validated, conformed to a policy/claim grain) → Gold Delta (star-style aggregates by product, region, period) → Databricks SQL dashboard. Unity Catalog governs all objects.",
      steps: [
        "CREATE (or Auto Loader) Bronze tables; add input_file_name() and current_timestamp() columns for lineage.",
        "Build Silver with CTAS: cast types, standardize dates/currency, dedupe on policy/claim keys, filter invalid rows.",
        "Create conformed dimensions (product, region, distributor, date) and a claims/premium fact.",
        "Aggregate Gold: SUM(written_premium), incurred/earned ratios, claim frequency grouped by product×region×month.",
        "Expose Gold via SQL views for the dashboard; document definitions.",
      ],
      outcomes: [
        "Decision-ready KPI tables (written premium, loss ratio, claim frequency) refreshed daily.",
        "Reprocessable layers — logic fixes rerun from Bronze without re-ingesting from source.",
        "Schema-enforced, deduplicated data that leadership can trust.",
      ],
    },
    {
      /* P2 — Incremental distributor-premium ingestion with Auto Loader */
      conceptDetails: [
        { name: "Auto Loader (cloudFiles)", detail: "spark.readStream.format('cloudFiles') incrementally and idempotently discovers and ingests new files as they land, tracking what's been processed so it scales to millions of files." },
        { name: "Schema evolution", detail: "Auto Loader persists the inferred schema in schemaLocation and can add new columns automatically when the source adds fields, rather than failing the load." },
        { name: "Incremental processing", detail: "Only new/changed data is processed each run, avoiding full reloads and cutting cost and latency." },
        { name: "Structured Streaming basics", detail: "A continuous DataFrame computation over an unbounded input; here used in micro-batch mode to append new files to Bronze." },
        { name: "Checkpointing", detail: "checkpointLocation records source progress and state so a restarted stream resumes exactly where it left off (exactly-once to Delta)." },
      ],
      architecture: "Distributor extracts land in cloud storage → Auto Loader stream (cloudFiles + schemaLocation) → Bronze Delta streaming table (checkpointed) → downstream Silver/Gold. A COPY INTO variant handles a smaller, known monthly file set.",
      steps: [
        "Configure spark.readStream.format('cloudFiles') with cloudFiles.format and cloudFiles.schemaLocation.",
        "Set schemaEvolutionMode to add new columns; capture unmatched fields via the _rescued_data column.",
        "writeStream to a Bronze Delta table with a checkpointLocation and Trigger.AvailableNow for scheduled batches.",
        "Add a COPY INTO alternative demonstrating idempotent reloads of known files.",
        "Validate no duplicates by re-running and confirming row counts.",
      ],
      outcomes: [
        "Hands-off daily ingestion that never double-loads files.",
        "Resilient to schema drift from source systems.",
        "Lower reload time and cost vs full refreshes.",
      ],
    },
    {
      /* P3 — Slowly-refreshed dimensions with MERGE (upserts) */
      conceptDetails: [
        { name: "MERGE INTO (upsert)", detail: "A single atomic statement that updates matched rows and inserts new ones (and can delete), keeping a dimension current from a change feed." },
        { name: "Primary keys", detail: "A stable business/surrogate key (e.g., distributor_id) is the MERGE match condition and guarantees one row per entity." },
        { name: "Delta transaction log", detail: "The ordered commit log that makes MERGE atomic and enables versioning and auditability." },
        { name: "Time travel", detail: "SELECT ... VERSION AS OF / TIMESTAMP AS OF reads a prior snapshot — useful to compare before/after a MERGE or recover from a bad load." },
        { name: "DESCRIBE HISTORY", detail: "Lists every version with operation, timestamp, and user — the audit trail for the dimension." },
      ],
      architecture: "Daily change extracts → staging table → MERGE into the managed dimension table (Delta) → consumed by Gold facts. History and audit come from the Delta log; OPTIMIZE/VACUUM manage files/retention.",
      steps: [
        "Load the daily changes into a staging Delta table.",
        "MERGE INTO dim USING staging ON dim.key = staging.key WHEN MATCHED THEN UPDATE ... WHEN NOT MATCHED THEN INSERT ...",
        "Run DESCRIBE HISTORY to inspect the operation; use VERSION AS OF to diff.",
        "Schedule OPTIMIZE (compaction) and VACUUM (retention) as maintenance.",
        "If a bad MERGE occurs, RESTORE to the prior version.",
      ],
      outcomes: [
        "Always-current dimensions with one row per entity, no duplicates.",
        "Auditable change history and one-command recovery.",
        "Compact, well-maintained Delta tables.",
      ],
    },
    {
      /* P4 — Declarative quality pipeline with Delta Live Tables */
      conceptDetails: [
        { name: "Delta Live Tables", detail: "A declarative framework where you define target tables and transformations and DLT manages orchestration, dependencies, and error handling." },
        { name: "Streaming vs live tables", detail: "STREAMING LIVE TABLE processes data incrementally from a streaming source; LIVE TABLE is recomputed each run — choose per source and latency need." },
        { name: "Expectations (warn/drop/fail)", detail: "CONSTRAINT ... EXPECT rules enforce data quality: track violations (warn), drop offending rows, or fail the pipeline." },
        { name: "Pipeline dependencies", detail: "DLT infers the DAG from LIVE.<table> references, so bronze→silver→gold run in the correct order automatically." },
        { name: "Triggered vs continuous", detail: "Triggered mode processes available data then stops (scheduled batch); continuous keeps running for low latency." },
      ],
      architecture: "A DLT pipeline defines bronze (streaming ingest), silver (cleaned with expectations), and gold (aggregates) as LIVE tables; violating rows route to a quarantine table. Runs triggered on a schedule.",
      steps: [
        "Declare bronze as a STREAMING LIVE TABLE reading raw claims.",
        "Declare silver referencing LIVE.bronze; add expectations (drop null policy IDs, warn negative premium).",
        "Route quarantined rows to a separate table for review.",
        "Declare gold aggregates referencing LIVE.silver.",
        "Configure the pipeline in triggered mode with a schedule.",
      ],
      outcomes: [
        "Self-orchestrating pipeline with built-in data-quality gates.",
        "Quarantined bad records instead of silent corruption or full failure.",
        "Less orchestration code to maintain.",
      ],
    },
    {
      /* P5 — Governed, scheduled delivery with Jobs + Unity Catalog */
      conceptDetails: [
        { name: "Databricks Jobs (tasks, dependencies, retries)", detail: "A multi-task DAG that runs ingest→transform→aggregate in order, with retries and schedules, so delivery is automated and resilient." },
        { name: "Job vs all-purpose clusters", detail: "Job clusters spin up for the run and terminate after (cheaper, isolated) — the right choice for scheduled pipelines vs interactive all-purpose clusters." },
        { name: "Unity Catalog (catalog.schema.table)", detail: "A three-level namespace and central governance layer for tables, views, and permissions across workspaces." },
        { name: "GRANT/permissions", detail: "GRANT SELECT plus USE CATALOG/USE SCHEMA gives an analyst group read access; missing traversal grants block access." },
        { name: "Dashboards & alerts", detail: "Databricks SQL dashboards visualize Gold with scheduled refresh; alerts notify when a metric (e.g., loss ratio) breaches a threshold." },
      ],
      architecture: "Multi-task Job on a job cluster: ingest → transform → aggregate, parameterized by widgets. Tables governed in Unity Catalog; a Databricks SQL dashboard + alert sit on Gold. Promotable across environments.",
      steps: [
        "Define a Job with three dependent tasks sharing one job cluster; set retries.",
        "Register outputs in Unity Catalog; GRANT SELECT (+USE) to the analyst group.",
        "Build a SQL dashboard on Gold with a daily refresh.",
        "Create an alert on a loss-ratio threshold.",
        "Parameterize with widgets for environment/date.",
      ],
      outcomes: [
        "Fully automated daily delivery with retries and alerting.",
        "Governed, least-privilege access for business users.",
        "One pipeline promotable dev→prod.",
      ],
    },
  ],

  "databricks-data-engineer-professional": [
    {
      /* P1 — Real-time claims streaming */
      conceptDetails: [
        { name: "Structured Streaming", detail: "Processes an unbounded claims event stream as incremental micro-batches into Delta." },
        { name: "Watermarking", detail: "withWatermark bounds how long late events are accepted so windowed state doesn't grow forever." },
        { name: "Stateful aggregations", detail: "Windowed counts/sums keep state across batches; the watermark expires old state." },
        { name: "Checkpointing", detail: "Persists offsets and state so the query resumes exactly-once after a restart." },
        { name: "Exactly-once / idempotency", detail: "txnAppId/txnVersion in foreachBatch (or MERGE on a key) prevents duplicate writes on retry." },
      ],
      architecture: "Claims event source (Kafka/files) → Structured Streaming with watermark → windowed aggregates → Delta sink via foreachBatch (idempotent), checkpointed for recovery.",
      steps: [
        "readStream the claims source; apply withWatermark on the event-time column.",
        "Aggregate windowed metrics (claims/hour by region) in update output mode.",
        "Write via foreachBatch with txnAppId/txnVersion for exactly-once.",
        "Set a checkpointLocation; tune trigger and maxOffsets/FilesPerTrigger.",
        "Test recovery by killing and restarting the stream.",
      ],
      outcomes: [
        "Near-real-time operational metrics with correct late-data handling.",
        "Exactly-once results that survive restarts.",
        "Bounded, predictable state and cost.",
      ],
    },
    {
      /* P2 — SCD2 + CDF */
      conceptDetails: [
        { name: "SCD Type 1 vs Type 2", detail: "Type 1 overwrites (no history); Type 2 keeps every version with valid-from/to for point-in-time accuracy." },
        { name: "Change Data Feed (CDF)", detail: "delta.enableChangeDataFeed records row-level inserts/updates/deletes so downstream reads only what changed." },
        { name: "MERGE (close + insert)", detail: "On a change, MERGE expires the current row (end date, is_current=false) and inserts a new current row." },
        { name: "Point-in-time joins", detail: "Facts join the dimension version valid at each event's timestamp for historically-correct reporting." },
        { name: "Incremental gold", detail: "Reading Silver's CDF, only changed rows are MERGEd into Gold — no full recompute." },
      ],
      architecture: "Silver dimension maintained as SCD2 via MERGE; CDF enabled. Gold consumes readChangeFeed(startingVersion) and MERGEs incrementally. Facts use temporal joins on validity ranges.",
      steps: [
        "Enable CDF on the Silver dimension.",
        "MERGE changes: close prior rows, insert new current rows (SCD2).",
        "Read CDF (readChangeFeed, startingVersion) downstream.",
        "MERGE only changed rows into Gold aggregates.",
        "Implement point-in-time fact→dim joins on valid-from/to.",
      ],
      outcomes: [
        "Full, auditable dimension history.",
        "Efficient incremental Gold updates.",
        "Historically-correct point-in-time reporting.",
      ],
    },
    {
      /* P3 — Performance tuning */
      conceptDetails: [
        { name: "OPTIMIZE / ZORDER", detail: "Compacts small files and co-locates data by filter/join keys so queries skip irrelevant files." },
        { name: "Liquid clustering", detail: "Maintains clustering on chosen keys without rigid partition directories, adapting to evolving writes." },
        { name: "Deletion vectors", detail: "Mark changed/removed rows without rewriting whole files, greatly speeding UPDATE/DELETE/MERGE." },
        { name: "Partitioning strategy", detail: "Partition on low-cardinality columns (e.g., date); avoid high-cardinality partitions that create tiny files." },
        { name: "File sizing / small-file problem", detail: "Many tiny files slow reads/metadata; compaction restores healthy file sizes." },
      ],
      architecture: "A multi-billion-row premium fact tuned via OPTIMIZE+ZORDER (or liquid clustering) on policy/date/region, deletion vectors enabled, sensible partitioning — validated in the Spark UI.",
      steps: [
        "Diagnose small files/skew via DESCRIBE DETAIL and Spark UI shuffle metrics.",
        "OPTIMIZE with ZORDER on common filter/join keys (or enable liquid clustering).",
        "Enable deletion vectors for fast updates.",
        "Right-size partitioning; avoid high-cardinality partition columns.",
        "Benchmark query and MERGE runtimes before/after.",
      ],
      outcomes: [
        "Large reductions in files scanned and query latency.",
        "Faster MERGE/UPDATE with less write amplification.",
        "Documented before/after performance gains.",
      ],
    },
    {
      /* P4 — Security & PII */
      conceptDetails: [
        { name: "Unity Catalog row filters", detail: "A function returning a boolean per row restricts which rows each user/group can query." },
        { name: "Column masks", detail: "Functions that redact sensitive columns unless the user is in an authorized group." },
        { name: "Dynamic views", detail: "Views using current_user()/is_account_group_member() to filter rows and mask columns without duplicating data." },
        { name: "PII handling", detail: "Identify and mask/tokenize personal data (names, IDs) before analysts or logs see it." },
        { name: "VACUUM for compliant deletes", detail: "After DELETE (and CDF propagation), VACUUM physically removes files past retention to satisfy erasure requests." },
      ],
      architecture: "Shared Gold tables governed by Unity Catalog row filters + column masks; dynamic views for legacy paths; GDPR delete flow = DELETE → CDF propagation → VACUUM after retention.",
      steps: [
        "Create a row-filter function (e.g., by region) and attach to the table.",
        "Add column-mask functions for PII keyed on group membership.",
        "Provide a dynamic view fallback where needed.",
        "Implement compliant delete: DELETE + downstream CDF removal + VACUUM.",
        "Audit access and lineage in Unity Catalog.",
      ],
      outcomes: [
        "Row/column-level security without data duplication.",
        "Auditable, compliant handling of PII and erasure.",
        "Least-privilege access across teams.",
      ],
    },
    {
      /* P5 — CI/CD */
      conceptDetails: [
        { name: "Databricks Asset Bundles", detail: "Declarative YAML defining jobs, DLT pipelines, and config with per-target variables for consistent deploys." },
        { name: "Multi-task job orchestration", detail: "A dependency DAG of tasks with retries and shared clusters, deployed as code." },
        { name: "Unit/integration testing", detail: "Unit tests on transformation functions plus integration tests on sample data, run in CI." },
        { name: "Monitoring & logging", detail: "Alerting on failed/long runs and per-run data-quality metrics for observability." },
        { name: "Environment parameterization", detail: "Per-target variables (catalog/paths) so one codebase runs in dev, staging, and prod." },
      ],
      architecture: "Git repo with the pipeline + tests; CI runs tests on PRs; a Databricks Asset Bundle deploys jobs/pipelines to dev→staging→prod with per-target variables; monitoring/alerts in place.",
      steps: [
        "Author the bundle (databricks.yml) with resources and target variables.",
        "Write unit tests for transforms and an integration test on sample data.",
        "Configure CI to run tests on PRs and block merges on failure.",
        "Deploy the bundle per environment on merge.",
        "Add alerts on run failures/duration and track quality metrics.",
      ],
      outcomes: [
        "Repeatable, low-risk promotion across environments.",
        "Regressions caught before production.",
        "Observable, auditable deployments.",
      ],
    },
  ],

  "databricks-apache-spark-developer": [
    {
      /* P1 — DataFrame transformations */
      conceptDetails: [
        { name: "Transformations vs actions", detail: "Transformations (select/filter/withColumn) are lazy and build a plan; actions (write/count) trigger execution." },
        { name: "select/filter/withColumn", detail: "Core DataFrame operations to project, filter, and derive columns, each returning a new immutable DataFrame." },
        { name: "Column expressions (F.col, when, lit)", detail: "Build typed column logic (e.g., conditional flags) that Catalyst can optimize." },
        { name: "Casting & date functions", detail: "CAST/to_date/date_format normalize types and derive time attributes for analytics." },
        { name: "Immutability & lazy evaluation", detail: "DataFrames never mutate; laziness lets Catalyst optimize the whole plan before anything runs." },
      ],
      architecture: "Source (Delta/Parquet) → DataFrame read with explicit schema → chained narrow transformations → action writes the enriched output. Plan inspected via explain().",
      steps: [
        "Read with a defined StructType to avoid an inference pass.",
        "Chain filter/withColumn/cast (lazy) to cleanse and enrich.",
        "Add flags with when().otherwise().",
        "Trigger with write/count; review the physical plan via explain().",
      ],
      outcomes: [
        "Reusable, optimized cleansing job.",
        "Type-safe, well-structured output.",
        "Understanding of the generated plan.",
      ],
    },
    {
      /* P2 — Joins, aggregations, windows */
      conceptDetails: [
        { name: "Join types (inner/left/semi/anti)", detail: "Choose the join by intent: keep matches (inner), keep left (left), existence (semi), non-matches (anti)." },
        { name: "groupBy + agg", detail: "Aggregate multiple metrics per group in one pass (wide transformation → shuffle)." },
        { name: "Window functions (rank, lag)", detail: "Compute rankings and period-over-period changes without collapsing rows." },
        { name: "Broadcast joins", detail: "Replicate a small dimension to all executors to avoid shuffling the large fact." },
        { name: "Distinct counts", detail: "countDistinct (or approx_count_distinct for scale) for unique customers/policies." },
      ],
      architecture: "Premium fact joined to broadcast dimensions → groupBy aggregates → window rankings/lags → results written for BI. AQE assists at runtime.",
      steps: [
        "Broadcast small dims and join to the fact.",
        "groupBy region/distributor; agg sum(premium), countDistinct(customer).",
        "Rank within region via Window.partitionBy/orderBy.",
        "Compute MoM change with lag() over an ordered window.",
      ],
      outcomes: [
        "Distributor/region KPIs with rankings at scale.",
        "Efficient joins avoiding unnecessary shuffles.",
        "Period comparisons in a single job.",
      ],
    },
    {
      /* P3 — Shuffle/partition tuning */
      conceptDetails: [
        { name: "Narrow vs wide transformations", detail: "Narrow (map/filter) need no shuffle; wide (groupBy/join) shuffle data and start new stages." },
        { name: "Shuffle & stages", detail: "Shuffles move data across the network at stage boundaries — the main cost to manage." },
        { name: "repartition vs coalesce", detail: "repartition = full shuffle (up/down, balanced); coalesce = no full shuffle (down only)." },
        { name: "spark.sql.shuffle.partitions", detail: "Controls post-shuffle partition count (default 200); tune for parallelism vs overhead." },
        { name: "Adaptive Query Execution (AQE)", detail: "Re-optimizes at runtime: coalesces partitions, switches joins, handles skew." },
      ],
      architecture: "A slow wide-transformation job profiled in the Spark UI; shuffle partitions tuned, AQE enabled, output coalesced — with before/after metrics.",
      steps: [
        "Identify heavy shuffles/skew in the Spark UI (Shuffle Read/Write, straggler tasks).",
        "Enable AQE; adjust spark.sql.shuffle.partitions.",
        "coalesce before writing to control output files.",
        "Compare stage/task durations before and after.",
      ],
      outcomes: [
        "Reduced shuffle volume and runtime.",
        "Balanced partitions, fewer stragglers.",
        "Documented performance improvement.",
      ],
    },
    {
      /* P4 — Caching & broadcast */
      conceptDetails: [
        { name: "cache/persist storage levels", detail: "MEMORY_ONLY vs MEMORY_AND_DISK trade recomputation for spill; choose per reuse pattern." },
        { name: "When caching helps vs hurts", detail: "Cache datasets reused multiple times; over-caching wastes memory and causes eviction." },
        { name: "Broadcast join threshold", detail: "Tables under spark.sql.autoBroadcastJoinThreshold auto-broadcast; broadcast() forces it." },
        { name: "Skew (salting)", detail: "Add randomness to hot keys to spread them across partitions and relieve stragglers." },
        { name: "Predicate/column pruning", detail: "Catalyst pushes filters and reads only needed columns to cut I/O." },
      ],
      architecture: "An iterative job caches a reused base DataFrame, broadcasts small lookups, and salts a skewed key — verified via the physical plan.",
      steps: [
        "cache() the reused base; confirm reuse across actions.",
        "broadcast() small lookup tables in joins.",
        "Detect a skewed key; salt it or rely on AQE skew handling.",
        "Confirm pushdown/pruning in explain(); unpersist when done.",
      ],
      outcomes: [
        "Faster iterations via avoided recomputation.",
        "Shuffle-free small-table joins.",
        "Mitigated skew and reduced I/O.",
      ],
    },
    {
      /* P5 — Nested data & IO */
      conceptDetails: [
        { name: "from_json / explode / struct access", detail: "Parse JSON to structs, explode arrays to rows, and access nested fields via dot notation." },
        { name: "Higher-order handling", detail: "Process array/map columns with built-in functions instead of slow UDFs." },
        { name: "Parquet vs CSV (schema, pushdown)", detail: "Parquet is self-describing and columnar, enabling pushdown/pruning; CSV needs inference." },
        { name: "partitionBy on write", detail: "Writing partitioned by date enables partition pruning on later reads." },
        { name: "Avoiding UDF overhead", detail: "Row-at-a-time Python UDFs serialize data and block Catalyst; prefer built-ins/pandas UDFs." },
      ],
      architecture: "Nested JSON claims → from_json + explode → flattened DataFrame → written as date-partitioned Delta/Parquet, queried via a temp view.",
      steps: [
        "Parse nested JSON with from_json into structs; explode arrays.",
        "Access nested fields with dot notation; use built-ins over UDFs.",
        "Write partitioned by date for pruning.",
        "createOrReplaceTempView and query with spark.sql.",
      ],
      outcomes: [
        "Analytics-ready table from messy nested source.",
        "Efficient, prunable storage layout.",
        "No UDF performance penalty.",
      ],
    },
  ],

  "databricks-data-analyst-associate": [
    {
      /* P1 — KPI dashboard */
      conceptDetails: [
        { name: "SQL warehouses", detail: "The compute that runs Databricks SQL; serverless starts fast and autoscales for interactive dashboards." },
        { name: "Queries (joins, aggregations)", detail: "SQL over Gold tables to compute premium, loss ratio, and claim frequency." },
        { name: "Visualizations", detail: "Charts attached to queries (counter, line, bar) chosen to fit each metric." },
        { name: "Dashboards", detail: "Assemble visualizations into one view with scheduled refresh." },
        { name: "Counter/KPI vs line vs bar", detail: "Counter for headline numbers, line for trends, bar for category comparison." },
      ],
      architecture: "Gold Lakehouse tables → saved SQL queries → visualizations → a dashboard on a serverless SQL warehouse with daily refresh.",
      steps: [
        "Write queries for premium, loss ratio, and claim frequency by period/region.",
        "Add a counter (headline), line (trend), and bars (by region).",
        "Assemble into a dashboard; set a serverless warehouse.",
        "Schedule a daily refresh.",
      ],
      outcomes: [
        "Executive KPI dashboard refreshed daily.",
        "Right visual per metric for fast reading.",
        "Low-cost, fast serverless compute.",
      ],
    },
    {
      /* P2 — Parameterized report */
      conceptDetails: [
        { name: "Query parameters", detail: "Inputs (region/date) that re-run the query with the chosen value for interactivity." },
        { name: "Query-based dropdowns", detail: "Parameter choices populated from a query so options stay in sync with data." },
        { name: "CTEs", detail: "WITH clauses that name intermediate results for readable, reusable queries." },
        { name: "Filtering (WHERE vs HAVING)", detail: "WHERE filters rows pre-aggregation; HAVING filters aggregated groups." },
        { name: "Cross-visual interactivity", detail: "Shared parameters drive multiple visuals from one control." },
      ],
      architecture: "A parameterized query (region/date via query-based dropdowns) structured with CTEs powers several linked visuals on one dashboard.",
      steps: [
        "Add region/date parameters (query-based dropdowns).",
        "Structure the query with CTEs.",
        "Use HAVING to filter aggregated groups (e.g., premium > threshold).",
        "Wire the parameters across multiple visuals.",
      ],
      outcomes: [
        "One reusable, interactive report for many slices.",
        "Readable, maintainable SQL.",
        "Consistent filtering across visuals.",
      ],
    },
    {
      /* P3 — Window analytics */
      conceptDetails: [
        { name: "Window functions (ROW_NUMBER, RANK, LAG)", detail: "Rank rows and compare to prior rows without collapsing them." },
        { name: "Running totals (SUM OVER)", detail: "Cumulative sums over an ordered window for trends." },
        { name: "% of total", detail: "value / SUM(value) OVER () gives each row's share of the whole." },
        { name: "date_trunc for periods", detail: "Normalizes timestamps to month/week for clean grouping." },
        { name: "Top-N per group", detail: "ROW_NUMBER partitioned by group, filtered to rn<=N." },
      ],
      architecture: "Gold fact queried with window functions to produce MoM change, running totals, per-region top-N, and % of total — surfaced in a dashboard.",
      steps: [
        "Group by month via date_trunc.",
        "Compute MoM change with LAG over an ordered window.",
        "Rank distributors per region with ROW_NUMBER; keep rn<=5.",
        "Add % of total via SUM(x) OVER ().",
      ],
      outcomes: [
        "Trend, ranking, and contribution analytics.",
        "No self-joins needed for period comparisons.",
        "Clear top-performer views.",
      ],
    },
    {
      /* P4 — Alerting */
      conceptDetails: [
        { name: "Alerts (condition on result)", detail: "A scheduled query whose result is compared to a threshold to trigger notifications." },
        { name: "Scheduled queries", detail: "Run checks on a cadence without manual effort." },
        { name: "NULLIF / safe division", detail: "x / NULLIF(y,0) avoids divide-by-zero in ratio checks." },
        { name: "Data validation queries", detail: "Row-count/nullness/range checks that catch data issues early." },
        { name: "Notifications", detail: "Alerts route to email/destinations when conditions are met." },
      ],
      architecture: "Scheduled check queries (metric thresholds, anomalies) → alert conditions → notifications to the team.",
      steps: [
        "Write check queries (e.g., daily loss ratio, row-count anomaly).",
        "Create alerts with threshold conditions.",
        "Guard ratios with NULLIF.",
        "Route notifications to the team.",
      ],
      outcomes: [
        "Proactive detection of metric/data issues.",
        "No silent divide-by-zero failures.",
        "Faster response to anomalies.",
      ],
    },
    {
      /* P5 — Governed analyst layer */
      conceptDetails: [
        { name: "Views vs tables", detail: "Views store logic (always current); tables store data (may go stale) — views for reusable shaping." },
        { name: "Unity Catalog (three-level namespace)", detail: "catalog.schema.table governs analyst objects consistently." },
        { name: "Permissions (SELECT + USE)", detail: "Grant SELECT plus USE CATALOG/SCHEMA to the analyst group." },
        { name: "Result caching", detail: "Repeated identical queries return faster from cache." },
        { name: "Serverless performance", detail: "Fast-starting, autoscaling compute for bursty analyst workloads." },
      ],
      architecture: "Governed views/gold tables in Unity Catalog form one source of truth; analysts query via serverless warehouses with result caching.",
      steps: [
        "Build governed views shaping data for common reports.",
        "GRANT SELECT (+USE) to the analyst group.",
        "Leverage result caching for repeats.",
        "Document definitions as the single source of truth.",
      ],
      outcomes: [
        "Consistent, governed data for all analysts.",
        "Faster repeated queries.",
        "Reduced metric drift across reports.",
      ],
    },
  ],

  "databricks-genai-engineer-associate": [
    {
      /* P1 — RAG assistant */
      conceptDetails: [
        { name: "RAG pipeline", detail: "Retrieve relevant context, then generate a grounded answer — reduces hallucination and uses current/proprietary data." },
        { name: "Chunking & overlap", detail: "Split docs into passages with slight overlap to preserve cross-boundary context." },
        { name: "Embeddings", detail: "Vector representations where semantically similar text is close, enabling similarity retrieval." },
        { name: "Vector Search retrieval", detail: "Index embeddings and fetch top-k nearest chunks for a query." },
        { name: "Grounded generation", detail: "Instruct the model to answer only from retrieved context and cite sources; abstain otherwise." },
      ],
      architecture: "Docs → chunk → embed → Databricks Vector Search (Delta Sync Index) → retrieve top-k → grounded prompt → LLM → cited answer.",
      steps: [
        "Chunk documents with sensible size/overlap; embed and index in Vector Search.",
        "Embed the query; retrieve top-k relevant chunks.",
        "Build a grounded prompt instructing answer-from-context + citations.",
        "Return an honest 'not found' when context is insufficient.",
      ],
      outcomes: [
        "Assistant that answers from real docs, not guesses.",
        "Cited, verifiable responses.",
        "Up-to-date knowledge without retraining.",
      ],
    },
    {
      /* P2 — Retrieval tuning */
      conceptDetails: [
        { name: "Chunk-size tuning", detail: "Balance context completeness vs precision and token cost by adjusting size/overlap." },
        { name: "Re-ranking", detail: "A cross-encoder re-scores initial candidates so the best context is used." },
        { name: "Hybrid (semantic + keyword) search", detail: "Combines vector similarity with keyword matching to catch exact terms/codes." },
        { name: "Metadata filtering", detail: "Restrict retrieval by attributes (doc type, recency) for precision and scoping." },
        { name: "Top-k trade-offs", detail: "Higher k improves recall but adds noise/cost; retrieve broad then re-rank." },
      ],
      architecture: "Broad vector+keyword retrieval → metadata filter → re-ranker → precise top-few context, evaluated on a labeled set.",
      steps: [
        "Experiment with chunk size/overlap; measure retrieval precision.",
        "Add a re-ranker over initial candidates.",
        "Combine vector + keyword (hybrid) search.",
        "Filter by metadata (type/recency).",
      ],
      outcomes: [
        "Higher answer relevance on jargon-heavy queries.",
        "Better precision at controlled cost.",
        "Scoped, current retrieval.",
      ],
    },
    {
      /* P3 — Prompt engineering */
      conceptDetails: [
        { name: "System prompts", detail: "Persistent role, grounding rules, and abstention policy for the assistant." },
        { name: "Few-shot examples", detail: "Worked examples in the prompt to lock in output format/behavior." },
        { name: "Output schemas / JSON mode", detail: "Enforce structured, parseable output for downstream automation." },
        { name: "Guardrails", detail: "Validate/filter inputs and outputs for safety, policy, and format." },
        { name: "Temperature control", detail: "Low temperature for factual/deterministic answers; higher for creative tasks." },
      ],
      architecture: "A prompt template (system rules + few-shot + schema) with input/output guardrails and low temperature drives consistent structured answers.",
      steps: [
        "Design a system prompt with grounding + abstention rules.",
        "Add few-shot examples for the target format.",
        "Enforce a JSON schema for outputs.",
        "Set low temperature; add guardrails on inputs/outputs.",
      ],
      outcomes: [
        "Consistent, parseable responses.",
        "Safer inputs/outputs.",
        "Reliable integration into BI tools.",
      ],
    },
    {
      /* P4 — Evaluation */
      conceptDetails: [
        { name: "RAG metric triad", detail: "Context relevance (retrieval), groundedness (support), answer relevance (addresses the question)." },
        { name: "LLM-as-a-judge", detail: "A capable model scores responses against a rubric at scale." },
        { name: "Golden evaluation dataset", detail: "A curated, labeled set of questions/answers/sources to benchmark quality." },
        { name: "MLflow evaluation/tracing", detail: "Track experiments and inspect each step's inputs/outputs for debugging." },
        { name: "A/B prompt comparison", detail: "Compare prompts/models on the same inputs with consistent metrics." },
      ],
      architecture: "A golden dataset + LLM-as-judge scoring wired through MLflow gates deployment on metric thresholds; A/B compares prompt variants.",
      steps: [
        "Build a golden set (questions, reference answers, expected sources).",
        "Score context relevance, groundedness, answer relevance.",
        "Track experiments in MLflow; compare two prompts/models.",
        "Gate deployment on thresholds.",
      ],
      outcomes: [
        "Objective, repeatable quality measurement.",
        "Regression detection before shipping.",
        "Evidence-based prompt/model choices.",
      ],
    },
    {
      /* P5 — Deploy & govern */
      conceptDetails: [
        { name: "Model Serving endpoints", detail: "Scalable real-time REST endpoints (autoscaling) to serve the chain." },
        { name: "Foundation Model APIs", detail: "Call hosted LLMs without managing infrastructure." },
        { name: "Unity Catalog for models", detail: "Govern models/functions with the same permissions/lineage as data." },
        { name: "PII handling", detail: "Mask/tokenize sensitive data before it enters prompts or logs." },
        { name: "Caching & model routing", detail: "Cache repeats and route simple requests to cheaper models to control cost/latency." },
      ],
      architecture: "MLflow-logged chain → Model Serving endpoint (autoscaling) governed by Unity Catalog; PII masked, responses cached, requests routed by complexity; monitored in production.",
      steps: [
        "Log the chain with MLflow; deploy to a Model Serving endpoint.",
        "Govern models/data in Unity Catalog; mask PII before context.",
        "Cache repeats; route simple requests to a cheaper model.",
        "Monitor quality and cost in production.",
      ],
      outcomes: [
        "Reliable, autoscaling assistant endpoint.",
        "Governed, privacy-safe deployment.",
        "Controlled cost and latency.",
      ],
    },
  ],

  "databricks-context-engineer-associate": [
    {
      /* P1 — Context-window design */
      conceptDetails: [
        { name: "Context window / token budget", detail: "The finite tokens the model can attend to; every component must be sized deliberately." },
        { name: "Prompt structure & ordering", detail: "System rules first, relevant context next, query last, with key rules made salient." },
        { name: "Lost-in-the-middle", detail: "Models attend most to the start/end; avoid burying critical instructions in the middle." },
        { name: "Grounding", detail: "Supply authoritative context so answers are supported and verifiable." },
        { name: "Delimiting untrusted content", detail: "Mark retrieved/user text as data, not instructions, to resist prompt injection." },
      ],
      architecture: "A prompt assembler orders system rules → retrieved context (delimited) → query, budgeting tokens and trimming to the most relevant context.",
      steps: [
        "Structure the prompt: durable rules first, relevant context next, query last.",
        "Delimit/label untrusted content as data.",
        "Budget tokens across components; trim to relevant context.",
        "Place critical instructions prominently.",
      ],
      outcomes: [
        "Reliable, grounded answers within budget.",
        "Reduced injection risk.",
        "Better use of limited context.",
      ],
    },
    {
      /* P2 — Tool-using agent */
      conceptDetails: [
        { name: "Tool/function calling", detail: "The model requests an action; the app runs it and returns the result into context." },
        { name: "Typed tool schemas", detail: "Clear names, descriptions, and typed parameters so the model calls tools correctly." },
        { name: "Agent loop (plan → act → check)", detail: "Iterative reasoning: plan a step, call a tool, incorporate the result, continue." },
        { name: "Feeding tool results into context", detail: "Tool outputs re-enter the context so the model reasons over real data." },
        { name: "Guardrails on actions", detail: "Confirmations/permission scoping for risky or irreversible operations." },
      ],
      architecture: "An agent with a small, typed toolset (query table, run calc) loops plan→act→check via the Mosaic AI Agent Framework, with guardrails and a step limit.",
      steps: [
        "Define a few clearly-described tools with typed parameters.",
        "Implement the loop: model requests tool → app validates/runs → result to context.",
        "Add confirmations for risky actions.",
        "Bound iterations with a max-steps limit.",
      ],
      outcomes: [
        "Agent that acts on live enterprise data.",
        "Reliable tool selection and execution.",
        "Safe, bounded behavior.",
      ],
    },
    {
      /* P3 — Memory management */
      conceptDetails: [
        { name: "Short vs long-term memory", detail: "Short-term is the running conversation; long-term is retrieved from an external store." },
        { name: "Summarization of old turns", detail: "Condense earlier turns to preserve key facts within the token budget." },
        { name: "Retrieval of long-term facts", detail: "Fetch relevant stored facts on demand instead of holding everything in context." },
        { name: "Context compression", detail: "Distill retrieved passages to the pertinent sentences to save tokens." },
        { name: "Freshness vs caching", detail: "Cache to save cost but invalidate when underlying data changes." },
      ],
      architecture: "Recent turns kept verbatim; older turns summarized; long-term facts in an external store retrieved as needed; cached with invalidation.",
      steps: [
        "Keep recent turns; summarize older ones.",
        "Store long-term facts externally; retrieve when relevant.",
        "Compress retrieved passages to essentials.",
        "Invalidate caches when source data changes.",
      ],
      outcomes: [
        "Coherent multi-turn sessions within budget.",
        "Scalable long-term memory.",
        "Lower cost with fresh answers.",
      ],
    },
    {
      /* P4 — Reliability & safety */
      conceptDetails: [
        { name: "Groundedness/relevance metrics", detail: "Measure whether answers are supported and on-topic across scenarios." },
        { name: "Determinism (temperature, schemas)", detail: "Lower temperature and output schemas make behavior reproducible/testable." },
        { name: "Prompt-injection defense", detail: "Separate trusted rules from untrusted content; sanitize inputs." },
        { name: "Abstention/uncertainty", detail: "The agent asks for clarification or abstains when unsure." },
        { name: "Scenario testing", detail: "Typical, edge, and adversarial cases with metrics reveal real robustness." },
      ],
      architecture: "A scenario suite + metrics harness evaluates groundedness, correct tool use, and injection resistance before rollout; low temperature + schemas for determinism.",
      steps: [
        "Build a scenario suite (typical, edge, adversarial).",
        "Lower temperature; use schemas for reproducibility.",
        "Test injection resistance with malicious retrieved content.",
        "Verify the agent abstains/asks when unsure.",
      ],
      outcomes: [
        "Trustworthy, testable agent behavior.",
        "Resistance to prompt injection.",
        "Calibrated uncertainty.",
      ],
    },
    {
      /* P5 — Personalized/governed context */
      conceptDetails: [
        { name: "Per-user context (preferences, entitlements)", detail: "Inject minimal, permission-scoped user info to personalize answers." },
        { name: "PII masking", detail: "Redact/tokenize sensitive fields before they enter context or logs." },
        { name: "Access scoping", detail: "Ensure users can't retrieve data beyond their permissions." },
        { name: "Situational context (date/locale)", detail: "Supply facts the model can't infer, like current date or region." },
        { name: "Auditable logging", detail: "Log step/tool traces (PII handled) for auditability and debugging." },
      ],
      architecture: "A context builder injects entitlement-scoped user context and situational facts, masks PII, and logs traces — governed by Unity Catalog.",
      steps: [
        "Inject minimal, entitlement-scoped user context; mask PII.",
        "Provide situational facts (date/region).",
        "Log step/tool traces with PII handled.",
        "Verify users can't see beyond their permissions.",
      ],
      outcomes: [
        "Personalized yet privacy-safe answers.",
        "Access-scoped, compliant context.",
        "Auditable agent behavior.",
      ],
    },
  ],

  "microsoft-pl-300": [
    {
      /* P1 — Star schema model */
      conceptDetails: [
        { name: "Star schema", detail: "A central fact table joined to dimension tables — simplest, fastest structure for Power BI." },
        { name: "Relationships & cardinality", detail: "One-to-many from dimensions to the fact, defined with correct cardinality." },
        { name: "Single-direction filtering", detail: "Filters flow dimension → fact; avoids ambiguity/performance issues of bidirectional." },
        { name: "Date dimension (marked)", detail: "A contiguous, marked date table enables correct time-intelligence." },
        { name: "Measures vs calculated columns", detail: "Measures compute at query time (no storage); calculated columns are stored per row." },
      ],
      architecture: "Fact (premium/claims) surrounded by date, product, region, distributor dimensions; one-to-many single-direction relationships; marked date table.",
      steps: [
        "Model the fact and dimensions in a star.",
        "Set one-to-many, single-direction relationships; mark the date table.",
        "Create measures (written premium, loss ratio) rather than calculated columns.",
        "Reduce cardinality (split datetime) for performance.",
      ],
      outcomes: [
        "Fast, unambiguous model.",
        "Correct time-intelligence.",
        "Lean, performant dataset.",
      ],
    },
    {
      /* P2 — Power Query ETL */
      conceptDetails: [
        { name: "Power Query (M)", detail: "The transformation layer that cleans and shapes data as ordered steps." },
        { name: "Query folding", detail: "Pushes steps back to the source as a native query for fast refresh." },
        { name: "Merge vs Append", detail: "Merge joins on a key; Append unions similarly-structured queries." },
        { name: "Data profiling", detail: "Column quality/distribution views to find issues early." },
        { name: "Remove-columns-early", detail: "Trimming unused columns early preserves folding and shrinks the model." },
      ],
      architecture: "Sources → Power Query (profile, remove columns, merge/append, foldable steps) → clean tables loaded to the model.",
      steps: [
        "Connect and profile sources.",
        "Remove unused columns early; keep steps foldable.",
        "Merge lookups and Append similar extracts.",
        "Verify folding is preserved.",
      ],
      outcomes: [
        "Fast, foldable refresh.",
        "Clean, conformed source data.",
        "Smaller model footprint.",
      ],
    },
    {
      /* P3 — DAX & time intelligence */
      conceptDetails: [
        { name: "CALCULATE & filter context", detail: "The core function that modifies filter context to compute segmented metrics." },
        { name: "Row vs filter context", detail: "Row context (iterators/columns) vs filter context (slicers/visuals/CALCULATE)." },
        { name: "Iterators (SUMX)", detail: "Row-by-row computation then aggregation (e.g., Qty×Price line revenue)." },
        { name: "Time intelligence (SAMEPERIODLASTYEAR, TOTALYTD)", detail: "Period comparisons requiring a marked date table." },
        { name: "DIVIDE / VAR", detail: "DIVIDE handles divide-by-zero; VAR improves readability/performance." },
      ],
      architecture: "Base measures + CALCULATE variants + time-intelligence (YoY/YTD) built on the marked date table, refactored with VAR.",
      steps: [
        "Write base measures, then CALCULATE variants for regions/segments.",
        "Add YoY with SAMEPERIODLASTYEAR + DIVIDE.",
        "Use SUMX for line-level revenue.",
        "Refactor with VAR for clarity/performance.",
      ],
      outcomes: [
        "Accurate YoY/YTD and segmented metrics.",
        "Safe ratios (no divide-by-zero).",
        "Readable, performant DAX.",
      ],
    },
    {
      /* P4 — Report design */
      conceptDetails: [
        { name: "Visual selection", detail: "Choose visuals to fit the question (KPI, line, bar, matrix)." },
        { name: "Bookmarks & drillthrough", detail: "Save states and let users jump to filtered detail pages." },
        { name: "Slicers & sync slicers", detail: "On-canvas filters that can sync across pages." },
        { name: "Key influencers / Q&A visuals", detail: "AI visuals for driver analysis and natural-language questions." },
        { name: "Edit interactions", detail: "Control how selecting one visual filters/highlights others." },
      ],
      architecture: "A report leading with KPIs, with drillthrough to detail, slicers (synced), and AI visuals, tuned via edit-interactions.",
      steps: [
        "Lead with KPIs; add trend/comparison/detail visuals.",
        "Configure drillthrough from summary to filtered detail.",
        "Add Key Influencers and Q&A visuals.",
        "Tune cross-visual interactions.",
      ],
      outcomes: [
        "Interactive, decision-focused report.",
        "Self-service exploration.",
        "Clear, controlled interactivity.",
      ],
    },
    {
      /* P5 — Deploy/secure/refresh */
      conceptDetails: [
        { name: "Workspaces & apps", detail: "Publish to a workspace and distribute to consumers via an app." },
        { name: "Row-Level Security (RLS)", detail: "Roles with DAX filters (e.g., USERPRINCIPALNAME) restrict rows per user." },
        { name: "Gateways & scheduled refresh", detail: "On-prem gateway + schedule keep data current." },
        { name: "Incremental refresh", detail: "Refresh only recent partitions to cut time on large tables." },
        { name: "Deployment pipelines", detail: "Promote content across Dev/Test/Prod with rules." },
      ],
      architecture: "Published dataset/report with RLS roles, gateway + incremental refresh, distributed via an app and promoted through a deployment pipeline.",
      steps: [
        "Publish to a workspace; define RLS roles.",
        "Configure gateway and scheduled/incremental refresh.",
        "Distribute via an app.",
        "Promote dev→test→prod with a deployment pipeline.",
      ],
      outcomes: [
        "Governed, secured distribution.",
        "Timely, efficient refresh.",
        "Controlled release management.",
      ],
    },
  ],

  "qlik-sense-data-architect": [
    {
      conceptDetails: [
        { name: "Associative model", detail: "Qlik links tables by identical field names; naming is effectively the data model." },
        { name: "Synthetic keys", detail: "Auto-created when tables share 2+ fields; usually resolved to keep the model clean." },
        { name: "Circular references", detail: "Association loops causing ambiguity; broken via renaming or a link table." },
        { name: "Star schema / link table", detail: "A central fact + dimensions (or a link table for multi-fact) avoids synthetic keys/loops." },
        { name: "Key naming", detail: "Deliberate key names (e.g., %CustomerKey) ensure only intended tables associate." },
      ],
      architecture: "Sources loaded and validated in the model viewer; keys named deliberately; a link table connects multiple facts to shared dimensions.",
      steps: [
        "Load sources; inspect for synthetic keys/loops.",
        "Rename/qualify coincidental fields; build composite keys where needed.",
        "Introduce a link table for shared dimensions.",
        "Validate associations in the data model viewer.",
      ],
      outcomes: ["Clean, synthetic-key-free model.", "Unambiguous associations.", "Fast, correct dashboards."],
    },
    {
      conceptDetails: [
        { name: "QVD (optimized load)", detail: "Qlik's binary staging format; optimized loads stream directly into memory, very fast." },
        { name: "Incremental load", detail: "Fetch only new/changed rows and combine with the stored QVD." },
        { name: "WHERE NOT EXISTS", detail: "Loads only keys not already present, avoiding duplicates on append." },
        { name: "STORE/LOAD", detail: "STORE writes in-memory tables to QVD; LOAD reads them back (optimized)." },
        { name: "Handling updates/deletes", detail: "Update by taking fresh rows + WHERE NOT EXISTS; reconcile deletes against current keys." },
      ],
      architecture: "Sources → extract QVDs → incremental logic (max modified date variable) → concatenate + STORE back to QVD → app loads optimized QVDs.",
      steps: [
        "Extract sources to QVDs; capture last max modified date in a variable.",
        "Load newer rows; concatenate retained rows WHERE NOT EXISTS(key).",
        "Reconcile deletes against current source keys.",
        "Keep optimized loads (single WHERE EXISTS exception).",
      ],
      outcomes: ["Fast, incremental reloads.", "No duplicates on append.", "Reduced source load."],
    },
    {
      conceptDetails: [
        { name: "JOIN vs CONCATENATE vs KEEP", detail: "JOIN merges columns (can multiply rows); CONCATENATE unions rows; KEEP reduces but keeps tables separate." },
        { name: "ApplyMap (mapping load)", detail: "Key-based single-value lookup that never duplicates rows — often better than JOIN." },
        { name: "Preceding load", detail: "Transform a load's output in one pass without a resident second pass." },
        { name: "Crosstable/Generic load", detail: "Crosstable pivots wide data to long; Generic turns attribute rows into columns." },
        { name: "Subfield/IntervalMatch", detail: "Subfield splits delimited values; IntervalMatch maps values to ranges." },
      ],
      architecture: "Messy sources shaped via ApplyMap, preceding loads, crosstable, subfield, and IntervalMatch into an analytics-ready model.",
      steps: [
        "Use ApplyMap for single-value lookups (no duplication).",
        "Concatenate multi-source facts with a source flag; JOIN only where safe.",
        "Pivot wide data with CROSSTABLE; split multi-values with Subfield.",
        "Bucket ranges (age bands) with IntervalMatch.",
      ],
      outcomes: ["Clean model from imperfect sources.", "No accidental row explosion.", "Reusable transform patterns."],
    },
    {
      conceptDetails: [
        { name: "Master calendar generation", detail: "A gap-free date table with Year/Quarter/Month for reliable time analysis." },
        { name: "Cardinality reduction (split datetime)", detail: "Splitting timestamps into Date + Time cuts distinct values and memory." },
        { name: "AutoNumber keys", detail: "Compresses composite/text keys into small integers." },
        { name: "Optimized QVD loads", detail: "Avoid transformations on QVD reads to keep them fast." },
        { name: "Precomputed flags", detail: "Compute flags in the script so charts don't recompute per interaction." },
      ],
      architecture: "A generated master calendar + reduced-cardinality keys + precomputed flags feed lean, fast charts.",
      steps: [
        "Generate a continuous date table with derived fields.",
        "Split timestamps into Date + Time.",
        "AutoNumber large composite keys.",
        "Precompute flags in the script.",
      ],
      outcomes: ["Reliable time analysis.", "Lower memory footprint.", "Faster chart rendering."],
    },
    {
      conceptDetails: [
        { name: "Section Access", detail: "User-based data reduction (row-level security) defined in the script." },
        { name: "Data reduction", detail: "Each user sees only rows matching their permitted values." },
        { name: "Reduction fields (UPPERCASE)", detail: "Matching is case-sensitive; conventionally uppercase for reliability." },
        { name: "Admin vs user access", detail: "ADMIN sees all; USER is reduced — always keep a valid admin." },
        { name: "Testing safely", detail: "Test in a copy to avoid locking yourself out." },
      ],
      architecture: "A Section Access table maps authenticated users to permitted regions; data reduces per user; tested in a copy before release.",
      steps: [
        "Build the Section Access table (user → region).",
        "Use uppercase fields/values; keep a valid admin.",
        "Reduce data by matching the logged-in user.",
        "Test in a copy to avoid lockout.",
      ],
      outcomes: ["Row-level security per user.", "Safe, reliable matching.", "No lockout risk."],
    },
  ],

  "qlik-sense-business-analyst": [
    {
      conceptDetails: [
        { name: "Dimensions vs measures", detail: "Dimensions group (by what); measures aggregate (how much)." },
        { name: "Chart selection", detail: "Pick the visual by question: line (trend), bar (compare), KPI (headline)." },
        { name: "KPI objects", detail: "Show headline metrics vs targets with conditional color." },
        { name: "App/sheet structure", detail: "Organize sheets to mirror how users make decisions." },
        { name: "UX best practices", detail: "Focused, uncluttered sheets that guide the eye." },
      ],
      architecture: "A focused app: KPI-led overview sheet, trend/comparison sheets, and filter panes for exploration.",
      steps: [
        "Translate questions into KPIs and a sheet layout.",
        "Lead with KPI objects; add trend/comparison charts.",
        "Keep sheets focused; add filter panes.",
        "Apply consistent formatting.",
      ],
      outcomes: ["Executive-ready dashboard.", "Fast comprehension.", "Guided exploration."],
    },
    {
      conceptDetails: [
        { name: "Set analysis ($ vs 1)", detail: "$ = current selection; 1 = all records ignoring selection." },
        { name: "Modifiers (set/clear/exclude)", detail: "<Year={2024}> sets, <Year=> clears, <Region-={'East'}> excludes." },
        { name: "Dollar-sign expansion", detail: "$(=Max(Year)) evaluates then substitutes for dynamic measures." },
        { name: "% of total", detail: "Divide by a set-analysis denominator that ignores/overrides selection." },
        { name: "Selection states", detail: "Green (selected), white (possible), grey (excluded) guide analysis." },
      ],
      architecture: "Measures use set analysis to fix periods, exclude fields, and compute shares independent of user selections.",
      steps: [
        "Fix a year with <Year={2024}> or $(=Max(Year)).",
        "Compute % of total with {1}/cleared-field denominators.",
        "Exclude values with -= modifiers.",
        "Leverage selection-state feedback.",
      ],
      outcomes: ["Robust comparison measures.", "Filter-independent KPIs.", "Clear associative feedback."],
    },
    {
      conceptDetails: [
        { name: "Master dimensions", detail: "Reusable, governed grouping fields (incl. drill-down hierarchies)." },
        { name: "Master measures", detail: "One approved definition of each metric reused everywhere." },
        { name: "Master visualizations", detail: "Reusable approved charts for consistency." },
        { name: "Drill-down dimensions", detail: "Hierarchies (Country>Region>City) that drill as users select." },
        { name: "Consistency", detail: "Governed definitions prevent conflicting metric variants." },
      ],
      architecture: "A master-items library (dimensions, measures, visuals) governs the app so every sheet uses consistent definitions.",
      steps: [
        "Create master measures for official metrics.",
        "Define drill-down master dimensions.",
        "Reuse master visualizations.",
        "Document definitions for the team.",
      ],
      outcomes: ["Consistent metrics across sheets.", "Faster app building.", "Governed self-service."],
    },
    {
      conceptDetails: [
        { name: "Aggr()", detail: "Computes an inner aggregation over a virtual dimension for nested calcs." },
        { name: "Rank()", detail: "Ranks rows by an expression for top-N analysis." },
        { name: "Nested aggregation", detail: "e.g., Avg(Aggr(Sum(Sales),Customer)) = average per customer." },
        { name: "TOTAL qualifier", detail: "Ignores chart dimensions for within-group shares/totals." },
        { name: "Top-N within groups", detail: "Aggr + Rank to rank items inside each group." },
      ],
      architecture: "Advanced measures use Aggr/Rank/TOTAL to answer per-group and top-N questions.",
      steps: [
        "Average per customer with Avg(Aggr(Sum(Sales),Customer)).",
        "Rank distributors within regions using Aggr + Rank.",
        "Use TOTAL for within-group shares.",
        "Limit charts to top-N.",
      ],
      outcomes: ["Deeper performance insight.", "Correct nested calculations.", "Readable top-N views."],
    },
    {
      conceptDetails: [
        { name: "Stories & snapshots", detail: "Capture chart states into a guided narrative for stakeholders." },
        { name: "Variable input (what-if)", detail: "Input-controlled variables let users test scenarios." },
        { name: "Reference lines", detail: "Dynamic benchmarks (avg/target) for context." },
        { name: "Conditional coloring", detail: "Data-driven color to flag status vs target." },
        { name: "Accessibility", detail: "Not-color-only encoding and sufficient contrast." },
      ],
      architecture: "A story assembled from snapshots plus a what-if variable input and status coloring communicates and explores insight.",
      steps: [
        "Capture snapshots into a guided story.",
        "Add a variable-driven what-if input.",
        "Use reference lines and conditional colors.",
        "Ensure accessible (not color-only) encoding.",
      ],
      outcomes: ["Compelling data storytelling.", "Scenario exploration.", "Accessible visuals."],
    },
  ],

  "qlikview-12-data-architect": [
    {
      conceptDetails: [
        { name: "QVD layering", detail: "Extract/Transform/Present QVD layers separate concerns and speed reloads." },
        { name: "Extract vs transform vs present", detail: "Extract raw to QVD, model in transform, serve curated QVDs to the app." },
        { name: "Optimized loads", detail: "Read QVDs without transformation to stream directly into memory." },
        { name: "Reusability", detail: "Curated QVDs are reused across multiple apps." },
        { name: "Reload reliability", detail: "Decoupling means source outages don't break app reloads." },
      ],
      architecture: "Extractor QVDs (raw) → transformer QVDs (modeled) → app loads curated, optimized QVDs.",
      steps: [
        "Extract raw sources to QVDs (minimal transformation).",
        "Transform/model into curated QVDs (keys, cleansing, calendar).",
        "Load the app from curated QVDs.",
        "Decouple so source outages don't break reloads.",
      ],
      outcomes: ["Reusable, fast reloads.", "Resilient pipelines.", "Clear separation of concerns."],
    },
    {
      conceptDetails: [
        { name: "Incremental load", detail: "Load only new/changed rows and combine with the stored QVD." },
        { name: "WHERE NOT EXISTS", detail: "Append only keys not already loaded, avoiding duplicates." },
        { name: "Delete reconciliation", detail: "Drop rows whose keys no longer exist in the source." },
        { name: "Optimized QVD (WHERE EXISTS exception)", detail: "A single WHERE EXISTS keeps the load optimized." },
        { name: "Peek/Max for cutoffs", detail: "Read last max modified date to filter the source." },
      ],
      architecture: "Capture last max date → load changed rows → retain old rows WHERE NOT EXISTS → reconcile deletes → STORE QVD.",
      steps: [
        "Capture last max modified date via resident Max()/Peek.",
        "Load changed rows; retain old rows WHERE NOT EXISTS(key).",
        "Reconcile deletes against current source keys.",
        "Validate row counts vs source totals.",
      ],
      outcomes: ["Efficient CRUD incremental loads.", "No duplicates.", "Validated correctness."],
    },
    {
      conceptDetails: [
        { name: "Synthetic keys", detail: "Created when tables share 2+ fields; resolve to keep the model clean." },
        { name: "Circular references", detail: "Association loops; break with renames or a link table." },
        { name: "JOIN vs KEEP vs CONCATENATE", detail: "Merge columns / reduce-but-separate / union rows respectively." },
        { name: "Composite/AutoNumber keys", detail: "Combine shared fields into one compact key." },
        { name: "Table Viewer validation", detail: "Ctrl+T to inspect associations and spot issues." },
      ],
      architecture: "A clean star/link model with composite AutoNumber keys, validated in the Table Viewer.",
      steps: [
        "Inspect the model in the Table Viewer (Ctrl+T).",
        "Combine shared fields into one composite (AutoNumber) key.",
        "Break loops with a link table; use KEEP to reduce without merging.",
        "Confirm a clean model.",
      ],
      outcomes: ["No synthetic keys/loops.", "Predictable results.", "Better performance."],
    },
    {
      conceptDetails: [
        { name: "Custom extract loads", detail: "Build extract logic where standard connectors are limited." },
        { name: "Mapping/ApplyMap", detail: "Normalize codes to descriptions without row duplication." },
        { name: "Data refactoring", detail: "Reshape source structures for a clean model." },
        { name: "Binary/partial reload", detail: "BINARY copies a model; partial reload updates parts incrementally." },
        { name: "Scheduling", detail: "Reliable daily refresh of the extracts/app." },
      ],
      architecture: "Non-standard source extracts (e.g., SAP-style) staged to QVD, refactored with mapping/preceding loads, updated via partial reloads, scheduled daily.",
      steps: [
        "Build extract logic into QVDs (with source teams).",
        "Refactor/normalize with mapping and preceding loads.",
        "Use partial reloads (Add/Replace/Delete) for targeted updates.",
        "Schedule reliable daily refreshes.",
      ],
      outcomes: ["Data loaded despite connector limits.", "Clean, normalized model.", "Reliable refresh."],
    },
    {
      conceptDetails: [
        { name: "Section Access (UPPERCASE, ADMIN)", detail: "Row-level security matched on uppercase fields; keep a valid admin." },
        { name: "Cardinality reduction", detail: "Split datetime and trim distinct values to save memory." },
        { name: "AutoNumber", detail: "Compact integer keys for memory/performance." },
        { name: "Symbol tables/memory", detail: "Qlik stores each distinct value once; low cardinality helps." },
        { name: "Testing safely", detail: "Test security in a copy before release." },
      ],
      architecture: "Section Access reduction by user/region + memory optimizations (split datetime, AutoNumber, star), tested in a copy.",
      steps: [
        "Add Section Access reduction by user/region; keep a valid admin.",
        "Split datetime and AutoNumber keys.",
        "Normalize wide facts into a star.",
        "Test security in a copy.",
      ],
      outcomes: ["Secured per-user data.", "Lower memory use.", "Safe release."],
    },
  ],

  "qlikview-12-business-analyst": [
    {
      conceptDetails: [
        { name: "Chart selection", detail: "Pick visuals to fit KPIs across banking/retail/insurance." },
        { name: "Dimensions & expressions", detail: "Build measures from aggregation expressions over dimensions." },
        { name: "List boxes & current selections", detail: "Selection objects and a Current Selections box for context." },
        { name: "Bookmarks", detail: "Save and share specific filtered views." },
        { name: "UX best practices", detail: "Consistent formatting, clear titles, focused sheets." },
      ],
      architecture: "Focused dashboards with KPI text objects, comparison charts, list boxes, current-selections box, and bookmarks.",
      steps: [
        "Design focused sheets with KPI objects and comparison charts.",
        "Add list boxes and a Current Selections box.",
        "Save bookmarks for common views.",
        "Apply consistent formatting/conditional colors.",
      ],
      outcomes: ["Clear multi-industry dashboards.", "Easy navigation.", "Shareable views."],
    },
    {
      conceptDetails: [
        { name: "Sum/Count/Avg", detail: "Core aggregations for KPIs." },
        { name: "TOTAL qualifier", detail: "Ignores chart dimensions for % of total." },
        { name: "Rank()", detail: "Ranks items for top-N analysis." },
        { name: "FirstSortedValue", detail: "Returns the value tied to the max/min of another field." },
        { name: "Only()/Dual()", detail: "Only returns a unique value; Dual ties display text to a sort number." },
      ],
      architecture: "Robust expressions: % of total (TOTAL), rankings (Rank/FirstSortedValue), and display control (Dual/Only).",
      steps: [
        "Compute % of total with Sum(Sales)/Sum(TOTAL Sales).",
        "Return top performer via FirstSortedValue(x, -weight).",
        "Use Dual() so text sorts by number (months).",
        "Guard blanks with If()/Only().",
      ],
      outcomes: ["Accurate shares and rankings.", "Correct sorting.", "Clean handling of edge cases."],
    },
    {
      conceptDetails: [
        { name: "Set identifiers ($ vs 1)", detail: "$ current selection; 1 all records." },
        { name: "Modifiers", detail: "Set/clear/exclude fields inside <>." },
        { name: "Dollar-sign expansion", detail: "$(=Max(Year)) for dynamic year measures." },
        { name: "Exclusions", detail: "Clear specific filters while respecting others." },
        { name: "YoY growth", detail: "(cur-prev)/prev with per-year set analysis." },
      ],
      architecture: "Period-comparison measures built with set analysis (current vs prior year), independent of user selection.",
      steps: [
        "Fix year with {$<Year={$(=Max(Year))}>}; prior with Max(Year)-1.",
        "Compute (cur-prev)/prev for YoY.",
        "Ignore specific filters via cleared modifiers.",
        "Prefer set analysis over If() for speed.",
      ],
      outcomes: ["Reliable YoY/period measures.", "Filter-independent KPIs.", "Better performance."],
    },
    {
      conceptDetails: [
        { name: "Drill-down vs cyclic groups", detail: "Hierarchy navigation vs switching unrelated dimensions." },
        { name: "Above/Below & RangeSum", detail: "Inter-row references for running totals." },
        { name: "Dimensionality()", detail: "Detects aggregation level in pivots for level-specific logic." },
        { name: "Trellis (small multiples)", detail: "Repeat a chart across a dimension for comparison." },
        { name: "Aggr()", detail: "Nested aggregation for advanced calculations." },
      ],
      architecture: "Charts with drill-down/cyclic groups, running totals (RangeSum+Above), trellis, and Aggr-based calcs.",
      steps: [
        "Add drill-down (Year>Quarter>Month) and cyclic groups.",
        "Build running totals with RangeSum(Above(...)).",
        "Vary subtotal logic with Dimensionality() in pivots.",
        "Use trellis for side-by-side comparison.",
      ],
      outcomes: ["Rich interactive navigation.", "Cumulative analysis.", "Comparable small multiples."],
    },
    {
      conceptDetails: [
        { name: "Conditional coloring (traffic lights)", detail: "Color measures by status vs target." },
        { name: "Number formatting (num/money)", detail: "Readable units, separators, decimals." },
        { name: "Sparklines", detail: "Mini trends inside tables for context." },
        { name: "Dynamic titles (GetCurrentSelections)", detail: "Titles reflecting current selections." },
        { name: "Show conditions", detail: "Reveal detail objects only when relevant." },
      ],
      architecture: "Executive-ready dashboards with traffic-light coloring, clean formats, sparklines, dynamic titles, and conditional show.",
      steps: [
        "Add traffic-light coloring vs targets and clean number formats.",
        "Embed sparklines for trend context in tables.",
        "Build dynamic titles from current selections.",
        "Use show conditions to reveal detail when relevant.",
      ],
      outcomes: ["At-a-glance status.", "Readable KPIs.", "Guided, uncluttered dashboards."],
    },
  ],
};
