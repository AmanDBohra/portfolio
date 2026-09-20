/* ------------------------------------------------------------------ *
 * Generates /project-labs/<cert-slug>/p<n>/ for all 55 projects:
 *   - README.md (from Study Hub project data)
 *   - a tech-appropriate starter: notebook.ipynb | starter.dax | load.qvs
 * Plus /project-labs/README.md index.
 * Run: node tools/build_project_labs.mjs
 * ------------------------------------------------------------------ */
import { build } from "esbuild";
import { writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LABS = join(ROOT, "project-labs");
mkdirSync(LABS, { recursive: true });

/* load merged study data */
const r = await build({ entryPoints: [join(ROOT, "src/data/study.ts")], bundle: true, format: "esm", write: false, logLevel: "silent" });
let code = r.outputFiles[0].text.replace(/import\.meta\.env\.BASE_URL/g, '"/portfolio/"');
const mod = await import("data:text/javascript;base64," + Buffer.from(code).toString("base64"));
const modules = mod.studyModules;

const category = (slug) => {
  if (slug.startsWith("databricks")) return slug.includes("data-analyst") ? "sql" : slug.includes("genai") || slug.includes("context") ? "python" : "spark";
  if (slug === "microsoft-pl-300") return "powerbi";
  if (slug.startsWith("qlik")) return "qlik";
  return "python";
};

function readme(m, p, n) {
  const cd = (p.conceptDetails || []).map((c) => `- **${c.name}** — ${c.detail}`).join("\n") || (p.concepts || []).map((c) => `- ${c}`).join("\n");
  const steps = (p.steps && p.steps.length ? p.steps : p.approach).map((s, i) => `${i + 1}. ${s}`).join("\n");
  const outs = (p.outcomes || []).map((o) => `- ${o}`).join("\n");
  const diagram = `https://amandbohra.github.io/portfolio/study/projects/${m.slug}-${n}.svg`;
  return `# ${p.title}

**Certification:** ${m.name} (${m.issuer})
**Project ${n} of 5**

> ${p.goal}

![Architecture diagram](${diagram})

## Architecture & data model
${p.architecture || ""}

## Concepts covered
${cd}

## Implementation steps
${steps}

## Outcomes
${outs}

## Tech stack
${(p.stack || []).map((s) => `\`${s}\``).join(" · ")}

## Why this project (profile relevance)
${p.relevance || ""}

---
*Part of [Aman Bohra's certification study labs](https://github.com/AmanDBohra/portfolio/tree/main/project-labs). Interactive version: https://amandbohra.github.io/portfolio/#/study/${m.slug}*
`;
}

/* minimal .ipynb builder */
function ipynb(cells) {
  return JSON.stringify(
    {
      cells: cells.map((c) =>
        c.t === "md"
          ? { cell_type: "markdown", metadata: {}, source: c.s }
          : { cell_type: "code", metadata: {}, execution_count: null, outputs: [], source: c.s }
      ),
      metadata: { kernelspec: { display_name: "Python 3", language: "python", name: "python3" }, language_info: { name: "python" } },
      nbformat: 4,
      nbformat_minor: 5,
    },
    null,
    1
  );
}
const lines = (arr) => arr.map((l, i) => (i < arr.length - 1 ? l + "\n" : l));

function starter(m, p, n, cat) {
  const title = p.title;
  const concepts = (p.concepts || []).join(", ");
  const stepsComment = (p.steps && p.steps.length ? p.steps : p.approach).map((s, i) => `# ${i + 1}. ${s}`);

  if (cat === "spark" || cat === "sql") {
    const spark = cat === "sql";
    return {
      name: "notebook.ipynb",
      content: ipynb([
        { t: "md", s: lines([`# ${title}`, "", `**${m.name}**`, "", `> ${p.goal}`, "", `**Concepts:** ${concepts}`, "", "This is a runnable starter. On Databricks use a cluster; locally it falls back to pandas for the synthetic demo. Build out the steps below."]) },
        { t: "code", s: lines([
          "# Synthetic insurance data (works locally with pandas; on Databricks convert to Spark)",
          "import pandas as pd, numpy as np",
          "np.random.seed(7)",
          "n = 5000",
          "df = pd.DataFrame({",
          "    'policy_id': np.arange(1, n+1),",
          "    'region': np.random.choice(['East','West','North','South'], n),",
          "    'product': np.random.choice(['Auto','Home','Marine','Liability'], n),",
          "    'written_premium': np.round(np.random.gamma(2, 500, n), 2),",
          "    'incurred_loss': np.round(np.random.gamma(1.5, 400, n), 2),",
          "    'claim_count': np.random.poisson(0.4, n),",
          "})",
          "df.head()",
        ]) },
        { t: "code", s: lines([
          "# Example: Gold KPIs by region/product (pandas)",
          "gold = (df.groupby(['region','product'])",
          "          .agg(written_premium=('written_premium','sum'),",
          "               incurred_loss=('incurred_loss','sum'),",
          "               claims=('claim_count','sum'))",
          "          .reset_index())",
          "gold['loss_ratio'] = (gold['incurred_loss'] / gold['written_premium']).round(3)",
          "gold.sort_values('written_premium', ascending=False).head(10)",
        ]) },
        spark
          ? { t: "code", s: lines([
              "# Databricks SQL equivalent (run on a SQL warehouse / Spark):",
              "# spark.createDataFrame(df).createOrReplaceTempView('policies')",
              "# spark.sql('''",
              "#   SELECT region, product, SUM(written_premium) AS written_premium,",
              "#          SUM(incurred_loss)/SUM(written_premium) AS loss_ratio",
              "#   FROM policies GROUP BY region, product ORDER BY written_premium DESC''').show()",
            ]) }
          : { t: "code", s: lines([
              "# Databricks/PySpark version (run on a cluster):",
              "# from pyspark.sql import functions as F",
              "# sdf = spark.createDataFrame(df)",
              "# (sdf.groupBy('region','product')",
              "#     .agg(F.sum('written_premium').alias('written_premium'),",
              "#          (F.sum('incurred_loss')/F.sum('written_premium')).alias('loss_ratio'))",
              "#     .orderBy(F.desc('written_premium')).show())",
            ]) },
        { t: "md", s: lines(["## Build it out — steps"]) },
        { t: "code", s: lines(["# TODO: implement the full project", ...stepsComment]) },
      ]),
    };
  }
  if (cat === "python") {
    return {
      name: "notebook.ipynb",
      content: ipynb([
        { t: "md", s: lines([`# ${title}`, "", `**${m.name}**`, "", `> ${p.goal}`, "", `**Concepts:** ${concepts}`, "", "Runnable starter using only local libraries (no external API keys) so the pipeline structure works end-to-end. Swap in a real embedding model / LLM where noted."]) },
        { t: "code", s: lines([
          "# Tiny, dependency-light RAG/agent scaffold (runs locally)",
          "from sklearn.feature_extraction.text import TfidfVectorizer",
          "from sklearn.metrics.pairwise import cosine_similarity",
          "docs = [",
          "  'Written premium is the total premium on policies written in a period.',",
          "  'Loss ratio equals incurred losses divided by earned premium.',",
          "  'Distributor performance tracks premium and retention by channel.',",
          "]",
          "vec = TfidfVectorizer().fit(docs)",
          "doc_vecs = vec.transform(docs)",
        ]) },
        { t: "code", s: lines([
          "def retrieve(query, k=2):",
          "    qv = vec.transform([query])",
          "    sims = cosine_similarity(qv, doc_vecs)[0]",
          "    idx = sims.argsort()[::-1][:k]",
          "    return [docs[i] for i in idx]",
          "",
          "def answer(query):",
          "    ctx = retrieve(query)",
          "    # TODO: replace this with a real LLM call, grounded in `ctx`",
          "    return f'Based on: {ctx}'",
          "",
          "print(answer('How is loss ratio calculated?'))",
        ]) },
        { t: "md", s: lines(["## Build it out — steps"]) },
        { t: "code", s: lines(["# TODO: implement the full project", ...stepsComment]) },
      ]),
    };
  }
  if (cat === "powerbi") {
    return {
      name: "starter.dax",
      content: [
        `// ${title} — ${m.name}`,
        `// Goal: ${p.goal}`,
        `// Concepts: ${concepts}`,
        "// Add these measures to a Power BI star-schema model (see README).",
        "",
        "Written Premium = SUM ( Fact[written_premium] )",
        "",
        "Loss Ratio = DIVIDE ( SUM ( Fact[incurred_loss] ), [Written Premium] )",
        "",
        "Written Premium LY =",
        "CALCULATE ( [Written Premium], SAMEPERIODLASTYEAR ( 'Date'[Date] ) )",
        "",
        "YoY Growth % = DIVIDE ( [Written Premium] - [Written Premium LY], [Written Premium LY] )",
        "",
        "// TODO: implement the full project:",
        ...(p.steps && p.steps.length ? p.steps : p.approach).map((s, i) => `// ${i + 1}. ${s}`),
      ].join("\n"),
    };
  }
  // qlik
  return {
    name: "load.qvs",
    content: [
      `// ${title} — ${m.name}`,
      `// Goal: ${p.goal}`,
      `// Concepts: ${concepts}`,
      "// Qlik load script starter. Adapt connections/paths to your environment.",
      "",
      "Policies:",
      "LOAD",
      "    PolicyID,",
      "    Region,",
      "    Product,",
      "    WrittenPremium,",
      "    IncurredLoss,",
      "    Date(PolicyDate) as PolicyDate",
      "FROM [lib://data/policies.qvd] (qvd);",
      "",
      "// Example master calendar / incremental / set-analysis patterns go here.",
      "",
      "// TODO: implement the full project:",
      ...(p.steps && p.steps.length ? p.steps : p.approach).map((s, i) => `// ${i + 1}. ${s}`),
    ].join("\n"),
  };
}

let count = 0;
const indexByCert = {};
for (const m of modules) {
  const cat = category(m.slug);
  (m.projects || []).forEach((p, i) => {
    const n = i + 1;
    const dir = join(LABS, m.slug, `p${n}`);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "README.md"), readme(m, p, n));
    const st = starter(m, p, n, cat);
    writeFileSync(join(dir, st.name), st.content);
    count++;
    (indexByCert[m.name] ||= []).push(`  - [${n}. ${p.title}](${m.slug}/p${n}/) — \`${st.name}\``);
  });
}

/* index */
const idx = [
  "# Certification Project Labs",
  "",
  "Hands-on labs for every project in the [Study Hub](https://amandbohra.github.io/portfolio/#/study).",
  `Each folder has a detailed README (goal, architecture, concepts, steps, outcomes) and a starter file.`,
  "",
  ...Object.entries(indexByCert).flatMap(([cert, items]) => [`### ${cert}`, ...items, ""]),
].join("\n");
writeFileSync(join(LABS, "README.md"), idx);

console.log(`Generated ${count} project labs under /project-labs.`);
