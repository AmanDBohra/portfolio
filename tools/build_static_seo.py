#!/usr/bin/env python3
"""
Generates a static, crawlable multi-page SEO/GEO knowledge base into /public.
Each page: unique <title>, meta description, canonical, Open Graph, JSON-LD
(Person + page-specific type + BreadcrumbList), breadcrumbs, semantic HTML,
and internal links. Factual content only — mirrors the portfolio data.
"""
import os, re, json, html, datetime, glob
import markdown as md

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, "public")
SITE = "https://amandbohra.github.io/portfolio"
BASE = "/portfolio"
OG = f"{SITE}/og-image.png"
TODAY = datetime.date.today().isoformat()

def esc(s): return html.escape(str(s), quote=True)

PERSON_ID = f"{SITE}/#aman"
PERSON_NODE = {
    "@type": "Person", "@id": PERSON_ID, "name": "Aman Bohra",
    "url": SITE + "/", "jobTitle": "Senior Analytics & Business Intelligence Professional",
    "sameAs": ["https://github.com/AmanDBohra", "https://www.linkedin.com/in/aman-bohra"],
}

CSS = """
:root{--navy:#071a2b;--deep:#0b2740;--ink:#cdd8e2;--white:#f5f8fa;--cy:#46c7e8;--an:#2386c8;--mut:#8ba0b2;--line:rgba(255,255,255,.10)}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;font-family:Inter,'Helvetica Neue',Arial,sans-serif;color:var(--ink);background:var(--navy);
background-image:radial-gradient(900px 500px at 85% -10%,rgba(35,134,200,.14),transparent 60%),linear-gradient(180deg,#071a2b,#0b2740);
background-attachment:fixed;-webkit-font-smoothing:antialiased;line-height:1.6}
a{color:var(--cy);text-decoration:none}a:hover{text-decoration:underline}
.wrap{max-width:820px;margin:0 auto;padding:0 20px}
header.site{border-bottom:1px solid var(--line);position:sticky;top:0;background:rgba(7,26,43,.85);backdrop-filter:blur(8px);z-index:10}
header.site .wrap{display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:space-between;padding:12px 20px}
header.site nav a{color:var(--ink);font-size:14px;margin-left:16px}
header.site nav a:hover{color:var(--cy)}
.brand{font-weight:800;color:#fff}
main{padding:28px 0 56px}
h1{color:#fff;font-size:2rem;line-height:1.15;margin:.2em 0 .1em}
h2{color:#fff;font-size:1.25rem;margin:1.8em 0 .4em}
h3{color:#fff;font-size:1.05rem;margin:1.4em 0 .3em}
.eyebrow{color:var(--cy);font-size:.75rem;letter-spacing:.14em;text-transform:uppercase;font-weight:700;margin:0}
.lead{font-size:1.05rem;color:#dbe6ef}
nav.crumbs{font-size:.8rem;color:var(--mut);padding:14px 0 0}
nav.crumbs a{color:var(--mut)}
.summary{border:1px solid var(--line);background:rgba(255,255,255,.03);border-radius:12px;padding:16px 18px;margin:18px 0}
.summary dt{color:var(--mut);font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;margin-top:8px}
.summary dd{margin:2px 0 0}
.chips{list-style:none;padding:0;display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}
.chips li{border:1px solid var(--line);background:rgba(255,255,255,.04);border-radius:999px;padding:4px 11px;font-size:.8rem}
ul.clean{padding-left:20px}ul.clean li{margin:.3em 0}
.metric{color:var(--cy);font-weight:800}
.related{border-top:1px solid var(--line);margin-top:36px;padding-top:20px}
.related h2{font-size:1rem;margin-top:0}
.cardlink{display:block;border:1px solid var(--line);background:rgba(255,255,255,.03);border-radius:12px;padding:14px 16px;margin:10px 0}
.cardlink:hover{border-color:rgba(70,199,232,.4);text-decoration:none}
.cardlink b{color:#fff;display:block}
.cardlink span{color:var(--mut);font-size:.85rem}
footer.site{border-top:1px solid var(--line);color:var(--mut);font-size:.85rem;padding:26px 0}
footer.site a{color:var(--mut)}
.grid{display:grid;gap:12px}@media(min-width:640px){.grid.two{grid-template-columns:1fr 1fr}}
.backapp{display:inline-block;margin-top:8px;font-weight:600}
"""

NAV = f"""<header class="site"><div class="wrap">
<a class="brand" href="{BASE}/">Aman Bohra</a>
<nav aria-label="Primary">
<a href="{BASE}/about.html">About</a>
<a href="{BASE}/experience.html">Experience</a>
<a href="{BASE}/projects/">Projects</a>
<a href="{BASE}/technologies/">Technologies</a>
<a href="{BASE}/articles/">Articles</a>
<a href="{BASE}/contact.html">Contact</a>
</div></header>"""

FOOTER = f"""<footer class="site"><div class="wrap">
<p>© Aman Bohra · Senior Analytics &amp; Business Intelligence Professional · India</p>
<p><a href="{BASE}/">Interactive portfolio</a> · <a href="https://github.com/AmanDBohra">GitHub</a> ·
<a href="https://www.linkedin.com/in/aman-bohra">LinkedIn</a> · <a href="https://www.credly.com/users/aman-bohra">Credly</a> ·
<a href="mailto:bohraaman@gmail.com">bohraaman@gmail.com</a></p>
</div></footer>"""

def crumbs(items):
    parts = []
    for i,(name,url) in enumerate(items):
        if url: parts.append(f'<a href="{url}">{esc(name)}</a>')
        else: parts.append(esc(name))
    return '<nav class="crumbs" aria-label="Breadcrumb">' + " › ".join(parts) + "</nav>"

def breadcrumb_ld(items):
    return {"@type":"BreadcrumbList","itemListElement":[
        {"@type":"ListItem","position":i+1,"name":name,
         **({"item":SITE+url.replace(BASE,"")} if url else {})}
        for i,(name,url) in enumerate(items)]}

def page(path, title, desc, crumb_items, body, extra_ld=None):
    # `path` includes BASE (e.g. /portfolio/about.html); SITE already ends in /portfolio.
    canonical = f"{SITE}{path[len(BASE):]}"
    graph = [PERSON_NODE, breadcrumb_ld(crumb_items)]
    if extra_ld: graph.append(extra_ld)
    ld = json.dumps({"@context":"https://schema.org","@graph":graph}, ensure_ascii=False)
    doc = f"""<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="{canonical}">
<meta property="og:type" content="website">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{canonical}">
<meta property="og:image" content="{OG}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/svg+xml" href="{BASE}/favicon.svg">
<script type="application/ld+json">{ld}</script>
<style>{CSS}</style></head><body>
{NAV}
<div class="wrap">{crumbs(crumb_items)}<main>{body}</main></div>
{FOOTER}</body></html>"""
    full = os.path.join(PUB, path.lstrip("/").replace(f"portfolio/",""))
    # path already like /about.html or /projects/x.html -> map under PUB
    rel = path[len(BASE):].lstrip("/")
    dest = os.path.join(PUB, rel) if rel else os.path.join(PUB, "index.html")
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with open(dest, "w", encoding="utf-8") as f: f.write(doc)
    return path

# --------------------------------------------------------------------------
# DATA (factual — mirrors the portfolio)
# --------------------------------------------------------------------------
TECH = {
 "qlik-sense":"Qlik Sense","qlikview":"QlikView","qlik-nprinting":"Qlik NPrinting",
 "power-bi":"Power BI","databricks":"Databricks","apache-spark":"Apache Spark","sql":"SQL","python":"Python",
 "etl-elt":"ETL & ELT","data-warehousing":"Data Warehousing",
}
TECH_BLURB = {
 "qlik-sense":"Aman Bohra uses Qlik Sense to build governed, self-service dashboards for enterprise analytics, including insurance KPI and distributor-performance reporting. He holds Qlik Sense Business Analyst (QSBA) and Data Architect (QSDA) certifications.",
 "qlikview":"Aman Bohra has deep QlikView experience from enterprise BI delivery — including a connector-less SAP-to-BI integration and re-engineering a 36-hour report to under two hours. He is QlikView 12 Business Analyst and Data Architect certified.",
 "qlik-nprinting":"Aman Bohra uses Qlik NPrinting for governed, scheduled report distribution across international insurance operations.",
 "power-bi":"Aman Bohra builds Power BI dashboards and KPI reporting across insurance and retail engagements, and is a Microsoft Power BI Data Analyst Associate (PL-300).",
 "databricks":"Aman Bohra uses Databricks for data engineering and advanced-analytics workloads. He holds five Databricks certifications: Data Engineer Professional, Associate Developer for Apache Spark, Data Analyst Associate, Generative AI Engineer Associate, and Data Engineer Associate.",
 "apache-spark":"Aman Bohra works with Apache Spark (PySpark) for large-scale data engineering and transformation on Databricks, and is a Databricks Certified Associate Developer for Apache Spark.",
 "sql":"SQL is core to Aman Bohra's work — data modeling, transformation, and the analytical queries that power his dashboards.",
 "python":"Aman Bohra uses Python for advanced analytics and data science — market-basket analysis, forecasting, anomaly detection, and a Retrieval-Augmented-Generation proof of concept.",
 "etl-elt":"Aman Bohra designs ETL and ELT pipelines that clean and conform data into governed models — including converting a monthly batch to a daily parallel run.",
 "data-warehousing":"Aman Bohra designs dimensional (star-schema) data models and warehousing patterns that keep enterprise BI fast and consistent.",
}

PROJECTS = [
 dict(slug="leading-international-analytics-module", title="Leading the International Analytics Module",
   cat="Insurance · Delivery Leadership", role="International Module Lead", org="LTIMindtree",
   problem="A large international insurance programme needed a single accountable lead to turn shifting business requirements into reliable, on-time analytics delivery.",
   approach=["Own the International module end to end — requirements through deployment and support.",
     "Set delivery priorities and manage dependencies, timelines, and risk against business goals.",
     "Coordinate a cross-functional team of analysts, data engineers, BI developers, and data scientists.",
     "Transition model outputs into business-facing decisions."],
   tech=["qlik-sense","power-bi","databricks","sql"],
   result=["End-to-end delivery ownership","Cross-functional coordination across four disciplines","Priorities and risk managed to business outcomes"],
   demo="", repo=""),
 dict(slug="building-mentoring-bi-team", title="Building & Mentoring a 10+ BI Team",
   cat="Leadership · Team Building", role="Senior BI Consultant", org="Icon Business Solutions",
   problem="Delivery quality and speed varied by individual; the team needed shared standards, mentoring, and repeatable practices to scale.",
   approach=["Led and mentored a BI team of 10+ across multiple client engagements.",
     "Established reusable delivery standards and reporting frameworks.",
     "Grew junior analysts into confident, independent contributors."],
   tech=["qlikview","qlik-sense","etl-elt","sql"],
   result=["Delivery efficiency up 25%","Data accessibility up 30%","Multiple client appreciations for delivery quality"],
   demo="", repo=""),
 dict(slug="governance-data-quality-rollout", title="Governance & Data-Quality Rollout",
   cat="Governance · Data Quality", role="Analytics & BI Lead", org="LTIMindtree / Icon",
   problem="Reporting was trusted by habit, not by evidence — leaving gaps that surfaced as audit findings and rework.",
   approach=["Introduced maker/checker governance and data-quality controls across reporting pipelines.",
     "Embedded validation into the delivery flow rather than bolting it on before audits."],
   tech=["etl-elt","sql","data-warehousing"],
   result=["Audit findings reduced 15%","Data accuracy raised up to 35% on re-engineered pipelines","Governance made routine, not heroic"],
   demo="", repo=""),
 dict(slug="ai-mentor-csr-rural-education", title="AI Mentor — CSR Rural Education",
   cat="Community · Mentoring", role="Volunteer AI Mentor", org="CSR Initiative",
   problem="Students in under-resourced settings rarely get a plain-language on-ramp to AI and data skills.",
   approach=["Translated complex AI and data concepts into simple, accessible learning.",
     "Supported rural learners with limited prior exposure."],
   tech=["python"],
   result=["Explained AI & data concepts in layman terms","Recognized as Volunteer of the Month"],
   demo="", repo=""),
 dict(slug="international-insurance-analytics", title="International Insurance Analytics",
   cat="Insurance · Business Intelligence", role="International Module Lead", org="LTIMindtree",
   problem="Complex international P&C insurance operations needed unified, decision-ready analytics and reporting.",
   approach=["Own analytics & BI delivery end to end — requirements through deployment and support.",
     "Translate insurance and international business requirements into reporting and dashboards.",
     "Coordinate analysts, data engineers, BI developers, and data scientists.",
     "Transition data-science outputs into business-facing dashboards."],
   tech=["qlik-sense","power-bi","qlik-nprinting","databricks","sql"],
   result=["Improved reporting accuracy by 25%","Improved process efficiency by 30%","Reduced audit findings by 15%"],
   demo="", repo=""),
 dict(slug="distributor-performance-kpis", title="Distributor Performance Management KPIs",
   cat="Insurance · KPI Reporting", role="International Module Lead", org="LTIMindtree",
   problem="Leadership lacked accurate, timely visibility into distributor performance across international markets.",
   approach=["Built KPI reporting for Written & Earned Premium and distributor performance.",
     "Implemented data-quality controls and governance-aligned insights.","Automated reporting processes."],
   tech=["qlik-sense","power-bi","etl-elt","data-warehousing"],
   result=["Reporting accuracy up 25%","Process efficiency up 30%","Audit findings down 15%"], demo="", repo=""),
 dict(slug="from-36-hours-to-2", title="From 36 Hours to 2 — BI Re-engineering",
   cat="Banking · Performance", role="Senior BI Consultant", org="Icon Business Solutions",
   problem="A critical report ran 36 hours monthly and hung the BI server; the business had accepted it as normal.",
   approach=["Analyzed the ETL architecture and identified sequential processing as the bottleneck.",
     "Restructured the transformation layer into modular, parallelizable components.",
     "Converted a monthly batch to a daily parallel run."],
   tech=["qlikview","etl-elt","sql","data-warehousing"],
   result=["Runtime cut 94% (36h → under 2h)","Server load reduced 85%","Data accuracy improved 35%"], demo="", repo=""),
 dict(slug="connector-less-sap-bi-integration", title="Connector-less SAP-to-BI Integration",
   cat="Enterprise · Data Integration", role="Senior BI Consultant", org="Icon Business Solutions",
   problem="Daily BI refresh was blocked by SAP data-connector limitations.",
   approach=["Collaborated with the ABAP team on a non-standard integration path.",
     "Applied data-refactoring techniques for reliability.","Delivered within a tight deadline."],
   tech=["qlikview","etl-elt","sql"],
   result=["Daily refresh directly from SAP with no data connector","Delivered on deadline"], demo="", repo=""),
 dict(slug="retail-analytics-dashboards", title="Retail Analytics Dashboards",
   cat="Retail · Business Intelligence", role="Analytics & BI Consultant", org="Fractal Analytics",
   problem="Fragmented data made retail sales tracking unreliable and slow to act on.",
   approach=["Built category and store performance dashboards on validated data.",
     "Standardized reusable reporting frameworks."],
   tech=["power-bi","qlik-sense","sql","etl-elt"],
   result=["Sales-tracking accuracy up 20%","Consistent data across domains"], demo="", repo=""),
 dict(slug="market-basket-analysis", title="Market Basket Analysis (Apriori)",
   cat="Supply Chain · Data Science", role="Analytics & BI Consultant", org="Fractal Analytics",
   problem="High inventory costs and imprecise supply-chain planning.",
   approach=["Applied the Apriori algorithm to Bill-of-Materials hierarchies.",
     "Derived association rules and translated them into planning recommendations."],
   tech=["python"],
   result=["Inventory costs reduced 15%","Supply-chain accuracy improved 20%"],
   demo="", repo="https://github.com/AmanDBohra/portfolio/blob/main/notebooks/market_basket_analysis.ipynb"),
 dict(slug="etl-star-schema-pipeline", title="ETL → Star Schema Pipeline (Demo)",
   cat="Demo · Data Engineering · ETL/ELT", role="Author", org="Self-built (synthetic data)",
   problem="Dashboards are only as trustworthy as the model beneath them.",
   approach=["Raw operational rows → cleaned staging → dimensional star schema in SQL.",
     "Analytical query a BI tool would sit on."],
   tech=["python","apache-spark","sql","etl-elt","data-warehousing"],
   result=["Conformed fact + dimension model","Fast, consistent analytical SQL"],
   demo="", repo="https://github.com/AmanDBohra/portfolio/blob/main/notebooks/etl_star_schema_pipeline.ipynb"),
 dict(slug="genai-rag-analytics-assistant", title="GenAI RAG Analytics Assistant (Demo)",
   cat="Demo · Generative AI", role="Author", org="Self-built (synthetic data)",
   problem="Business users want to ask questions of analytics docs without hallucinated numbers.",
   approach=["Real TF-IDF retrieval over a governed knowledge base.",
     "LLM generation as a clearly-isolated, swappable plug-in point.","Answers only from context."],
   tech=["python"],
   result=["Grounded, auditable answers","Honest 'I don't know' when unsupported"],
   demo="", repo="https://github.com/AmanDBohra/portfolio/blob/main/notebooks/genai_rag_analytics_assistant.ipynb"),
 dict(slug="anomaly-detection-claims", title="Anomaly Detection on Claims (Demo)",
   cat="Demo · Data Science", role="Author", org="Self-built (synthetic data)",
   problem="Unusual claims (fraud, error, data issues) deserve a human's attention first.",
   approach=["Isolation Forest scores anomalies on synthetic claims.",
     "Turns scores into a ranked, explainable review queue."],
   tech=["python"],
   result=["Unsupervised prioritized worklist","Explainable, BI-ready output"],
   demo="", repo="https://github.com/AmanDBohra/portfolio/blob/main/notebooks/anomaly_detection_claims.ipynb"),
 dict(slug="interactive-bi-dashboards", title="Interactive BI Dashboards, 6 Industries (Demo)",
   cat="Demo · Business Intelligence", role="Author", org="Self-built (synthetic data)",
   problem="Demonstrate dashboard design and analytical thinking without exposing client data.",
   approach=["Six domain-specific dashboards with KPI cards, trend/mix/breakdown charts, and a ranked table.",
     "Live region and period filters."],
   tech=["sql"],
   result=["Interactive, filterable analytics across six industries"],
   demo=f"{BASE}/dashboard-demo.html", repo=""),
 dict(slug="assistive-iot-smart-stick", title="Assistive IoT Smart Stick",
   cat="IoT · Assistive Technology", role="IoT Developer (Intern)", org="Autonetics Centre",
   problem="Visually impaired users needed better obstacle detection and mobility.",
   approach=["Built a smart mobility aid with Raspberry Pi, sensors, and an Android app."],
   tech=[], result=["Improved mobility & obstacle detection by 30%"], demo="", repo=""),
]

EXPERIENCE = [
 ("Senior Analytics & BI Consultant · International Module Lead","LTIMindtree","Jul 2022 – Present","Client: major US P&C insurer · India",
  ["Lead the International module — analytics & BI deliverables end to end.",
   "Coordinate analysts, data engineers, BI developers, and data scientists.",
   "Delivered Distributor Performance KPIs (+25% accuracy); automation (+30% efficiency); −15% audit findings."],
  ["qlik-sense","power-bi","qlik-nprinting","databricks","sql"]),
 ("Analytics & BI Consultant","Fractal Analytics","Aug 2020 – Jul 2022","India",
  ["Delivered retail analytics dashboards (+20% sales-tracking accuracy).",
   "Applied Apriori market-basket analysis (−15% inventory cost, +20% supply-chain accuracy).",
   "Mentored junior analysts and standardized reporting frameworks."],
  ["power-bi","qlik-sense","python","sql"]),
 ("Senior BI Consultant","Icon Business Solutions","Jun 2017 – Mar 2020","India",
  ["Led a 10+ member BI team across banking, retail, automotive, pharma, and manufacturing.",
   "Engineered a connector-less SAP-to-BI daily refresh.",
   "Re-engineered a 36-hour report to under 2 hours (−85% server load, +35% accuracy)."],
  ["qlikview","qlik-sense","sql","etl-elt"]),
 ("IoT Developer (Intern)","Autonetics Centre","Feb 2017 – Jun 2017","Nashik, India",
  ["Built an assistive smart-stick for visually impaired users (+30% obstacle detection)."], []),
]

SERVICES = [
 ("BI Dashboard Development","Executive-ready dashboards in Qlik Sense, QlikView, NPrinting, and Power BI that turn data into decisions.",["qlik-sense","power-bi","qlik-nprinting"]),
 ("ETL & Data Pipelines","Reusable, high-accuracy ETL/ELT pipelines and process automation across enterprise systems.",["etl-elt","sql","databricks"]),
 ("Data Warehousing","Dimensional models and warehouse design optimized for performance and reporting.",["data-warehousing","sql"]),
 ("KPI & Analytics Consulting","KPI discovery, requirement analysis, and analytics strategy aligned to business goals.",[]),
 ("Data Science & Advanced Analytics","Predictive analytics, forecasting, and ML translated into business-facing decisions.",["python","databricks"]),
 ("Data Governance & Quality","Quality controls, anomaly detection, and maker/checker processes for trusted data.",[]),
]

CERTS = [
 ("Databricks Certified Data Engineer Professional","Databricks","https://credentials.databricks.com/ac4a5f55-e6a4-485b-824f-88ec50583dce"),
 ("Databricks Certified Associate Developer for Apache Spark","Databricks","https://credentials.databricks.com/494a4a7c-7bc0-4fb0-bed8-d89efdc95c01"),
 ("Databricks Certified Data Analyst Associate","Databricks","https://credentials.databricks.com/33106153-5b7d-45fe-9f75-8083d6e7c67c"),
 ("Databricks Certified Generative AI Engineer Associate","Databricks",""),
 ("Databricks Certified Data Engineer Associate","Databricks","https://credentials.databricks.com/c010ab23-248d-4633-bd99-7a09cf0a37c9"),
 ("Microsoft Power BI Data Analyst Associate (PL-300)","Microsoft","https://learn.microsoft.com/api/credentials/share/en-us/AmanBohra-0775/A04E9E275E7357D3?sharingId=E28C25AADE85123D"),
 ("Qlik Sense Data Architect (QSDA 2024)","Qlik","https://www.credly.com/badges/7fc2c6d4-fd70-4f77-be1a-6f8ed6c3fb51"),
 ("Qlik Sense Business Analyst (QSBA)","Qlik","https://www.credly.com/badges/06024566-c502-48fa-831d-eafd491ac920"),
 ("QlikView 12 Data Architect (QV12DA)","Qlik","https://www.credly.com/badges/664583d3-6a7d-46a0-848b-9eabfd552859"),
 ("QlikView 12 Business Analyst (QVBA)","Qlik","https://www.credly.com/badges/ec7d4901-e2cb-40e1-b759-30d77f2b584d"),
 ("SQL (Advanced)","HackerRank","https://www.hackerrank.com/certificates/49ce25efd08a"),
]
# Additional professional development (grouped, for topical/semantic reach)
DEV_TOPICS = {
 "Generative AI & LLMs": "Prompt Engineering for ChatGPT (Vanderbilt), Generative AI for Everyone & AI for Everyone (DeepLearning.AI), Generative AI for Executives (IBM), GenAI Essentials, for Consultants & Successful AI Strategies (Fractal), How LLMs Work (Duke), ChatGPT & GenAI, Exploring GenAI Models, Prompt Engineering, Navigating GenAI Hurdles (Pluralsight), AI for Business (Udemy).",
 "Machine Learning & Data Science": "Sequence Models & NLP, Improving Deep Neural Networks, Structuring ML Projects (DeepLearning.AI), Machine Learning & NLP Basics (Edureka), ML Foundations (UW), Practical Time Series Analysis (SUNY), Intro to Data Science in Python (Michigan), Python for Data Science (IBM), TensorFlow (Google).",
 "Data, SQL & Cloud": "SQL for Data Science (UC Davis), HackerRank SQL (Basic, Intermediate, Advanced), Introduction to Big Data (UC San Diego), Developing AI Applications on Azure (LearnQuest), Tableau, Information Visualization (NYU).",
 "Business, Strategy & Consulting": "Management Consulting (Emory), Digital Transformation & Future-Ready Company (London Business School), Startup Entrepreneurship (Technion), Doing Business in China (CUHK), Behavioral Finance (Duke), Blockchain (INSEAD), Quantum Computing (Fractal).",
 "Leadership, Communication & Design": "Leadership & Emotional Intelligence (ISB), Communication Strategies for a Virtual Age (Toronto), Social Psychology (Wesleyan), Introduction to Psychology (Yale), Graphic Design & UI Design (CalArts).",
 "Hackathons & recognition": "Microsoft Hack2Future Hackathon (2026); Star Performer & Data Steward Leader (LTIMindtree); AI Mentor — eVidyaloka × Microsoft BRAIN; BRAINIAC 2025 National AI Competition mentor (runner-up).",
}

def tech_links(slugs):
    if not slugs: return ""
    lis = "".join(f'<li><a href="{BASE}/technologies/{s}.html">{esc(TECH[s])}</a></li>' for s in slugs if s in TECH)
    return f'<ul class="chips">{lis}</ul>'

def proj_for_tech(slug):
    return [p for p in PROJECTS if slug in p["tech"]]

URLS = []  # (path, priority)

# ---- Project pages ----
for p in PROJECTS:
    path = f"{BASE}/projects/{p['slug']}.html"
    related = "".join(
        f'<a class="cardlink" href="{BASE}/projects/{q["slug"]}.html"><b>{esc(q["title"])}</b><span>{esc(q["cat"])}</span></a>'
        for q in PROJECTS if q is not p and set(q["tech"])&set(p["tech"]))[:0] or ""
    rel_projects = [q for q in PROJECTS if q is not p and set(q["tech"])&set(p["tech"])][:3]
    rel_html = "".join(f'<a class="cardlink" href="{BASE}/projects/{q["slug"]}.html"><b>{esc(q["title"])}</b><span>{esc(q["cat"])}</span></a>' for q in rel_projects)
    links = ""
    if p["demo"]: links += f' · <a href="{p["demo"]}">Live demo ↗</a>'
    if p["repo"]: links += f' · <a href="{p["repo"]}">Code / notebook ↗</a>'
    body = f"""<p class="eyebrow">{esc(p['cat'])}</p>
<h1>{esc(p['title'])}</h1>
<p class="lead">{esc(p['problem'])}</p>
<dl class="summary">
<dt>Created by</dt><dd>Aman Bohra</dd>
<dt>Role</dt><dd>{esc(p['role'])}</dd>
<dt>Organization</dt><dd>{esc(p['org'])}</dd>
<dt>Technologies</dt><dd>{", ".join(esc(TECH[t]) for t in p['tech']) or "—"}</dd>
</dl>
<h2>Problem</h2><p>{esc(p['problem'])}</p>
<h2>Approach</h2><ul class="clean">{"".join(f"<li>{esc(a)}</li>" for a in p['approach'])}</ul>
<h2>Results</h2><ul class="clean">{"".join(f"<li>{esc(r)}</li>" for r in p['result'])}</ul>
<h2>Technologies used</h2>{tech_links(p['tech']) or "<p>—</p>"}
<p><a class="backapp" href="{BASE}/projects/">← All projects</a>{links}</p>
<section class="related"><h2>Related projects</h2>{rel_html or "<p>—</p>"}</section>"""
    ld = {"@type":"CreativeWork","name":p["title"],"about":p["problem"],
          "author":{"@id":PERSON_ID},"creator":{"@id":PERSON_ID},"url":f"{SITE}/projects/{p['slug']}.html",
          "keywords":", ".join(TECH[t] for t in p["tech"])}
    if p["repo"]: ld["@type"]="SoftwareSourceCode"; ld["codeRepository"]=p["repo"]
    page(path, f"{p['title']} — Aman Bohra",
         f"{p['title']}: {p['problem']} By Aman Bohra using {', '.join(TECH[t] for t in p['tech']) or 'analytics tooling'}.",
         [("Home",BASE+"/"),("Projects",BASE+"/projects/"),(p['title'],"")], body, ld)
    URLS.append((path,"0.7"))

# ---- Projects index ----
cards = "".join(f'<a class="cardlink" href="{BASE}/projects/{p["slug"]}.html"><b>{esc(p["title"])}</b><span>{esc(p["cat"])}</span></a>' for p in PROJECTS)
page(f"{BASE}/projects/index.html","Projects — Aman Bohra",
 "Analytics, BI, data-engineering and data-science projects by Aman Bohra — insurance KPIs, ETL re-engineering, SAP integration, market-basket analysis, and more.",
 [("Home",BASE+"/"),("Projects","")],
 f'<p class="eyebrow">Selected Work</p><h1>Projects by Aman Bohra</h1><p class="lead">Enterprise analytics &amp; BI engagements and self-built demonstrations, framed as problem → approach → outcome.</p>{cards}')
URLS.append((f"{BASE}/projects/","0.8"))

# ---- Technology pages ----
for slug,name in TECH.items():
    projs = proj_for_tech(slug)
    cards = "".join(f'<a class="cardlink" href="{BASE}/projects/{p["slug"]}.html"><b>{esc(p["title"])}</b><span>{esc(p["cat"])}</span></a>' for p in projs) or "<p>—</p>"
    body = f"""<p class="eyebrow">Technology</p><h1>{esc(name)} — Aman Bohra's experience</h1>
<p class="lead">{esc(TECH_BLURB[slug])}</p>
<h2>Projects using {esc(name)}</h2>{cards}
<h2>Related</h2><p><a href="{BASE}/skills.html">Skills</a> · <a href="{BASE}/experience.html">Experience</a> · <a href="{BASE}/technologies/">All technologies</a></p>"""
    ld = {"@type":"WebPage","name":f"{name} — Aman Bohra","about":{"@id":PERSON_ID},"url":f"{SITE}/technologies/{slug}.html"}
    page(f"{BASE}/technologies/{slug}.html", f"{name} experience — Aman Bohra",
         TECH_BLURB[slug][:155],
         [("Home",BASE+"/"),("Technologies",BASE+"/technologies/"),(name,"")], body, ld)
    URLS.append((f"{BASE}/technologies/{slug}.html","0.6"))

# ---- Technologies index ----
cards = "".join(f'<a class="cardlink" href="{BASE}/technologies/{s}.html"><b>{esc(n)}</b><span>{esc(TECH_BLURB[s][:80])}…</span></a>' for s,n in TECH.items())
page(f"{BASE}/technologies/index.html","Technologies — Aman Bohra",
 "Technologies Aman Bohra works with: Qlik Sense, QlikView, Qlik NPrinting, Power BI, Databricks, SQL, Python, ETL/ELT, and data warehousing.",
 [("Home",BASE+"/"),("Technologies","")],
 f'<p class="eyebrow">Toolkit</p><h1>Technologies Aman Bohra uses</h1><p class="lead">Each links to the projects where it was used.</p>{cards}')
URLS.append((f"{BASE}/technologies/","0.7"))

# ---- About ----
about_body = f"""<p class="eyebrow">About</p><h1>About Aman Bohra</h1>
<p class="lead">Aman Bohra is a Senior Analytics &amp; Business Intelligence professional with 9+ years of experience, currently International Module Lead on a major US P&amp;C insurance engagement at LTIMindtree.</p>
<p>Aman Bohra delivers enterprise analytics across insurance, banking, retail, automotive and pharmaceutical industries — owning the full lifecycle from business requirements through data engineering coordination, BI development, data-science translation, governance, and production support.</p>
<p>His focus is making analytics useful: turning scattered data and ambiguous requirements into decisions the business can act on. He holds an M.Tech in Data Science &amp; Engineering from BITS Pilani and 11 professional certifications across Databricks (five, including Data Engineer Professional and Apache Spark Developer), Microsoft, Qlik, and HackerRank.</p>
<h2>Areas of expertise</h2>
<ul class="chips"><li>Business Intelligence</li><li>Analytics Delivery Leadership</li><li>Data Visualization</li><li>Insurance Analytics</li><li>Data Engineering &amp; ETL/ELT</li><li>Data Science translation</li><li>Data Governance</li></ul>
<h2>Explore</h2><p><a href="{BASE}/experience.html">Experience</a> · <a href="{BASE}/skills.html">Skills</a> · <a href="{BASE}/projects/">Projects</a> · <a href="{BASE}/technologies/">Technologies</a> · <a href="{BASE}/certifications.html">Certifications</a> · <a href="{BASE}/contact.html">Contact</a></p>
<p><a class="backapp" href="{BASE}/">← Interactive portfolio</a></p>"""
page(f"{BASE}/about.html","About Aman Bohra — Senior Analytics & BI Professional",
 "Aman Bohra is a Senior Analytics & Business Intelligence professional with 9+ years, currently International Module Lead on a major US P&C insurance engagement at LTIMindtree.",
 [("Home",BASE+"/"),("About","")], about_body,
 {"@type":"AboutPage","mainEntity":{"@id":PERSON_ID}})
URLS.append((f"{BASE}/about.html","0.9"))

# ---- Experience ----
exp_html = ""
for title,org,dates,loc,points,techs in EXPERIENCE:
    exp_html += f"<h2>{esc(title)}</h2><p><strong>{esc(org)}</strong> · {esc(dates)} · {esc(loc)}</p>"
    exp_html += '<ul class="clean">'+"".join(f"<li>{esc(pt)}</li>" for pt in points)+"</ul>"
    if techs: exp_html += tech_links(techs)
page(f"{BASE}/experience.html","Experience — Aman Bohra",
 "Aman Bohra's work experience: LTIMindtree (International Module Lead), Fractal Analytics, Icon Business Solutions, and Autonetics — with technologies and measurable results.",
 [("Home",BASE+"/"),("Experience","")],
 f'<p class="eyebrow">Career</p><h1>Experience — Aman Bohra</h1>{exp_html}')
URLS.append((f"{BASE}/experience.html","0.8"))

# ---- Skills ----
SKILLS = {
 "Business Intelligence & Visualization":["qlik-sense","qlikview","qlik-nprinting","power-bi"],
 "Data Engineering & ETL/ELT":["etl-elt","databricks","apache-spark","sql","data-warehousing"],
 "Data Science & AI":["python"],
}
skills_html=""
for skill,techs in SKILLS.items():
    projs=[]
    for t in techs: projs += proj_for_tech(t)
    seen=set(); uniq=[p for p in projs if not (p["slug"] in seen or seen.add(p["slug"]))][:4]
    ev="".join(f'<a class="cardlink" href="{BASE}/projects/{p["slug"]}.html"><b>{esc(p["title"])}</b><span>{esc(p["cat"])}</span></a>' for p in uniq)
    skills_html+=f"<h2>{esc(skill)}</h2>{tech_links(techs)}<h3>Evidence</h3>{ev or '<p>—</p>'}"
page(f"{BASE}/skills.html","Skills — Aman Bohra",
 "Aman Bohra's skills mapped to technologies and evidence: Business Intelligence, data engineering/ETL, and data science — each backed by real projects.",
 [("Home",BASE+"/"),("Skills","")],
 f'<p class="eyebrow">Expertise</p><h1>Skills &amp; evidence — Aman Bohra</h1><p class="lead">Each skill links to the technologies and projects that demonstrate it.</p>{skills_html}')
URLS.append((f"{BASE}/skills.html","0.8"))

# ---- Services ----
svc_html=""
for name,desc,techs in SERVICES:
    svc_html+=f"<h2>{esc(name)}</h2><p>{esc(desc)}</p>"+(tech_links(techs) if techs else "")
page(f"{BASE}/services.html","Services — Aman Bohra",
 "Services by Aman Bohra: BI dashboard development, ETL & data pipelines, data warehousing, KPI & analytics consulting, data science, and data governance.",
 [("Home",BASE+"/"),("Services","")],
 f'<p class="eyebrow">Services</p><h1>How Aman Bohra can help</h1>{svc_html}<p><a href="{BASE}/contact.html">Contact →</a></p>')
URLS.append((f"{BASE}/services.html","0.7"))

# ---- Certifications ----
def cert_li(name, issuer, url):
    label = f"{esc(name)} — {esc(issuer)}"
    if url:
        return f'<li><a href="{esc(url)}" rel="noopener">{label}</a> <span style="color:var(--mut)">↗ verify</span></li>'
    return f"<li>{label}</li>"
cert_html = "<ul class='clean'>" + "".join(cert_li(*c) for c in CERTS) + "</ul>"
dev_html = "".join(f"<h3>{esc(k)}</h3><p>{esc(v)}</p>" for k,v in DEV_TOPICS.items())
cert_ld = {"@type":"ItemList","name":"Certifications of Aman Bohra",
  "itemListElement":[{"@type":"ListItem","position":i+1,
     "item":{"@type":"EducationalOccupationalCredential","name":n,"credentialCategory":"certification",
              "recognizedBy":{"@type":"Organization","name":iss}, **({"url":u} if u else {})}}
     for i,(n,iss,u) in enumerate(CERTS)]}
page(f"{BASE}/certifications.html","Certifications — Aman Bohra",
 "Aman Bohra holds 11 professional certifications across Databricks (5, incl. Data Engineer Professional and Apache Spark Developer), Microsoft (PL-300), Qlik (4), and HackerRank SQL — each with a verifiable credential link.",
 [("Home",BASE+"/"),("Certifications","")],
 f'<p class="eyebrow">Credentials</p><h1>Certifications — Aman Bohra (11)</h1>'
 f'<p class="lead">Verifiable professional certifications across Databricks, Microsoft, Qlik, and HackerRank.</p>{cert_html}'
 f'<h2>Additional professional development</h2>{dev_html}', cert_ld)
URLS.append((f"{BASE}/certifications.html","0.6"))

# ---- Contact ----
page(f"{BASE}/contact.html","Contact Aman Bohra",
 "Contact Aman Bohra — Senior Analytics & BI professional. Email bohraaman@gmail.com, or connect on LinkedIn and GitHub.",
 [("Home",BASE+"/"),("Contact","")],
 f"""<p class="eyebrow">Contact</p><h1>Contact Aman Bohra</h1>
<p class="lead">Open to Analytics Lead, BI Manager, Analytics Delivery Lead, Data &amp; Analytics Manager, and Insurance Analytics roles.</p>
<ul class="clean">
<li>Email: <a href="mailto:bohraaman@gmail.com">bohraaman@gmail.com</a></li>
<li>LinkedIn: <a href="https://www.linkedin.com/in/aman-bohra">linkedin.com/in/aman-bohra</a></li>
<li>GitHub: <a href="https://github.com/AmanDBohra">github.com/AmanDBohra</a></li>
<li>Resume: <a href="{BASE}/resume.pdf">Download PDF</a></li>
</ul>""")
URLS.append((f"{BASE}/contact.html","0.7"))

# ---- Articles (from markdown) ----
art_dir = os.path.join(ROOT,"src","content","blog")
articles=[]
for mdfile in sorted(glob.glob(os.path.join(art_dir,"*.md"))):
    raw=open(mdfile,encoding="utf-8").read()
    m=re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", raw, re.S)
    fm={}; body_md=raw
    if m:
        for line in m.group(1).splitlines():
            if ":" in line:
                k,v=line.split(":",1); v=v.strip().strip('"').strip("'"); fm[k.strip()]=v
        body_md=m.group(2)
    slug=os.path.basename(mdfile)[:-3]
    title=fm.get("title",slug); date=fm.get("date",""); excerpt=fm.get("excerpt","")
    tags=[t.strip() for t in fm.get("tags","").split(",") if t.strip()]
    body_html=md.markdown(body_md, extensions=["extra"])
    articles.append((slug,title,date,excerpt,tags,body_html))

for slug,title,date,excerpt,tags,body_html in articles:
    tagchips='<ul class="chips">'+"".join(f"<li>{esc(t)}</li>" for t in tags)+"</ul>"
    body=f'<p class="eyebrow">Article</p><h1>{esc(title)}</h1><p class="lead">{esc(excerpt)}</p><p style="color:var(--mut);font-size:.85rem">{esc(date)} · by Aman Bohra</p>{tagchips}{body_html}<p><a class="backapp" href="{BASE}/articles/">← All articles</a></p>'
    ld={"@type":"BlogPosting","headline":title,"description":excerpt,"datePublished":date,
        "author":{"@id":PERSON_ID},"url":f"{SITE}/articles/{slug}.html","keywords":", ".join(tags),
        "mainEntityOfPage":f"{SITE}/articles/{slug}.html"}
    page(f"{BASE}/articles/{slug}.html", f"{title} — Aman Bohra", (excerpt or title)[:155],
         [("Home",BASE+"/"),("Articles",BASE+"/articles/"),(title,"")], body, ld)
    URLS.append((f"{BASE}/articles/{slug}.html","0.6"))

cards="".join(f'<a class="cardlink" href="{BASE}/articles/{s}.html"><b>{esc(t)}</b><span>{esc(d)} · {esc(e[:90])}…</span></a>' for s,t,d,e,tg,b in articles)
page(f"{BASE}/articles/index.html","Articles — Aman Bohra",
 "Articles by Aman Bohra on Business Intelligence, analytics delivery, data engineering, and data science.",
 [("Home",BASE+"/"),("Articles","")],
 f'<p class="eyebrow">Writing</p><h1>Articles by Aman Bohra</h1>{cards}')
URLS.append((f"{BASE}/articles/","0.7"))

# ---- Sitemap ----
urls=[(f"{BASE}/","1.0"),(f"{BASE}/dashboard-demo.html","0.6")]+URLS
sm='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
seen=set()
for path,pri in urls:
    loc=SITE+path[len(BASE):] if path.startswith(BASE) else SITE+path
    loc=loc.replace("/index.html","/")
    if loc in seen: continue
    seen.add(loc)
    sm+=f"  <url><loc>{loc}</loc><lastmod>{TODAY}</lastmod><changefreq>monthly</changefreq><priority>{pri}</priority></url>\n"
sm+="</urlset>\n"
open(os.path.join(PUB,"sitemap.xml"),"w",encoding="utf-8").write(sm)

print(f"Generated {len(URLS)+2} URLs. Sitemap written with {len(seen)} entries.")
