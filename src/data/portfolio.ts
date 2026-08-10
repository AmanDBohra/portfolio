/**
 * =============================================================================
 *  PORTFOLIO CONTENT  —  Aman Bohra
 * =============================================================================
 *  Populated from Aman's resume. Feel free to edit any field below — the whole
 *  site is driven by this data. Items marked [PLACEHOLDER] are examples you can
 *  replace (e.g. testimonials, dashboard screenshots).
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
  /** Leave "" to hide the button (e.g. confidential client work) */
  github?: string;
  demo?: string;
  /** Short context label shown on the card, e.g. "Enterprise · Insurance" */
  context?: string;
  /** Path to a thumbnail in /public, or "" to show a generated placeholder */
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
  title: "Business Intelligence Consultant & Senior Data Engineer",
  tagline: "Empowering data-driven decisions.",
  intro:
    "I turn complex, messy data into high-performance BI solutions that leaders actually use — building ETL pipelines, data warehouses, and executive dashboards across banking, insurance, retail, and more. I also apply data science and generative-AI tooling (LLMs, RAG, Claude) to push analytics further.",
  location: "India",
  email: "bohraaman@gmail.com",
  phone: "+91 8369370199",
  /** The real resume is bundled at /public/resume.pdf */
  resumeUrl: "/resume.pdf",
  /** Avatar: put a square image at /public/avatar.jpg, or leave "" for initials */
  avatar: "",
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
    "I'm Aman Bohra, a Business Intelligence Consultant and Senior Data Engineer with over 8 years of experience in data engineering, ETL development, BI, and analytics. I've led end-to-end data warehousing projects, managed cross-functional teams, and driven stakeholder collaboration from requirement gathering to delivery.",
    "My work spans diverse industries — banking, insurance, retail, automobile, chemicals, and pharmaceuticals — with deep domain knowledge across sales & distribution, after-sales, marketing, inventory, finance, and digital banking. I specialize in QlikView, Qlik Sense, and Power BI, backed by strong data warehousing and Databricks engineering skills.",
    "I'm recognized for optimizing performance, automating processes, and generating actionable insights that improve decision-making and operational efficiency. Outside of client delivery, I mentor junior analysts, contribute to hackathons and innovation workshops, and volunteer as an AI mentor supporting rural education.",
  ],
  interests: [
    "Data Warehousing",
    "ETL Automation",
    "Dashboard Design",
    "Machine Learning",
    "Generative AI",
    "LLMs & RAG",
    "Data Governance",
    "Mentoring",
  ],
  highlights: [
    { value: "8+", label: "Years Experience" },
    { value: "7", label: "Certifications" },
    { value: "6+", label: "Industries Served" },
    { value: "10+", label: "Team Members Led" },
  ],
};

/* -------------------------------------------------------------------------- */
/*  SKILLS                                                                     */
/* -------------------------------------------------------------------------- */

export const skillCategories: SkillCategory[] = [
  {
    category: "BI & Visualization",
    skills: ["Qlik Sense", "QlikView", "Power BI", "Executive Dashboards", "Data Storytelling", "KPI Design"],
  },
  {
    category: "Data Engineering & ETL",
    skills: ["ETL Development", "Data Pipelines", "Databricks", "Data Modeling", "Delta Lake", "Process Automation"],
  },
  {
    category: "Data Warehousing",
    skills: ["Dimensional Modeling", "Star / Snowflake Schema", "Data Marts", "OLAP", "Performance Tuning"],
  },
  {
    category: "Programming & Query",
    skills: ["SQL", "Python", "PySpark", "Pandas", "NumPy", "Data Load Scripting"],
  },
  {
    category: "Data Science & ML",
    skills: ["Machine Learning", "Statistical Modeling", "scikit-learn", "Predictive Analytics", "Feature Engineering", "Time Series Analysis"],
  },
  {
    category: "AI & LLM Tools",
    skills: ["Claude", "ChatGPT / OpenAI", "Generative AI", "Prompt Engineering", "RAG", "LangChain", "Hugging Face", "Vector Databases"],
  },
  {
    category: "Applied Analytics",
    skills: ["Data & Business Analysis", "Market Basket Analysis (Apriori)", "Sentiment Analysis", "Anomaly Detection", "A/B Testing"],
  },
  {
    category: "Governance & Quality",
    skills: ["Data Quality Controls", "Maker / Checker", "Data Cleansing", "Audit & Compliance"],
  },
  {
    category: "Consulting & Delivery",
    skills: ["Requirement Gathering", "Stakeholder Management", "Client Training", "Team Leadership", "Mentoring"],
  },
];

/* -------------------------------------------------------------------------- */
/*  PROJECTS  (real work — client/enterprise projects are confidential, so     */
/*  code/demo links are intentionally omitted)                                 */
/* -------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    name: "Distributor Performance Management KPIs",
    context: "LTIMindtree · Insurance",
    description:
      "An end-to-end KPI reporting suite tracking distributor performance for an insurance business, including Written & Earned Premium metrics.",
    problem:
      "Leadership lacked accurate, timely visibility into distributor performance across the network.",
    tech: ["Qlik Sense", "Power BI", "ETL", "Data Warehousing"],
    features: [
      "Automated reporting that boosted accuracy by 25%",
      "Process automation improving efficiency by 30%",
      "Governance-aligned, audit-validated insights",
      "Reduced audit findings by 15%",
    ],
    image: "",
    featured: true,
  },
  {
    name: "Retail Analytics Dashboards",
    context: "Fractal Analytics · Retail",
    description:
      "Executive dashboards giving retail teams a clean, consistent view of sales performance across domains.",
    problem: "Fragmented data made sales tracking unreliable and slow to act on.",
    tech: ["Power BI", "Qlik", "SQL", "ETL"],
    features: [
      "Improved sales-tracking accuracy by 20%",
      "Clean, consistent data across domains",
      "Standardized reporting frameworks",
      "Reusable, scalable dashboard templates",
    ],
    image: "",
    featured: true,
  },
  {
    name: "Market Basket Analysis (Apriori)",
    context: "Fractal Analytics · Supply Chain",
    description:
      "Applied the Apriori algorithm to analyze Bill-of-Materials (BOM) hierarchies and uncover purchasing patterns.",
    problem: "High inventory costs and imprecise supply-chain planning.",
    tech: ["Python", "Apriori", "Data Mining", "Analytics"],
    features: [
      "Reduced inventory costs by 15%",
      "Improved supply-chain accuracy by 20%",
      "Actionable association rules for planning",
    ],
    image: "",
    featured: true,
  },
  {
    name: "ETL Optimization & Reporting Automation",
    context: "Icon Business Solution · Banking",
    description:
      "Re-engineered ETL and reporting pipelines to dramatically cut runtime and server load.",
    problem: "Reports took 36 hours to run and strained server resources.",
    tech: ["QlikView", "ETL", "Data Warehousing", "SQL"],
    features: [
      "Cut report time from 36h to under 2h",
      "Reduced server load by 85%",
      "Data quality controls raised accuracy by 35%",
      "Maker/checker validation processes",
    ],
    image: "",
    featured: false,
  },
  {
    name: "Banking Customer Sentiment Analysis",
    context: "Icon Business Solution · Banking",
    description:
      "Analyzed customer feedback to extract sentiment and guide product and customer-experience strategy for a bank.",
    problem: "Customer feedback was unstructured and not informing decisions.",
    tech: ["Sentiment Analysis", "NLP", "BI", "Analytics"],
    features: [
      "Insights that shaped product & CX strategy",
      "Structured signals from unstructured feedback",
      "Enhanced data accessibility by 30%",
    ],
    image: "",
    featured: false,
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
];

/* -------------------------------------------------------------------------- */
/*  EXPERIENCE                                                                 */
/* -------------------------------------------------------------------------- */

export const experience: ExperienceItem[] = [
  {
    company: "LTIMindtree",
    role: "Senior Data Engineer",
    start: "Jul 2022",
    end: "Present",
    location: "India",
    responsibilities: [
      "Lead automation initiatives across key data engineering projects.",
      "Deliver Distributor Performance Management KPIs including Written & Earned Premiums.",
      "Collaborate with audit and compliance teams to ensure governance-aligned insights.",
    ],
    achievements: [
      "Improved process efficiency by 30% through automation.",
      "Boosted reporting accuracy by 25% on distributor performance metrics.",
      "Reduced audit findings by 15% via validated, governance-aligned insights.",
    ],
    tech: ["Qlik Sense", "Power BI", "Databricks", "ETL", "Data Warehousing"],
  },
  {
    company: "Fractal Analytics",
    role: "Consultant",
    start: "Aug 2020",
    end: "Jul 2022",
    location: "India",
    responsibilities: [
      "Delivered retail dashboards and analytics for enterprise clients.",
      "Collaborated with data engineering teams to ensure clean, consistent data.",
      "Mentored junior analysts and standardized reporting frameworks.",
    ],
    achievements: [
      "Improved sales-tracking accuracy by 20% with retail dashboards.",
      "Reduced inventory costs by 15% and improved supply-chain accuracy by 20% using the Apriori algorithm on BOM hierarchies.",
    ],
    tech: ["Power BI", "Qlik", "Python", "SQL"],
  },
  {
    company: "Icon Business Solution",
    role: "Senior BI Consultant",
    start: "Jun 2017",
    end: "Mar 2020",
    location: "India",
    responsibilities: [
      "Built KPI dashboards using diverse data sources.",
      "Managed and mentored a BI team of 10+ members.",
      "Implemented data quality controls and maker/checker processes.",
    ],
    achievements: [
      "Enhanced data accessibility by 30% and delivery efficiency by 25%.",
      "Increased data accuracy by 35% via cleansing and validation.",
      "Optimized ETL and reporting — cut report time from 36h to under 2h and server load by 85%.",
      "Conducted sentiment analysis for a bank to guide product and CX strategy.",
    ],
    tech: ["QlikView", "ETL", "Data Warehousing", "SQL"],
  },
  {
    company: "Autonetics Centre",
    role: "IoT Developer (Intern)",
    start: "Feb 2017",
    end: "Jun 2017",
    location: "India",
    responsibilities: [
      "Developed a smart stick for visually impaired users.",
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
    institution: "Birla Institute of Technology and Science, Pilani",
    degree: "M.Tech in Data Science & Engineering",
    start: "Apr 2021",
    end: "Apr 2023",
    details: "Advanced study in data science, engineering, and applied machine learning.",
  },
  {
    institution: "Pune University, India",
    degree: "B.E. in Computer Science & Engineering",
    start: "Jul 2013",
    end: "Jun 2017",
    details: "Foundation in computer science, software engineering, and systems.",
  },
];

/* -------------------------------------------------------------------------- */
/*  CERTIFICATIONS & ACHIEVEMENTS                                              */
/* -------------------------------------------------------------------------- */

export const certifications: CertItem[] = [
  { title: "Qlik Sense Business Analyst (QSBA)", issuer: "Qlik" },
  { title: "Qlik Sense Data Architect (QSDA 2024)", issuer: "Qlik", date: "2024" },
  { title: "QlikView 12 Business Analyst (QVBA)", issuer: "Qlik" },
  { title: "QlikView 12 Data Architect (QV12DA)", issuer: "Qlik" },
  { title: "Power BI Data Analyst Associate (PL-300)", issuer: "Microsoft" },
  { title: "Databricks Certified Data Engineer Associate", issuer: "Databricks" },
  { title: "Databricks Certified Generative AI Engineer Associate", issuer: "Databricks" },
];

/** Non-certificate honors & recognition, shown alongside certifications. */
export const achievements: string[] = [
  "Star Performer & Volunteer of the Month recognition",
  "AI Mentor (CSR Initiative) supporting rural education",
  "Active innovation contributor in workshops & hackathons",
  "Single point of contact for BI & analytics across business units",
];

/* -------------------------------------------------------------------------- */
/*  SERVICES                                                                   */
/* -------------------------------------------------------------------------- */

export const services: Service[] = [
  { title: "BI Dashboard Development", description: "Executive-ready dashboards in Qlik Sense, QlikView, and Power BI that turn data into decisions.", icon: "BarChart3" },
  { title: "ETL & Data Pipelines", description: "Reusable, high-accuracy ETL pipelines and process automation across diverse data sources.", icon: "Workflow" },
  { title: "Data Warehousing", description: "Scalable warehouse and data-model design optimized for performance and reporting.", icon: "Database" },
  { title: "KPI & Analytics Consulting", description: "KPI discovery, requirement analysis, and analytics strategy aligned to business goals.", icon: "Lightbulb" },
  { title: "Data Science & ML", description: "Predictive models, statistical analysis, and machine-learning solutions that turn data into forecasts.", icon: "Brain" },
  { title: "AI & GenAI Solutions", description: "LLM-powered assistants, RAG pipelines, and generative-AI proofs of concept using Claude, OpenAI, and LangChain.", icon: "Sparkles" },
  { title: "Data Governance & Quality", description: "Quality controls, anomaly detection, and maker/checker processes for trusted data.", icon: "ShieldCheck" },
  { title: "Training & Enablement", description: "Client training, team mentoring, and standardized reporting frameworks that scale.", icon: "GraduationCap" },
];

/* -------------------------------------------------------------------------- */
/*  DASHBOARD GALLERY  (replace images with real dashboard screenshots)        */
/* -------------------------------------------------------------------------- */

export const creativeWork: CreativeWork[] = [
  { title: "[PLACEHOLDER] Sales Performance Dashboard", category: "Qlik Sense", image: "" },
  { title: "[PLACEHOLDER] Distributor KPIs", category: "Power BI", image: "" },
  { title: "[PLACEHOLDER] Inventory & Supply Chain", category: "QlikView", image: "" },
  { title: "[PLACEHOLDER] Executive Summary", category: "Power BI", image: "" },
  { title: "[PLACEHOLDER] Banking Analytics", category: "Qlik Sense", image: "" },
  { title: "[PLACEHOLDER] Data Quality Monitor", category: "Databricks", image: "" },
];

/* -------------------------------------------------------------------------- */
/*  TESTIMONIALS  (clearly-marked placeholder content — replace with real)    */
/* -------------------------------------------------------------------------- */

export const testimonials: Testimonial[] = [
  {
    quote:
      "[PLACEHOLDER TESTIMONIAL] Aman delivered our reporting overhaul ahead of schedule and made complex data genuinely easy for leadership to act on.",
    name: "Client Stakeholder",
    title: "Business Unit Head",
  },
  {
    quote:
      "[PLACEHOLDER TESTIMONIAL] One of the most reliable BI consultants I've worked with — deep technical skill paired with clear communication.",
    name: "Project Manager",
    title: "Analytics Delivery",
  },
  {
    quote:
      "[PLACEHOLDER TESTIMONIAL] Aman mentored our junior analysts and standardized our reporting. The quality and consistency improvement was immediate.",
    name: "Team Lead",
    title: "BI & Reporting",
  },
];

/* -------------------------------------------------------------------------- */
/*  NAVIGATION                                                                 */
/* -------------------------------------------------------------------------- */

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "creative", label: "Dashboards" },
  { id: "contact", label: "Contact" },
];
