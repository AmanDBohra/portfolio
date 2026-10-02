/**
 * =============================================================================
 *  PORTFOLIO CONTENT  —  Aman Bohra
 * =============================================================================
 *  Populated from Aman's ATS resume. Edit any field below — the whole site is
 *  driven by this data. Items marked [PLACEHOLDER] are examples you can replace
 *  (e.g. testimonials, dashboard screenshots).
 * =============================================================================
 */

export type IconName =
  | "github"
  | "linkedin"
  | "twitter"
  | "mail"
  | "instagram"
  | "dribbble"
  | "youtube"
  | "globe"
  | "phone";

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Project {
  name: string;
  description: string;
  problem: string;
  tech: string[];
  features: string[];
  github?: string;
  demo?: string;
  context?: string;
  image: string;
  featured?: boolean;
}

export interface ExperienceItem {
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  responsibilities: string[];
  achievements: string[];
  tech: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  start: string;
  end: string;
  details: string;
}

export interface CertItem {
  title: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string; // lucide-react icon name
  /** Indicative pricing shown on the "How I can help" section (not a binding quote). */
  rate?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  /** Optional LinkedIn profile URL — name becomes a link when present */
  linkedin?: string;
  /** Optional relationship context, e.g. "Client", "Managed Aman directly" */
  relation?: string;
}

export interface CreativeWork {
  title: string;
  category: string;
  image: string;
}

/* -------------------------------------------------------------------------- */
/*  SITE / PERSONAL                                                            */
/* -------------------------------------------------------------------------- */

export const site = {
  name: "Aman Bohra",
  title: "Senior Analytics & BI Professional",
  tagline: "Empowering data-driven decisions.",
  // Hero copy
  eyebrow: "ANALYTICS • BUSINESS INTELLIGENCE • DATA & AI",
  headline: "I Make Enterprise Analytics Useful",
  heroSupport:
    "9+ years turning data into decisions across insurance, banking, retail, and beyond. Currently International Module Lead for a major US P&C insurer — one proving ground for a skill set built to travel across industries.",
  heroSupport2:
    "I've cut reporting times by 94%, improved data accuracy by 35%, and reduced audit findings by 15%.",
  intro:
    "Analytics and BI professional with 9+ years delivering data-driven solutions across the full analytics lifecycle — from business requirements through data, visualization, and decision support. Analytics is the core craft; insurance is simply where I've proven it deepest, currently leading the International module of an engagement with a major US Property & Casualty (P&C) insurer at LTIMindtree. Open to applying the same approach in new domains, and to collaborations beyond full-time roles — consulting, mentoring, and teaching among them.",
  location: "India",
  email: "bohraaman@gmail.com",
  phone: "+91 8369370199",
  /**
   * The real resume is bundled at /public/resume.pdf.
   * BASE_URL makes the link work both locally ("/") and on GitHub Pages
   * project sites ("/portfolio/") — do not hardcode a leading "/resume.pdf".
   */
  resumeUrl: `${import.meta.env.BASE_URL}resume.pdf`,
  /** Square portrait in /public. BASE_URL keeps it working on GitHub Pages. */
  avatar: `${import.meta.env.BASE_URL}avatar.webp`,
  /** Self-contained interactive dashboard demo in /public (synthetic data). */
  dashboardDemoUrl: `${import.meta.env.BASE_URL}dashboard-demo.html`,
  /** Market-basket-analysis notebook, rendered on GitHub. */
  notebookUrl:
    "https://github.com/AmanDBohra/portfolio/blob/main/notebooks/market_basket_analysis.ipynb",
  /** All analysis notebooks (executed, render with outputs on GitHub). */
  notebooks: [
    {
      title: "ETL → Star Schema Pipeline",
      desc: "Raw data → staging → dimensional model in SQLite (Data Engineering, ETL/ELT).",
      url: "https://github.com/AmanDBohra/portfolio/blob/main/notebooks/etl_star_schema_pipeline.ipynb",
    },
    {
      title: "GenAI: RAG Analytics Assistant",
      desc: "Retrieval-augmented Q&A over analytics docs; governed, grounded, LLM plug-in point.",
      url: "https://github.com/AmanDBohra/portfolio/blob/main/notebooks/genai_rag_analytics_assistant.ipynb",
    },
    {
      title: "Fraud Detection: Rules + ML Hybrid",
      desc: "Business rules + Random Forest blended into a prioritized fraud review queue.",
      url: "https://github.com/AmanDBohra/portfolio/blob/main/notebooks/fraud_detection_hybrid.ipynb",
    },
    {
      title: "A/B Test Analysis",
      desc: "Two-proportion test + confidence interval — statistical vs practical significance.",
      url: "https://github.com/AmanDBohra/portfolio/blob/main/notebooks/ab_test_analysis.ipynb",
    },
    {
      title: "Anomaly Detection on Claims",
      desc: "Isolation Forest surfaces unusual claims into a ranked review queue.",
      url: "https://github.com/AmanDBohra/portfolio/blob/main/notebooks/anomaly_detection_claims.ipynb",
    },
    {
      title: "Insurance Premium Forecasting",
      desc: "Trend + seasonality forecast of Written Premium, 12-month projection.",
      url: "https://github.com/AmanDBohra/portfolio/blob/main/notebooks/insurance_premium_forecasting.ipynb",
    },
    {
      title: "Policy Retention Prediction",
      desc: "Logistic-regression churn model → a ranked retention action list.",
      url: "https://github.com/AmanDBohra/portfolio/blob/main/notebooks/policy_retention_prediction.ipynb",
    },
    {
      title: "Data Quality Profiling & Scorecard",
      desc: "Profiles messy data into an audit-ready quality score.",
      url: "https://github.com/AmanDBohra/portfolio/blob/main/notebooks/data_quality_profiling.ipynb",
    },
    {
      title: "Market Basket Analysis (Apriori)",
      desc: "Association rules on retail baskets; the technique behind BOM inventory work.",
      url: "https://github.com/AmanDBohra/portfolio/blob/main/notebooks/market_basket_analysis.ipynb",
    },
  ],
  /** Recruiter one-pager (branded PDF) in /public. */
  onePagerUrl: `${import.meta.env.BASE_URL}Aman-Bohra-one-pager.pdf`,
  /** Optional booking link (Calendly/Cal.com). Leave "" to hide the button. */
  calendlyUrl: "",
  /** Short "open to" line shown on the availability banner. */
  openTo: "Open to Analytics Lead · BI Manager · Analytics Delivery Lead · Data & Analytics roles — and to consulting, mentoring/teaching, and collaboration beyond full-time employment.",
};

/** Executive snapshot shown directly under the hero. */
export const snapshot: { top: string; label: string }[] = [
  { top: "9+", label: "Years Experience" },
  { top: "10+", label: "Enterprise Clients" },
  { top: "BI", label: "Enterprise Delivery" },
  { top: "36h → 2h", label: "Report Optimization" },
  { top: "Insurance", label: "Domain Experience" },
  { top: "International", label: "Module Leadership" },
];

/** Verified business outcomes (real metrics from delivered work). */
export const impact: { value: string; label: string }[] = [
  { value: "94%", label: "Report time cut (36h → under 2h)" },
  { value: "85%", label: "Server load reduced" },
  { value: "35%", label: "Data accuracy improved" },
  { value: "25%", label: "Reporting accuracy improved" },
  { value: "30%", label: "Process efficiency gained" },
  { value: "15%", label: "Audit findings reduced" },
];

/** Honors, recognition & community leadership (all verified). */
export const honors: { title: string; org: string; date: string; note: string }[] = [
  {
    title: "Star Performer — International Portfolio",
    org: "LTIMindtree",
    date: "Jan 2025",
    note: "Recognized as Star Performer while serving as Data Steward Leader for the international team, with client praise for dedication and analytical skill.",
  },
  {
    title: "AI Mentor — BRAIN (Build Rural AI Network)",
    org: "eVidyaloka × Microsoft",
    date: "Apr 2025",
    note: "Delivered 37 live remote sessions teaching core AI concepts to rural government-school students; received a formal Certificate of Appreciation.",
  },
  {
    title: "Mentor — BRAINIAC 2025 National AI Competition",
    org: "eVidyaloka × LTIMindtree",
    date: "2025",
    note: "Mentored a student team's AI-powered 'Save Water' project to national runner-up, earning a ₹25,000 grant to build a working prototype.",
  },
  {
    title: "Guest Speaker & AI Advisor Invitation",
    org: "Terna College of Engineering",
    date: "Sep 2024",
    note: "Invited to speak on business-intelligence trends and to advise on the college's AI curriculum.",
  },
];

/** Career evolution — connected journey (Analytics beyond the tools). */
export const careerStages: { stage: string; label: string }[] = [
  { stage: "01", label: "BI & Reporting" },
  { stage: "02", label: "Analytics & Visualization" },
  { stage: "03", label: "Business Intelligence" },
  { stage: "04", label: "Analytics Delivery" },
  { stage: "05", label: "Module / Project Leadership" },
  { stage: "06", label: "Advanced Analytics" },
  { stage: "07", label: "Data Science & AI Initiatives" },
];

/** Leadership & capability nodes (no percentage bars). */
export const capabilities: { title: string; note: string }[] = [
  { title: "Analytics Strategy", note: "KPI discovery, analytics roadmaps, decision frameworks" },
  { title: "BI Delivery", note: "Dashboards, reporting, self-service analytics at scale" },
  { title: "Stakeholder Management", note: "Business + technical alignment across functions" },
  { title: "Project & Module Leadership", note: "Scope, risk, dependencies, delivery governance" },
  { title: "Data Science Initiatives", note: "Use-case identification, model-to-decision translation" },
  { title: "Business Transformation", note: "Process automation and data-driven decision support" },
];

/** Data Science & Advanced Analytics value chain. */
export const dsFlow: string[] = [
  "Business Problem",
  "Data",
  "Analysis",
  "Model / Analytics",
  "Business Insight",
  "Decision",
];

/**
 * Industry KPIs & business value.
 * KPIs reflect domain expertise (what I build and track); the "impact" items use
 * only real, delivered outcomes from the resume — no fabricated numbers.
 */
export interface Industry {
  id: string;
  name: string;
  icon: string; // lucide icon name
  period: string;
  clients: string;
  summary: string;
  kpis: string[];
  impact: { value?: string; label: string }[];
}

export const industries: Industry[] = [
  {
    id: "insurance",
    name: "Insurance (P&C)",
    icon: "ShieldCheck",
    period: "2022 – Present",
    clients: "Major US P&C insurer (International module)",
    summary:
      "Lead analytics & BI for international insurance operations — turning premium, distribution, and performance data into decision-ready reporting.",
    kpis: [
      "Written & Earned Premium",
      "Distributor / producer performance",
      "Loss & combined ratio",
      "Policy, renewal & retention metrics",
      "International portfolio performance",
      "Operational & management reporting",
    ],
    impact: [
      { value: "+25%", label: "Reporting accuracy on distributor KPIs" },
      { value: "+30%", label: "Process efficiency through automation" },
      { value: "−15%", label: "Audit findings via governance & data quality" },
    ],
  },
  {
    id: "banking",
    name: "Banking & Financial Services",
    icon: "Landmark",
    period: "2017 – 2020",
    clients: "DBS Bank and other banking engagements",
    summary:
      "Delivered enterprise BI and re-engineered heavy reporting workloads for banking clients, with a focus on speed, accuracy, and governance.",
    kpis: [
      "Portfolio & branch performance",
      "Transaction & digital-banking metrics",
      "Risk & compliance reporting",
      "Customer sentiment & experience",
      "Data quality & governance controls",
    ],
    impact: [
      { value: "−94%", label: "Report time (36h → under 2h)" },
      { value: "−85%", label: "Server load via report re-engineering" },
      { value: "+35%", label: "Data accuracy through quality controls" },
      { label: "Customer sentiment analysis guiding product & CX strategy" },
    ],
  },
  {
    id: "retail",
    name: "Retail",
    icon: "ShoppingBag",
    period: "2017 – 2022",
    clients: "Fractal Analytics retail clients, Charles & Keith",
    summary:
      "Built retail analytics dashboards that gave category and store teams a clean, consistent view of performance on validated data.",
    kpis: [
      "Sales tracking & category performance",
      "Store & regional performance",
      "Promotion & pricing effectiveness",
      "Market-basket / affinity analysis",
      "Self-service reporting adoption",
    ],
    impact: [
      { value: "+20%", label: "Sales-tracking accuracy" },
      { label: "Standardized, reusable reporting frameworks" },
      { label: "Clean, consistent data across domains" },
    ],
  },
  {
    id: "supplychain",
    name: "Supply Chain & Manufacturing",
    icon: "Boxes",
    period: "2017 – 2022",
    clients: "Fractal & Icon engagements (incl. Visteon, Keva, Philips)",
    summary:
      "Applied advanced analytics to supply-chain and manufacturing data — using retail techniques to solve inventory and planning problems.",
    kpis: [
      "Inventory levels & carrying cost",
      "Bill-of-Materials (BOM) analysis",
      "Material management & planning",
      "Production & quality reporting",
      "Supply-chain accuracy",
    ],
    impact: [
      { value: "−15%", label: "Inventory costs (Apriori market-basket analysis)" },
      { value: "+20%", label: "Supply-chain accuracy" },
    ],
  },
  {
    id: "automotive",
    name: "Automotive",
    icon: "Car",
    period: "2017 – 2020",
    clients: "Nissan, Bajaj Auto (Icon Business Solutions)",
    summary:
      "Delivered BI across automotive clients, including a novel connector-less SAP-to-BI integration enabling daily refresh without a data connector.",
    kpis: [
      "After-sales & service performance",
      "Dealer / distribution performance",
      "Inventory & DMS reporting",
      "Sales & material management",
    ],
    impact: [
      { label: "Connector-less SAP-to-BI daily refresh, delivered under a tight deadline" },
      { value: "+25%", label: "Delivery efficiency across engagements" },
      { value: "+30%", label: "Data accessibility using diverse sources" },
    ],
  },
  {
    id: "pharma",
    name: "Pharmaceutical",
    icon: "Pill",
    period: "2017 – 2020",
    clients: "Lupin, Abbott (Icon Business Solutions)",
    summary:
      "Built KPI dashboards and governed reporting for pharmaceutical clients as part of multi-industry BI delivery.",
    kpis: [
      "Sales & distribution performance",
      "Material management & inventory",
      "Compliance & governed reporting",
      "Maker / checker data controls",
    ],
    impact: [
      { value: "+35%", label: "Data accuracy via cleansing & maker/checker governance" },
      { value: "+30%", label: "Data accessibility across sources" },
    ],
  },
];

/** Current engagement (anonymized — no confidential client details). */
export const engagement = {
  title: "Enterprise Analytics Leadership",
  client: "Major US Insurance Enterprise",
  role: "International Module Lead · LTIMindtree",
  points: [
    "Own analytics & BI deliverables for the International module end to end — requirements through deployment and support.",
    "Translate complex insurance and international business requirements into analytical and reporting solutions.",
    "Coordinate cross-functional teams of analysts, data engineers, BI developers, and data scientists.",
    "Transition Data Science & Advanced Analytics outputs into business-facing dashboards and decision support.",
  ],
};

export const socials: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aman-bohra", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/AmanDBohra", icon: "github" },
  { label: "Email", href: "mailto:bohraaman@gmail.com", icon: "mail" },
  { label: "Phone", href: "tel:+918369370199", icon: "phone" },
];

/* -------------------------------------------------------------------------- */
/*  ABOUT                                                                      */
/* -------------------------------------------------------------------------- */

export const about = {
  paragraphs: [
    "I'm Aman Bohra — a Senior Analytics & Business Intelligence professional with 9+ years of experience delivering data-driven solutions, business analytics, reporting, and visualization across the complete analytics lifecycle: from business problem and requirements through data, analysis, BI/visualization, insights, and decision support.",
    "I've evolved from hands-on BI and dashboard development into analytics leadership — owning BI delivery, project/module management, stakeholder management, and Data Science / Advanced Analytics initiatives. Today I lead the International module of an engagement with a major US Property & Casualty (P&C) insurer at LTIMindtree, translating complex insurance and international business requirements into analytical and reporting solutions.",
    "I partner closely with business stakeholders, data engineers, analysts, and data science teams to convert business challenges into measurable, decision-ready insights. Outside of client delivery I mentor junior analysts, volunteer as an AI mentor supporting rural education, and contribute to innovation workshops and hackathons.",
  ],
  signature:
    "The thread through my career: analytics only creates value when someone uses it to make a better decision.",
  interests: [
    "Insurance Analytics",
    "BI Delivery Leadership",
    "Predictive Analytics",
    "Generative AI",
    "LLMs & RAG",
    "Data Governance",
    "Mentoring",
  ],
  highlights: [
    { value: "9+", label: "Years Experience" },
    { value: "12", label: "Certifications" },
    { value: "10+", label: "Enterprise Clients" },
    { value: "7+", label: "Industries Served" },
  ],
};

/** Selected clients & brands (shown as a strip in the About section). */
export const clients: string[] = [
  "US Insurance Major (P&C)",
  "DBS Bank (Singapore)",
  "Nissan",
  "Bajaj Auto",
  "Lupin",
  "Abbott",
  "Visteon",
  "Charles & Keith",
  "Keva",
  "Philips",
];

/* -------------------------------------------------------------------------- */
/*  SKILLS                                                                     */
/* -------------------------------------------------------------------------- */

export const skillCategories: SkillCategory[] = [
  {
    category: "Analytics & BI",
    skills: ["Business Intelligence", "Business Analytics", "Data Visualization", "Dashboard Development", "KPI Development", "Reporting & MIS", "Self-Service BI", "Data Storytelling"],
  },
  {
    category: "BI & Visualization Tools",
    skills: ["QlikView", "Qlik Sense", "Qlik NPrinting", "Power BI"],
  },
  {
    category: "Delivery & Project Management",
    skills: ["Project / Module Management", "Requirements Management", "Scope & Prioritization", "Risk & Dependency Mgmt", "UAT Coordination", "Production Support", "Delivery Governance"],
  },
  {
    category: "Data Science & Advanced Analytics",
    skills: ["Predictive Analytics", "Forecasting", "ML / AI Coordination", "Use-Case Identification", "Model Interpretation", "scikit-learn"],
  },
  {
    category: "AI & LLM Tools",
    skills: ["Claude", "ChatGPT / OpenAI", "Generative AI", "Prompt Engineering", "RAG", "LangChain"],
  },
  {
    category: "Programming & Data",
    skills: ["Python", "SQL", "Shell / Bash", "Pandas", "NumPy"],
  },
  {
    category: "Databases & Systems",
    skills: ["SAP", "Oracle", "SQL Server", "Teradata", "Siebel", "MS Access", "Hadoop", "Flat Files"],
  },
  {
    category: "Data Engineering & Cloud",
    skills: ["Databricks", "Apache Spark", "PySpark", "ETL Development", "Data Pipelines", "Data Warehousing", "Data Quality Controls"],
  },
  {
    category: "Domain & Leadership",
    skills: ["Insurance Analytics", "International Reporting", "Stakeholder Management", "Team Leadership", "Mentoring", "Cross-Functional Collaboration"],
  },
];

/* -------------------------------------------------------------------------- */
/*  PROJECTS  (real work — enterprise engagements are confidential, so         */
/*  code/demo links are intentionally omitted)                                 */
/* -------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    name: "International Insurance Analytics",
    context: "LTIMindtree · US Insurance Major (P&C)",
    description:
      "Lead analytics and BI delivery for the International module of a major US Property & Casualty insurer — owning the reporting layer that leadership uses to monitor insurance KPIs, operational performance, and cross-region business health.",
    problem:
      "International operations spanned multiple regions and reporting standards, so leadership lacked a single, decision-ready view of performance — every region told a slightly different story with slightly different numbers.",
    tech: ["Qlik Sense", "Power BI", "Qlik NPrinting", "Databricks", "SQL"],
    features: [
      "End-to-end delivery: requirements gathering → data modeling → dashboard build → deployment → ongoing support",
      "Unified insurance KPI framework covering premium, claims, and operational metrics across regions",
      "International business-performance monitoring with consistent, comparable definitions region to region",
      "Automated distribution of scheduled reports via Qlik NPrinting to reduce manual reporting effort",
      "Cross-functional coordination of analysts, data engineers, BI developers, and data scientists on one delivery cadence",
      "Model outputs from the data science track translated into business-facing dashboards leadership actually uses",
    ],
    image: "",
    featured: true,
  },
  {
    name: "Distributor Performance Management KPIs",
    context: "LTIMindtree · Insurance",
    description:
      "Designed and built a KPI reporting suite tracking distributor performance for international operations — centered on Written & Earned Premium metrics that leadership uses to evaluate distribution-channel health.",
    problem:
      "Leadership lacked accurate, timely visibility into how individual distributors were performing, which made it hard to catch underperformance early or reward strong channels appropriately.",
    tech: ["Qlik Sense", "Power BI", "ETL", "Data Warehousing"],
    features: [
      "Improved reporting accuracy by 25% by rebuilding the underlying data pipeline with validation checks",
      "Automation of previously manual reporting steps, improving process efficiency by 30%",
      "Governance-aligned insights that helped reduce audit findings by 15%",
      "Written & Earned Premium tracked consistently across distributors for like-for-like comparison",
      "Stronger data-driven decision-making for channel management decisions",
    ],
    image: "",
    featured: true,
  },
  {
    name: "Connector-less SAP-to-BI Integration",
    context: "Icon Business Solutions · Enterprise",
    description:
      "Engineered a connector-less SAP-to-BI data integration in collaboration with the ABAP development team — refreshing the BI application daily directly from SAP without relying on a licensed data connector.",
    problem:
      "Daily BI refresh was blocked by SAP data-connector licensing and technical limitations, and the business needed a working alternative fast rather than waiting on a procurement cycle.",
    tech: ["SAP", "ABAP (collaboration)", "QlikView", "ETL"],
    features: [
      "Daily direct-from-SAP refresh achieved with no third-party data-connector dependency",
      "Worked hand-in-hand with the ABAP team to expose extract-ready data structures inside SAP",
      "Delivered within a tight deadline that a connector-based approach couldn't have met",
      "Data-refactoring techniques applied to keep the extraction reliable and repeatable",
      "Reduced ongoing licensing cost by removing the connector from the architecture entirely",
    ],
    image: "",
    featured: true,
  },
  {
    name: "Retail Analytics Dashboards",
    context: "Fractal Analytics · Retail",
    description:
      "Built retail analytics dashboards enabling data-driven category and performance decisions, backed by a cleaned and validated data layer rather than raw, inconsistent source extracts.",
    problem:
      "Fragmented data across systems made sales tracking unreliable and slow to act on — numbers didn't reconcile between reports, which undermined trust in the analytics.",
    tech: ["Power BI", "Qlik", "SQL", "ETL"],
    features: [
      "Improved sales-tracking accuracy by 20% through a validated, single source-of-truth data layer",
      "Clean, consistent data enforced across product, store, and time domains",
      "Standardized, reusable reporting frameworks other teams could extend without rebuilding from scratch",
      "Category-level and store-level performance views built on the same underlying model",
    ],
    image: "",
    featured: false,
  },
  {
    name: "Market Basket Analysis (Apriori)",
    context: "Fractal Analytics · Supply Chain",
    description:
      "Applied the Apriori association-rule algorithm to Bill-of-Materials (BOM) hierarchies to uncover which components and materials tend to be purchased or used together, surfacing patterns invisible in raw transaction data.",
    problem:
      "High inventory costs and imprecise supply-chain planning stemmed from purchasing decisions that didn't account for real co-occurrence patterns across BOM components.",
    tech: ["Python", "Apriori", "Advanced Analytics"],
    features: [
      "Reduced inventory costs by 15% by identifying components that could be bundled or planned together",
      "Improved supply-chain planning accuracy by 20%",
      "Generated actionable association rules (support, confidence, lift) rather than just raw correlations",
      "A runnable notebook version on synthetic data demonstrates the same technique end to end",
    ],
    // A runnable notebook (synthetic data) demonstrating the same technique
    github: "https://github.com/AmanDBohra/portfolio/blob/main/notebooks/market_basket_analysis.ipynb",
    image: "",
    featured: false,
  },
  {
    name: "From 36 Hours to 2",
    context: "Icon Business Solutions · Banking",
    description:
      "Re-engineered a monolithic monthly report — a 36-hour batch job that locked the BI server for the entire run — into a daily parallel process finishing in under two hours, without adding new infrastructure.",
    problem:
      "A critical monthly report ran for 36 hours and hung the BI server the whole time; the business had simply accepted this as normal, since no one had re-examined the underlying job design.",
    tech: ["QlikView", "ETL", "SQL", "Data Warehousing"],
    features: [
      "Runtime cut 94% — from 36 hours down to under 2 hours",
      "Server load reduced 85% with zero new infrastructure spend",
      "Monolithic monthly batch converted into a daily parallel run, spreading load instead of spiking it",
      "Data accuracy improved 35% by adding quality controls the original job lacked",
      "Root-cause analysis identified sequential processing as the real bottleneck, not hardware capacity",
    ],
    image: "",
    featured: true,
  },
  {
    name: "Brain-Machine Interface (BMI)",
    context: "Fractal Analytics · Applied ML Exploration (2021)",
    description:
      "Prototyped a brain-machine interface concept at Fractal Analytics, exploring how EEG (electroencephalographic) signals could be decoded with machine learning to drive external actions — from cursor/selection control to neuroprosthetic devices such as robotic arms.",
    problem:
      "A BMI's translation layer has to convert noisy, individual-specific electrophysiological signals into commands an external system can act on reliably — which means training a model that can generalize a user's neural intent into consistent, actionable output.",
    tech: ["EEG Signal Processing", "Deep Learning (CNN)", "Neural Interface Concepts", "Python"],
    // Original demo re-implementation on synthetic data — not the real
    // (confidential) Fractal Analytics code. See the repo README.
    github: "https://github.com/AmanDBohra/portfolio/tree/main/projects/bmi-eeg-demo",
    features: [
      "Explored EEG signal acquisition and preprocessing as the input layer for a machine-learning decoding pipeline",
      "Prototyped a deep-learning (CNN-based) model to classify EEG patterns into candidate control signals",
      "Evaluated model performance using standard classification metrics (ROC-based analysis) on held-out test data",
      "Surveyed applied use cases — assistive prosthetics, neurological-condition monitoring, and human-computer interaction — as the motivating context for the work",
      "Note: this was an internal applied-ML exploration at Fractal Analytics; proprietary dataset, architecture, and result specifics are not shared here out of respect for the employer's confidentiality — this summary describes the approach and scope only",
    ],
    image: "",
    featured: false,
  },
  {
    name: "Assistive IoT Smart Stick",
    context: "Final-Year Academic Project · Guided by Prof. J. Y. Kapadnis",
    description:
      "Designed and built an IoT-based smart stick for visually impaired users — combining ultrasonic obstacle detection, a Raspberry Pi controller, and GPS location sharing to give safer, more independent mobility than a traditional cane.",
    problem:
      "Roughly 90% of blind individuals cannot travel independently, and only a small fraction use aids like a cane (~7%) or a guide dog (~3%) — leaving a clear gap for a device that proactively detects obstacles and keeps family informed of the user's location.",
    tech: ["Raspberry Pi 3", "Ultrasonic & Proximity Sensors", "GPRS/GPS", "Python", "Embedded C"],
    github: "https://github.com/AmanDBohra/portfolio/tree/main/projects/smart-stick",
    features: [
      "Ultrasonic and proximity sensors for real-time obstacle and irregular-surface detection, with feedback via earphone audio or vibration",
      "GPRS-based GPS module to regularly share the user's live location with family for added safety",
      "Benchmarked against prior assistive-navigation research (GuideCane, NavChair, NavBelt) to inform design trade-offs — e.g. avoiding NavBelt's lengthy user-training requirement",
      "Raspberry Pi 3 (ARM Cortex-A53, 1GB RAM) as the on-device processing hub running the sensor and feedback pipeline",
      "Full design documentation — use case, sequence, state, and activity diagrams — plus a working physical prototype",
    ],
    image: "",
    featured: false,
  },

  /* ---- Leadership & delivery ownership (grounded in real engagements) ---- */
  {
    name: "Leading the International Analytics Module",
    context: "LTIMindtree · US Insurance Major (P&C) · Leadership",
    description:
      "Own the International module of a major US P&C insurance engagement end to end — setting delivery priorities, managing dependencies and risk, and coordinating a cross-functional team of analysts, data engineers, BI developers, and data scientists.",
    problem:
      "A large international insurance programme needed a single accountable lead to turn shifting business requirements into reliable, on-time analytics delivery across multiple workstreams at once.",
    tech: ["Delivery Leadership", "Stakeholder Management", "Qlik Sense", "Power BI", "Databricks"],
    features: [
      "End-to-end ownership: requirements → build → deployment → ongoing support",
      "Cross-functional coordination across four disciplines: analysts, data engineers, BI developers, and data scientists",
      "Priorities, timelines, and risk actively managed against shifting business goals rather than a fixed static plan",
      "Direct stakeholder engagement with business leadership to translate ambiguous asks into scoped, deliverable work",
      "Model outputs from the data science track transitioned into decisions business stakeholders actually act on",
    ],
    image: "",
    featured: true,
  },
  {
    name: "Building & Mentoring a 10+ BI Team",
    context: "Icon Business Solutions · Leadership",
    description:
      "Led and mentored a BI team of 10+ across multiple client engagements — establishing reusable delivery standards, growing junior talent into independent contributors, and keeping quality consistent as the team scaled.",
    problem:
      "Delivery quality and speed varied significantly by individual; the team needed shared standards, structured mentoring, and repeatable practices to scale without quality dropping as headcount grew.",
    tech: ["Team Leadership", "Mentoring", "BI Delivery Standards", "QlikView", "Qlik Sense"],
    features: [
      "Improved delivery efficiency by 25% and data accessibility by 30% through shared standards",
      "Standardized, reusable reporting frameworks adopted across the whole team, not just individual projects",
      "Structured mentoring that grew junior analysts into confident, independent contributors",
      "Regular code/dashboard review process to keep quality consistent across the team's output",
      "Multiple client appreciations cited specifically for delivery quality and team responsiveness",
    ],
    image: "",
    featured: true,
  },
  {
    name: "Governance & Data-Quality Rollout",
    context: "LTIMindtree / Icon · Governance",
    description:
      "Introduced maker/checker governance and data-quality controls across reporting pipelines so insights leadership relied on were validated, auditable, and trustworthy by default rather than by habit.",
    problem:
      "Reporting was trusted by habit, not by evidence — there was no systematic validation step, and that gap surfaced later as audit findings and costly rework.",
    tech: ["Data Governance", "Maker/Checker Controls", "Data Quality", "ETL", "SQL"],
    features: [
      "Reduced audit findings by 15% by making validated, governed insights the default rather than the exception",
      "Maker/checker controls embedded directly into the delivery workflow, not bolted on afterward",
      "Raised data accuracy by up to 35% on the pipelines re-engineered under the new controls",
      "Documented validation checkpoints so governance was auditable, not just implied",
      "Governance made a routine part of delivery, not a separate compliance exercise",
    ],
    image: "",
    featured: false,
  },
  {
    name: "AI Mentor — CSR Rural Education",
    context: "CSR Initiative (BRAIN — Build Rural AI Network) · Community Leadership",
    description:
      "Volunteer AI mentor supporting rural education — translating complex AI and data concepts into simple, accessible learning for students with limited prior exposure to technology.",
    problem:
      "Students in under-resourced, rural settings rarely get a plain-language on-ramp to AI and data skills, and most existing material assumes background knowledge they don't have yet.",
    tech: ["Mentoring", "AI Literacy", "Knowledge Sharing"],
    features: [
      "Explained AI & data concepts in layman terms, building from real-world analogies rather than jargon",
      "Supported rural learners with limited access to structured technical education",
      "Also served as a mentor for the BRAINIAC 2025 National AI Competition",
      "Recognized as Volunteer of the Month for this contribution",
    ],
    image: "",
    featured: false,
  },

  /* ---- Self-built demonstration projects (synthetic data, open code) ---- */
  {
    name: "ETL → Star Schema Pipeline",
    context: "Demo · Data Engineering · ETL/ELT",
    description:
      "A working, open-source data-engineering pipeline: raw operational rows → cleaned staging tables → a dimensional star schema (fact + dimensions) in SQL, ready for a BI tool to sit on top of.",
    problem:
      "Dashboards are only as trustworthy as the data model beneath them — a shaky or inconsistent model produces numbers that quietly don't reconcile.",
    tech: ["Python", "SQL", "SQLite", "Star Schema", "ELT"],
    features: [
      "Full extract → transform → load flow, runnable end to end from the notebook",
      "Conformed dimensions plus a fact table, following classic Kimball-style dimensional modeling",
      "Analytical SQL layer a BI tool like Power BI or Qlik would sit directly on top of",
      "Open code — the full notebook is public, not just a description of the approach",
    ],
    github: "https://github.com/AmanDBohra/portfolio/blob/main/notebooks/etl_star_schema_pipeline.ipynb",
    image: "",
    featured: false,
  },
  {
    name: "GenAI: RAG Analytics Assistant (POC)",
    context: "Demo · Generative AI",
    description:
      "A governed Retrieval-Augmented Generation pipeline that answers plain-English questions from an analytics knowledge base — grounded in retrieved context, with a clear, swappable LLM plug-in point.",
    problem:
      "Business users want to ask questions of analytics documentation in plain English, without the risk of the assistant confidently inventing numbers that aren't actually in the source material.",
    tech: ["Python", "RAG", "TF-IDF Retrieval", "LLM (Claude/OpenAI)"],
    features: [
      "Real retrieval step over a knowledge base, not a simulated one",
      "Answers only from retrieved context, with an honest 'I don't know' when the context doesn't support an answer",
      "Swappable, cost-controllable LLM step so the generation model can be changed without rearchitecting retrieval",
      "Open notebook showing the full retrieval → grounding → generation flow",
    ],
    github: "https://github.com/AmanDBohra/portfolio/blob/main/notebooks/genai_rag_analytics_assistant.ipynb",
    image: "",
    featured: false,
  },
  {
    name: "Anomaly Detection on Claims",
    context: "Demo · Data Science",
    description:
      "An Isolation Forest model surfaces the most statistically unusual insurance claims and turns raw anomaly scores into a prioritized, explainable review queue for investigators.",
    problem:
      "Unusual claims — whether fraud, data-entry error, or genuine edge cases — deserve a human's attention first, but reviewers can't manually scan every claim in a large book of business.",
    tech: ["Python", "scikit-learn", "Isolation Forest"],
    features: [
      "Unsupervised approach — no labelled fraud examples needed to start surfacing anomalies",
      "Ranked review worklist so investigators start with the highest-priority claims first",
      "Designed to plug into a BI tool as a decision-support feed, not a black-box verdict",
      "Open notebook on synthetic claims data demonstrating the full scoring and ranking approach",
    ],
    github: "https://github.com/AmanDBohra/portfolio/blob/main/notebooks/anomaly_detection_claims.ipynb",
    image: "",
    featured: false,
  },
  {
    name: "Interactive BI Dashboards (6 industries)",
    context: "Demo · Business Intelligence",
    description:
      "A self-contained, interactive analytics dashboard spanning six industries, with KPI cards, trend/mix/breakdown charts, a ranked table, and region/period filters — built to demonstrate dashboard design thinking on synthetic data.",
    problem:
      "Showing real dashboard design and analytical thinking without exposing any actual client data.",
    tech: ["JavaScript", "Chart.js", "KPI Design", "Data Viz"],
    features: [
      "Six domain-specific dashboards covering distinct industry KPI patterns",
      "Live region & period filters that recompute every chart, not just static images",
      "Synthetic data throughout, clearly labelled as such",
      "Runs entirely client-side as a single self-contained demo page",
    ],
    demo: site.dashboardDemoUrl,
    image: "",
    featured: false,
  },
  {
    name: "FMCG Retail Sales Analysis",
    context: "MTech, Data Science & Engineering · Dissertation",
    description:
      "Graduate dissertation analyzing Fast-Moving Consumer Goods (FMCG) retail transaction data using association-rule mining and customer segmentation, with BI dashboards to turn the findings into retailer-actionable insight.",
    problem:
      "FMCG retailers often can't see the patterns hiding in their own transaction data — which products are actually bought together, which customers are most valuable, and how pricing or shelf placement should respond — because that requires purpose-built analysis, not just standard sales reporting.",
    tech: ["Python", "Apriori (Association Rule Mining)", "RFM Segmentation", "Streamlit", "Qlik"],
    github: "https://github.com/AmanDBohra/portfolio/tree/main/projects/fmcg-retail",
    features: [
      "Built an Apriori-based market basket analysis pipeline — first validated on a limited sample, then scaled to the full retail transaction dataset",
      "Implemented RFM (Recency, Frequency, Monetary) customer segmentation to rank customers from 'Top' to 'Lost' and target retention efforts accordingly",
      "Ran affinity analysis in Qlik to cross-check association-rule findings with an independent BI tool",
      "Compared association-rule algorithms (Apriori, FP-Growth, Eclat, and others) and dashboarding libraries (Streamlit, Plotly, Dash, Superset) on trade-offs before choosing an approach",
      "Delivered an interactive Streamlit dashboard surfacing sales trends by country, month, and top-selling products for exploratory analysis",
    ],
    image: "",
    featured: false,
  },
];

/* Attach on-brand thumbnail art (abstract dashboard motifs, no client data). */
const THUMBS: Record<string, string> = {
  "International Insurance Analytics": "international-insurance-analytics",
  "Distributor Performance Management KPIs": "distributor-performance-kpis",
  "Connector-less SAP-to-BI Integration": "connector-less-sap-bi",
  "Retail Analytics Dashboards": "retail-analytics",
  "Market Basket Analysis (Apriori)": "market-basket",
  "From 36 Hours to 2": "from-36-to-2",
  "Brain-Machine Interface (BMI)": "bmi",
  "Assistive IoT Smart Stick": "iot-smart-stick",
  "Leading the International Analytics Module": "leading-module",
  "Building & Mentoring a 10+ BI Team": "mentoring-team",
  "Governance & Data-Quality Rollout": "governance",
  "AI Mentor — CSR Rural Education": "ai-mentor",
  "ETL → Star Schema Pipeline": "etl-star-schema",
  "GenAI: RAG Analytics Assistant (POC)": "genai-rag",
  "Anomaly Detection on Claims": "anomaly-detection",
  "Interactive BI Dashboards (6 industries)": "interactive-bi",
  "FMCG Retail Sales Analysis": "fmcg-retail",
};
for (const p of projects) {
  const slug = THUMBS[p.name];
  if (slug) p.image = `${import.meta.env.BASE_URL}thumbs/${slug}.svg`;
}

/* -------------------------------------------------------------------------- */
/*  EXPERIENCE                                                                 */
/* -------------------------------------------------------------------------- */

export const experience: ExperienceItem[] = [
  {
    company: "LTIMindtree",
    role: "Senior Analytics & BI Consultant · International Module Lead",
    start: "Jul 2022",
    end: "Present",
    location: "Client: US Insurance Major (P&C) · India",
    responsibilities: [
      "Lead the International module of a major US P&C insurance engagement, owning analytics & BI deliverables end to end from requirements through deployment and support.",
      "Translate complex insurance and international business requirements into analytical, reporting, and dashboarding solutions with business stakeholders and leadership.",
      "Manage priorities, dependencies, timelines, and risks; coordinate cross-functional teams of analysts, data engineers, BI developers, and data scientists.",
      "Support Data Science & Advanced Analytics use cases, transitioning model outputs into business-facing dashboards and decision-support solutions.",
    ],
    achievements: [
      "Delivered Distributor Performance Management KPIs (Written & Earned Premiums), improving reporting accuracy by 25%.",
      "Drove automation initiatives that improved process efficiency by 30%.",
      "Reduced audit findings by 15% through validated, governance-aligned insights and data quality controls.",
    ],
    tech: ["Qlik Sense", "Power BI", "Qlik NPrinting", "Databricks", "SQL"],
  },
  {
    company: "Fractal Analytics",
    role: "Analytics & BI Consultant",
    start: "Aug 2020",
    end: "Jul 2022",
    location: "India",
    responsibilities: [
      "Delivered retail analytics dashboards enabling data-driven category and performance decisions.",
      "Partnered with data engineering teams to ensure clean, consistent, validated data across domains.",
      "Mentored junior analysts and standardized reporting frameworks for consistency and scalability.",
    ],
    achievements: [
      "Improved sales-tracking accuracy by 20% with retail analytics dashboards.",
      "Applied the Apriori algorithm on BOM hierarchies — reduced inventory costs by 15% and improved supply-chain accuracy by 20%.",
    ],
    tech: ["Power BI", "Qlik", "Python", "SQL"],
  },
  {
    company: "Icon Business Solutions",
    role: "Senior BI Consultant",
    start: "Jun 2017",
    end: "Mar 2020",
    location: "India",
    responsibilities: [
      "Led and mentored a BI team of 10+ members across multiple client engagements.",
      "Designed and delivered KPI dashboards across Banking, Retail, Automobile, Pharmaceutical, and Manufacturing domains.",
      "Implemented data quality controls and maker/checker governance.",
    ],
    achievements: [
      "Improved delivery efficiency by 25% and data accessibility by 30%.",
      "Engineered a connector-less SAP-to-BI integration with the ABAP team, refreshing the BI app daily directly from SAP.",
      "Re-engineered a heavy transformation-layer report from monthly to daily parallel runs at minimal cost — earning multiple client appreciations.",
      "Optimized ETL and reporting — cut report time from 36h to under 2h and server load by 85%; raised data accuracy by 35%.",
    ],
    tech: ["QlikView", "Qlik Sense", "SAP", "ETL", "SQL"],
  },
  {
    company: "Autonetics Centre",
    role: "IoT Developer (Intern)",
    start: "Feb 2017",
    end: "Jun 2017",
    location: "Nashik, India",
    responsibilities: [
      "Built an assistive smart-stick solution for visually impaired users.",
      "Integrated Raspberry Pi, sensors, and an Android application.",
    ],
    achievements: ["Improved mobility and obstacle detection by 30%."],
    tech: ["Raspberry Pi", "Sensors", "Android", "IoT"],
  },
];

/* -------------------------------------------------------------------------- */
/*  EDUCATION                                                                  */
/* -------------------------------------------------------------------------- */

export const education: EducationItem[] = [
  {
    institution: "Birla Institute of Technology and Science (BITS), Pilani",
    degree: "M.Tech, Data Science & Engineering",
    start: "Apr 2021",
    end: "Apr 2023",
    details: "Advanced study in data science, engineering, and applied machine learning.",
  },
  {
    institution: "Pune University, India",
    degree: "B.E., Computer Science & Engineering",
    start: "Jul 2013",
    end: "Jun 2017",
    details: "Foundation in computer science, software engineering, and systems.",
  },
];

/* -------------------------------------------------------------------------- */
/*  CERTIFICATIONS & ACHIEVEMENTS                                              */
/* -------------------------------------------------------------------------- */

export const certifications: CertItem[] = [
  { title: "Databricks Certified Machine Learning Professional", issuer: "Databricks", date: "2026", credentialUrl: "https://credentials.databricks.com/9bd0a8e5-659b-48e8-bb45-22e153dfcba7" },
  { title: "Databricks Certified Machine Learning Engineer Associate", issuer: "Databricks", date: "2026", credentialUrl: "https://credentials.databricks.com/abc9145a-9b33-40ff-9468-8ed2e9001e01" },
  { title: "Databricks Certified Data Engineer Professional", issuer: "Databricks", date: "2026", credentialUrl: "https://credentials.databricks.com/ac4a5f55-e6a4-485b-824f-88ec50583dce" },
  { title: "Databricks Certified Associate Developer for Apache Spark", issuer: "Databricks", date: "2026", credentialUrl: "https://credentials.databricks.com/494a4a7c-7bc0-4fb0-bed8-d89efdc95c01" },
  { title: "Databricks Certified Data Analyst Associate", issuer: "Databricks", date: "2026", credentialUrl: "https://credentials.databricks.com/33106153-5b7d-45fe-9f75-8083d6e7c67c" },
  { title: "Databricks Certified Generative AI Engineer Associate", issuer: "Databricks", date: "2026" },
  { title: "Databricks Certified Data Engineer Associate", issuer: "Databricks", date: "2026", credentialUrl: "https://credentials.databricks.com/c010ab23-248d-4633-bd99-7a09cf0a37c9" },
  { title: "Databricks Certified Context Engineer Associate", issuer: "Databricks", date: "2026", credentialUrl: "https://credentials.databricks.com/1a084e58-8e9e-49bd-98ac-108c9bade007" },
  { title: "Power BI Data Analyst Associate (PL-300)", issuer: "Microsoft", date: "2026", credentialUrl: "https://learn.microsoft.com/api/credentials/share/en-us/AmanBohra-0775/A04E9E275E7357D3?sharingId=E28C25AADE85123D" },
  { title: "Qlik Sense Data Architect (QSDA 2024)", issuer: "Qlik", date: "2024", credentialUrl: "https://www.credly.com/badges/7fc2c6d4-fd70-4f77-be1a-6f8ed6c3fb51" },
  { title: "Qlik Sense Business Analyst (QSBA)", issuer: "Qlik", date: "2024", credentialUrl: "https://www.credly.com/badges/06024566-c502-48fa-831d-eafd491ac920" },
  { title: "QlikView 12 Data Architect (QV12DA)", issuer: "Qlik", date: "2024", credentialUrl: "https://www.credly.com/badges/664583d3-6a7d-46a0-848b-9eabfd552859" },
  { title: "QlikView 12 Business Analyst (QVBA)", issuer: "Qlik", date: "2024", credentialUrl: "https://www.credly.com/badges/ec7d4901-e2cb-40e1-b759-30d77f2b584d" },
  { title: "SQL (Advanced)", issuer: "HackerRank", date: "2024", credentialUrl: "https://www.hackerrank.com/certificates/49ce25efd08a" },
];

/** Non-certificate honors & recognition, shown alongside certifications. */
export const achievements: string[] = [
  "Star Performer & Volunteer of the Month recognition",
  "AI Mentor (CSR Initiative) supporting rural education",
  "Active innovation contributor in workshops & hackathons",
  "Multiple client appreciations for delivery & optimization",
];

/* -------------------------------------------------------------------------- */
/*  SERVICES                                                                   */
/* -------------------------------------------------------------------------- */

export const services: Service[] = [
  { title: "BI Dashboard Development", description: "Executive-ready dashboards in Qlik Sense, QlikView, NPrinting, and Power BI that turn data into decisions.", icon: "BarChart3", rate: "From $500 / dashboard (fixed scope)" },
  { title: "Analytics & BI Delivery Management", description: "End-to-end analytics/BI project and module leadership — requirements, delivery governance, and stakeholder management.", icon: "ClipboardCheck", rate: "$70–90/hr or project-based" },
  { title: "ETL & Data Pipelines", description: "Reusable, high-accuracy ETL pipelines and process automation across diverse data sources and enterprise systems.", icon: "Workflow", rate: "$60–90/hr or from $2,000/project" },
  { title: "KPI & Analytics Consulting", description: "KPI discovery, requirement analysis, and analytics strategy aligned to business and insurance goals.", icon: "Lightbulb", rate: "$60–80/hr" },
  { title: "Data Science & Advanced Analytics", description: "Predictive analytics, forecasting, and ML/AI initiatives translated into business-facing decisions.", icon: "Brain", rate: "$70–100/hr" },
  { title: "AI & GenAI Solutions", description: "LLM-powered assistants, RAG pipelines, and generative-AI proofs of concept using Claude, OpenAI, and LangChain.", icon: "Sparkles", rate: "$80–110/hr or scoped POC" },
  { title: "Certification Coaching & Mentoring", description: "1:1 exam prep and mentoring for Databricks, Power BI (PL-300), and Qlik certifications, drawing on my own 13 certifications.", icon: "GraduationCap", rate: "$30–50/hr" },
];

/* -------------------------------------------------------------------------- */
/*  DASHBOARD GALLERY  (replace images with real dashboard screenshots)        */
/* -------------------------------------------------------------------------- */

export const creativeWork: CreativeWork[] = [
  { title: "[PLACEHOLDER] Insurance KPI Dashboard", category: "Qlik Sense", image: "" },
  { title: "[PLACEHOLDER] Distributor Performance", category: "Power BI", image: "" },
  { title: "[PLACEHOLDER] International Reporting", category: "Qlik NPrinting", image: "" },
  { title: "[PLACEHOLDER] Retail Analytics", category: "Power BI", image: "" },
  { title: "[PLACEHOLDER] Supply Chain Insights", category: "QlikView", image: "" },
  { title: "[PLACEHOLDER] Advanced Analytics", category: "Databricks", image: "" },
];

/* -------------------------------------------------------------------------- */
/*  TESTIMONIALS  (clearly-marked placeholder content — replace with real)    */
/* -------------------------------------------------------------------------- */

export const testimonials: Testimonial[] = [
  {
    quote: `I had the pleasure of working with Aman as part of our international team, and I can confidently say he is an exceptional professional. Aman consistently demonstrated strong collaboration skills and played a key role in fostering positive team dynamics, even across different time zones. His expertise in dashboard development is particularly impressive — he brings both technical depth and a thoughtful approach to building solutions that are functional, intuitive, and impactful, with the customer at the heart of it. He has a sharp analytical mindset and excels at investigating and troubleshooting complex issues.`,
    name: "Colleen R. Cutler, PMP",
    title: "Portfolio / Delivery Lead, FAST at Verisk",
    linkedin: "https://www.linkedin.com/in/colleencutler/",
    relation: "Aman's client",
  },
  {
    quote: `Aman is the type of person I would go to battle with every day of the week and twice on Sunday. During his time on my team, he took pride in his work, checked in regularly, and made improvements based on the feedback he received. Aman is not only a valuable contributor, but also someone who exhibits the potential for much more. He has my recommendation.`,
    name: "Tom C",
    title: "Product Owner | Data Engineering",
    linkedin: "https://www.linkedin.com/in/tom-c-ab068312/",
    relation: "Managed Aman directly",
  },
  {
    quote: `Aman is a very knowledgeable and responsible Qlik developer. Very good work ethic and a great team player. Self-starter and very experienced — able to deliver quality results on aggressive schedules with minimal guidance.`,
    name: "Eugene Layvant",
    title: "Data Analytics Manager",
    linkedin: "https://www.linkedin.com/in/eugene-layvant-40b9454/",
    relation: "Worked on the same team",
  },
  {
    quote: `I had the pleasure of working closely with Aman on a recent project, and I can confidently say he is an outstanding professional who brings positivity and expertise to the workplace. His commitment to excellence is evident in every task, ensuring deliverables are met within the given timeframe. Aman also has a talent for teaching others — his guidance has helped enhance my own Qlik skillset. His technical proficiency and genuine willingness to help make him an exceptional asset to any team.`,
    name: "Jennifer Lee",
    title: "Data Analyst",
    linkedin: "https://www.linkedin.com/in/jennifer-p-lee/",
    relation: "Worked on the same team",
  },
  {
    quote: `I had the pleasure of mentoring Aman during his M.Tech final project at BITS Pilani — "FMCG Retail Sales Analysis." He excelled in utilizing Python's analytical tools for accurate sales predictions and market insights, and his expertise in market basket analysis and association rules revealed intricate consumer behaviors that aid tailored marketing strategies. His commitment to excellence and adaptability make him a valuable asset to any organization. I highly recommend him.`,
    name: "Ravi Shankar S",
    title: "Solution Architect — AI/ML",
    linkedin: "https://www.linkedin.com/in/dravidshankar/",
    relation: "Aman's mentor (BITS Pilani)",
  },
  {
    quote: `Good technical knowledge and a unique approach to problem solving.`,
    name: "Govind Yadav",
    title: "Senior Consultant | Qlik, Power BI",
    linkedin: "https://www.linkedin.com/in/yadavgovind/",
    relation: "Worked on the same team",
  },
  {
    quote: `Aman is very hard working and extremely good and fast in understanding business and functional concepts.`,
    name: "Jhony Gajwani",
    title: "Global Head IT, Digital Transformation & Innovation",
    linkedin: "https://www.linkedin.com/in/jhony-gajwani-91a22073/",
    relation: "Senior to Aman",
  },
  {
    quote: `Aman is a very hardworking professional. He is very skillful in business analytics, especially QlikView, and did a great job optimising our applications to a great extent. Aman, you will be an asset to any team you work with. I wish you all the very best!`,
    name: "Anjali Bhatia",
    title: "Head IT (India), SKF Automotive",
    linkedin: "https://www.linkedin.com/in/anjali-bhatia-85819ab/",
    relation: "Managed Aman directly",
  },
  {
    quote: `Aman was a great professional to work with. He helped me a lot to get started with Business Intelligence tools and to understand internal processes. Anyone would be lucky to have Aman as an instructor.`,
    name: "Sesha Niranjan",
    title: "Product Management | Scrum Master (CSM®)",
    linkedin: "https://www.linkedin.com/in/%E3%82%BB%E3%82%B7%E3%83%A3%E3%80%80%E3%83%8B%E3%83%A9%E3%83%B3%E3%82%B8%E3%83%A3%E3%83%B3-sesha-niranjan-68a843b4/",
    relation: "Worked with Aman",
  },
  {
    quote: `Aman is a very positive and optimistic person and a hard-working teammate. He has a willingness to learn new things and the perseverance to solve any given problem. I recommend Aman for business intelligence developer profiles.`,
    name: "Vikraant Pai",
    title: "Data Science @ Google",
    linkedin: "https://www.linkedin.com/in/vikraant-pai-5086a39b/",
    relation: "Managed Aman directly",
  },
  {
    quote: `Aman is a very responsible person and I had the pleasure to work with him on a few projects. He honours timelines and ensures delivery within them — in my case, well before the timeline. With his hardworking attitude, I am sure Aman is going to climb the ladder very fast.`,
    name: "Karna Markan",
    title: "Business Vertical Head — Automotive Aftermarket & OEMs",
    linkedin: "https://www.linkedin.com/in/karna-markan-b1703324/",
    relation: "Aman's client",
  },
  {
    quote: `He is good at managing scattered things and also manages colleagues and clients very politely.`,
    name: "Jyoti Rana",
    title: "BI Development / Consultant — Qlik, NPrinting, Power BI",
    linkedin: "https://www.linkedin.com/in/jyoti-rana-755781107/",
    relation: "Worked on the same team",
  },
  {
    quote: `He is a very enthusiastic BI developer and gives his best in work.`,
    name: "Shubhanshu Vishwakarma",
    title: "Senior Salesforce / Vlocity Developer at TCS",
    linkedin: "https://www.linkedin.com/in/shubhanshu-vishwakarma01/",
    relation: "Aman's mentor",
  },
  {
    quote: `I worked with Aman on a most complex business intelligence assignment at an automobile major in India. I was extremely impressed by his technical prowess and his curiosity to learn new things. I recommend him for business intelligence and project management roles.`,
    name: "Kalyan Sahai Kumhar",
    title: "Business Analyst | Digital Transformation | CRM & DMS",
    linkedin: "https://www.linkedin.com/in/kalyan-sahai-kumhar-2bb7042a/",
    relation: "Managed Aman directly",
  },
];

/* -------------------------------------------------------------------------- */
/*  PHILOSOPHY — learning → value → sharing → growth                           */
/* -------------------------------------------------------------------------- */

export const philosophy = {
  title: "Learning that compounds — for everyone",
  intro:
    "Over 9+ years I've come to believe that a career isn't a collection of credentials — it's a compounding loop: learn something real, apply it until it changes an outcome, then share it so the whole team rises with you. Every certification, course, degree, and engagement in my journey was a deliberate step in that loop. Here's how I try to work.",
  lead:
    "The credential was never the point. The point was to close a real gap, turn it into value the business can use, and pass it on — because knowledge only compounds when it's shared. This is the through-line from a smart-cane internship to leading an international insurance analytics module.",
  principles: [
    {
      title: "Learn deliberately, not for the badge",
      text: "I treat learning as a roadmap, not a trophy shelf. My 12 certifications, 40+ courses, and M.Tech in Data Science weren't random — each one closed a specific gap and mapped a clear progression: BI tools → SQL & data modeling → cloud data engineering → Apache Spark → Generative AI.",
      evidence: "12 certifications · 40+ courses · M.Tech (BITS Pilani)",
    },
    {
      title: "Understand deeply before you build",
      text: "I pursued a Data Science M.Tech while working full-time — not to become a data scientist, but to understand the discipline well enough to translate it. You can't bridge two worlds you only half-understand, so I go deep enough to speak both business and technical fluently.",
      evidence: "M.Tech in Data Science & Engineering, completed while working",
    },
    {
      title: "Turn learning into decisions",
      text: "Knowledge only counts when it changes an outcome. A model in a notebook or a dashboard nobody opens is wasted effort. I optimize for the moment data becomes a decision — the report that ships daily, the KPI leadership trusts, the model output someone actually acts on.",
      evidence: "Reporting accuracy +25% · a 36-hour report cut to under 2 hours",
    },
    {
      title: "Make the data trustworthy first",
      text: "Insight is worthless if people don't believe the numbers. I build data-quality controls, maker/checker governance, and one governed source of truth into delivery — so teams can act with confidence instead of re-arguing whose numbers are right.",
      evidence: "Data accuracy +35% · audit findings −15%",
    },
    {
      title: "Solve the problem, not just the ticket",
      text: "The stakeholder's first request is rarely the real question. I dig for the underlying business problem and question the shape of the work itself — which is how a '36-hour report' became a design problem, and a retail algorithm became a supply-chain lever.",
      evidence: "Connector-less SAP integration · Apriori applied to BOM data (−15% inventory cost)",
    },
    {
      title: "Share and standardize",
      text: "I mentor junior analysts and standardize reusable reporting frameworks so quality doesn't depend on any single person. When I leave a team, the capability should stay — that's the difference between doing the work and multiplying it.",
      evidence: "Led & mentored a 10+ member BI team · standardized reporting frameworks",
    },
    {
      title: "Teach beyond the workplace",
      text: "Learning compounds fastest when it's given away. I volunteer as an AI mentor for rural government-school students, mentored a team to national runner-up at BRAINIAC 2025, and speak on BI and AI — widening access to skills I was lucky to build.",
      evidence: "eVidyaloka × Microsoft (BRAIN) · BRAINIAC 2025 mentor · guest speaker, Terna College",
    },
    {
      title: "Grow together, not alone",
      text: "The best analytics is a team sport across business, data engineering, and data science. I coordinate cross-functional teams and optimize for shared understanding over individual heroics — because a decision the whole room trusts beats a brilliant chart no one adopts.",
      evidence: "Coordinating analysts, engineers & data scientists across time zones",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  EXPLAINED SIMPLY — complex concepts in layman language                     */
/* -------------------------------------------------------------------------- */

export interface Concept {
  term: string;
  plain: string; // plain-language explanation
  analogy: string; // everyday analogy
}
export interface ConceptGroup {
  category: string;
  items: Concept[];
}

export const conceptsIntro =
  "I believe anyone can understand data — it's usually just explained badly. Here are the ideas I work with every day, in plain language, each with an everyday analogy. No jargon required.";

export const conceptGroups: ConceptGroup[] = [
  {
    category: "Business Intelligence & Analytics",
    items: [
      {
        term: "Business Intelligence (BI)",
        plain: "Turning a company's messy raw data into clear reports and dashboards that help people make decisions.",
        analogy: "Like a car dashboard — it shows your speed and fuel so you can drive well without looking under the hood.",
      },
      {
        term: "Analytics vs. BI",
        plain: "BI tells you what happened. Analytics digs into why it happened and what to do next.",
        analogy: "BI is the scoreboard; analytics is the coach explaining how to win the next game.",
      },
      {
        term: "KPI (Key Performance Indicator)",
        plain: "The handful of numbers that actually tell you whether you're winning — not every number you could measure.",
        analogy: "Like the key grades on a report card, not every doodle in the notebook.",
      },
      {
        term: "Dashboard",
        plain: "A single screen that shows the most important numbers at a glance, updated automatically.",
        analogy: "Like an airplane cockpit — everything vital in one view, no digging required.",
      },
      {
        term: "Self-Service BI",
        plain: "Tools that let business users answer their own data questions without waiting on a technical team.",
        analogy: "A salad bar — you build your own plate instead of ordering from the kitchen each time.",
      },
      {
        term: "Data Storytelling",
        plain: "Presenting data as a clear narrative — context, insight, and 'so what' — not just charts.",
        analogy: "A good tour guide explains what you're seeing, instead of just pointing at buildings.",
      },
    ],
  },
  {
    category: "Data & Data Engineering",
    items: [
      {
        term: "Data Warehouse",
        plain: "One organized, cleaned-up store where a company's data lives so it's ready for reporting.",
        analogy: "A well-labeled library instead of papers scattered across a hundred desks.",
      },
      {
        term: "Data Lake vs. Lakehouse",
        plain: "A lake stores everything raw and flexible; a lakehouse adds structure so it's flexible and reliable.",
        analogy: "A lake where everything is dumped in — vs. a lake with organized docks and clear signs.",
      },
      {
        term: "ETL vs. ELT",
        plain: "Both move data from source systems into a warehouse. ETL cleans it before loading; ELT loads it first, then cleans inside the warehouse.",
        analogy: "Washing vegetables before putting them in the fridge (ETL) vs. after (ELT).",
      },
      {
        term: "Star Schema",
        plain: "Organizing data as one central 'facts' table (the numbers) linked to 'dimension' tables (the context).",
        analogy: "A shop receipt (the facts) linked to details about the store, product, and date (the dimensions).",
      },
      {
        term: "SQL",
        plain: "The language used to ask precise questions of data stored in tables.",
        analogy: "Ordering exactly what you want from a huge menu by asking clearly, instead of taking whatever arrives.",
      },
      {
        term: "Data Governance",
        plain: "The rules and checks that keep data accurate, consistent, and trustworthy across a company.",
        analogy: "Traffic rules — so everyone moves safely and predictably instead of chaos.",
      },
      {
        term: "Data Pipeline",
        plain: "The automated plumbing that moves and transforms data from source systems to where it's used.",
        analogy: "Water pipes carrying supply from the reservoir to your tap — treated along the way.",
      },
      {
        term: "Delta Lake",
        plain: "A storage layer that makes a data lake reliable — versioned, consistent, and safe to update.",
        analogy: "Track-changes and autosave, but for your entire data lake.",
      },
      {
        term: "Data Mart",
        plain: "A focused slice of the warehouse built for one team or subject area.",
        analogy: "A specialty shop instead of a giant supermarket — just what one department needs.",
      },
      {
        term: "OLTP vs. OLAP",
        plain: "OLTP systems run day-to-day transactions; OLAP systems are built for analysis and reporting.",
        analogy: "The cash register (OLTP) vs. the end-of-month sales review (OLAP).",
      },
      {
        term: "Batch vs. Real-time",
        plain: "Batch processes data in scheduled chunks; real-time handles it the moment it arrives.",
        analogy: "Doing all the laundry on Sunday (batch) vs. washing each shirt as you take it off (real-time).",
      },
      {
        term: "Semantic Layer",
        plain: "A friendly business-terms layer over raw tables so everyone uses the same definitions.",
        analogy: "A translator that turns cryptic database column names into words the business actually says.",
      },
    ],
  },
  {
    category: "Data Science & AI",
    items: [
      {
        term: "Machine Learning",
        plain: "Teaching a computer to spot patterns from lots of examples, instead of writing every rule by hand.",
        analogy: "Learning to recognize cats by seeing many cats — not by memorizing a dictionary definition.",
      },
      {
        term: "Predictive Analytics / Forecasting",
        plain: "Using past patterns to estimate what's most likely to happen next.",
        analogy: "Checking the forecast to decide whether to carry an umbrella today.",
      },
      {
        term: "Market Basket Analysis",
        plain: "Finding which items tend to be bought (or used) together, so you can plan around it.",
        analogy: "Noticing people who buy bread often buy butter — so you place them side by side.",
      },
      {
        term: "Anomaly Detection",
        plain: "Automatically flagging the unusual cases that deserve a human's attention.",
        analogy: "A smoke alarm — it stays quiet until something is genuinely off.",
      },
      {
        term: "Generative AI / LLM",
        plain: "AI that produces text or code by predicting likely next words, learned from enormous amounts of text.",
        analogy: "An extremely well-read assistant who can draft, summarize, and explain on request.",
      },
      {
        term: "RAG (Retrieval-Augmented Generation)",
        plain: "Giving an AI your trusted documents to answer from, so it stays grounded instead of guessing.",
        analogy: "An open-book exam — the AI answers using your notes, not from memory alone.",
      },
      {
        term: "Feature Engineering",
        plain: "Turning raw data into the meaningful signals a model can actually learn from.",
        analogy: "Prepping ingredients before cooking — the model only tastes what you prepare.",
      },
      {
        term: "Overfitting",
        plain: "When a model memorizes the training examples instead of learning the general pattern.",
        analogy: "A student who memorizes past papers but fails the real exam.",
      },
      {
        term: "Precision vs. Recall",
        plain: "Precision: of what you flagged, how much was right. Recall: of all the real cases, how many you caught.",
        analogy: "A fishing net — precision is how little junk you haul in; recall is how few real fish you miss.",
      },
      {
        term: "Prompt Engineering",
        plain: "Writing clear, structured instructions so an AI gives useful, reliable answers.",
        analogy: "Briefing a talented new hire well — good instructions, good results.",
      },
      {
        term: "Vector Database",
        plain: "A store that finds information by meaning rather than exact keywords — the memory behind RAG.",
        analogy: "A librarian who finds books by what they're about, not just their exact title.",
      },
    ],
  },
  {
    category: "Insurance Analytics",
    items: [
      {
        term: "Written vs. Earned Premium",
        plain: "Written premium is all the premium on policies sold in a period. Earned premium is the portion for coverage already provided.",
        analogy: "Paying a year's gym fee upfront is 'written'; each month you actually use is 'earned'.",
      },
      {
        term: "Loss Ratio",
        plain: "Claims paid divided by premiums earned — a core measure of an insurer's health. Lower is better.",
        analogy: "Spending vs. income — you want to pay out less than you take in.",
      },
      {
        term: "Combined Ratio",
        plain: "Loss ratio plus expense ratio. Below 100% means an underwriting profit; above 100% means a loss.",
        analogy: "Total costs vs. what you earned — under 100% and you kept money.",
      },
      {
        term: "Distributor / Producer Performance",
        plain: "Measuring how much business each agent or broker brings in — and how profitable that business is.",
        analogy: "A sales leaderboard: who sells the most, and whose sales actually pay off.",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  FAQ  (answer-engine / AI-search optimized — factual)                       */
/* -------------------------------------------------------------------------- */

export const faqs: { q: string; a: string }[] = [
  {
    q: "Who is Aman Bohra?",
    a: "Aman Bohra is a Senior Analytics & Business Intelligence professional with 9+ years of experience. He currently leads the International module of a major US Property & Casualty (P&C) insurance engagement at LTIMindtree, owning analytics delivery end to end.",
  },
  {
    q: "What does Aman Bohra specialize in?",
    a: "Business Intelligence, analytics delivery leadership, data visualization, insurance analytics, and translating data-science and advanced-analytics outputs into business decisions.",
  },
  {
    q: "What technologies and tools does Aman Bohra use?",
    a: "Qlik Sense, QlikView, Qlik NPrinting, Power BI, Databricks, SQL, Python, ETL/ELT, and data warehousing — plus data-quality and governance controls.",
  },
  {
    q: "What industries has Aman Bohra worked in?",
    a: "Insurance (P&C), Banking & Financial Services, Retail, Automotive, Pharmaceutical, Manufacturing, and Supply Chain — across 10+ enterprise clients.",
  },
  {
    q: "What certifications does Aman Bohra hold?",
    a: "14 professional certifications: eight Databricks (Machine Learning Professional, Machine Learning Engineer Associate, Data Engineer Professional, Associate Developer for Apache Spark, Data Analyst, Generative AI Engineer, Data Engineer Associate, and Context Engineer Associate), Microsoft Power BI Data Analyst Associate (PL-300), four Qlik (Qlik Sense Business Analyst and Data Architect, QlikView 12 Business Analyst and Data Architect), and HackerRank SQL (Advanced).",
  },
  {
    q: "What measurable results has Aman Bohra delivered?",
    a: "He cut a 36-hour report to under 2 hours (a 94% reduction), reduced server load by 85%, improved data accuracy by 35% and reporting accuracy by 25%, reduced audit findings by 15%, and cut inventory costs by 15% via market-basket analysis.",
  },
  {
    q: "What roles is Aman Bohra open to?",
    a: "Analytics Lead, BI Manager, Analytics Delivery Lead, Data & Analytics Manager, and Insurance Analytics Lead roles.",
  },
  {
    q: "Where can I see Aman Bohra's work or contact him?",
    a: "Portfolio: https://amandbohra.github.io/portfolio/ · GitHub: github.com/AmanDBohra · LinkedIn: linkedin.com/in/aman-bohra · Email: bohraaman@gmail.com.",
  },
];

/* -------------------------------------------------------------------------- */
/*  NAVIGATION                                                                 */
/* -------------------------------------------------------------------------- */

export const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "industries", label: "Industries" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Work" },
  { id: "learn", label: "Explained" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];
