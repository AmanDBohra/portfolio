/* ------------------------------------------------------------------ *
 * Generates a per-project architecture diagram (SVG) for every Study
 * Hub project: public/study/projects/<cert-slug>-<n>.svg
 * Run: node tools/build_project_diagrams.mjs
 * ------------------------------------------------------------------ */
import { build } from "esbuild";
import { writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "study", "projects");
mkdirSync(OUT, { recursive: true });

const CY = "#46c7e8", TE = "#18a6a6", BL = "#2386c8", INK = "#e8eef5", MUT = "#9fb2c4";
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* stage flows per project (index-aligned to studyProjects) */
const FLOWS = {
  "databricks-data-engineer-associate": [
    ["Sources", "Bronze (raw)", "Silver (clean)", "Gold (KPIs)", "SQL dashboard"],
    ["Landing files", "Auto Loader", "Bronze stream", "Checkpoint", "Silver / Gold"],
    ["Change extract", "Staging", "MERGE upsert", "Dimension", "Audit / history"],
    ["Bronze LIVE", "Expectations", "Silver LIVE", "Quarantine", "Gold LIVE"],
    ["Job cluster", "Ingest→Transform→Agg", "Unity Catalog", "SQL dashboard", "Alert"],
  ],
  "databricks-data-engineer-professional": [
    ["Event source", "Watermark", "Windowed agg", "foreachBatch", "Delta + checkpoint"],
    ["Source changes", "MERGE SCD2", "CDF on Silver", "Incremental MERGE", "Gold"],
    ["Diagnose (Spark UI)", "OPTIMIZE + ZORDER", "Deletion vectors", "Partitioning", "Benchmark"],
    ["Row filter", "Column mask", "Dynamic view", "GDPR delete", "VACUUM"],
    ["Git repo", "CI tests", "Asset Bundle", "Dev→Staging→Prod", "Monitoring"],
  ],
  "databricks-apache-spark-developer": [
    ["Read (schema)", "Filter / withColumn", "Cast / flags", "Action write", "explain()"],
    ["Broadcast dims", "Join fact", "groupBy agg", "Window rank / lag", "Write"],
    ["Spark UI diagnose", "Tune shuffle parts", "Enable AQE", "coalesce write", "Benchmark"],
    ["cache base", "Broadcast lookups", "Salt skew key", "Prune / pushdown", "Reuse"],
    ["Read JSON", "from_json / explode", "Struct access", "partitionBy write", "Temp view / SQL"],
  ],
  "databricks-data-analyst-associate": [
    ["Gold tables", "SQL queries", "Visuals", "Dashboard", "Daily refresh"],
    ["Params (dropdown)", "CTE query", "HAVING filter", "Linked visuals", "Publish"],
    ["date_trunc", "LAG (MoM)", "ROW_NUMBER top-N", "% of total", "Dashboard"],
    ["Check query", "Threshold", "NULLIF guard", "Alert", "Notify"],
    ["Source tables", "Governed views", "UC grants", "Result cache", "Analysts"],
  ],
  "databricks-genai-engineer-associate": [
    ["Docs", "Chunk + embed", "Vector Search", "Retrieve top-k", "Grounded LLM"],
    ["Chunk tuning", "Hybrid search", "Metadata filter", "Re-rank", "Precise context"],
    ["System prompt", "Few-shot", "JSON schema", "Guardrails", "LLM"],
    ["Golden set", "LLM-as-judge", "MLflow track", "A/B compare", "Gate deploy"],
    ["MLflow log", "Model Serving", "Unity Catalog", "PII mask / cache", "Monitor"],
  ],
  "databricks-context-engineer-associate": [
    ["System rules", "Retrieved (delimited)", "Query", "Token budget", "LLM"],
    ["Tools (typed)", "Plan", "Act (tool)", "Check result", "Answer"],
    ["Recent turns", "Summarize old", "Long-term store", "Retrieve", "Compress"],
    ["Scenario suite", "Low temp / schemas", "Injection test", "Abstain check", "Metrics"],
    ["User context", "PII mask", "Access scope", "Situational facts", "Audit log"],
  ],
  "microsoft-pl-300": [
    ["Fact", "Dimensions", "Relationships", "Date table", "Measures"],
    ["Sources", "Profile", "Remove cols", "Merge / Append", "Foldable load"],
    ["Base measures", "CALCULATE", "SUMX", "Time intelligence", "DIVIDE / VAR"],
    ["KPIs", "Drillthrough", "Slicers", "AI visuals", "Interactions"],
    ["Workspace", "RLS roles", "Gateway / refresh", "App", "Deployment pipeline"],
  ],
  "qlik-sense-data-architect": [
    ["Sources", "Inspect keys", "Rename / composite", "Link table", "Validate"],
    ["Extract QVD", "Max-date var", "Load new rows", "WHERE NOT EXISTS", "STORE"],
    ["ApplyMap", "Concatenate + flag", "Crosstable", "Subfield", "IntervalMatch"],
    ["Master calendar", "Split datetime", "AutoNumber", "Optimized load", "Precomputed flags"],
    ["Access table", "UPPERCASE fields", "Reduce by user", "Keep admin", "Test in copy"],
  ],
  "qlik-sense-business-analyst": [
    ["Questions → KPIs", "KPI objects", "Trend / compare", "Filter panes", "Layout"],
    ["$ vs 1", "Fix year", "% of total", "Exclusions", "Selection states"],
    ["Master measures", "Drill-down dims", "Master visuals", "Document", "Reuse"],
    ["Aggr per group", "Rank", "Nested calc", "TOTAL", "Top-N"],
    ["Snapshots", "Story", "What-if var", "Reference lines", "Accessible"],
  ],
  "qlikview-12-data-architect": [
    ["Extract QVD", "Transform QVD", "Present QVD", "App", "Reuse"],
    ["Max date", "Load changes", "WHERE NOT EXISTS", "Reconcile deletes", "STORE"],
    ["Table Viewer", "Composite keys", "Link table", "KEEP", "Validate"],
    ["Custom extract", "Mapping refactor", "Partial reload", "Schedule", "QVD"],
    ["Access table", "Reduce", "AutoNumber", "Star normalize", "Test"],
  ],
  "qlikview-12-business-analyst": [
    ["KPI objects", "Charts", "List boxes", "Bookmarks", "Format"],
    ["Sum / Count", "TOTAL %", "Rank", "FirstSortedValue", "Dual / Only"],
    ["$ vs 1", "Fix year", "YoY", "Exclusions", "Performance"],
    ["Drill / cyclic", "RangeSum running", "Dimensionality()", "Trellis", "Aggr()"],
    ["Traffic-light", "Formatting", "Sparklines", "Dynamic titles", "Show conditions"],
  ],
};

/* titles from studyProjects.ts */
const r = await build({ entryPoints: [join(ROOT, "src/data/studyProjects.ts")], bundle: true, format: "esm", write: false, logLevel: "silent" });
const mod = await import("data:text/javascript;base64," + Buffer.from(r.outputFiles[0].text).toString("base64"));
const projects = mod.studyProjects;

function diagram(title, stages) {
  const bw = 176, bh = 92, gap = 34, x0 = 40, y = 150;
  const W = x0 * 2 + stages.length * bw + (stages.length - 1) * gap;
  const H = 300;
  const cols = ["#123f66", "#1a5288", "#2386c8", "#1769aa", "#18a6a6"];
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="Inter,Arial,sans-serif">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a2135"/><stop offset="1" stop-color="#0b2740"/></linearGradient>
<marker id="a" markerWidth="12" markerHeight="12" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${CY}"/></marker></defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<text x="${x0}" y="52" font-size="22" font-weight="700" fill="${INK}">${esc(title)}</text>
<text x="${x0}" y="80" font-size="14" fill="${MUT}">Architecture / data flow</text>`;
  stages.forEach((label, i) => {
    const x = x0 + i * (bw + gap);
    const c = cols[i % cols.length];
    s += `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="14" fill="${c}" fill-opacity="0.22" stroke="${CY}" stroke-opacity="0.5"/>`;
    s += `<circle cx="${x + 22}" cy="${y + 22}" r="12" fill="${TE}" fill-opacity="0.9"/><text x="${x + 22}" y="${y + 27}" text-anchor="middle" font-size="13" font-weight="700" fill="#04202b">${i + 1}</text>`;
    // wrap label to <=2 lines
    const words = String(label).split(" ");
    const lines = []; let cur = "";
    for (const w of words) { if ((cur + " " + w).trim().length <= 16) cur = (cur + " " + w).trim(); else { lines.push(cur); cur = w; } }
    if (cur) lines.push(cur);
    const two = lines.slice(0, 2);
    const startY = y + bh / 2 + 8 - (two.length - 1) * 9;
    two.forEach((ln, k) => { s += `<text x="${x + bw / 2}" y="${startY + k * 18}" text-anchor="middle" font-size="14.5" font-weight="600" fill="${INK}">${esc(ln)}</text>`; });
    if (i < stages.length - 1) s += `<path d="M ${x + bw} ${y + bh / 2} L ${x + bw + gap - 6} ${y + bh / 2}" stroke="${CY}" stroke-width="3" marker-end="url(#a)"/>`;
  });
  return s + "</svg>";
}

let count = 0;
for (const [slug, projs] of Object.entries(projects)) {
  const flows = FLOWS[slug] || [];
  projs.forEach((p, i) => {
    const stages = flows[i] || p.stack.slice(0, 5);
    writeFileSync(join(OUT, `${slug}-${i + 1}.svg`), diagram(p.title, stages));
    count++;
  });
}
console.log(`Generated ${count} project architecture diagrams.`);
