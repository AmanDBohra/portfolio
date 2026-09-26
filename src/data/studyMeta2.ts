/* -------------------------------------------------------------------------- */
/*  STUDY HUB — PER-CERT LAYMAN EXPLANATIONS + EXAM SHORTCUT TRICKS            */
/* -------------------------------------------------------------------------- */

import type { CertMeta2 } from "./study";

export const studyMeta2: Record<string, CertMeta2> = {
  "databricks-data-engineer-associate": {
    layman: [
      "Think of a restaurant kitchen. Raw ingredients arrive (Bronze), you wash and chop them (Silver), then plate finished dishes (Gold). That's the medallion architecture — data gets cleaner and more useful at each stage.",
      "Delta Lake is like Google Docs for data: every change is saved with history, you can undo to any earlier version (time travel), and two people editing won't corrupt the file (ACID).",
      "A 'managed' table is like a pet you own — if you get rid of it, it's gone (drop = data deleted). An 'external' table is like a rented apartment — you leave, but the building (the files) stays.",
      "Auto Loader is a mailbox that notices new letters (files) the moment they arrive and only reads the new ones — it never re-reads yesterday's mail.",
    ],
    tips: [
      "Managed vs external: LOCATION keyword = external (drop keeps files). No LOCATION = managed (drop deletes files). This distinction is asked constantly.",
      "OPTIMIZE = fewer, bigger files (fix small files). ZORDER = sort so filters skip data. VACUUM = permanently delete old files. Don't mix them up.",
      "Auto Loader = huge/continuous file volumes; COPY INTO = smaller/known batches. Both are idempotent (safe to re-run).",
      "Unity Catalog is always three levels: catalog.schema.table. To READ you need USE CATALOG + USE SCHEMA + SELECT — a missing traversal grant is a classic trick answer.",
      "MERGE = upsert (insert + update + delete in one go). If a question says 'insert new and update existing,' the answer is almost always MERGE.",
      "Job cluster = scheduled/automated (cheap, dies after). All-purpose cluster = interactive notebooks. Pick job cluster for pipelines.",
      "Time travel works only until VACUUM removes the old files (default 7-day retention). 'Why can't I time travel that far back?' → VACUUM.",
    ],
  },
  "databricks-data-engineer-professional": {
    layman: [
      "If the Associate is learning to drive, the Professional is defensive driving in traffic: same car, but now you handle streaming rush-hour, breakdowns (retries), and passengers' safety (governance).",
      "Change Data Feed is a security camera that records exactly what changed — which rows were added, edited, or removed — so downstream systems copy only the changes instead of redoing everything.",
      "SCD Type 2 is keeping every version of your address on file with move-in/move-out dates, so you can answer 'where did they live in 2021?'. Type 1 just overwrites — no history.",
      "A watermark is a 'we stop waiting for latecomers after X minutes' rule, so the system doesn't hold the door open forever (unbounded state).",
    ],
    tips: [
      "'Propagate only changes downstream' → Change Data Feed (CDF). 'Keep full history of a dimension' → SCD Type 2. These two keywords map directly to answers.",
      "Streaming reliability trio: checkpoint (resume/exactly-once), watermark (bound state for late data), trigger (how often). Know what each fixes.",
      "Trigger.AvailableNow = process everything available then stop (scheduled batch on a streaming source). Continuous = always on, low latency.",
      "Deletion vectors / merge-on-read = fast updates without rewriting whole files; OPTIMIZE later materializes them. Great for 'why is UPDATE slow / how to speed it up.'",
      "Idempotency = safe reruns. Achieve with MERGE on a key or txnAppId/txnVersion in foreachBatch.",
      "Security: dynamic views / Unity Catalog row filters + column masks for row/column security; VACUUM to physically erase deleted data (GDPR).",
      "Deploy the grown-up way: Git + CI tests + Databricks Asset Bundles (per-environment variables). 'Promote dev→prod as code' = Asset Bundles.",
    ],
  },
  "databricks-apache-spark-developer": {
    layman: [
      "Spark is a team of chefs (executors) with one head chef (driver). The head chef plans the menu and hands out tasks; the chefs cook in parallel. You (the code) just describe the dish.",
      "Transformations are writing a recipe; nothing cooks until you say 'serve it' (an action like count/collect/write). That's 'lazy evaluation'.",
      "A shuffle is everyone swapping ingredients across the kitchen so all the tomatoes end up at one station — expensive. Narrow steps (chop your own veg) need no swapping; wide steps (group by) do.",
      "A broadcast join is photocopying a tiny recipe card for every chef instead of making everyone line up at one printer — avoids the big line (shuffle).",
    ],
    tips: [
      "Action vs transformation: if it RETURNS a result to you (count, collect, show, take, write) it's an action and triggers execution. Everything else is lazy.",
      "Wide = shuffle = new stage: groupBy, join, distinct, repartition, orderBy. Narrow = no shuffle: select, filter, map, withColumn.",
      "repartition = full shuffle, up OR down, balanced. coalesce = no full shuffle, DOWN only. 'Reduce partitions cheaply' = coalesce.",
      "One partition = one task. Job → Stage(s) at shuffles → Task(s) per partition. Memorize this hierarchy.",
      "Small table in a join? Broadcast it. Skewed key? Salt it or let AQE handle skew.",
      "Avoid collect()/toPandas() on big data (driver OOM). Use count/take/show or write out.",
      "Python UDFs are slow (serialization, no Catalyst). Prefer built-in functions; the 'why is this slow' answer is often 'it's a UDF.'",
    ],
  },
  "databricks-data-analyst-associate": {
    layman: [
      "A SQL warehouse is the engine that runs your queries — like the horsepower of a car. Bigger warehouse = faster/more concurrent, but costs more.",
      "A view is a saved question, not a saved answer — it re-asks the data every time, so it's always current. A copied table is a saved answer that can go stale.",
      "An alert is a smoke detector for your data: it runs a query on a schedule and beeps (notifies) when a number crosses a line you set.",
      "A dashboard parameter is a knob viewers can turn (pick a date, a region) so one dashboard answers many questions.",
    ],
    tips: [
      "WHERE filters rows BEFORE grouping; HAVING filters groups AFTER aggregation (can use SUM/COUNT). Mixing these up is a classic trap.",
      "Window functions (ROW_NUMBER/RANK/LAG/LEAD OVER ...) rank or compare rows WITHOUT collapsing them — the go-to for 'top N per group' and 'vs previous period.'",
      "Counter/KPI visual = one headline number. Line = trend over time. Bar = compare categories. Scatter = relationship. Pick by the question.",
      "COUNT(*) counts all rows; COUNT(col) skips nulls; COUNT(DISTINCT col) = unique. Read carefully which one the question wants.",
      "Guard division with NULLIF (x / NULLIF(y,0)) to avoid divide-by-zero.",
      "Serverless SQL warehouse = starts fast, autoscales — the answer for 'reduce wait time / idle cost.'",
      "Alerts = notify on a condition; scheduled refresh = keep data current. Don't confuse the two.",
    ],
  },
  "databricks-genai-engineer-associate": {
    layman: [
      "RAG is an open-book exam for the AI: instead of answering from memory (and guessing), it first looks up the relevant page (retrieval) and answers from what it found — far fewer made-up answers.",
      "Embeddings turn text into coordinates on a map, so 'car' and 'automobile' sit close together. Retrieval just finds the nearest neighbors to your question.",
      "Chunking is tearing a book into index cards so you can grab just the right few cards instead of hauling the whole book into the prompt.",
      "Temperature is the AI's creativity dial: low = careful and predictable (facts), high = imaginative (brainstorming).",
    ],
    tips: [
      "Hallucination in RAG is usually a RETRIEVAL problem: fix chunking/embeddings/retrieval and tell the model 'answer only from context, else say I don't know.' Raising temperature makes it WORSE.",
      "RAG quality = 3 metrics: context relevance (did we fetch the right stuff?), groundedness (is the answer supported?), answer relevance (did it address the question?).",
      "Fine-tuning = teach STYLE/behavior (permanent). RAG = supply fresh/proprietary FACTS (no retraining). 'Frequently changing knowledge' → RAG.",
      "Query and documents must use the SAME embedding model (and dimension) — a favorite trick answer.",
      "Exact terms/acronyms failing? Add hybrid (keyword + semantic) search.",
      "Retrieve broad, then RE-RANK to a precise few — better than a huge top-k that adds noise.",
      "Lower temperature (near 0) for factual/deterministic; higher for creative. Cap max_tokens to control length/cost.",
    ],
  },
  "databricks-context-engineer-associate": {
    layman: [
      "The context window is the AI's desk: only so much fits. Context engineering is deciding which papers to put on the desk — and where — so it does its best work.",
      "'Lost in the middle': like a long email, people read the top and bottom closely and skim the middle. Put the important instructions where they'll be seen.",
      "A tool call is the AI asking an assistant to go fetch something (look up a price, run a calculation) and bringing the answer back to the desk.",
      "An agent is the AI working as a project manager: plan, do a step, check the result, do the next step — instead of answering in one breath.",
    ],
    tips: [
      "More context is NOT better. Relevant, concise context beats dumping everything (cost + 'lost in the middle').",
      "Put critical instructions at the start/end and clearly separate untrusted content (retrieved/user text) as DATA, not commands — this blocks prompt injection.",
      "Single LLM call for simple asks; agent only when the task needs planning/tools/multiple steps. Don't over-engineer.",
      "Manage long chats by summarizing old turns + keeping recent ones (fits the token budget).",
      "Ground + cite sources = trust and auditability. Tell the model to abstain when unsure.",
      "Give agents FEW, clearly-described tools (not many overlapping ones) and typed schemas → reliable tool selection.",
      "Bound agents: max steps, stop conditions, confirmations for risky/irreversible actions.",
    ],
  },
  "microsoft-pl-300": {
    layman: [
      "Power Query is the kitchen prep: clean and shape the raw data. The model is the recipe (tables + relationships + DAX). The report is the plated dish. The Service is the restaurant where you serve it to guests.",
      "A star schema is a hub-and-spokes: one central facts table (sales) surrounded by simple lookup tables (date, product, region). It keeps everything fast and tidy.",
      "A measure is a calculator that recomputes as you filter (great for totals); a calculated column is a value written into every row at refresh (takes space). Prefer measures for numbers.",
      "Row-Level Security is giving each manager a keycard that only opens their floor — everyone opens the same report but sees only their own rows.",
    ],
    tips: [
      "Measure vs calculated column: measures = query-time, respond to filters, no storage (use for aggregations). Calculated columns = refresh-time, stored per row. This is asked a lot.",
      "CALCULATE is the #1 DAX function — it changes filter context. If a question is about 'sales for X regardless of the slicer,' think CALCULATE.",
      "Time intelligence (TOTALYTD, SAMEPERIODLASTYEAR) needs a proper marked Date table — no date table = wrong results.",
      "DIVIDE(a,b) not a/b — DIVIDE handles divide-by-zero safely.",
      "Import = fast in-memory (needs refresh); DirectQuery = live/current but slower and limited. Composite/Dual = mix both.",
      "Query folding = push steps to the source (fast refresh). Remove unused columns EARLY to keep folding and shrink the model.",
      "One active relationship between two tables; others are inactive — activate with USERELATIONSHIP. Single-direction filtering is the safe default.",
    ],
  },
  "qlik-sense-data-architect": {
    layman: [
      "Qlik links tables automatically by matching column NAMES — like two forms that both have 'CustomerID' snap together. So naming your columns IS your data model.",
      "A QVD is Qlik's tupperware: pre-portioned, sealed data that loads super fast next time — the basis of quick reloads and incremental loading.",
      "A synthetic key is what Qlik makes when two tables accidentally share two+ column names — usually a mess you want to clean up by renaming or combining keys.",
      "Incremental load is only cooking the new orders and adding them to yesterday's batch, instead of re-cooking the whole week every night.",
    ],
    tips: [
      "Synthetic key = 2+ shared fields between tables. Fix by renaming, dropping, or making ONE composite key. Circular reference = a loop; fix with a link table.",
      "CONCATENATE = stack rows (union). JOIN = merge columns (can multiply rows). ApplyMap = add ONE lookup value with NO row duplication (often the best answer).",
      "Optimized QVD load = fastest; ANY transformation/WHERE breaks it — except a single WHERE EXISTS(field). That exception is a common exam point.",
      "Association is by identical field names — this is THE core Qlik concept behind most modeling questions.",
      "Section Access = row-level security; fields conventionally UPPERCASE; always keep a valid admin or you lock yourself out.",
      "Star schema / link table beats many shared fields — avoids synthetic keys and keeps performance up.",
      "AutoNumber() shrinks big composite/text keys into small integers — the answer for memory/performance on large keys.",
    ],
  },
  "qlik-sense-business-analyst": {
    layman: [
      "A dimension is the 'by what' (by product, by month); a measure is the 'how much' (sum of sales). Charts are just dimensions × measures.",
      "Set analysis is telling one chart 'ignore what the user selected and show me 2024 anyway' — a filter that lives inside the formula.",
      "The green/white/grey colors are Qlik's superpower: green = you picked it, white = still possible, grey = ruled out. It shows relationships instantly.",
      "Master items are the 'house recipe' for a measure — define 'Revenue' once so every chart uses the exact same definition.",
    ],
    tips: [
      "Set analysis identifiers: $ = current selection, 1 = ALL records (ignore selection). Modifiers in <> add/override/clear fields. Sum({1} Sales) = grand total.",
      "Clear one filter: <Field=> (empty). Set a value: <Year={2024}>. Exclude: <Region-={'East'}>. Memorize this syntax.",
      "Master measures = consistency + governance (one official definition). Expect a question on why to use them.",
      "Aggr() = nested aggregation over a virtual dimension: Avg(Aggr(Sum(Sales),Customer)) = average per customer. It's the tool for 'average of a total.'",
      "Chart choice: line = trend, bar = compare, KPI = headline, pie = few-part share, scatter = correlation.",
      "% of total that ignores selection → set analysis in the denominator (e.g., {1} or cleared fields), not a plain divide.",
      "Green/White/Grey meaning is frequently tested: selected / possible / excluded.",
    ],
  },
  "qlikview-12-data-architect": {
    layman: [
      "Same associative engine as Qlik Sense: tables snap together on matching column names. Build the model by naming keys carefully.",
      "A three-layer QVD setup is a supply chain: Extract raw to QVD → Transform/model → Present curated QVD to the app. Each stage is reusable and fast.",
      "Incremental load = only fetch what changed and add it to the stored QVD, instead of reloading everything each night.",
      "Section Access is the bouncer: it checks who you are and only lets you see your allowed rows.",
    ],
    tips: [
      "Synthetic key = 2+ shared fields; circular reference = association loop. Resolve with renames, composite keys, or a link table.",
      "KEEP = reduce two tables to matching rows but keep them SEPARATE. JOIN = merge into ONE table. Know the difference.",
      "Optimized QVD load breaks with transformations/WHERE — except one WHERE EXISTS(field). Renaming/adding fields also breaks it.",
      "BINARY load copies another QVW's whole model and MUST be the first statement, used once.",
      "Incremental with updates: load changed rows from source, then keep old QVD rows WHERE NOT EXISTS(key); handle deletes by reconciling current keys.",
      "AutoNumber() for compact keys; split datetime into Date+Time to cut cardinality/memory.",
      "Section Access: UPPERCASE fields/values, keep a valid ADMIN, test in a copy (a bad setup locks everyone out).",
    ],
  },
  "qlikview-12-business-analyst": {
    layman: [
      "You build charts from dimensions (by what) and expressions (the calculation). Expressions are where the analysis lives.",
      "The TOTAL keyword means 'ignore the chart's rows and give me the overall total' — the trick behind percentage-of-total.",
      "Set analysis is a filter inside the formula: show this measure for 2024 (or last year) no matter what the user selected.",
      "Aggr() builds a mini-table in memory (e.g., a total per customer) that you can then average or rank — for 'calculations on calculations.'",
    ],
    tips: [
      "% of total = Sum(Sales)/Sum(TOTAL Sales). TOTAL ignores the chart's dimensions to give the overall/column total.",
      "Set identifiers: $ = current selection, 1 = all records. {$<Year={2024}>} starts from selection then forces Year; {1<...>} ignores selection.",
      "Aggr(expr, dim) for nested aggregation — Avg(Aggr(Sum(Sales),Customer)) = avg per customer; combine with Rank for top-N-per-group.",
      "Drill-down group = hierarchy (Year>Quarter>Month). Cyclic group = switch among unrelated dimensions. Different tools.",
      "FirstSortedValue(value, -weight): the '-' sorts descending, returning the top item (e.g., best-selling product).",
      "Prefer set analysis over row-level If() inside aggregations — the engine optimizes set analysis and it's faster.",
      "Dual(text, number) shows text but sorts by the number (e.g., month names in calendar order).",
    ],
  },
  "databricks-machine-learning-associate": {
    layman: [
      "MLflow is a lab notebook that automatically records every experiment — what settings you used and how well it did — so you can compare and reproduce them later.",
      "The Model Registry is a library with 'editions': you check a model into Staging, then Production, and apps just ask for 'the Production copy' without caring about version numbers.",
      "Feature Store is a shared pantry of prepared ingredients (features). Everyone cooks with the same ingredients at training and serving time, so the dish tastes the same — no 'train-serve skew'.",
      "Overfitting is memorizing the textbook instead of learning the subject: perfect on practice questions, lost on the real exam. Regularization and more data are the cure.",
      "Hyperopt is an assistant that tries many settings for you and homes in on the best, instead of you guessing by hand.",
    ],
    tips: [
      "Fit preprocessing (scalers/encoders/imputers) on TRAIN only — put them in a Pipeline so cross-validation does this per fold. 'Fit on all data' = leakage = a trap answer.",
      "Load the Production model by stage: models:/name/Production — not by a version number.",
      "For imbalanced classes, accuracy lies — use F1 or PR/ROC-AUC. RMSE/MAE/R² are regression only.",
      "Hyperopt: objective returns {'loss': ...}. Higher-is-better metric? Return its NEGATIVE. SparkTrials = many single-node models in parallel; plain Trials = already-distributed Spark ML models.",
      "StringIndexer → OneHotEncoder → (scale) → VectorAssembler → model. Assemble LAST; VectorAssembler errors on nulls, so impute first.",
      "Trees are scale-invariant; distance/gradient models (logistic/linear, kNN, SVM) need scaling.",
      "AutoML is 'glass-box' — it gives editable notebooks and logs every trial to MLflow, so it's reproducible.",
    ],
  },
  "databricks-machine-learning-professional": {
    layman: [
      "This exam is about keeping a model healthy AFTER launch — like running a restaurant, not just cooking one dish. You deploy, watch quality, and improve continuously (MLOps).",
      "Drift is the world changing under your model. Data drift = the ingredients changed; concept drift = the recipe that worked no longer does (you need taste-tests/labels to confirm it).",
      "A champion/challenger setup is a title fight: the reigning model (champion) defends against a new one (challenger); you only crown the challenger if it truly wins.",
      "Shadow vs canary: shadow lets the new model 'watch and practice' on real traffic without serving answers; canary lets it serve a small slice and ramp up if it behaves.",
      "Inference tables are CCTV for your endpoint — every request and prediction is recorded, so you can spot drift and build retraining data.",
    ],
    tips: [
      "Match deployment to need: batch = scheduled bulk scoring; streaming = per-micro-batch; real-time endpoint = sub-second per request. Infrequent bulk → batch (cheapest).",
      "Data drift needs only features; concept/label drift needs GROUND TRUTH labels to detect. Know the difference.",
      "Drift metrics: PSI / KS for continuous, chi-square for categorical. Thresholds (e.g., PSI>0.2) trigger alerts/retraining.",
      "UC models use catalog.schema.model with ALIASES (@champion); roll back by re-pointing the alias — instant, no consumer redeploy.",
      "Point-in-time feature lookups prevent leakage in time-series; online store = low-latency features for real-time serving.",
      "Custom logic → subclass mlflow.pyfunc.PythonModel. Always log the environment (pinned deps) for reproducible serving.",
      "Safe promotion: offline eval → shadow/canary → A/B (with guardrail metrics + significance) → flip the alias.",
    ],
  },
};
