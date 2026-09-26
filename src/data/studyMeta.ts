/* -------------------------------------------------------------------------- */
/*  STUDY HUB — PER-CERT METADATA                                              */
/*  Detailed "what it is" (about) and "where it's used" (usage) for each cert. */
/*  image defaults to /study/<slug>.svg (concept diagram) unless overridden.   */
/* -------------------------------------------------------------------------- */

import type { CertMeta } from "./study";

export const studyMeta: Record<string, CertMeta> = {
  "databricks-data-engineer-associate": {
    about: [
      "The Databricks Certified Data Engineer Associate validates that you can build and maintain data pipelines on the Databricks Lakehouse Platform. It focuses on the day-to-day engineering skills: ingesting data incrementally, transforming it with Spark SQL and Python, storing it reliably in Delta Lake, and productionizing it with Delta Live Tables, Jobs, and Unity Catalog governance.",
      "It is the entry-level engineering credential in the Databricks track. It proves you understand the Lakehouse model (one platform for both data-lake storage and warehouse-style analytics), the medallion architecture (bronze → silver → gold), and how Delta's transaction log gives ACID guarantees, time travel, and simple upserts on top of cheap cloud object storage.",
    ],
    usage: [
      "Roles: Data Engineer, Analytics Engineer, BI/ETL Developer moving to the Lakehouse, or a data analyst broadening into engineering.",
      "On the job: building bronze/silver/gold pipelines, incremental ingestion with Auto Loader/COPY INTO, and scheduled Jobs that feed dashboards and ML.",
      "Career value: it is the recommended first Databricks certification and a prerequisite mindset for the Professional exam; widely requested for cloud data-platform roles.",
      "For this portfolio: underpins the international insurance analytics delivery and the ETL/data-quality work, where reliable, governed pipelines are essential.",
    ],
  },
  "databricks-data-engineer-professional": {
    about: [
      "The Databricks Certified Data Engineer Professional is the advanced engineering credential. It goes beyond building pipelines to designing them well: complex Structured Streaming, Delta optimization (OPTIMIZE/ZORDER, liquid clustering, deletion vectors), dimensional modeling (CDC with Change Data Feed, SCD Type 1/2), security and governance, monitoring, and testing/CI-CD deployment with Databricks Asset Bundles.",
      "Where the Associate proves you can make a pipeline work, the Professional proves you can make it correct, performant, secure, and maintainable at scale — the difference between a working job and a production-grade platform.",
    ],
    usage: [
      "Roles: Senior/Lead Data Engineer, Data Platform Engineer, Streaming/Real-time Engineer, Data Architect.",
      "On the job: tuning large Delta tables, designing exactly-once streaming and CDC/SCD pipelines, enforcing row/column security, and shipping via tested CI/CD.",
      "Career value: a strong signal of senior engineering capability; often a differentiator for lead and architecture roles on Databricks.",
      "For this portfolio: reflects the delivery-lead responsibility for performant, governed, production analytics on a large international engagement.",
    ],
  },
  "databricks-apache-spark-developer": {
    about: [
      "The Databricks Certified Associate Developer for Apache Spark validates hands-on proficiency with Spark's architecture and the DataFrame API. It tests how Spark executes work (driver/executors, jobs → stages → tasks, partitions), the difference between lazy transformations and actions, narrow vs wide operations and shuffles, joins, aggregations, window functions, caching, partitioning, and performance features like broadcast joins and Adaptive Query Execution.",
      "It is a code-level, engine-focused certification: it proves you can read Spark code, predict how it runs, and write efficient transformations rather than just use higher-level tools.",
    ],
    usage: [
      "Roles: Spark/Data Engineer, Big Data Developer, ML Engineer working with large datasets.",
      "On the job: writing performant PySpark/Scala transformations, diagnosing shuffles and skew in the Spark UI, and optimizing large-scale ETL and feature pipelines.",
      "Career value: Spark remains the backbone of large-scale data processing; this cert demonstrates the engine fundamentals that underpin Databricks, EMR, and other Spark platforms.",
      "For this portfolio: supports the data-engineering and big-data processing behind enterprise analytics and data-science workloads.",
    ],
  },
  "databricks-data-analyst-associate": {
    about: [
      "The Databricks Certified Data Analyst Associate validates the ability to turn Lakehouse data into insight using Databricks SQL. It covers writing SQL queries (joins, aggregations, CTEs, window functions), building visualizations, dashboards, and alerts, doing last-mile data preparation with Delta tables and views, and applying basic analytics and Unity Catalog governance from an analyst's perspective.",
      "It is aimed at analysts rather than engineers: the focus is querying and communicating data on the Lakehouse, using SQL warehouses, dashboards, parameters, and alerts to support decisions.",
    ],
    usage: [
      "Roles: Data Analyst, BI Analyst, Reporting Analyst, Analytics Engineer working in Databricks SQL.",
      "On the job: exploring data with SQL, building interactive dashboards and threshold alerts, and creating governed views/gold tables for reporting.",
      "Career value: validates analytics capability on the modern Lakehouse, complementing BI tools like Power BI and Qlik.",
      "For this portfolio: reinforces BI and KPI-reporting delivery, applied on a Lakehouse foundation.",
    ],
  },
  "databricks-genai-engineer-associate": {
    about: [
      "The Databricks Certified Generative AI Engineer Associate validates the ability to design and build production LLM applications. It covers Retrieval-Augmented Generation (RAG), embeddings and vector search, prompt engineering, chains and agents, model selection, evaluation (groundedness, relevance), deployment via Model Serving, and governance/safety on the Mosaic AI stack.",
      "It proves you can go beyond calling an LLM to engineering a reliable, grounded, evaluated, and governed AI system — the skills needed to ship GenAI features that businesses can trust.",
    ],
    usage: [
      "Roles: GenAI/ML Engineer, AI Application Developer, Data Scientist building LLM solutions.",
      "On the job: building RAG assistants over enterprise knowledge, wiring vector search, adding guardrails and evaluation, and deploying LLM endpoints.",
      "Career value: one of the most in-demand modern skill sets; demonstrates practical, production-oriented Generative AI capability.",
      "For this portfolio: directly supports the GenAI/RAG analytics-assistant work and translating advanced AI into business-facing tools.",
    ],
  },
  "databricks-context-engineer-associate": {
    about: [
      "The Databricks Certified Context Engineer Associate focuses on context engineering — deliberately assembling, structuring, and managing the information an AI model or agent reasons over. It covers the context window and token budgeting, grounding via retrieval, tool/function calling, agent design and memory, and evaluating reliability and safety.",
      "As LLM applications mature, the quality of the context (not just the model) drives results. This credential validates the discipline of engineering that context: what to retrieve, how to structure it, when to call tools, and how to keep agents reliable and safe.",
    ],
    usage: [
      "Roles: AI/GenAI Engineer, Agent/LLM Application Developer, AI Solutions Architect.",
      "On the job: designing agentic and RAG systems, managing context windows and memory, orchestrating tools, and evaluating groundedness and safety.",
      "Career value: a cutting-edge credential reflecting the shift from model-centric to context/agent-centric AI engineering.",
      "For this portfolio: complements the GenAI credential, showing depth in building reliable, grounded AI assistants and agents.",
    ],
  },
  "microsoft-pl-300": {
    about: [
      "The Microsoft PL-300 (Power BI Data Analyst Associate) validates end-to-end Power BI skills: preparing data with Power Query, modeling with a star schema and DAX, visualizing and analyzing with reports, and deploying and maintaining content in the Power BI Service with workspaces, refresh, and Row-Level Security.",
      "It is the industry-standard certification for Power BI analysts, covering the full lifecycle from raw source to a governed, shareable report — the skills to turn business questions into trustworthy, interactive dashboards.",
    ],
    usage: [
      "Roles: Power BI Developer, BI/Data Analyst, Reporting Analyst, Analytics Consultant.",
      "On the job: building semantic models (relationships, DAX measures), designing reports, configuring refresh/gateways, and securing data with RLS.",
      "Career value: one of the most widely requested BI certifications globally; a baseline credential for Power BI roles.",
      "For this portfolio: central to enterprise BI delivery, including insurance KPI and distributor-performance reporting.",
    ],
  },
  "qlik-sense-data-architect": {
    about: [
      "The Qlik Sense Data Architect (QSDA) validates the ability to design and build the data layer of Qlik Sense apps: load scripting, the associative data model, joins/concatenation/mapping, QVDs and incremental loading, resolving synthetic keys and circular references, star-schema modeling, and Section Access security.",
      "It focuses on the 'behind the scenes' engineering that makes Qlik apps fast and correct — clean data models, efficient QVD layers, and governed, secure data.",
    ],
    usage: [
      "Roles: Qlik Data Architect, BI Developer, Data Modeler working with Qlik.",
      "On the job: building reload scripts and QVD layers, designing performant associative models, and implementing incremental loads and row-level security.",
      "Career value: validates the technical foundation of Qlik solutions, distinguishing app builders who can engineer robust data models.",
      "For this portfolio: underpins years of Qlik-based BI delivery and the data models behind executive dashboards.",
    ],
  },
  "qlik-sense-business-analyst": {
    about: [
      "The Qlik Sense Business Analyst (QSBA) validates the ability to design effective Qlik Sense apps for analysis: choosing visualizations, building dimensions/measures and master items, writing set-analysis expressions, applying selections and filtering, and communicating insight through dashboards and stories.",
      "Where the Data Architect builds the data layer, the Business Analyst builds the analytical and visual layer — turning a governed data model into clear, decision-ready analysis.",
    ],
    usage: [
      "Roles: BI/Business Analyst, Qlik App Designer, Analytics Consultant.",
      "On the job: designing sheets and KPIs, writing set analysis for comparisons and % of total, creating master items for consistency, and building data stories.",
      "Career value: validates the front-end analytics and UX skills that make Qlik apps genuinely useful to the business.",
      "For this portfolio: reflects the dashboard-design and data-storytelling side of BI delivery.",
    ],
  },
  "qlikview-12-data-architect": {
    about: [
      "The QlikView 12 Data Architect (QV12DA) validates data-architecture skills in QlikView: load scripting, data modeling and key handling, QVDs and incremental loading, resolving synthetic keys and circular references, Section Access, and performance optimization on the same associative engine as Qlik Sense.",
      "It proves you can engineer reliable, performant QlikView data models and reload architectures — the technical backbone of enterprise QlikView deployments.",
    ],
    usage: [
      "Roles: QlikView Developer/Data Architect, BI Developer maintaining QlikView estates.",
      "On the job: building QVD staging layers, incremental loads, clean associative models, and secure, optimized QlikView documents.",
      "Career value: validates deep QlikView engineering skills, valuable for organizations with established QlikView platforms.",
      "For this portfolio: reflects early enterprise BI work, including connector-less SAP-to-BI integration and heavy report re-engineering.",
    ],
  },
  "qlikview-12-business-analyst": {
    about: [
      "The QlikView 12 Business Analyst (QVBA) validates the ability to build analysis in QlikView: chart and expression design, set analysis, aggregation functions including Aggr(), drill-down and cyclic groups, list boxes and bookmarks, and UI/UX best practices.",
      "It focuses on the analytical front end of QlikView — turning a data model into insightful, interactive charts and dashboards that answer business questions.",
    ],
    usage: [
      "Roles: BI/Business Analyst, QlikView Report Developer, Analytics Consultant.",
      "On the job: building charts and expressions, set-analysis measures (YoY, % of total), drill-down navigation, and executive dashboards.",
      "Career value: validates the expression-building and visualization skills at the heart of effective QlikView analysis.",
      "For this portfolio: reflects hands-on QlikView dashboard and KPI development across multiple industries.",
    ],
  },
  "databricks-machine-learning-associate": {
    about: [
      "The Databricks Certified Machine Learning Associate validates the ability to build machine learning solutions on Databricks. It covers the ML workflow (data prep, train/validate, evaluate), the Databricks ML toolset (AutoML, Feature Store, MLflow tracking and registry, Model Serving), scaling with Spark ML, and hyperparameter tuning with Hyperopt.",
      "It is the entry-level ML credential in the Databricks track, proving you can go from a dataset to a tracked, registered, and servable model using the platform's managed tools — bridging data engineering and applied machine learning.",
    ],
    usage: [
      "Roles: Machine Learning Engineer, Data Scientist, Analytics Engineer moving into ML, or a data engineer supporting ML pipelines.",
      "On the job: preparing features, training and tuning models, tracking experiments in MLflow, registering models, and scaling training/inference with Spark.",
      "Career value: a strong signal of applied ML capability on the modern Lakehouse; a natural next step after the data-engineering certifications.",
      "For this portfolio: extends the data-science and advanced-analytics work — turning models into governed, business-facing solutions.",
    ],
  },
  "databricks-machine-learning-professional": {
    about: [
      "The Databricks Certified Machine Learning Professional is the advanced ML-engineering credential. It focuses on production machine learning: advanced experimentation and Feature Store, the full model lifecycle (registry, aliases, webhooks, CI/CD), deployment strategies (batch, streaming, and real-time serving), and production monitoring (data/concept drift, Lakehouse Monitoring, inference tables, retraining).",
      "Where the Associate proves you can build a model, the Professional proves you can operate it reliably in production — deploying, monitoring, and continuously improving models with governance, testing, and automation (MLOps).",
    ],
    usage: [
      "Roles: Senior/Lead ML Engineer, MLOps Engineer, ML Platform Engineer, or Data Scientist owning production models.",
      "On the job: designing feature pipelines and serving, automating the retrain-evaluate-deploy loop, running A/B and canary rollouts, and monitoring drift and model quality.",
      "Career value: a differentiator for senior ML/MLOps roles, demonstrating end-to-end production ML ownership.",
      "For this portfolio: reflects the delivery-lead discipline applied to ML — reliable, governed, monitored models in production.",
    ],
  },
};
