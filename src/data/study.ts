/* -------------------------------------------------------------------------- */
/*  STUDY HUB DATA                                                             */
/*  Roadmaps, study notes, and practice question banks for each certification. */
/*  q = question, o = options, a = index of correct option, e = explanation,   */
/*  t = topic tag. Content is authored for exam-objective coverage; question    */
/*  banks are expanded in batches.                                             */
/* -------------------------------------------------------------------------- */

export interface StudyQuestion {
  q: string;
  o: string[];
  a: number;
  e: string;
  t: string;
}

export interface StudyNote {
  h: string;
  points: string[];
}

export interface CertStudy {
  slug: string;
  name: string;
  issuer: string;
  level: string;
  blurb: string;
  examFormat: string;
  roadmap: string[];
  notes: StudyNote[];
  questions: StudyQuestion[];
  /** Detailed "what it is" paragraphs (from studyMeta). */
  about?: string[];
  /** "Where/how it's used" — roles, real-world value (from studyMeta). */
  usage?: string[];
  /** Path to an on-brand concept diagram (SVG) for this cert. */
  image?: string;
  /** Plain-English "explain like I'm five" points (from studyMeta2). */
  layman?: string[];
  /** Exam shortcut tricks / mnemonics (from studyMeta2). */
  tips?: string[];
  /** Gallery of diagram image paths for this cert. */
  images?: string[];
  /** Hands-on projects that cover the exam's concepts (from studyProjects). */
  projects?: CertProject[];
}

export interface CertProject {
  title: string;
  goal: string;
  concepts: string[];
  approach: string[];
  stack: string[];
  relevance: string;
}

export interface CertMeta {
  about: string[];
  usage: string[];
  image?: string;
}

export interface CertMeta2 {
  layman: string[];
  tips: string[];
}

import { extraQuestions } from "./studyExtra";
import { extraQuestions2 } from "./studyExtra2";
import { extraQuestions3 } from "./studyExtra3";
import { extraQuestions4 } from "./studyExtra4";
import { extraQuestions5 } from "./studyExtra5";
import { extraQuestions6 } from "./studyExtra6";
import { extraQuestions7 } from "./studyExtra7";
import { studyMeta } from "./studyMeta";
import { studyMeta2 } from "./studyMeta2";
import { studyProjects } from "./studyProjects";

export const studyModules: CertStudy[] = [
  /* ====================================================================== */
  {
    slug: "databricks-data-engineer-associate",
    name: "Databricks Certified Data Engineer Associate",
    issuer: "Databricks",
    level: "Associate",
    blurb:
      "Core Lakehouse engineering: building ELT pipelines with Spark SQL and Python, incremental processing with Delta Lake and Auto Loader, productionizing with Delta Live Tables and Jobs, and governance with Unity Catalog.",
    examFormat:
      "~45 multiple-choice questions · 90 minutes · passing ~70% · no penalty for wrong answers.",
    roadmap: [
      "Lakehouse fundamentals — understand the Lakehouse architecture, the difference between data lakes/warehouses, clusters (all-purpose vs job), notebooks, and Repos.",
      "Delta Lake essentials — ACID transactions, the transaction log, time travel, MERGE, OPTIMIZE, VACUUM, and managed vs external (unmanaged) tables.",
      "ELT with Spark SQL — CTAS, views vs tables vs temp views, handling nested/complex data, higher-order functions, and joins/set operations.",
      "Incremental processing — Structured Streaming basics, Auto Loader (cloudFiles), COPY INTO, and multi-hop (medallion: bronze/silver/gold) architecture.",
      "Delta Live Tables (DLT) — declarative pipelines, STREAMING LIVE TABLE vs LIVE TABLE, expectations for data quality, and pipeline modes.",
      "Production & orchestration — Databricks Jobs (tasks, dependencies, schedules, retries), Databricks SQL dashboards and alerts.",
      "Governance — Unity Catalog three-level namespace (catalog.schema.table), grants/permissions, and data object ownership.",
      "Practice: full-length timed tests until consistently 85%+; review every missed objective.",
    ],
    notes: [
      {
        h: "Delta Lake",
        points: [
          "Delta = Parquet data files + an ordered JSON transaction log (_delta_log) giving ACID guarantees.",
          "MANAGED tables: Databricks owns data + metadata; DROP deletes the data. EXTERNAL tables (LOCATION specified): DROP removes only metadata, files remain.",
          "Time travel: query old versions with VERSION AS OF / TIMESTAMP AS OF; enabled by the transaction log.",
          "OPTIMIZE compacts small files; ZORDER BY co-locates data for faster reads; VACUUM removes stale files (default 7-day retention).",
          "MERGE INTO handles upserts (insert/update/delete) in one atomic operation — the basis for CDC.",
        ],
      },
      {
        h: "Incremental ingestion",
        points: [
          "Auto Loader (spark.readStream.format('cloudFiles')) incrementally and idempotently ingests new files as they land; scales to millions of files.",
          "COPY INTO is an idempotent SQL command for incremental loads of smaller/known file sets; re-running skips already-loaded files.",
          "Medallion architecture: Bronze (raw), Silver (cleaned/conformed), Gold (aggregated/business-level).",
        ],
      },
      {
        h: "Delta Live Tables",
        points: [
          "DLT is declarative: you define the target tables and transformations; DLT manages orchestration, dependencies, and error handling.",
          "Use STREAMING LIVE TABLE for incremental/streaming sources; LIVE TABLE for tables recomputed on each run.",
          "Expectations (CONSTRAINT ... EXPECT) enforce data quality: warn, drop, or fail on violation.",
        ],
      },
      {
        h: "Unity Catalog & governance",
        points: [
          "Three-level namespace: catalog.schema.table (adds a layer above the classic schema.table).",
          "Privileges granted with GRANT/REVOKE; USAGE/USE CATALOG and USE SCHEMA are needed to traverse to objects.",
          "Managed by an account-level metastore shared across workspaces.",
        ],
      },
    ],
    questions: [
      {
        q: "What guarantees do Delta Lake tables provide that plain Parquet files do not?",
        o: ["Columnar compression", "ACID transactions", "Schema-on-read only", "Row-based storage"],
        a: 1,
        e: "Delta Lake adds an ordered transaction log on top of Parquet data files, providing ACID (atomicity, consistency, isolation, durability) transactions — concurrent reads/writes, all-or-nothing commits, and consistent snapshots. Parquet alone is just columnar files with no transactional guarantees.",
        t: "Delta Lake",
      },
      {
        q: "You drop a MANAGED Delta table. What happens to the underlying data files?",
        o: [
          "They remain in cloud storage",
          "They are deleted along with the metadata",
          "They are moved to a trash folder for 30 days",
          "Only the transaction log is removed",
        ],
        a: 1,
        e: "For a MANAGED table, Databricks owns both the metadata and the data, so DROP TABLE deletes the underlying files. For an EXTERNAL table (created with LOCATION), DROP removes only the metadata and the files remain in storage.",
        t: "Tables",
      },
      {
        q: "Which tool is designed to incrementally and idempotently ingest large numbers of new files as they arrive in cloud storage?",
        o: ["COPY INTO", "Auto Loader (cloudFiles)", "CREATE TABLE AS SELECT", "VACUUM"],
        a: 1,
        e: "Auto Loader (spark.readStream.format('cloudFiles')) is purpose-built to incrementally process new files as they land, tracking what's been ingested so it scales efficiently to millions of files. COPY INTO also does incremental loads but is better for smaller, known file sets.",
        t: "Ingestion",
      },
      {
        q: "In the medallion architecture, which layer holds raw, unprocessed ingested data?",
        o: ["Gold", "Silver", "Bronze", "Platinum"],
        a: 2,
        e: "Bronze holds raw ingested data (as-is from source). Silver holds cleaned, filtered, and conformed data. Gold holds business-level aggregates ready for analytics and reporting.",
        t: "Architecture",
      },
      {
        q: "Which command compacts many small files in a Delta table into fewer larger files?",
        o: ["VACUUM", "OPTIMIZE", "REFRESH", "ANALYZE"],
        a: 1,
        e: "OPTIMIZE compacts small files into larger ones to improve read performance. Optionally ZORDER BY co-locates related data. VACUUM is different — it permanently removes files no longer referenced by the transaction log (default 7-day retention).",
        t: "Optimization",
      },
      {
        q: "What is the correct Unity Catalog namespace to reference a table?",
        o: ["database.table", "catalog.schema.table", "workspace.database.table", "schema.catalog.table"],
        a: 1,
        e: "Unity Catalog uses a three-level namespace: catalog.schema.table. This adds the catalog layer above the traditional two-level schema.table (database.table) naming.",
        t: "Unity Catalog",
      },
      {
        q: "Which SQL operation performs an atomic upsert (insert new rows, update matching rows) in Delta Lake?",
        o: ["INSERT OVERWRITE", "MERGE INTO", "UPDATE ... JOIN", "COPY INTO"],
        a: 1,
        e: "MERGE INTO matches a source against a target on a condition and can INSERT, UPDATE, and DELETE in a single atomic transaction — the standard pattern for upserts and change-data-capture in Delta.",
        t: "Delta Lake",
      },
      {
        q: "In Delta Live Tables, what do 'expectations' provide?",
        o: [
          "Automatic cluster scaling",
          "Declarative data-quality constraints on records",
          "Version control for notebooks",
          "Cost estimates for a pipeline run",
        ],
        a: 1,
        e: "DLT expectations are data-quality constraints (CONSTRAINT ... EXPECT ...) applied to records flowing through the pipeline. Based on the policy you can warn (track), drop the violating rows, or fail the pipeline.",
        t: "Delta Live Tables",
      },
      {
        q: "Which cluster type is most appropriate for a scheduled, automated production pipeline?",
        o: ["All-purpose cluster", "Job cluster", "SQL warehouse (serverless)", "Single-node cluster"],
        a: 1,
        e: "Job clusters are created for a specific job run and terminate when it finishes — cheaper and isolated, ideal for automated production workloads. All-purpose clusters are for interactive/collaborative development.",
        t: "Compute",
      },
      {
        q: "How can you query a previous version of a Delta table?",
        o: [
          "It is not possible once overwritten",
          "Using VERSION AS OF or TIMESTAMP AS OF (time travel)",
          "By restoring a manual backup",
          "Using VACUUM with a version number",
        ],
        a: 1,
        e: "Delta time travel lets you read earlier snapshots with SELECT ... VERSION AS OF n or TIMESTAMP AS OF '...'. This is possible because the transaction log records every version. Note that VACUUM can eventually remove old files past the retention window, limiting how far back you can travel.",
        t: "Delta Lake",
      },
      {
        q: "What does COPY INTO guarantee when the same command is run twice on the same source files?",
        o: [
          "Files are loaded again, creating duplicates",
          "It is idempotent — already-loaded files are skipped",
          "The target table is overwritten",
          "It raises an error",
        ],
        a: 1,
        e: "COPY INTO is idempotent: it tracks which files have already been ingested, so re-running it skips those files and only loads new ones — preventing duplicates in incremental loads.",
        t: "Ingestion",
      },
      {
        q: "Which privilege chain is required for a user to read a table in Unity Catalog?",
        o: [
          "Only SELECT on the table",
          "USE CATALOG on the catalog, USE SCHEMA on the schema, and SELECT on the table",
          "OWNER on the workspace",
          "MODIFY on the metastore",
        ],
        a: 1,
        e: "To reach an object, a user needs traversal privileges: USE CATALOG on the parent catalog and USE SCHEMA on the parent schema, plus SELECT on the table itself. Missing a traversal grant blocks access even if SELECT is granted.",
        t: "Governance",
      },
    ],
  },
  /* ====================================================================== */
  {
    slug: "databricks-data-engineer-professional",
    name: "Databricks Certified Data Engineer Professional",
    issuer: "Databricks",
    level: "Professional",
    blurb:
      "Advanced data engineering on Databricks: complex transformations and streaming, Delta optimization and modeling (CDC/SCD, medallion), security and governance, monitoring and logging, plus testing and CI/CD deployment.",
    examFormat:
      "~60 multiple-choice questions · 120 minutes · passing ~70% · Python & SQL, deeper scenarios than the Associate.",
    roadmap: [
      "Master the Associate content first — the Professional assumes it and goes deeper.",
      "Databricks tooling — dbutils, the REST API/CLI, Databricks Asset Bundles, widgets, and multi-task job orchestration.",
      "Advanced Delta — OPTIMIZE/ZORDER, file sizing, partitioning strategy, deletion vectors, change data feed (CDF), and MERGE performance.",
      "Streaming — Structured Streaming triggers, watermarking, stateful aggregations, checkpointing, and stream-static joins.",
      "Data modeling — SCD Type 1/2, CDC pipelines with Change Data Feed, and medallion design tradeoffs.",
      "Security & governance — Unity Catalog, dynamic views, row/column-level security, and PII handling.",
      "Monitoring, testing & deployment — logging, Spark UI diagnostics, unit/integration testing of pipelines, and CI/CD.",
      "Practice deep scenario questions; focus on why one approach outperforms another.",
    ],
    notes: [
      {
        h: "Change Data Feed (CDF)",
        points: [
          "Enable with delta.enableChangeDataFeed = true (table property).",
          "Read row-level changes (insert/update_preimage/update_postimage/delete) with readChangeFeed and startingVersion/startingTimestamp.",
          "Ideal for propagating incremental changes downstream (silver→gold) without full recomputation.",
        ],
      },
      {
        h: "Slowly Changing Dimensions",
        points: [
          "SCD Type 1 overwrites the old value (no history).",
          "SCD Type 2 adds a new row per change with validity columns (e.g., start/end timestamps, is_current flag) — preserves full history.",
          "MERGE INTO implements both; Type 2 closes the prior row and inserts a new current row.",
        ],
      },
      {
        h: "Structured Streaming",
        points: [
          "Checkpointing (checkpointLocation) stores offsets + state for exactly-once processing and recovery.",
          "Watermarks (withWatermark) bound state for late data in aggregations/joins so state doesn't grow unbounded.",
          "Triggers: default (micro-batch ASAP), fixed interval (processingTime), availableNow (process all available then stop), continuous (low-latency).",
        ],
      },
      {
        h: "Security patterns",
        points: [
          "Dynamic views apply row filters/column masks using current_user() / is_account_group_member() for fine-grained access.",
          "Unity Catalog supports row-level security and column masking functions natively.",
        ],
      },
    ],
    questions: [
      {
        q: "You must propagate only the rows that changed in a Silver table to a Gold table without recomputing everything. What Delta feature enables this most efficiently?",
        o: ["Time travel", "Change Data Feed (CDF)", "VACUUM", "Deep clone"],
        a: 1,
        e: "Change Data Feed (delta.enableChangeDataFeed=true) records row-level changes so downstream jobs can read just the inserts/updates/deletes via readChangeFeed — enabling incremental propagation without full reprocessing.",
        t: "CDC",
      },
      {
        q: "Which SCD type preserves full history by adding a new row for each change with validity columns?",
        o: ["Type 0", "Type 1", "Type 2", "Type 3"],
        a: 2,
        e: "SCD Type 2 inserts a new record for each change and marks the previous record as expired (via end-date/is_current columns), preserving complete history. Type 1 overwrites the value, keeping no history.",
        t: "Data modeling",
      },
      {
        q: "In Structured Streaming, what is the purpose of a watermark?",
        o: [
          "To encrypt streaming data",
          "To bound state and handle late-arriving data in aggregations",
          "To compress checkpoints",
          "To parallelize the driver",
        ],
        a: 1,
        e: "withWatermark defines how late data can arrive before being dropped, which lets the engine bound the state it retains for windowed aggregations and stream-stream joins — preventing unbounded state growth.",
        t: "Streaming",
      },
      {
        q: "What does the checkpointLocation provide to a Structured Streaming query?",
        o: [
          "A cache of the source data",
          "Offset and state tracking for fault tolerance and exactly-once processing",
          "A backup of the cluster configuration",
          "Compression of output files",
        ],
        a: 1,
        e: "The checkpoint stores progress (source offsets) and any streaming state, so a restarted query resumes exactly where it left off — the basis for fault tolerance and exactly-once semantics.",
        t: "Streaming",
      },
      {
        q: "Which streaming trigger processes all currently available data and then stops?",
        o: ["processingTime='0 seconds'", "continuous", "availableNow", "once='true' with backpressure"],
        a: 2,
        e: "Trigger.AvailableNow processes all data available at query start (in multiple micro-batches if needed) and then stops — ideal for scheduled incremental batch jobs on streaming sources. (It supersedes the older Trigger.Once.)",
        t: "Streaming",
      },
      {
        q: "How do you implement column masking so non-privileged users see redacted values?",
        o: [
          "Store two copies of the table",
          "A dynamic view using current_user()/is_account_group_member() logic",
          "VACUUM with a filter",
          "Partition the table by user",
        ],
        a: 1,
        e: "A dynamic view can conditionally mask columns or filter rows based on the querying identity (current_user(), is_account_group_member('...')), giving fine-grained access control without duplicating data. Unity Catalog also offers native column masks/row filters.",
        t: "Security",
      },
      {
        q: "Which technique co-locates related data in the same files to skip irrelevant data during reads?",
        o: ["VACUUM", "ZORDER BY", "REFRESH TABLE", "CACHE TABLE"],
        a: 1,
        e: "OPTIMIZE ... ZORDER BY (col) clusters rows with similar values of the chosen column(s) into the same files, improving data-skipping for queries that filter on those columns.",
        t: "Optimization",
      },
      {
        q: "What is a key advantage of Databricks Asset Bundles?",
        o: [
          "They compress Delta files",
          "They define and deploy Databricks projects (jobs, pipelines, config) as code for CI/CD",
          "They replace Unity Catalog",
          "They auto-tune Spark shuffles",
        ],
        a: 1,
        e: "Databricks Asset Bundles (DABs) package a project's resources — jobs, DLT pipelines, notebooks, and configuration — as declarative YAML so they can be version-controlled and deployed consistently across environments via CI/CD.",
        t: "Deployment",
      },
      {
        q: "A MERGE is running slowly on a large target table. Which change most directly reduces the data scanned?",
        o: [
          "Increasing the driver memory only",
          "Adding a selective condition on partition/ZORDER columns so fewer files match",
          "Disabling the transaction log",
          "Converting the table to CSV",
        ],
        a: 1,
        e: "MERGE performance depends on how many target files must be read and rewritten. Filtering on partition columns and ZORDER-ing on the merge keys enables data-skipping so far fewer files are touched. Disabling the log isn't possible for Delta.",
        t: "Optimization",
      },
      {
        q: "VACUUM with a retention of 0 hours is generally discouraged because it can:",
        o: [
          "Delete the schema",
          "Break concurrent readers and disable time travel by removing still-needed files",
          "Duplicate the data",
          "Corrupt the Parquet footer",
        ],
        a: 1,
        e: "VACUUM removes files no longer in the latest version. Setting retention too low can delete files still needed by in-flight readers or for time travel, causing failures. Databricks enforces a safety check unless explicitly overridden.",
        t: "Delta Lake",
      },
      {
        q: "Which read pattern lets you consume only new changes from a Delta table's change feed starting at a version?",
        o: [
          "spark.read.format('delta').load(path)",
          "spark.read.option('readChangeFeed','true').option('startingVersion', n)",
          "spark.readStream.format('parquet')",
          "COPY INTO with FORCE",
        ],
        a: 1,
        e: "Reading with option('readChangeFeed','true') and startingVersion/startingTimestamp returns the row-level change events (with _change_type) from that point forward, provided CDF is enabled on the table.",
        t: "CDC",
      },
      {
        q: "For a stream-static join enriching a stream with a Delta dimension table, what is true?",
        o: [
          "The static side is re-read on each micro-batch, picking up updates",
          "The static side is read once and never refreshed",
          "It requires two checkpoints",
          "It is not supported in Structured Streaming",
        ],
        a: 0,
        e: "In a stream-static join, the static Delta table is re-resolved on each micro-batch, so newer versions of the dimension are reflected in subsequent batches — a common enrichment pattern.",
        t: "Streaming",
      },
    ],
  },
  /* ====================================================================== */
  {
    slug: "databricks-apache-spark-developer",
    name: "Databricks Certified Associate Developer for Apache Spark",
    issuer: "Databricks",
    level: "Associate",
    blurb:
      "Apache Spark architecture and the DataFrame API: transformations vs actions, selecting/filtering/joining/aggregating data, partitioning, caching, and how Spark plans and executes jobs.",
    examFormat:
      "~60 questions · 120 minutes · code-focused (Python or Scala DataFrame API) · passing ~70%.",
    roadmap: [
      "Spark architecture — driver vs executors, cluster manager, and the unit hierarchy: job → stage → task; partitions map to tasks.",
      "Transformations vs actions — lazy transformations (select, filter, join, groupBy) build a plan; actions (count, collect, write, show) trigger execution.",
      "Narrow vs wide transformations — narrow (map, filter) need no shuffle; wide (groupBy, join, repartition) shuffle data across partitions and create stage boundaries.",
      "DataFrame API — column expressions, filtering, withColumn, joins (inner/left/outer/semi/anti), aggregations, window functions.",
      "Partitioning & shuffles — repartition (full shuffle, can increase) vs coalesce (no full shuffle, decrease only); spark.sql.shuffle.partitions.",
      "Caching & persistence — cache()/persist() storage levels and when caching helps or hurts.",
      "Performance — broadcast joins for small tables, Adaptive Query Execution (AQE), and predicate/column pruning.",
      "Practice reading code snippets and predicting output or fixing the API call.",
    ],
    notes: [
      {
        h: "Execution model",
        points: [
          "The Driver builds the logical/physical plan and schedules tasks; Executors run tasks and hold cached data.",
          "A job is triggered by an action; it is split into stages at shuffle boundaries; each stage runs as parallel tasks (one per partition).",
          "Transformations are lazy (nothing runs until an action); this lets Spark (via Catalyst) optimize the whole plan.",
        ],
      },
      {
        h: "Narrow vs wide",
        points: [
          "Narrow: each output partition depends on one input partition (map, filter, union) — no shuffle.",
          "Wide: output partitions depend on many input partitions (groupBy, join, distinct, repartition) — requires a shuffle and starts a new stage.",
        ],
      },
      {
        h: "repartition vs coalesce",
        points: [
          "repartition(n) does a full shuffle; can increase or decrease partitions and rebalances data evenly.",
          "coalesce(n) avoids a full shuffle by merging existing partitions; only decreases partition count; can cause skew.",
        ],
      },
      {
        h: "Joins & performance",
        points: [
          "Broadcast join: the small table is sent to every executor, avoiding a shuffle of the large table — use broadcast() hint for small dimensions.",
          "Adaptive Query Execution (AQE) re-optimizes at runtime: coalescing shuffle partitions, switching join strategies, handling skew.",
        ],
      },
    ],
    questions: [
      {
        q: "Which of the following is an ACTION (triggers execution) rather than a transformation?",
        o: ["select()", "filter()", "count()", "withColumn()"],
        a: 2,
        e: "count() is an action — it forces Spark to execute the plan and return a result. select, filter, and withColumn are lazy transformations that only build up the execution plan.",
        t: "Execution model",
      },
      {
        q: "What triggers a shuffle in Spark?",
        o: ["A narrow transformation like filter", "A wide transformation like groupBy or join", "Calling cache()", "Reading a Parquet file"],
        a: 1,
        e: "Wide transformations (groupBy, join, distinct, repartition) require data with the same key to move to the same partition, causing a shuffle across the network — and a new stage boundary. Narrow transformations like filter/map need no data movement.",
        t: "Shuffles",
      },
      {
        q: "What is the difference between repartition(n) and coalesce(n)?",
        o: [
          "They are identical",
          "repartition does a full shuffle and can increase or decrease partitions; coalesce avoids a full shuffle and only decreases",
          "coalesce always increases partitions",
          "repartition only works on RDDs",
        ],
        a: 1,
        e: "repartition(n) performs a full shuffle, rebalancing data and allowing an increase or decrease in partitions. coalesce(n) merges existing partitions without a full shuffle and can only reduce the count — cheaper but may create skew.",
        t: "Partitioning",
      },
      {
        q: "In the Spark execution hierarchy, which is the smallest unit of execution?",
        o: ["Job", "Stage", "Task", "Partition"],
        a: 2,
        e: "A task is the smallest unit of execution — it processes a single partition on one executor. Jobs (triggered by actions) split into stages (at shuffle boundaries), which split into tasks.",
        t: "Execution model",
      },
      {
        q: "Why are Spark transformations described as 'lazy'?",
        o: [
          "They run on a background thread",
          "They are not executed until an action is called, allowing whole-plan optimization",
          "They cache results automatically",
          "They only run on the driver",
        ],
        a: 1,
        e: "Transformations build a logical plan but don't execute until an action triggers them. Laziness lets the Catalyst optimizer analyze and optimize the entire pipeline (pruning, predicate pushdown, reordering) before any work runs.",
        t: "Execution model",
      },
      {
        q: "Which join strategy avoids shuffling a large table by sending a small table to all executors?",
        o: ["Sort-merge join", "Broadcast hash join", "Shuffle hash join", "Cross join"],
        a: 1,
        e: "A broadcast hash join replicates the small table to every executor so the large table's partitions can be joined locally, avoiding an expensive shuffle. Use the broadcast() hint (or let AQE/auto-broadcast threshold apply).",
        t: "Joins",
      },
      {
        q: "Which component builds the execution plan and schedules tasks?",
        o: ["Executor", "Driver", "Worker node", "Cluster manager"],
        a: 1,
        e: "The Driver runs the main program, builds the logical and physical plans, and schedules tasks onto executors. Executors are the JVM processes that actually run tasks and store cached partitions.",
        t: "Architecture",
      },
      {
        q: "Which return type does df.select('col') produce?",
        o: ["A single value", "A new DataFrame", "A Python list", "A Column object only"],
        a: 1,
        e: "select() is a transformation returning a new DataFrame with the chosen columns. DataFrames are immutable, so transformations always return a new DataFrame rather than modifying in place.",
        t: "DataFrame API",
      },
      {
        q: "What does Adaptive Query Execution (AQE) do?",
        o: [
          "Encrypts shuffle data",
          "Re-optimizes the query plan at runtime using actual statistics (e.g., coalescing shuffle partitions, handling skew)",
          "Disables the Catalyst optimizer",
          "Forces all joins to be cross joins",
        ],
        a: 1,
        e: "AQE uses runtime statistics to adapt the plan mid-execution — dynamically coalescing shuffle partitions, switching join strategies (e.g., to broadcast), and mitigating skewed joins — often improving performance without manual tuning.",
        t: "Performance",
      },
      {
        q: "Which config controls the default number of partitions created after a shuffle?",
        o: ["spark.executor.cores", "spark.sql.shuffle.partitions", "spark.driver.memory", "spark.default.parallelism only"],
        a: 1,
        e: "spark.sql.shuffle.partitions (default 200) sets the number of partitions produced by shuffles in the DataFrame/SQL API. Too many creates tiny tasks; too few limits parallelism — AQE can auto-coalesce them.",
        t: "Shuffles",
      },
      {
        q: "A left semi join returns:",
        o: [
          "All columns from both tables",
          "Rows from the left table that have a match on the right, with only left columns",
          "Rows with no match on the right",
          "The Cartesian product",
        ],
        a: 1,
        e: "A left semi join keeps only rows from the left DataFrame that have at least one match on the right, returning just the left table's columns (like an EXISTS filter). A left anti join returns the non-matching left rows.",
        t: "Joins",
      },
      {
        q: "When is caching a DataFrame most beneficial?",
        o: [
          "When it is used only once",
          "When the same DataFrame is reused multiple times in the job",
          "Always, regardless of usage",
          "Only for streaming sources",
        ],
        a: 1,
        e: "cache()/persist() pays off when a DataFrame is materialized once and reused several times, avoiding recomputation of its lineage. Caching something used once wastes memory and can hurt performance.",
        t: "Caching",
      },
    ],
  },
  /* ====================================================================== */
  {
    slug: "databricks-data-analyst-associate",
    name: "Databricks Certified Data Analyst Associate",
    issuer: "Databricks",
    level: "Associate",
    blurb:
      "Analytics on the Lakehouse with Databricks SQL: writing queries, building visualizations, dashboards and alerts, managing data with Delta, and applying basic analytics and governance as an analyst.",
    examFormat:
      "~45 questions · 90 minutes · focused on Databricks SQL, visualization and analytics · passing ~70%.",
    roadmap: [
      "Databricks SQL basics — the SQL editor, SQL warehouses (endpoints), running and saving queries.",
      "Querying — SELECT, filtering, joins, aggregations, CTEs, and working with Delta tables/views.",
      "Visualizations — chart types in Databricks SQL, when to use each, and formatting.",
      "Dashboards — building dashboards from query visualizations, parameters, and refresh schedules.",
      "Alerts — setting conditions on query results to trigger notifications.",
      "Data management — Delta tables, last-mile ETL for analysts, and basic Lakehouse concepts.",
      "Governance & sharing — Unity Catalog basics, query permissions, and sharing dashboards.",
      "Basic statistics/analytics — distributions, aggregations, and interpreting results.",
    ],
    notes: [
      {
        h: "Databricks SQL & warehouses",
        points: [
          "A SQL warehouse (formerly SQL endpoint) is the compute that runs Databricks SQL queries; sizing affects speed and concurrency.",
          "Serverless SQL warehouses start quickly and autoscale.",
          "Query results can be cached to speed up repeated runs.",
        ],
      },
      {
        h: "Visualizations & dashboards",
        points: [
          "Each query can have one or more visualizations (bar, line, pie, counter, table, etc.).",
          "Dashboards assemble visualizations; query parameters make them interactive.",
          "Dashboards can be scheduled to refresh and be shared with viewers.",
        ],
      },
      {
        h: "Alerts",
        points: [
          "Alerts run a query on a schedule and evaluate a condition on a column value; when met, they notify via destinations (email, etc.).",
          "Useful for threshold monitoring (e.g., daily errors > N).",
        ],
      },
      {
        h: "Analyst data management",
        points: [
          "Analysts often do 'last-mile' transformations creating views or gold tables for reporting.",
          "Delta tables give reliable, versioned data; use CTAS or views to shape data for dashboards.",
        ],
      },
    ],
    questions: [
      {
        q: "What is a SQL warehouse in Databricks SQL?",
        o: [
          "A storage location for Delta files",
          "The compute resource that executes Databricks SQL queries",
          "A dashboard template",
          "A Unity Catalog metastore",
        ],
        a: 1,
        e: "A SQL warehouse (previously 'SQL endpoint') is the compute cluster that runs Databricks SQL queries. Its size and type (including serverless) determine query performance and concurrency.",
        t: "Databricks SQL",
      },
      {
        q: "How do you make a Databricks SQL dashboard interactive so viewers can change a filter value?",
        o: ["Add a query parameter", "Duplicate the dashboard per value", "Use VACUUM", "Enable Photon"],
        a: 0,
        e: "Query parameters expose inputs (dropdowns, date pickers, text) that viewers can change, and the dashboard re-runs with the new value — the standard way to add interactivity.",
        t: "Dashboards",
      },
      {
        q: "What does a Databricks SQL alert do?",
        o: [
          "Automatically fixes failed queries",
          "Runs a query on a schedule and notifies when a condition on the result is met",
          "Compacts small files",
          "Grants table permissions",
        ],
        a: 1,
        e: "An alert periodically runs a query and checks a condition against a returned value (e.g., count > threshold). When the condition is satisfied it sends notifications to configured destinations.",
        t: "Alerts",
      },
      {
        q: "Which visualization is best for showing a single key metric prominently?",
        o: ["Counter", "Scatter plot", "Box plot", "Heatmap"],
        a: 0,
        e: "A Counter visualization displays a single value (optionally vs a target) in large type — ideal for headline KPIs. Scatter/box/heatmap are for distributions and relationships.",
        t: "Visualization",
      },
      {
        q: "An analyst needs a reusable, always-current shaping of data for several dashboards without copying data. What is the best choice?",
        o: ["A CSV export", "A view", "A temp view in one notebook", "A screenshot"],
        a: 1,
        e: "A view stores the query logic and always reflects the latest underlying data, and it's reusable across dashboards. A temp view is session-scoped (not shareable), and CSV exports go stale immediately.",
        t: "Data management",
      },
      {
        q: "Which benefit does query result caching provide?",
        o: [
          "It rewrites the SQL for you",
          "Repeated identical queries return faster without re-executing on the warehouse",
          "It encrypts the results",
          "It creates a Delta table automatically",
        ],
        a: 1,
        e: "Result caching returns previously computed results for identical queries, reducing latency and warehouse load. It's invalidated when underlying data changes.",
        t: "Databricks SQL",
      },
      {
        q: "In the three-level namespace, how does an analyst fully qualify a table?",
        o: ["schema.table", "catalog.schema.table", "warehouse.table", "table only"],
        a: 1,
        e: "Databricks SQL with Unity Catalog uses catalog.schema.table. Fully qualifying avoids ambiguity when multiple catalogs/schemas contain similarly named tables.",
        t: "Governance",
      },
      {
        q: "Which SQL construct improves readability by naming a subquery you reference later in the same statement?",
        o: ["A CTE (WITH clause)", "A GRANT", "A window function", "A VACUUM"],
        a: 0,
        e: "A Common Table Expression (WITH name AS (...)) defines a named, reusable result set within a query, improving readability and letting you reference it multiple times.",
        t: "Querying",
      },
      {
        q: "What is the most appropriate chart to show a trend over time?",
        o: ["Pie chart", "Line chart", "Counter", "Table"],
        a: 1,
        e: "A line chart shows how a measure changes across a continuous dimension like time, making trends and seasonality easy to read. Pie charts show part-to-whole at one point, not trends.",
        t: "Visualization",
      },
      {
        q: "Why might an analyst prefer a serverless SQL warehouse?",
        o: [
          "It stores more data",
          "It starts quickly and autoscales, reducing idle cost and wait time",
          "It disables governance",
          "It guarantees exactly-once streaming",
        ],
        a: 1,
        e: "Serverless SQL warehouses spin up almost instantly and scale with demand, so analysts avoid long cluster start times and pay less for idle compute — ideal for interactive, bursty query workloads.",
        t: "Databricks SQL",
      },
    ],
  },
  /* ====================================================================== */
  {
    slug: "databricks-genai-engineer-associate",
    name: "Databricks Certified Generative AI Engineer Associate",
    issuer: "Databricks",
    level: "Associate",
    blurb:
      "Designing and building production LLM applications: RAG with vector search, prompt design, model selection, chains/agents, evaluation, deployment with Model Serving, and governance on Mosaic AI.",
    examFormat:
      "~45 questions · 90 minutes · scenario-based around RAG and LLM app design · passing ~70%.",
    roadmap: [
      "LLM fundamentals — tokens, context window, temperature, embeddings, and prompt vs completion.",
      "RAG architecture — chunking, embeddings, vector store, retrieval, and grounding the prompt with retrieved context.",
      "Databricks Vector Search — creating indexes, sync from Delta, and similarity queries.",
      "Prompt engineering — instructions, few-shot examples, guardrails, and reducing hallucination.",
      "Chains & agents — composing retrieval + generation (e.g., LangChain), tools, and multi-step reasoning.",
      "Evaluation — groundedness, relevance, correctness; using LLM-as-judge and MLflow evaluation.",
      "Deployment — MLflow model logging, Model Serving endpoints, and Foundation Model APIs.",
      "Governance & safety — Unity Catalog for models/data, PII handling, guardrails, and monitoring.",
    ],
    notes: [
      {
        h: "Retrieval-Augmented Generation",
        points: [
          "RAG grounds an LLM by retrieving relevant documents and injecting them into the prompt, reducing hallucination and enabling up-to-date/proprietary knowledge.",
          "Pipeline: chunk documents → embed chunks → store vectors → embed the query → retrieve top-k similar chunks → build a grounded prompt → generate.",
          "Chunk size/overlap trade off context completeness vs precision and token cost.",
        ],
      },
      {
        h: "Embeddings & vector search",
        points: [
          "Embeddings map text to vectors so semantic similarity becomes vector distance (cosine/dot).",
          "Databricks Vector Search indexes embeddings and can auto-sync from a Delta table (Delta Sync Index).",
          "Retrieval quality depends on the embedding model and chunking, not just the LLM.",
        ],
      },
      {
        h: "Evaluation",
        points: [
          "Key RAG metrics: groundedness/faithfulness (answer supported by context), answer relevance, and context relevance/recall.",
          "LLM-as-a-judge can score responses; MLflow provides evaluation tooling for GenAI.",
        ],
      },
      {
        h: "Deployment & governance",
        points: [
          "Log models with MLflow; serve via Model Serving endpoints; call hosted LLMs via Foundation Model APIs.",
          "Governance: manage models/functions in Unity Catalog, filter PII, and add guardrails; monitor for drift and quality.",
        ],
      },
    ],
    questions: [
      {
        q: "What is the primary benefit of Retrieval-Augmented Generation (RAG)?",
        o: [
          "It fine-tunes the base model automatically",
          "It grounds responses in retrieved, relevant context to reduce hallucination and use current/proprietary data",
          "It removes the need for embeddings",
          "It compresses the model weights",
        ],
        a: 1,
        e: "RAG retrieves relevant documents and adds them to the prompt so the model answers from real, up-to-date, or proprietary content rather than only its training data — reducing hallucination without retraining the model.",
        t: "RAG",
      },
      {
        q: "What are embeddings used for in a RAG system?",
        o: [
          "Encrypting documents",
          "Representing text as vectors so semantic similarity can be measured for retrieval",
          "Compressing the vector store",
          "Formatting the final answer",
        ],
        a: 1,
        e: "Embeddings convert text into numeric vectors where semantically similar text is close together. Retrieval embeds the query and finds the nearest document vectors (e.g., by cosine similarity) to supply as context.",
        t: "Embeddings",
      },
      {
        q: "In a RAG pipeline, why does chunk size matter?",
        o: [
          "Larger chunks are always better",
          "It trades off context completeness against retrieval precision and token cost",
          "It only affects storage",
          "It determines the model temperature",
        ],
        a: 1,
        e: "Chunks that are too large add noise and cost more tokens; too small lose surrounding context. Choosing chunk size/overlap balances retrieval precision, answer completeness, and prompt token budget.",
        t: "RAG",
      },
      {
        q: "Which Databricks feature stores embeddings and can automatically sync from a Delta table?",
        o: ["Delta Live Tables", "Databricks Vector Search (Delta Sync Index)", "Unity Catalog volumes", "Auto Loader"],
        a: 1,
        e: "Databricks Vector Search indexes embeddings for similarity retrieval and offers a Delta Sync Index that keeps the index up to date as the source Delta table changes.",
        t: "Vector Search",
      },
      {
        q: "Which metric measures whether an answer is actually supported by the retrieved context?",
        o: ["Latency", "Groundedness (faithfulness)", "Throughput", "Token count"],
        a: 1,
        e: "Groundedness/faithfulness checks that the generated answer is backed by the retrieved context rather than fabricated. It's a core RAG-quality metric alongside answer relevance and context relevance.",
        t: "Evaluation",
      },
      {
        q: "Lowering an LLM's temperature parameter generally makes output:",
        o: ["More random and creative", "More deterministic and focused", "Longer", "Multilingual"],
        a: 1,
        e: "Lower temperature reduces randomness, making the model pick higher-probability tokens — more deterministic, focused answers. Higher temperature increases diversity/creativity but also the risk of drift.",
        t: "LLM fundamentals",
      },
      {
        q: "A model returns confident but fabricated facts not present in the source documents. The best first mitigation in a RAG app is to:",
        o: [
          "Increase temperature",
          "Improve retrieval and instruct the model to answer only from provided context (and say 'I don't know' otherwise)",
          "Remove the vector store",
          "Switch to a smaller model",
        ],
        a: 1,
        e: "Hallucination in RAG is often a retrieval/prompt problem: ensure relevant context is retrieved and instruct the model to ground answers strictly in that context, abstaining when it's absent. Raising temperature would worsen it.",
        t: "Prompt engineering",
      },
      {
        q: "What does Model Serving provide on Databricks?",
        o: [
          "A notebook scheduler",
          "Real-time REST endpoints to serve models/LLMs for inference",
          "A vector database",
          "A data-quality framework",
        ],
        a: 1,
        e: "Model Serving deploys models (including LLM chains) behind scalable REST endpoints for low-latency inference, integrated with MLflow and Unity Catalog governance.",
        t: "Deployment",
      },
      {
        q: "Which approach adds proprietary, frequently-changing knowledge to an app with the least retraining effort?",
        o: ["Full pre-training", "Fine-tuning weekly", "RAG over a maintained document store", "Prompt-only with no data"],
        a: 2,
        e: "RAG lets you update the knowledge base (documents/index) independently of the model, so new or changing information is available immediately without retraining or fine-tuning.",
        t: "RAG",
      },
      {
        q: "Few-shot prompting means:",
        o: [
          "Training the model on a few GPUs",
          "Including a few worked examples in the prompt to guide the desired output format/behavior",
          "Limiting the response to a few tokens",
          "Using a few retrieval chunks",
        ],
        a: 1,
        e: "Few-shot prompting provides example input→output pairs directly in the prompt so the model infers the pattern and produces consistent, well-formatted responses — without any weight updates.",
        t: "Prompt engineering",
      },
    ],
  },
  /* ====================================================================== */
  {
    slug: "databricks-context-engineer-associate",
    name: "Databricks Certified Context Engineer Associate",
    issuer: "Databricks",
    level: "Associate",
    blurb:
      "Engineering the context that AI systems and agents reason over: assembling and managing context windows, grounding via retrieval, tool/function calling, agent design, memory, and evaluating reliability.",
    examFormat:
      "~45 questions · scenario-based on context assembly, agents and grounding · passing ~70%.",
    roadmap: [
      "Context fundamentals — what the context window is, token budgets, and why 'what you put in the prompt' drives output quality.",
      "Grounding & retrieval — supplying trustworthy, relevant context (RAG) and citing sources.",
      "Context assembly — system vs user vs tool messages, instructions, examples, and ordering/prioritization within the window.",
      "Tools & function calling — letting a model call functions/APIs and feeding results back as context.",
      "Agents — planning, multi-step reasoning, tool orchestration, and when to use an agent vs a single call.",
      "Memory — short-term (conversation) vs long-term (retrieved) memory and summarization to fit the window.",
      "Evaluation & safety — measuring groundedness/relevance, guardrails, PII handling, and monitoring.",
      "Databricks tooling — Vector Search, Mosaic AI Agent Framework, Model Serving, and Unity Catalog governance.",
    ],
    notes: [
      {
        h: "Context engineering",
        points: [
          "Context engineering = deliberately choosing, structuring, and prioritizing what information enters the model's limited context window to get reliable outputs.",
          "The context window is finite (token budget); irrelevant or excessive context adds cost and can crowd out what matters ('lost in the middle').",
          "Order and salience matter: critical instructions/context should be clearly placed and not buried.",
        ],
      },
      {
        h: "Grounding & tools",
        points: [
          "Grounding supplies authoritative context (retrieved docs, tool outputs) so answers are verifiable rather than invented.",
          "Function/tool calling lets the model request an action; the tool's result is returned into the context for the next step.",
          "Cite sources so answers are auditable.",
        ],
      },
      {
        h: "Agents & memory",
        points: [
          "An agent plans and takes multiple steps, calling tools and incorporating results — use when a single prompt can't complete the task.",
          "Short-term memory = the running conversation; long-term memory = external store retrieved as needed.",
          "Summarize or truncate history to stay within the token budget while preserving key facts.",
        ],
      },
      {
        h: "Reliability",
        points: [
          "Evaluate groundedness, relevance, and task success; add guardrails and abstention ('I don't know').",
          "Govern data/models with Unity Catalog; filter PII before it enters context.",
        ],
      },
    ],
    questions: [
      {
        q: "What best describes 'context engineering'?",
        o: [
          "Training a model from scratch",
          "Deliberately selecting, structuring, and prioritizing the information placed in a model's context window for reliable output",
          "Compressing model weights",
          "Choosing GPU hardware",
        ],
        a: 1,
        e: "Context engineering is the practice of curating what goes into the (finite) context window — instructions, retrieved knowledge, tool outputs, examples — and how it's structured, so the model produces accurate, grounded results.",
        t: "Fundamentals",
      },
      {
        q: "Why is the context window a central constraint in context engineering?",
        o: [
          "It limits model accuracy permanently",
          "It is a finite token budget, so irrelevant or excessive context raises cost and can crowd out important information",
          "It only affects latency",
          "It stores the model weights",
        ],
        a: 1,
        e: "The context window holds a limited number of tokens. Filling it with noise increases cost and can bury the critical content ('lost in the middle'), degrading answers — so relevance and prioritization matter.",
        t: "Fundamentals",
      },
      {
        q: "What is the role of tool/function calling in an agentic system?",
        o: [
          "It replaces the LLM",
          "It lets the model invoke external functions/APIs and feed their results back into the context for the next step",
          "It encrypts the prompt",
          "It fine-tunes the model at runtime",
        ],
        a: 1,
        e: "Function calling lets the model request an action (e.g., query a database, call an API); the returned result is inserted into the context so the model can reason over real data in subsequent steps.",
        t: "Tools",
      },
      {
        q: "When is an agent (multi-step, tool-using) more appropriate than a single LLM call?",
        o: [
          "For every request, always",
          "When the task requires planning, multiple steps, or external tools to complete",
          "Only for translation",
          "Never — single calls are always better",
        ],
        a: 1,
        e: "Agents add value when a task can't be solved in one shot — needing planning, iterative reasoning, or calling tools/APIs. For simple, self-contained requests a single call is cheaper and more predictable.",
        t: "Agents",
      },
      {
        q: "What is the difference between short-term and long-term memory in an AI application?",
        o: [
          "There is no difference",
          "Short-term is the running conversation; long-term is an external store retrieved as needed",
          "Short-term is on GPU, long-term on CPU",
          "Long-term memory is the model's weights",
        ],
        a: 1,
        e: "Short-term memory is the recent conversation held in context; long-term memory persists information externally (e.g., a vector store or database) and is retrieved back into context when relevant, overcoming window limits.",
        t: "Memory",
      },
      {
        q: "A long conversation is exceeding the token budget. Which technique preserves key facts while fitting the window?",
        o: [
          "Increase temperature",
          "Summarize earlier turns and keep the summary plus recent messages",
          "Remove the system prompt",
          "Switch to a pie chart",
        ],
        a: 1,
        e: "Summarizing older turns into a compact synopsis (and keeping recent messages verbatim) retains essential context while reducing token usage — a standard memory-management pattern.",
        t: "Memory",
      },
      {
        q: "Why include source citations when grounding an answer?",
        o: [
          "To increase token usage",
          "To make answers verifiable/auditable and build trust",
          "To slow down the model",
          "Citations are not useful in grounding",
        ],
        a: 1,
        e: "Citing the retrieved sources lets users verify claims and makes the system auditable — important for trust, compliance, and debugging grounded/RAG responses.",
        t: "Grounding",
      },
      {
        q: "Placing the most critical instruction in the middle of a very long context can hurt results because of:",
        o: [
          "Token encryption",
          "The 'lost in the middle' effect, where models attend less to mid-context content",
          "Vector drift",
          "Shuffle partitions",
        ],
        a: 1,
        e: "Studies show models often attend most to the beginning and end of long contexts, so important instructions buried in the middle can be under-weighted. Positioning key content prominently improves reliability.",
        t: "Fundamentals",
      },
      {
        q: "Which Databricks capability provides a framework for building and evaluating agents?",
        o: ["Auto Loader", "Mosaic AI Agent Framework", "Delta Live Tables", "Photon"],
        a: 1,
        e: "The Mosaic AI Agent Framework supports building, deploying, and evaluating agentic and RAG applications on Databricks, integrating with Vector Search, Model Serving, and Unity Catalog governance.",
        t: "Databricks tooling",
      },
      {
        q: "Before user data enters an LLM's context, a key governance step is to:",
        o: [
          "Increase the context window",
          "Filter or mask PII and apply access controls",
          "Convert it to Parquet",
          "Raise the temperature",
        ],
        a: 1,
        e: "Sensitive data should be identified and masked/filtered, with access governed (e.g., via Unity Catalog), before being placed in a prompt — preventing leakage of PII into model context or logs.",
        t: "Safety",
      },
    ],
  },
  /* ====================================================================== */
  {
    slug: "microsoft-pl-300",
    name: "Microsoft Power BI Data Analyst Associate (PL-300)",
    issuer: "Microsoft",
    level: "Associate",
    blurb:
      "End-to-end Power BI: preparing data with Power Query, modeling with a star schema and DAX, visualizing and analyzing with reports, and deploying/maintaining with workspaces, RLS, and refresh.",
    examFormat:
      "~40–60 questions incl. case studies · 100 minutes · passing 700/1000 · four skill areas (prepare, model, visualize, deploy).",
    roadmap: [
      "Prepare data (~25%) — connect to sources, Power Query transformations, data profiling, shaping, and query folding.",
      "Model data (~25%) — star schema, relationships & cardinality, DAX measures vs calculated columns, time intelligence.",
      "Visualize & analyze (~25%) — reports, visual selection, formatting, bookmarks, drillthrough, AI visuals.",
      "Deploy & maintain (~15%) — workspaces, apps, scheduled refresh, gateways, and Row-Level Security (RLS).",
      "DAX depth — CALCULATE, filter context vs row context, iterators (SUMX), and time-intelligence functions.",
      "Star schema discipline — fact vs dimension tables, avoiding many-to-many where possible.",
      "Practice case studies under time pressure; know Power BI Service vs Desktop responsibilities.",
    ],
    notes: [
      {
        h: "Data modeling",
        points: [
          "Prefer a star schema: central fact table(s) surrounded by dimension tables; simpler, faster, and DAX-friendly.",
          "Measures are calculated at query time using filter context (good for aggregations); calculated columns are computed at refresh and stored row-by-row.",
          "Relationships: one-to-many is ideal; cross-filter direction is usually single (from dimension to fact).",
        ],
      },
      {
        h: "DAX essentials",
        points: [
          "CALCULATE modifies filter context — the most important DAX function.",
          "Row context (in calculated columns/iterators like SUMX) evaluates row by row; filter context comes from slicers/visuals/CALCULATE.",
          "Time intelligence (TOTALYTD, SAMEPERIODLASTYEAR) requires a marked Date table.",
        ],
      },
      {
        h: "Power Query",
        points: [
          "Transformations are recorded as ordered steps (M language); order matters.",
          "Query folding pushes transformations back to the source for efficiency — preserved by native operations, broken by some custom steps.",
          "Use data profiling (column quality/distribution) to find issues early.",
        ],
      },
      {
        h: "Security & deployment",
        points: [
          "Row-Level Security (RLS): define roles with DAX filters; assign users in the Power BI Service.",
          "Scheduled refresh needs an on-premises data gateway for on-prem sources.",
          "Publish to a workspace; distribute to consumers via an app.",
        ],
      },
    ],
    questions: [
      {
        q: "Which data model design is recommended for Power BI performance and usability?",
        o: ["A single flat table", "A snowflake with deep hierarchies", "A star schema (fact + dimensions)", "Many-to-many everywhere"],
        a: 2,
        e: "A star schema — a central fact table joined to dimension tables — is Microsoft's recommended model. It simplifies relationships, speeds up the VertiPaq engine, and makes DAX and filtering predictable.",
        t: "Modeling",
      },
      {
        q: "What is the key difference between a measure and a calculated column?",
        o: [
          "Measures are stored per row; columns are computed at query time",
          "Measures are computed at query time using filter context; calculated columns are computed at refresh and stored per row",
          "They are identical",
          "Calculated columns cannot use DAX",
        ],
        a: 1,
        e: "Measures evaluate dynamically at query time based on filter context (ideal for aggregations and slicer-responsive KPIs). Calculated columns are evaluated during refresh and physically stored, increasing model size.",
        t: "DAX",
      },
      {
        q: "Which DAX function is used to modify or override filter context?",
        o: ["SUM", "CALCULATE", "RELATED", "FORMAT"],
        a: 1,
        e: "CALCULATE is the cornerstone of DAX — it evaluates an expression in a modified filter context (adding, removing, or overriding filters). Mastering CALCULATE is essential for PL-300.",
        t: "DAX",
      },
      {
        q: "What does query folding do in Power Query?",
        o: [
          "Encrypts the query",
          "Pushes transformation steps back to the source system for efficient processing",
          "Duplicates the data",
          "Converts M to DAX",
        ],
        a: 1,
        e: "Query folding translates applied steps into a single native source query (e.g., SQL) executed at the source, minimizing data transfer and improving refresh performance. Some transformations break folding.",
        t: "Power Query",
      },
      {
        q: "How is Row-Level Security (RLS) implemented in Power BI?",
        o: [
          "By hiding visuals",
          "By defining roles with DAX filter expressions and assigning users to roles",
          "By password-protecting the .pbix",
          "By using bookmarks",
        ],
        a: 1,
        e: "RLS is defined by creating roles with DAX filters on tables (e.g., [Region] = USERPRINCIPALNAME()) in Desktop, then assigning users/groups to those roles in the Power BI Service.",
        t: "Security",
      },
      {
        q: "Which component is required to refresh a dataset that connects to an on-premises SQL Server?",
        o: ["A Power BI app", "An on-premises data gateway", "A calculated table", "A bookmark"],
        a: 1,
        e: "Scheduled refresh against on-premises sources requires an on-premises data gateway to securely bridge the Power BI Service and the local data source.",
        t: "Deployment",
      },
      {
        q: "Which DAX function set requires a properly marked Date table to work correctly?",
        o: ["Text functions", "Time-intelligence functions (e.g., TOTALYTD, SAMEPERIODLASTYEAR)", "Logical functions", "Information functions"],
        a: 1,
        e: "Time-intelligence functions rely on a contiguous, marked Date table to compute periods like YTD or prior-year. Without a proper date dimension they return incorrect results.",
        t: "DAX",
      },
      {
        q: "An iterator like SUMX operates in which context?",
        o: ["Filter context only", "Row context (evaluating expression per row, then aggregating)", "No context", "Visual context only"],
        a: 1,
        e: "SUMX iterates a table row by row (row context), evaluates the expression for each row, then sums the results — useful when the calculation depends on per-row values before aggregation.",
        t: "DAX",
      },
      {
        q: "What is the recommended cross-filter direction for a standard one-to-many dimension→fact relationship?",
        o: ["Both directions by default", "Single (from the dimension to the fact)", "None", "Many-to-many"],
        a: 1,
        e: "Single-direction filtering from the dimension to the fact table is the default best practice. Bidirectional filtering can cause ambiguity and performance issues and should be used sparingly.",
        t: "Modeling",
      },
      {
        q: "Which feature lets report users navigate from a summary visual to a detailed page filtered to the selected item?",
        o: ["Drillthrough", "Query folding", "RLS", "Incremental refresh"],
        a: 0,
        e: "Drillthrough lets a user right-click a data point and jump to a detail page automatically filtered to that context (e.g., from a category to that category's details), improving report exploration.",
        t: "Visualization",
      },
      {
        q: "How do you distribute a finished report to a broad set of business consumers in the Power BI Service?",
        o: [
          "Email the .pbix file",
          "Publish to a workspace and share it as an app",
          "Export to CSV",
          "Screenshot each page",
        ],
        a: 1,
        e: "The governed distribution path is to publish to a workspace and package the content as an app for consumers — providing controlled access, a clean navigation experience, and update management.",
        t: "Deployment",
      },
    ],
  },
  /* ====================================================================== */
  {
    slug: "qlik-sense-data-architect",
    name: "Qlik Sense Data Architect (QSDA 2024)",
    issuer: "Qlik",
    level: "Certification",
    blurb:
      "Data modeling and scripting in Qlik Sense: load scripts, joins/concatenation/mapping, QVDs and incremental load, resolving synthetic keys and circular references, star-schema modeling, and Section Access.",
    examFormat:
      "~50 questions · 120 minutes · scenario-based on data loading and modeling · passing per Qlik scoring.",
    roadmap: [
      "Data connections & loading — LOAD statements, resident loads, and connecting to files/databases.",
      "Associative model — how Qlik associates tables by identically named fields (no explicit joins needed at UI level).",
      "Data model issues — synthetic keys (multiple shared fields) and circular references; how to detect and resolve.",
      "Combining tables — JOIN (inner/left/right/outer), CONCATENATE, Keep, and Mapping (ApplyMap) — and when to use each.",
      "QVDs — creating/reading QVD files, optimized vs unoptimized loads, and incremental load patterns.",
      "Star schema & link tables — modeling multiple fact tables cleanly.",
      "Section Access — data reduction and security by user.",
      "Best practices — key handling, naming, and performance (optimized QVD loads).",
    ],
    notes: [
      {
        h: "Associative model & keys",
        points: [
          "Qlik associates tables automatically on fields with the same name — so field naming is the data model.",
          "A synthetic key is created when two or more tables share two or more fields; usually undesirable — resolve by renaming, removing, or creating a composite key.",
          "A circular reference occurs when tables form a loop of associations; break it by renaming fields or using a link table.",
        ],
      },
      {
        h: "Combining tables",
        points: [
          "CONCATENATE stacks rows (union) — implicit when two loaded tables have identical field sets.",
          "JOIN merges columns on common fields (can multiply rows); use deliberately.",
          "ApplyMap (with a mapping table) is often preferred over JOIN for adding a single lookup value — faster and no row duplication.",
        ],
      },
      {
        h: "QVD & incremental load",
        points: [
          "QVD = Qlik's optimized binary file for fast reads and staging.",
          "Optimized load (no transformations/WHERE on non-indexed fields) is far faster than unoptimized.",
          "Incremental load: load only new/changed records from source, then concatenate with existing QVD (using max modified timestamp / WHERE NOT EXISTS).",
        ],
      },
      {
        h: "Section Access",
        points: [
          "Section Access secures data by user, reducing what each user can see (row-level security).",
          "Fields are typically uppercase; reductions match the logged-in user to allowed values.",
        ],
      },
    ],
    questions: [
      {
        q: "In Qlik, how are two tables associated?",
        o: [
          "By explicit JOIN keys defined in the UI",
          "Automatically on fields that share the same name",
          "By row order",
          "They cannot be associated",
        ],
        a: 1,
        e: "Qlik's associative engine links tables automatically through fields that have identical names. This means field naming effectively defines the data model — a core concept for the QSDA exam.",
        t: "Associative model",
      },
      {
        q: "What causes a synthetic key?",
        o: [
          "A single shared field between two tables",
          "Two or more tables sharing two or more fields in common",
          "Loading a QVD",
          "Using ApplyMap",
        ],
        a: 1,
        e: "A synthetic key is auto-generated when two (or more) tables share two or more fields. It's usually undesirable; resolve by renaming fields, removing redundant ones, or building an explicit composite key.",
        t: "Data model",
      },
      {
        q: "Which approach is generally preferred to add a single lookup value without duplicating rows?",
        o: ["JOIN", "CONCATENATE", "ApplyMap with a mapping table", "CROSS TABLE"],
        a: 2,
        e: "ApplyMap uses a mapping table to look up a value key-by-key — it never multiplies rows and is typically faster than a JOIN for adding one field. JOIN can unintentionally duplicate rows if the key isn't unique.",
        t: "Combining tables",
      },
      {
        q: "What is the benefit of an 'optimized' QVD load?",
        o: [
          "It applies more transformations",
          "It reads the QVD directly into memory with minimal processing, making it much faster",
          "It encrypts the data",
          "It resolves synthetic keys automatically",
        ],
        a: 1,
        e: "An optimized QVD load happens when data is read essentially as-is (no transformations, no WHERE on non-indexed fields). Qlik streams it into memory very quickly. Adding transformations breaks optimization (unoptimized, slower).",
        t: "QVD",
      },
      {
        q: "A circular reference in a Qlik data model is best resolved by:",
        o: [
          "Deleting all tables",
          "Renaming fields to break the loop or introducing a link table",
          "Adding more synthetic keys",
          "Using CONCATENATE",
        ],
        a: 1,
        e: "Circular references (a loop of associations) create ambiguity. Resolve by renaming/qualifying fields to break the loop or by restructuring with a link table so associations are unambiguous.",
        t: "Data model",
      },
      {
        q: "Which statement stacks rows from two tables with the same fields into one table?",
        o: ["JOIN", "CONCATENATE", "KEEP", "MAPPING LOAD"],
        a: 1,
        e: "CONCATENATE appends the rows of one table to another (a union). Qlik even does this implicitly (auto-concatenate) when two loaded tables have identical field sets.",
        t: "Combining tables",
      },
      {
        q: "In an incremental load, how do you typically load only new or changed records?",
        o: [
          "Reload everything each time",
          "Filter the source by a modification timestamp greater than the last load, then concatenate with the existing QVD",
          "Use Section Access",
          "Use a pie chart",
        ],
        a: 1,
        e: "Incremental load queries the source for records changed since the last run (e.g., WHERE ModifiedDate >= last max), then concatenates with the stored QVD (handling updates/deletes as needed) — minimizing load time.",
        t: "Incremental load",
      },
      {
        q: "What does Section Access provide?",
        o: [
          "Faster chart rendering",
          "User-based data reduction / row-level security",
          "Automatic joins",
          "QVD compression",
        ],
        a: 1,
        e: "Section Access controls which data each user can see by matching the authenticated user to permitted field values, reducing the dataset per user — Qlik's row-level security mechanism.",
        t: "Security",
      },
      {
        q: "A 'resident' load in Qlik script means loading from:",
        o: [
          "An external database",
          "A table already loaded in memory during the same script",
          "A QVD file only",
          "A web API",
        ],
        a: 1,
        e: "LOAD ... RESIDENT <table> reads from a table already in memory (loaded earlier in the script), useful for further transformation, aggregation, or ordering without re-reading the source.",
        t: "Scripting",
      },
      {
        q: "Which is a valid reason to use a link table in a multi-fact model?",
        o: [
          "To create synthetic keys intentionally",
          "To connect multiple fact tables to shared dimensions without circular references or synthetic keys",
          "To encrypt the model",
          "To replace QVDs",
        ],
        a: 1,
        e: "A link table consolidates the shared key combinations from multiple fact tables so they associate to common dimensions cleanly — avoiding synthetic keys and circular references in multi-fact models.",
        t: "Modeling",
      },
    ],
  },
  /* ====================================================================== */
  {
    slug: "qlik-sense-business-analyst",
    name: "Qlik Sense Business Analyst (QSBA)",
    issuer: "Qlik",
    level: "Certification",
    blurb:
      "Designing effective Qlik Sense apps: choosing visualizations, building dimensions/measures and master items, writing set-analysis expressions, and applying UX best practices and storytelling.",
    examFormat:
      "~50 questions · 120 minutes · scenario-based on app design and analysis · passing per Qlik scoring.",
    roadmap: [
      "Requirements & app design — translating business questions into sheets, KPIs, and navigation.",
      "Dimensions vs measures — dimensions group data (categorical); measures aggregate (Sum, Count, Avg).",
      "Visualization selection — choose the right chart for the question (trend, comparison, part-to-whole, distribution).",
      "Master items — reusable dimensions, measures, and visualizations for consistency and governance.",
      "Set analysis — expression-level selections that override or modify the current selection state.",
      "Selections & filtering — selection states (green/white/grey) and filter panes.",
      "Storytelling & dashboards — snapshots, stories, and layout best practices.",
      "Accessibility & performance — clean, focused sheets that answer decisions.",
    ],
    notes: [
      {
        h: "Dimensions & measures",
        points: [
          "Dimension = the 'by what' (categorical field you group/slice by).",
          "Measure = an aggregation expression (Sum(Sales), Count(distinct Customer)).",
          "Master items store approved dimensions/measures/visuals so every designer uses consistent definitions.",
        ],
      },
      {
        h: "Set analysis",
        points: [
          "Set analysis defines a set of records for an aggregation independent of current selections: Sum({<Year={2024}>} Sales).",
          "$ = current selection; 1 = all records ignoring selection. Modifiers in <> add/override field selections.",
          "Common pattern: year-over-year, % of total, or 'ignore this filter' calculations.",
        ],
      },
      {
        h: "Selection states",
        points: [
          "Green = selected; White = possible (associated) values; Grey = excluded (not associated).",
          "The associative model shows what's related and what's excluded after a selection — a key analysis feature.",
        ],
      },
      {
        h: "Visualization choice",
        points: [
          "Line for trends over time; bar for category comparison; combo for measure + rate; KPI for headline numbers; pie sparingly for part-to-whole.",
          "Keep sheets focused: lead with the decision, avoid clutter.",
        ],
      },
    ],
    questions: [
      {
        q: "In Qlik Sense, which is a dimension rather than a measure?",
        o: ["Sum(Sales)", "Product Category", "Avg(Price)", "Count(OrderID)"],
        a: 1,
        e: "A dimension is a categorical field you group or slice by — 'Product Category'. Measures are aggregation expressions like Sum(Sales), Avg(Price), or Count(OrderID).",
        t: "Fundamentals",
      },
      {
        q: "What is the main benefit of master items?",
        o: [
          "They speed up data loading",
          "They provide reusable, governed definitions of dimensions/measures/visuals for consistency",
          "They encrypt the app",
          "They replace set analysis",
        ],
        a: 1,
        e: "Master items centralize approved definitions (e.g., one official 'Revenue' measure) so all sheets and designers reuse the same logic — ensuring consistency and easier maintenance.",
        t: "Master items",
      },
      {
        q: "What does the set-analysis expression Sum({<Year={2024}>} Sales) return?",
        o: [
          "Sales for the current selection only",
          "Sales for Year 2024 regardless of the current Year selection",
          "All sales ever",
          "An error",
        ],
        a: 1,
        e: "The set modifier <Year={2024}> overrides the Year selection so the aggregation returns 2024 sales even if the user has selected a different year — a core set-analysis pattern for fixed comparisons.",
        t: "Set analysis",
      },
      {
        q: "In set analysis, what does the identifier '1' represent (e.g., Sum({1} Sales))?",
        o: [
          "The current selection",
          "The full set of all records, ignoring current selections",
          "Only the first row",
          "The previous year",
        ],
        a: 1,
        e: "'1' represents all records in the app ignoring any selections, while '$' represents the current selection. Sum({1} Sales) gives the grand total regardless of what the user has filtered.",
        t: "Set analysis",
      },
      {
        q: "After a selection, what does a GREY value indicate in Qlik's associative model?",
        o: ["It is selected", "It is an associated possible value", "It is excluded (not associated with the selection)", "It is a calculated field"],
        a: 2,
        e: "Grey = excluded: values not associated with the current selection. Green = selected values; White = possible (still-associated) values. This color logic reveals relationships and gaps in the data.",
        t: "Selections",
      },
      {
        q: "Which visualization best shows a single headline KPI against a target?",
        o: ["Scatter plot", "KPI object", "Filter pane", "Treemap"],
        a: 1,
        e: "The KPI object displays one or two key measures prominently (optionally with conditional colors vs a target) — ideal for headline metrics at the top of a sheet.",
        t: "Visualization",
      },
      {
        q: "To compare a measure across many categories, which chart is most appropriate?",
        o: ["Pie chart", "Bar chart", "Line chart", "Gauge"],
        a: 1,
        e: "A bar chart is best for comparing a measure across discrete categories — lengths are easy to compare. Pie charts become unreadable with many categories, and lines imply continuity/trend.",
        t: "Visualization",
      },
      {
        q: "What is a Qlik Sense 'story' used for?",
        o: [
          "Loading data incrementally",
          "Presenting insights via snapshots and narrative slides built from app visualizations",
          "Defining Section Access",
          "Creating QVDs",
        ],
        a: 1,
        e: "Stories let analysts capture snapshots of visualizations and assemble them into a guided, presentation-style narrative to communicate insights to stakeholders.",
        t: "Storytelling",
      },
      {
        q: "A user wants '% of total' that ignores the current category selection. Which technique is required?",
        o: ["A calculated dimension", "Set analysis to control the aggregation's selection scope", "A QVD load", "Section Access"],
        a: 1,
        e: "Computing a percentage of an unfiltered or differently-filtered total requires set analysis (e.g., using {1} or a modified set) so the denominator ignores or overrides the current selection.",
        t: "Set analysis",
      },
      {
        q: "Which is a UX best practice for a Qlik Sense sheet?",
        o: [
          "Put every available measure on one sheet",
          "Lead with the key decision/metric and keep the sheet focused and uncluttered",
          "Avoid master items",
          "Use only pie charts",
        ],
        a: 1,
        e: "Effective sheets are focused: surface the most important metrics first, group related content, and avoid clutter so users can make decisions quickly. Overloading a sheet harms comprehension.",
        t: "App design",
      },
    ],
  },
  /* ====================================================================== */
  {
    slug: "qlikview-12-data-architect",
    name: "QlikView 12 Data Architect (QV12DA)",
    issuer: "Qlik",
    level: "Certification",
    blurb:
      "Data architecture in QlikView: load scripting, data modeling and key handling, QVDs and incremental load, resolving synthetic keys/circular references, Section Access, and performance optimization.",
    examFormat:
      "~50 questions · 120 minutes · scenario-based on QlikView scripting and modeling · passing per Qlik scoring.",
    roadmap: [
      "Script editor & loading — LOAD statements, tabs, connecting to sources, and the reload process.",
      "Associative model — QlikView associates on identically named fields (same engine as Qlik Sense).",
      "Data model quality — synthetic keys and circular references: detection and resolution.",
      "Combining data — JOIN, CONCATENATE, KEEP, and Mapping/ApplyMap.",
      "QVD layer — staging with QVDs, optimized vs unoptimized loads, and incremental loading strategies.",
      "Section Access — securing and reducing data by user (uppercase fields, ACCESS levels).",
      "Performance — optimized loads, avoiding synthetic keys, reducing distinct values in keys.",
      "Star schema and link tables for multi-fact models.",
    ],
    notes: [
      {
        h: "Model quality",
        points: [
          "Same associative engine as Qlik Sense: tables link on identically named fields.",
          "Synthetic keys arise when tables share 2+ fields; resolve by renaming/combining keys.",
          "Circular references form association loops; break them with renaming or a link table.",
        ],
      },
      {
        h: "QVD & incremental",
        points: [
          "QVDs stage data for speed and reuse; optimized loads (no transforms/most WHEREs) are fastest.",
          "Incremental load: pull only changed rows from source, then concatenate with existing QVD, handling inserts/updates/deletes.",
        ],
      },
      {
        h: "Section Access",
        points: [
          "Defined in script with fields like ACCESS, USERID/NTNAME, and reduction fields (typically uppercase).",
          "ADMIN vs USER access levels; strict/initial reduction controls what data each user sees.",
        ],
      },
      {
        h: "Combining tables",
        points: [
          "CONCATENATE = union of rows; JOIN = merge columns (can duplicate rows); KEEP = like a join but keeps tables separate, reducing to the intersection/one side.",
          "ApplyMap adds a single looked-up value without row duplication.",
        ],
      },
    ],
    questions: [
      {
        q: "In QlikView, tables are associated based on:",
        o: ["Primary keys defined in a UI", "Fields with identical names", "Load order", "Bookmark settings"],
        a: 1,
        e: "QlikView uses the same associative engine as Qlik Sense — tables associate automatically on fields sharing the same name. Field naming drives the model.",
        t: "Associative model",
      },
      {
        q: "Which situation produces a synthetic key?",
        o: [
          "Tables share exactly one field",
          "Tables share two or more fields",
          "A QVD is loaded",
          "ApplyMap is used",
        ],
        a: 1,
        e: "When two or more tables share two or more field names, QlikView builds a synthetic key table to manage the composite association. It's usually undesirable and resolved by renaming or explicitly combining keys.",
        t: "Data model",
      },
      {
        q: "What distinguishes KEEP from JOIN in QlikView?",
        o: [
          "KEEP merges tables into one; JOIN keeps them separate",
          "KEEP keeps the tables separate but reduces them like a join; JOIN merges into a single table",
          "They are identical",
          "KEEP only works on QVDs",
        ],
        a: 1,
        e: "JOIN physically merges two tables into one. KEEP performs the same record-matching reduction (inner/left/right) but leaves the two tables as separate tables in the model — useful to reduce data without merging columns.",
        t: "Combining tables",
      },
      {
        q: "An optimized QVD load is broken when you:",
        o: [
          "Load the QVD as-is",
          "Add transformations or a WHERE clause on a non-indexed field",
          "Rename the QVD file",
          "Store it to disk",
        ],
        a: 1,
        e: "Optimized loads read the QVD nearly directly into memory. Applying transformations, new fields, or WHERE conditions (except a single WHERE EXISTS on one field) forces an unoptimized, slower load.",
        t: "QVD",
      },
      {
        q: "In Section Access, reduction fields are conventionally written in:",
        o: ["lowercase", "UPPERCASE", "camelCase", "any case — it doesn't matter"],
        a: 1,
        e: "Section Access matching is case-sensitive and conventionally uses UPPERCASE for fields and values (e.g., USERID, NTNAME, and the reduction field) to ensure reliable matching against authenticated users.",
        t: "Security",
      },
      {
        q: "A circular reference is best resolved by:",
        o: [
          "Adding another shared field",
          "Renaming fields to break the loop or introducing a link table",
          "Deleting Section Access",
          "Switching to an unoptimized load",
        ],
        a: 1,
        e: "Circular references (association loops) create ambiguity. Break the loop by renaming/qualifying fields or restructuring with a link table so the model resolves associations unambiguously.",
        t: "Data model",
      },
      {
        q: "The primary purpose of staging data in QVD files is:",
        o: [
          "To encrypt data",
          "Fast reuse/reload and enabling incremental loads",
          "To create charts",
          "To define Section Access",
        ],
        a: 1,
        e: "QVDs store data in Qlik's optimized binary format for very fast reloads and reuse across apps, and they underpin incremental-load architectures that avoid reloading all source data each time.",
        t: "QVD",
      },
      {
        q: "To add a single lookup value to a large fact table without duplicating rows, use:",
        o: ["Outer JOIN", "ApplyMap with a mapping table", "CONCATENATE", "A synthetic key"],
        a: 1,
        e: "ApplyMap performs a key-based lookup that returns one value per row and never multiplies rows, making it faster and safer than a JOIN for enriching a fact table with a single field.",
        t: "Combining tables",
      },
      {
        q: "In an incremental load, records that were updated at source are typically handled by:",
        o: [
          "Ignoring them",
          "Loading changed rows and removing superseded rows (e.g., WHERE NOT EXISTS on the key) before concatenating",
          "Reloading the whole source",
          "Using a gauge chart",
        ],
        a: 1,
        e: "For updates, you load the new/changed rows and exclude the old versions from the stored QVD (commonly a WHERE NOT EXISTS on the primary key) so the concatenated result reflects current values without duplicates.",
        t: "Incremental load",
      },
      {
        q: "Which practice improves QlikView data-model performance?",
        o: [
          "Maximizing distinct values in key fields",
          "Removing synthetic keys and keeping key fields low-cardinality where possible",
          "Adding circular references",
          "Avoiding QVDs",
        ],
        a: 1,
        e: "Clean keys matter: eliminating synthetic keys, reducing unnecessary distinct key values, and using optimized QVD loads all reduce memory use and speed up reloads and calculations.",
        t: "Performance",
      },
    ],
  },
  /* ====================================================================== */
  {
    slug: "qlikview-12-business-analyst",
    name: "QlikView 12 Business Analyst (QVBA)",
    issuer: "Qlik",
    level: "Certification",
    blurb:
      "Building analysis in QlikView: chart and expression design, set analysis, aggregation functions including Aggr(), drill-down/cyclic groups, list boxes and bookmarks, and UI/UX best practices.",
    examFormat:
      "~50 questions · 120 minutes · scenario-based on chart building and expressions · passing per Qlik scoring.",
    roadmap: [
      "Requirements to design — turning business questions into charts and layouts.",
      "Dimensions & expressions — building measures with aggregation functions (Sum, Count, Avg, Min/Max).",
      "Set analysis — modifying selection scope inside expressions for comparisons and % of total.",
      "Advanced aggregation — Aggr() for calculating over a virtual dimension, and Total qualifier.",
      "Groups — drill-down groups (hierarchical) vs cyclic groups (switch dimensions).",
      "UI objects — list boxes, multi boxes, current selections, and bookmarks.",
      "Chart selection — right visualization for the analytical question.",
      "UX best practices — clarity, focused dashboards, and guided analysis.",
    ],
    notes: [
      {
        h: "Expressions & aggregation",
        points: [
          "Chart measures are aggregation expressions evaluated per dimension value: Sum(Sales), Count(distinct Customer).",
          "The TOTAL qualifier ignores chart dimensions (e.g., Sum(TOTAL Sales) gives the overall total for % calculations).",
          "Aggr(expression, dimension) computes an inner aggregation over a virtual dimension — used for nested/advanced calcs like averaging a per-customer total.",
        ],
      },
      {
        h: "Set analysis",
        points: [
          "Same syntax as Qlik Sense: Sum({<Year={2024}>} Sales); $ = current selection, 1 = all records.",
          "Used for year-over-year, fixed baselines, and percentage-of-total measures.",
        ],
      },
      {
        h: "Groups",
        points: [
          "Drill-down group: hierarchical (e.g., Year→Quarter→Month) — the chart drills as the user selects.",
          "Cyclic group: lets the user cycle among unrelated dimensions in the same chart slot.",
        ],
      },
      {
        h: "UI objects",
        points: [
          "List boxes show a field's values and selection state (green/white/grey).",
          "Bookmarks save a set of selections to recall later; Current Selections box shows active filters.",
        ],
      },
    ],
    questions: [
      {
        q: "What does the TOTAL qualifier do in Sum(TOTAL Sales) within a chart?",
        o: [
          "Sums only the current row",
          "Ignores the chart's dimensions and returns the overall total",
          "Applies Section Access",
          "Creates a synthetic key",
        ],
        a: 1,
        e: "TOTAL disregards the chart's dimensions so the expression returns the grand total across all dimension values — commonly used as the denominator in a percentage-of-total measure (Sum(Sales)/Sum(TOTAL Sales)).",
        t: "Aggregation",
      },
      {
        q: "When would you use the Aggr() function?",
        o: [
          "To load a QVD",
          "To compute an aggregation over a virtual dimension, then aggregate that result (nested aggregation)",
          "To define Section Access",
          "To create a bookmark",
        ],
        a: 1,
        e: "Aggr() builds an intermediate array by evaluating an expression across a specified dimension, which you then aggregate — e.g., Avg(Aggr(Sum(Sales), Customer)) gives the average per-customer sales. It's the tool for nested/advanced calculations.",
        t: "Advanced aggregation",
      },
      {
        q: "What is the difference between a drill-down group and a cyclic group?",
        o: [
          "They are identical",
          "Drill-down is hierarchical (Year→Quarter→Month); cyclic lets users switch among unrelated dimensions",
          "Cyclic groups are for loading data",
          "Drill-down groups only work in list boxes",
        ],
        a: 1,
        e: "A drill-down group navigates a hierarchy level by level as the user selects. A cyclic group lets the user rotate among different, unrelated dimensions in the same chart dimension slot.",
        t: "Groups",
      },
      {
        q: "Which expression correctly computes each category's share of the overall total?",
        o: [
          "Sum(Sales)/Sum(Sales)",
          "Sum(Sales)/Sum(TOTAL Sales)",
          "Sum(TOTAL Sales)/Sum(Sales)",
          "Avg(Sales)",
        ],
        a: 1,
        e: "Sum(Sales) is evaluated per dimension value while Sum(TOTAL Sales) ignores the dimension, so their ratio gives each category's percentage of the overall total.",
        t: "Aggregation",
      },
      {
        q: "What does a bookmark store in QlikView?",
        o: [
          "A chart image",
          "A saved set of selections that can be recalled later",
          "A QVD file",
          "A data model",
        ],
        a: 1,
        e: "A bookmark captures the current selection state so users can return to a specific analysis context later — useful for saved views and sharing a particular filtered perspective.",
        t: "UI objects",
      },
      {
        q: "Set analysis expression Sum({<Region=>} Sales) does what to the Region selection?",
        o: [
          "Keeps only the selected Region",
          "Clears/ignores the Region selection for this aggregation",
          "Doubles the Region values",
          "Causes an error",
        ],
        a: 1,
        e: "An empty set modifier <Region=> removes the selection on Region for that expression, so it aggregates across all regions regardless of what's currently selected — handy for 'ignore this filter' measures.",
        t: "Set analysis",
      },
      {
        q: "Which chart is most suitable for showing the trend of sales over months?",
        o: ["Pie chart", "Line chart", "Gauge", "Straight table sorted by name"],
        a: 1,
        e: "A line chart best conveys change over a continuous time dimension, making trends and seasonality clear. Pie and gauge charts don't show change over time.",
        t: "Visualization",
      },
      {
        q: "In a list box, a value shown in white after a selection means it is:",
        o: ["Selected", "Associated/possible with the current selection", "Excluded", "Calculated"],
        a: 1,
        e: "White = possible: the value is still associated with the current selection. Green = selected, grey = excluded. This associative feedback guides users through the data.",
        t: "Selections",
      },
      {
        q: "To display a measure that always shows last year's value next to the current selection, you would use:",
        o: ["A drill-down group", "Set analysis with a year modifier", "A bookmark", "An optimized QVD load"],
        a: 1,
        e: "Set analysis lets you fix or shift the year within the expression (e.g., <Year={$(=Max(Year)-1)}>) so a measure reflects last year independent of the user's current selection — the standard approach for period comparisons.",
        t: "Set analysis",
      },
      {
        q: "A dashboard is cluttered and users struggle to find insights. The best improvement is to:",
        o: [
          "Add more charts to every sheet",
          "Focus each sheet on key questions, reduce clutter, and guide the analysis",
          "Remove all list boxes",
          "Switch every chart to a table",
        ],
        a: 1,
        e: "Good QlikView UX prioritizes clarity: focus sheets on the decisions users need, minimize clutter, and guide analysis with clear structure and selection objects — improving comprehension and adoption.",
        t: "UX",
      },
    ],
  },
];

/* Merge additional question batches (expansion toward ~100 per cert). */
const extraBanks = [extraQuestions, extraQuestions2, extraQuestions3, extraQuestions4, extraQuestions5, extraQuestions6, extraQuestions7];
for (const m of studyModules) {
  for (const bank of extraBanks) {
    const extra = bank[m.slug];
    if (extra && extra.length) m.questions.push(...extra);
  }
  const meta = studyMeta[m.slug];
  if (meta) {
    m.about = meta.about;
    m.usage = meta.usage;
    m.image = meta.image ?? `${import.meta.env.BASE_URL}study/${m.slug}.svg`;
    m.images = [
      `${import.meta.env.BASE_URL}study/${m.slug}.svg`,
      `${import.meta.env.BASE_URL}study/${m.slug}-plain.svg`,
    ];
  }
  const meta2 = studyMeta2[m.slug];
  if (meta2) {
    m.layman = meta2.layman;
    m.tips = meta2.tips;
  }
  const projs = studyProjects[m.slug];
  if (projs) m.projects = projs;
}
