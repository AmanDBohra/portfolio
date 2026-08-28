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
    "9+ years leading analytics delivery across insurance, banking, retail, and more. Currently International Module Lead for a major US P&C insurer.",
  heroSupport2:
    "I've cut reporting times by 94%, improved data accuracy by 35%, and reduced audit findings by 15%.",
  intro:
    "Analytics and BI professional with 9+ years delivering data-driven solutions across the full analytics lifecycle — from business requirements through data, visualization, and decision support. I currently lead the International module of an engagement with a major US Property & Casualty (P&C) insurer at LTIMindtree, turning complex insurance requirements into decision-ready insights.",
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
  avatar: `${import.meta.env.BASE_URL}avatar.jpg`,
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
  openTo: "Open to Analytics Lead · BI Manager · Analytics Delivery Lead · Data & Analytics roles",
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
    { value: "8", label: "Certifications" },
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
    skills: ["Databricks", "ETL Development", "Data Pipelines", "Data Warehousing", "Data Quality Controls"],
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
    context: "LTIMindtree · US Insurance Major",
    description:
      "Lead analytics and BI delivery for the International module of a major US Property & Casualty insurer, supporting insurance KPIs, operational and management reporting, and international business-performance monitoring.",
    problem:
      "Complex international insurance operations needed unified, decision-ready analytics and reporting.",
    tech: ["Qlik Sense", "Power BI", "Qlik NPrinting", "Databricks", "SQL"],
    features: [
      "End-to-end delivery from requirements to deployment & support",
      "Insurance KPIs and international performance monitoring",
      "Cross-functional coordination of analysts, engineers & data scientists",
      "Model outputs transitioned into business-facing dashboards",
    ],
    image: "",
    featured: true,
  },
  {
    name: "Distributor Performance Management KPIs",
    context: "LTIMindtree · Insurance",
    description:
      "A KPI reporting suite tracking distributor performance including Written & Earned Premium metrics for international operations.",
    problem: "Leadership lacked accurate, timely visibility into distributor performance.",
    tech: ["Qlik Sense", "Power BI", "ETL", "Data Warehousing"],
    features: [
      "Improved reporting accuracy by 25%",
      "Automation improving process efficiency by 30%",
      "Governance-aligned insights; audit findings reduced 15%",
      "Stronger data-driven decision-making",
    ],
    image: "",
    featured: true,
  },
  {
    name: "Connector-less SAP-to-BI Integration",
    context: "Icon Business Solutions · Enterprise",
    description:
      "Engineered a connector-less SAP-to-BI data integration with the ABAP team, refreshing the BI application daily directly from SAP without any direct data-connector dependency.",
    problem: "Daily BI refresh was blocked by SAP data-connector limitations.",
    tech: ["SAP", "ABAP (collab)", "QlikView", "ETL"],
    features: [
      "Daily direct-from-SAP refresh, no data connector",
      "Delivered within a tight deadline",
      "Data-refactoring techniques for reliability",
    ],
    image: "",
    featured: true,
  },
  {
    name: "Retail Analytics Dashboards",
    context: "Fractal Analytics · Retail",
    description:
      "Retail analytics dashboards enabling data-driven category and performance decisions on clean, validated data.",
    problem: "Fragmented data made sales tracking unreliable and slow to act on.",
    tech: ["Power BI", "Qlik", "SQL", "ETL"],
    features: [
      "Improved sales-tracking accuracy by 20%",
      "Clean, consistent, validated data across domains",
      "Standardized, reusable reporting frameworks",
    ],
    image: "",
    featured: false,
  },
  {
    name: "Market Basket Analysis (Apriori)",
    context: "Fractal Analytics · Supply Chain",
    description:
      "Applied the Apriori algorithm to analyze Bill-of-Materials (BOM) hierarchies and uncover purchasing patterns.",
    problem: "High inventory costs and imprecise supply-chain planning.",
    tech: ["Python", "Apriori", "Advanced Analytics"],
    features: [
      "Reduced inventory costs by 15%",
      "Improved supply-chain accuracy by 20%",
      "Actionable association rules for planning",
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
      "Re-engineered a monolithic monthly report — a 36-hour job that locked the BI server — into a daily parallel run finishing in under two hours.",
    problem: "A critical report ran 36 hours monthly and hung the server; the business had accepted it as normal.",
    tech: ["QlikView", "ETL", "SQL", "Data Warehousing"],
    features: [
      "Runtime cut 94% — from 36 hours to under 2 hours",
      "Server load reduced 85%; no new infrastructure",
      "Monthly batch converted to a daily parallel run",
      "Data accuracy improved 35% via quality controls",
    ],
    image: "",
    featured: true,
  },
  {
    name: "Assistive IoT Smart Stick",
    context: "Autonetics Centre · Internship",
    description:
      "A smart mobility aid for visually impaired users combining sensors, Raspberry Pi, and Android integration.",
    problem: "Visually impaired users needed better obstacle detection and mobility.",
    tech: ["Raspberry Pi", "Sensors", "Android", "IoT"],
    features: [
      "Improved mobility & obstacle detection by 30%",
      "Real-time sensor feedback",
      "Android app integration",
    ],
    image: "",
    featured: false,
  },

  /* ---- Self-built demonstration projects (synthetic data, open code) ---- */
  {
    name: "ETL → Star Schema Pipeline",
    context: "Demo · Data Engineering · ETL/ELT",
    description:
      "A working data-engineering pipeline: raw operational rows → cleaned staging → a dimensional star schema (fact + dimensions) in SQL, ready for BI.",
    problem: "Dashboards are only as trustworthy as the model beneath them.",
    tech: ["Python", "SQL", "SQLite", "Star Schema", "ELT"],
    features: [
      "Extract → transform → load, end to end",
      "Conformed dimensions + fact table",
      "Analytical SQL a BI tool sits on",
    ],
    github: "https://github.com/AmanDBohra/portfolio/blob/main/notebooks/etl_star_schema_pipeline.ipynb",
    image: "",
    featured: false,
  },
  {
    name: "GenAI: RAG Analytics Assistant (POC)",
    context: "Demo · Generative AI",
    description:
      "A governed Retrieval-Augmented Generation pipeline that answers plain-English questions from an analytics knowledge base — grounded, with a clear LLM plug-in point.",
    problem: "Business users want to ask questions of analytics docs — without hallucinated numbers.",
    tech: ["Python", "RAG", "TF-IDF Retrieval", "LLM (Claude/OpenAI)"],
    features: [
      "Real retrieval over a knowledge base",
      "Answers only from context (honest 'I don't know')",
      "Swappable, cost-controllable LLM step",
    ],
    github: "https://github.com/AmanDBohra/portfolio/blob/main/notebooks/genai_rag_analytics_assistant.ipynb",
    image: "",
    featured: false,
  },
  {
    name: "Anomaly Detection on Claims",
    context: "Demo · Data Science",
    description:
      "An Isolation Forest surfaces the most unusual insurance claims and turns anomaly scores into a prioritized, explainable review queue.",
    problem: "Unusual claims (fraud, error, data issues) deserve a human's attention first.",
    tech: ["Python", "scikit-learn", "Isolation Forest"],
    features: [
      "Unsupervised — no labelled fraud needed",
      "Ranked review worklist for investigators",
      "Plugs into BI as a decision-support feed",
    ],
    github: "https://github.com/AmanDBohra/portfolio/blob/main/notebooks/anomaly_detection_claims.ipynb",
    image: "",
    featured: false,
  },
  {
    name: "Interactive BI Dashboards (6 industries)",
    context: "Demo · Business Intelligence",
    description:
      "A self-contained, interactive analytics dashboard across six industries with KPI cards, trend/mix/breakdown charts, a ranked table, and region/period filters.",
    problem: "Show dashboard design and analytical thinking without exposing client data.",
    tech: ["JavaScript", "Chart.js", "KPI Design", "Data Viz"],
    features: [
      "Six domain-specific dashboards",
      "Live region & period filters",
      "Synthetic data, clearly labelled",
    ],
    demo: site.dashboardDemoUrl,
    image: "",
    featured: false,
  },
];

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
  { title: "Databricks Certified Data Analyst Associate", issuer: "Databricks" },
  { title: "Databricks Certified Data Engineer Associate", issuer: "Databricks" },
  { title: "Databricks Certified Generative AI Engineer Associate", issuer: "Databricks" },
  { title: "Power BI Data Analyst Associate (PL-300)", issuer: "Microsoft" },
  { title: "Qlik Sense Business Analyst (QSBA)", issuer: "Qlik" },
  { title: "Qlik Sense Data Architect (QSDA 2024)", issuer: "Qlik", date: "2024" },
  { title: "QlikView 12 Business Analyst (QVBA)", issuer: "Qlik" },
  { title: "QlikView 12 Data Architect (QV12DA)", issuer: "Qlik" },
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
  { title: "BI Dashboard Development", description: "Executive-ready dashboards in Qlik Sense, QlikView, NPrinting, and Power BI that turn data into decisions.", icon: "BarChart3" },
  { title: "Analytics & BI Delivery Management", description: "End-to-end analytics/BI project and module leadership — requirements, delivery governance, and stakeholder management.", icon: "ClipboardCheck" },
  { title: "ETL & Data Pipelines", description: "Reusable, high-accuracy ETL pipelines and process automation across diverse data sources and enterprise systems.", icon: "Workflow" },
  { title: "KPI & Analytics Consulting", description: "KPI discovery, requirement analysis, and analytics strategy aligned to business and insurance goals.", icon: "Lightbulb" },
  { title: "Data Science & Advanced Analytics", description: "Predictive analytics, forecasting, and ML/AI initiatives translated into business-facing decisions.", icon: "Brain" },
  { title: "AI & GenAI Solutions", description: "LLM-powered assistants, RAG pipelines, and generative-AI proofs of concept using Claude, OpenAI, and LangChain.", icon: "Sparkles" },
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
    a: "Eight: Databricks Certified Data Analyst, Data Engineer, and Generative AI Engineer Associate; Microsoft Power BI Data Analyst Associate (PL-300); and four Qlik certifications (Qlik Sense Business Analyst and Data Architect, QlikView 12 Business Analyst and Data Architect).",
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
  { id: "projects", label: "Work" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];
