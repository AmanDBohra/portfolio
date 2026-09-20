/* ------------------------------------------------------------------ *
 * Generates static, crawlable HTML study-guide pages from the Study
 * Hub data (src/data/study.ts) so search engines and LLMs can index
 * the full content (currently only a JS hash-route SPA).
 *
 * Output: public/guides/index.html + public/guides/<slug>.html
 * Also appends the guide URLs to public/sitemap.xml.
 *
 * Run:  node tools/build_study_pages.mjs
 * ------------------------------------------------------------------ */
import { build } from "esbuild";
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://amandbohra.github.io/portfolio";
const PERSON = SITE + "/#aman";
const OUT = join(ROOT, "public", "guides");
const TODAY = new Date().toISOString().slice(0, 10);

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ---- load study data by bundling the TS module ---- */
const r = await build({
  entryPoints: [join(ROOT, "src/data/study.ts")],
  bundle: true, format: "esm", write: false, logLevel: "silent",
});
let code = r.outputFiles[0].text.replace(/import\.meta\.env\.BASE_URL/g, '"/portfolio/"');
const mod = await import("data:text/javascript;base64," + Buffer.from(code).toString("base64"));
const modules = mod.studyModules;

const STYLE = `
:root{--navy:#071a2b;--ink:#cdd8e2;--white:#f5f8fa;--cy:#46c7e8;--mut:#8ba0b2;--line:rgba(255,255,255,.10);--ok:#3ddc97}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;font-family:Inter,'Helvetica Neue',Arial,sans-serif;color:var(--ink);background:var(--navy);
background-image:radial-gradient(900px 500px at 85% -10%,rgba(35,134,200,.14),transparent 60%),linear-gradient(180deg,#071a2b,#0b2740);background-attachment:fixed;line-height:1.6;-webkit-font-smoothing:antialiased}
a{color:var(--cy);text-decoration:none}a:hover{text-decoration:underline}
.wrap{max-width:860px;margin:0 auto;padding:0 20px}
header.site{border-bottom:1px solid var(--line);position:sticky;top:0;background:rgba(7,26,43,.85);backdrop-filter:blur(8px);z-index:10}
header.site .wrap{display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;padding:12px 20px}
header.site nav a{color:var(--ink);font-size:14px;margin-left:16px}
.brand{font-weight:800;color:#fff}
main{padding:26px 0 56px}
h1{color:#fff;font-size:2rem;line-height:1.15;margin:.2em 0 .1em}
h2{color:#fff;font-size:1.25rem;margin:1.6em 0 .4em;border-top:1px solid var(--line);padding-top:1.1em}
h3{color:#fff;font-size:1.02rem;margin:1.1em 0 .3em}
.eyebrow{color:var(--cy);font-size:.75rem;letter-spacing:.14em;text-transform:uppercase;font-weight:700;margin:0}
.lead{font-size:1.05rem;color:#dbe6ef}
.mut{color:var(--mut)}
nav.crumbs{font-size:.8rem;color:var(--mut);padding:14px 0 0}
nav.crumbs a{color:var(--mut)}
img.diagram{width:100%;border:1px solid var(--line);border-radius:12px;margin:10px 0}
ul,ol{padding-left:22px}li{margin:5px 0}
.cardgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px;margin-top:8px}
.cardlink{display:block;border:1px solid var(--line);background:rgba(255,255,255,.03);border-radius:12px;padding:14px}
.cardlink b{color:#fff;display:block}.cardlink span{color:var(--mut);font-size:.85rem}
.q{border:1px solid var(--line);background:rgba(255,255,255,.03);border-radius:10px;padding:12px 14px;margin:10px 0}
.q .qt{font-weight:700;color:#fff}
.q ul{list-style:none;padding:0;margin:8px 0}
.q li{padding:4px 0}
.q li.correct{color:var(--ok);font-weight:700}
.q .exp{color:var(--mut);font-size:.9rem;margin-top:6px}
.tips li{margin:7px 0}
footer.site{border-top:1px solid var(--line);color:var(--mut);font-size:.85rem;padding:26px 0;margin-top:32px}
.backapp{display:inline-block;margin-top:6px;font-weight:600}
`;

function page({ title, desc, canonical, jsonld, body }) {
  return `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="article"><meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE}/og-image.png"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/svg+xml" href="/portfolio/favicon.svg">
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
<style>${STYLE}</style></head><body>
<header class="site"><div class="wrap"><a class="brand" href="/portfolio/">Aman Bohra</a>
<nav><a href="/portfolio/">Portfolio</a><a href="/portfolio/guides/">Study Guides</a><a href="/portfolio/certifications.html">Certifications</a></nav></div></header>
<main><div class="wrap">${body}</div></main>
<footer class="site"><div class="wrap">© ${new Date().getFullYear()} Aman Bohra · Certification study guides · <a href="/portfolio/">Interactive portfolio</a></div></footer>
</body></html>`;
}

mkdirSync(OUT, { recursive: true });
const urls = [];

/* ---- per-cert pages ---- */
for (const m of modules) {
  const url = `${SITE}/guides/${m.slug}.html`;
  const desc = `${m.name}: what it is, where it's used, study roadmap, notes, plain-English explanations, exam tips, and ${m.questions.length} practice questions with answers and detailed explanations.`;

  const sec = (h, inner) => `<h2>${esc(h)}</h2>${inner}`;
  const paras = (arr) => (arr || []).map((p) => `<p>${esc(p)}</p>`).join("");
  const lis = (arr) => `<ul>${(arr || []).map((p) => `<li>${esc(p)}</li>`).join("")}</ul>`;
  const ols = (arr) => `<ol>${(arr || []).map((p) => `<li>${esc(p)}</li>`).join("")}</ol>`;

  const projectsHtml = (m.projects || [])
    .map((p, i) => {
      const concepts =
        p.conceptDetails && p.conceptDetails.length
          ? `<ul>${p.conceptDetails.map((c) => `<li><strong>${esc(c.name)}:</strong> ${esc(c.detail)}</li>`).join("")}</ul>`
          : `<p>${p.concepts.map(esc).join(", ")}</p>`;
      const stepsArr = p.steps && p.steps.length ? p.steps : p.approach;
      const stepsLabel = p.steps && p.steps.length ? "Implementation steps" : "Approach";
      const outcomes =
        p.outcomes && p.outcomes.length
          ? `<p><strong>Outcomes:</strong></p><ul>${p.outcomes.map((o) => `<li>${esc(o)}</li>`).join("")}</ul>`
          : "";
      return (
        `<div class="q"><p class="qt">${i + 1}. ${esc(p.title)}</p>` +
        (p.diagram ? `<img class="diagram" src="${p.diagram}" alt="${esc(p.title)} architecture diagram" loading="lazy">` : "") +
        `<p><strong>Goal:</strong> ${esc(p.goal)}</p>` +
        (p.architecture ? `<p><strong>Architecture &amp; data model:</strong> ${esc(p.architecture)}</p>` : "") +
        `<p><strong>Concepts covered:</strong></p>${concepts}` +
        `<p><strong>${stepsLabel}:</strong></p><ol>${stepsArr.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>` +
        outcomes +
        `<p><strong>Stack:</strong> ${p.stack.map(esc).join(", ")}</p>` +
        `<p class="exp"><em>${esc(p.relevance)}</em></p>` +
        (p.repo ? `<p><a href="${p.repo}">Open project lab (README + starter) →</a></p>` : "") +
        `</div>`
      );
    })
    .join("");

  const notesHtml = m.notes
    .map((n) => `<h3>${esc(n.h)}</h3><ul>${n.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>`)
    .join("");

  const qHtml = m.questions
    .map((q, i) => {
      const opts = q.o
        .map((o, j) => `<li class="${j === q.a ? "correct" : ""}">${String.fromCharCode(65 + j)}. ${esc(o)}${j === q.a ? " ✓" : ""}</li>`)
        .join("");
      return `<div class="q"><p class="qt">${i + 1}. ${esc(q.q)}</p><ul>${opts}</ul><p class="exp"><strong>Explanation:</strong> ${esc(q.e)}</p></div>`;
    })
    .join("");

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Person", "@id": PERSON, name: "Aman Bohra", url: SITE + "/" },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
          { "@type": "ListItem", position: 2, name: "Study Guides", item: SITE + "/guides/" },
          { "@type": "ListItem", position: 3, name: m.name },
        ],
      },
      {
        "@type": "LearningResource",
        name: `${m.name} — Study Guide`,
        description: desc,
        url,
        educationalLevel: m.level,
        learningResourceType: ["Study guide", "Practice questions"],
        about: m.name,
        author: { "@id": PERSON },
        provider: { "@type": "Organization", name: m.issuer },
        inLanguage: "en",
      },
      {
        "@type": "FAQPage",
        mainEntity: m.questions.slice(0, 8).map((q) => ({
          "@type": "Question",
          name: q.q,
          acceptedAnswer: { "@type": "Answer", text: `${q.o[q.a]} — ${q.e}` },
        })),
      },
    ],
  };

  const body = `
<nav class="crumbs"><a href="/portfolio/">Home</a> › <a href="/portfolio/guides/">Study Guides</a> › ${esc(m.name)}</nav>
<p class="eyebrow">${esc(m.issuer)} · ${esc(m.level)}</p>
<h1>${esc(m.name)} — Study Guide</h1>
<p class="lead">${esc(m.blurb)}</p>
<p class="mut">${esc(m.examFormat)}</p>
${m.image ? `<img class="diagram" src="${m.image}" alt="${esc(m.name)} concept diagram" loading="lazy">` : ""}
${m.about?.length ? sec("What it is", paras(m.about)) : ""}
${m.usage?.length ? sec("Where it's used", lis(m.usage)) : ""}
${m.layman?.length ? sec("In plain English", (m.images?.[1] ? `<img class="diagram" src="${m.images[1]}" alt="${esc(m.name)} everyday analogy" loading="lazy">` : "") + lis(m.layman)) : ""}
${m.tips?.length ? sec("Exam shortcut tricks", `<ol class="tips">${m.tips.map((t) => `<li>${esc(t)}</li>`).join("")}</ol>`) : ""}
${sec("Study roadmap", ols(m.roadmap))}
${sec("Study notes", notesHtml)}
${m.projects?.length ? sec("Hands-on projects", projectsHtml) : ""}
${sec(`Practice questions (${m.questions.length})`, qHtml)}
<p class="backapp"><a href="/portfolio/#/study/${m.slug}">Open the interactive quiz &amp; Save-as-PDF →</a></p>`;

  writeFileSync(join(OUT, `${m.slug}.html`), page({ title: `${m.name} — Study Guide & ${m.questions.length} Practice Questions | Aman Bohra`, desc, canonical: url, jsonld, body }));
  urls.push({ loc: url, pri: "0.7" });
}

/* ---- hub index ---- */
const cards = modules
  .map((m) => `<a class="cardlink" href="/portfolio/guides/${m.slug}.html"><b>${esc(m.name)}</b><span>${esc(m.issuer)} · ${m.questions.length} practice questions</span></a>`)
  .join("");
const totalQ = modules.reduce((n, m) => n + m.questions.length, 0);
const hubDesc = `Free certification study guides by Aman Bohra: roadmaps, notes, plain-English explanations, exam tips, and ${totalQ} practice questions with answers across ${modules.length} Databricks, Microsoft Power BI (PL-300), and Qlik certifications.`;
const hubJsonld = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", "@id": PERSON, name: "Aman Bohra", url: SITE + "/" },
    { "@type": "CollectionPage", name: "Certification Study Guides", description: hubDesc, url: SITE + "/guides/", author: { "@id": PERSON } },
    {
      "@type": "ItemList",
      name: "Certification study guides",
      itemListElement: modules.map((m, i) => ({ "@type": "ListItem", position: i + 1, name: m.name, url: `${SITE}/guides/${m.slug}.html` })),
    },
  ],
};
const hubBody = `
<nav class="crumbs"><a href="/portfolio/">Home</a> › Study Guides</nav>
<p class="eyebrow">Study Hub</p>
<h1>Certification Study Guides</h1>
<p class="lead">${esc(hubDesc)}</p>
<div class="cardgrid">${cards}</div>
<p class="backapp"><a href="/portfolio/#/study">Open the interactive Study Hub →</a></p>`;
writeFileSync(join(OUT, "index.html"), page({ title: `Certification Study Guides — ${totalQ} Practice Questions | Aman Bohra`, desc: hubDesc, canonical: SITE + "/guides/", jsonld: hubJsonld, body: hubBody }));
urls.push({ loc: SITE + "/guides/", pri: "0.8" });

/* ---- append to sitemap ---- */
const smPath = join(ROOT, "public", "sitemap.xml");
if (existsSync(smPath)) {
  let sm = readFileSync(smPath, "utf8");
  const existing = new Set([...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((x) => x[1]));
  const add = urls
    .filter((u) => !existing.has(u.loc))
    .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${TODAY}</lastmod><changefreq>monthly</changefreq><priority>${u.pri}</priority></url>`)
    .join("\n");
  if (add) sm = sm.replace("</urlset>", add + "\n</urlset>");
  writeFileSync(smPath, sm);
}

console.log(`Generated ${modules.length} guide pages + index. Sitemap updated.`);
