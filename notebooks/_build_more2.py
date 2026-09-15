"""Builds 3 more notebooks: ETL→star schema, GenAI RAG, anomaly detection."""
import nbformat as nbf, os
OUT = os.path.dirname(os.path.abspath(__file__))
def md(t): return nbf.v4.new_markdown_cell(t)
def code(t): return nbf.v4.new_code_cell(t)
def save(name, cells):
    nb = nbf.v4.new_notebook(); nb["cells"] = cells
    nb["metadata"] = {"kernelspec": {"display_name":"Python 3","language":"python","name":"python3"},
                      "language_info": {"name":"python"}}
    with open(os.path.join(OUT, name), "w") as f: nbf.write(nb, f)
    print("wrote", name)

# ============================================================================
# ETL -> Star Schema (Data Engineering, ETL/ELT)
# ============================================================================
save("etl_star_schema_pipeline.ipynb", [
md("""# ETL → Star Schema: A Data-Engineering Pipeline

**Author:** Aman Bohra · Senior Analytics & BI Professional
**Portfolio:** https://amandbohra.github.io/portfolio/

Dashboards are only as good as the model beneath them. This notebook walks a small **ETL/ELT pipeline**:
raw operational rows → cleaned staging → a **dimensional star schema** (fact + dimensions) in SQLite →
an analytical query that a BI tool would sit on. It's the data-engineering foundation behind good BI.

> ⚠️ Synthetic data for demonstration only — no real or confidential client data.
"""),
code("""import numpy as np, pandas as pd, sqlite3, matplotlib.pyplot as plt
plt.rcParams.update({"figure.facecolor":"white","axes.grid":True,"grid.alpha":0.25})
rng = np.random.default_rng(5)
"""),
md("""## 1. Extract — raw operational data
A messy "sales transactions" extract, the kind you'd pull from a source system."""),
code("""n = 3000
regions = ["North","South","East","West"]
products = ["Property","Auto","Liability","Marine","Specialty"]
raw = pd.DataFrame({
    "txn_id": np.arange(1, n+1),
    "date": pd.to_datetime("2024-01-01") + pd.to_timedelta(rng.integers(0, 365, n), unit="D"),
    "region": rng.choice(regions, n),
    "product": rng.choice(products, n, p=[.34,.27,.18,.11,.10]),
    "distributor": rng.integers(1, 21, n),
    "premium": (rng.normal(1400, 400, n)).round(2),
})
raw.loc[rng.choice(n, 30, replace=False), "premium"] = np.nan   # a few nulls to clean
raw.head()
"""),
md("""## 2. Transform — clean & conform (staging)"""),
code("""stg = raw.copy()
stg = stg.dropna(subset=["premium"])
stg = stg[stg["premium"] > 0]
stg["date"] = pd.to_datetime(stg["date"])
stg["year"] = stg["date"].dt.year
stg["month"] = stg["date"].dt.month
print(f"raw rows: {len(raw)} -> clean rows: {len(stg)}")
stg.head()
"""),
md("""## 3. Load — build the star schema (dimensions + fact)"""),
code("""# Dimensions
dim_region = pd.DataFrame({"region": sorted(stg.region.unique())})
dim_region["region_id"] = np.arange(1, len(dim_region)+1)
dim_product = pd.DataFrame({"product": sorted(stg["product"].unique())})
dim_product["product_id"] = np.arange(1, len(dim_product)+1)
dim_date = stg[["date","year","month"]].drop_duplicates().sort_values("date").reset_index(drop=True)
dim_date["date_id"] = np.arange(1, len(dim_date)+1)

# Fact — surrogate keys via joins
fact = (stg.merge(dim_region, on="region")
           .merge(dim_product, on="product")
           .merge(dim_date[["date","date_id"]], on="date")
        [["txn_id","date_id","region_id","product_id","distributor","premium"]]
        .rename(columns={"distributor":"distributor_id","premium":"premium_amt"}))

# Persist to SQLite (the "warehouse")
con = sqlite3.connect(":memory:")
for name, d in {"dim_region":dim_region,"dim_product":dim_product,"dim_date":dim_date,"fact_premium":fact}.items():
    d.to_sql(name, con, index=False, if_exists="replace")
print("fact_premium rows:", len(fact))
fact.head()
"""),
md("""## 4. Analytical query — what BI sits on
A star schema makes analytical SQL simple and fast: join fact to dimensions, aggregate."""),
code("""q = '''
SELECT p.product, d.month, ROUND(SUM(f.premium_amt)/1e6, 3) AS premium_musd
FROM fact_premium f
JOIN dim_product p ON p.product_id = f.product_id
JOIN dim_date   d ON d.date_id    = f.date_id
GROUP BY p.product, d.month
ORDER BY d.month, premium_musd DESC;
'''
res = pd.read_sql(q, con)
pivot = res.pivot(index="month", columns="product", values="premium_musd").fillna(0)
pivot.head()
"""),
code("""ax = pivot.plot(figsize=(11,4.5), lw=2, marker="o", ms=3, colormap="winter")
ax.set_title("Monthly premium by product ($M) — from the star schema")
ax.set_ylabel("$M"); ax.set_xlabel("month"); plt.tight_layout(); plt.show()
con.close()
"""),
md("""## 5. Why this matters
- **ETL vs ELT** — same idea, different order: transform-then-load, or load-raw-then-transform in the
  warehouse (Databricks/SQL). Either way, the destination is a clean, conformed model.
- **Star schema** — fact + dimensions keep queries simple, fast, and consistent across every dashboard.
- **Governance** — cleaning and conforming *once* in the pipeline is why every downstream report agrees.

This is the unglamorous layer that makes BI trustworthy. Get it right and the dashboards take care of themselves.

*— Aman Bohra*
"""),
])

# ============================================================================
# GenAI — RAG analytics assistant (architecture + working retrieval)
# ============================================================================
save("genai_rag_analytics_assistant.ipynb", [
md("""# GenAI: A RAG Analytics Assistant (POC)

**Author:** Aman Bohra · Senior Analytics & BI Professional
**Portfolio:** https://amandbohra.github.io/portfolio/

A common enterprise ask: *"let business users ask questions of our analytics docs in plain English."*
This notebook builds a lightweight **Retrieval-Augmented Generation (RAG)** pipeline — the retrieval
half runs here for real (TF-IDF over a small knowledge base); the generation step is shown as a clear
plug-in point for an LLM (Claude / OpenAI). It reflects my Databricks GenAI Engineer certification and
how I'd frame a governed GenAI POC — grounded answers, no hallucinated numbers.

> ⚠️ Illustrative POC on synthetic docs. The LLM call is stubbed so the notebook runs without API keys.
"""),
code("""import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
"""),
md("""## 1. Knowledge base
A few short "analytics glossary / KPI definition" snippets — the governed source of truth."""),
code("""KB = [
 {"id":"kpi-written-premium","text":"Written Premium is the total premium on policies issued during a period, before deductions. It measures new business volume."},
 {"id":"kpi-earned-premium","text":"Earned Premium is the portion of written premium that corresponds to coverage already provided in the period. Earned = Written adjusted for the unexpired portion."},
 {"id":"kpi-loss-ratio","text":"Loss Ratio is incurred losses divided by earned premium. A lower loss ratio indicates better underwriting profitability."},
 {"id":"kpi-combined-ratio","text":"Combined Ratio is the loss ratio plus the expense ratio. Below 100% means an underwriting profit; above 100% means a loss."},
 {"id":"gov-maker-checker","text":"Maker-checker is a governance control where one person prepares a change and a second reviews and approves it before it reaches production, reducing errors."},
 {"id":"proc-refresh","text":"The distributor performance dashboard refreshes daily at 6am from the warehouse and covers all international regions."},
]
docs = [d["text"] for d in KB]
len(KB)
"""),
md("""## 2. Retrieval — embed & search (runs for real)
TF-IDF vectors + cosine similarity retrieve the most relevant snippets for a question."""),
code("""vec = TfidfVectorizer(stop_words="english")
M = vec.fit_transform(docs)

def retrieve(query, k=2):
    qv = vec.transform([query])
    sims = cosine_similarity(qv, M)[0]
    idx = sims.argsort()[::-1][:k]
    return [(KB[i]["id"], docs[i], float(sims[i])) for i in idx if sims[i] > 0.05]

for hid, txt, score in retrieve("How is loss ratio calculated?"):
    print(f"[{score:.2f}] {hid}: {txt}")
"""),
md("""## 3. Generation — where the LLM plugs in
The retrieved context is injected into a prompt. In production this calls Claude/OpenAI; here it's a
transparent stub so the notebook runs offline. Note the guardrail: **answer only from context.**"""),
code("""def build_prompt(question, context):
    ctx = "\\n".join(f"- {c}" for c in context)
    return (f"You are an analytics assistant. Answer ONLY from the context. "
            f"If the answer isn't in the context, say you don't know.\\n\\n"
            f"Context:\\n{ctx}\\n\\nQuestion: {question}\\nAnswer:")

def call_llm(prompt):
    # ---- Plug in your model here, e.g.: ----
    # from anthropic import Anthropic
    # return Anthropic().messages.create(model="claude-...", max_tokens=300,
    #        messages=[{"role":"user","content":prompt}]).content[0].text
    # Stubbed (extractive) fallback so this runs without keys:
    ctx_line = prompt.split("Context:\\n")[1].split("\\n\\nQuestion")[0]
    return "Based on the retrieved definitions:\\n" + ctx_line

def answer(question, k=2):
    hits = retrieve(question, k)
    if not hits:
        return "I don't know — that isn't covered in the knowledge base."
    context = [t for _, t, _ in hits]
    return call_llm(build_prompt(question, context))

print(answer("What is the combined ratio and what does it mean?"))
print("\\n---\\n")
print(answer("When does the distributor dashboard refresh?"))
print("\\n---\\n")
print(answer("What was our Q3 revenue?"))   # not in KB -> honest 'don't know'
"""),
md("""## 4. Why frame it this way
- **Grounded** — answers come from a governed KB, so the model can't invent KPI numbers.
- **Honest failure** — if the context doesn't hold the answer, it says so (critical in regulated domains).
- **Swappable** — retrieval is real and measurable; the LLM is one clearly-isolated call you can harden,
  cache, and cost-control.

This is how I'd pilot GenAI in an enterprise analytics setting: useful, auditable, and safe by design —
not a chatbot bolted onto sensitive data.

*— Aman Bohra*
"""),
])

# ============================================================================
# Anomaly / fraud detection (Data Science)
# ============================================================================
save("anomaly_detection_claims.ipynb", [
md("""# Anomaly Detection on Insurance Claims

**Author:** Aman Bohra · Senior Analytics & BI Professional
**Portfolio:** https://amandbohra.github.io/portfolio/

Unusual claims are worth a human's attention — for fraud, error, or simply data issues. This notebook
uses an **Isolation Forest** to surface the most anomalous claims in a **synthetic** dataset and turn
the scores into a prioritized review queue.

> ⚠️ Synthetic data for demonstration only — no real or confidential client data.
"""),
code("""import numpy as np, pandas as pd, matplotlib.pyplot as plt
from sklearn.ensemble import IsolationForest
plt.rcParams.update({"figure.facecolor":"white","axes.grid":True,"grid.alpha":0.25})
rng = np.random.default_rng(9)
"""),
md("""## 1. Synthetic claims (mostly normal, a few planted anomalies)"""),
code("""N = 2000
amount = rng.gamma(3.0, 1500, N)                     # claim amount
days_to_report = rng.poisson(7, N) + 1               # reporting lag
prior_claims = rng.poisson(0.5, N)
df = pd.DataFrame({"amount":amount.round(0), "days_to_report":days_to_report, "prior_claims":prior_claims})

# plant 25 obvious anomalies (huge amount + long lag + many priors)
idx = rng.choice(N, 25, replace=False)
df.loc[idx, "amount"] *= rng.uniform(6, 12, 25)
df.loc[idx, "days_to_report"] += rng.integers(40, 120, 25)
df.loc[idx, "prior_claims"] += rng.integers(4, 9, 25)
df["is_planted"] = 0; df.loc[idx, "is_planted"] = 1
df.head()
"""),
md("""## 2. Fit Isolation Forest & score"""),
code("""feat = ["amount","days_to_report","prior_claims"]
iso = IsolationForest(contamination=0.02, random_state=1).fit(df[feat])
df["anomaly_score"] = -iso.score_samples(df[feat])   # higher = more anomalous
df["flagged"] = (iso.predict(df[feat]) == -1).astype(int)

caught = df[df.is_planted==1]["flagged"].mean()
print(f"Flagged {df.flagged.sum()} of {N} claims for review "
      f"({df.flagged.mean():.1%}); caught {caught:.0%} of planted anomalies.")
"""),
md("""## 3. Visualize & build the review queue"""),
code("""fig, ax = plt.subplots(1,2, figsize=(13,4.5))
sc = ax[0].scatter(df.amount, df.days_to_report, c=df.anomaly_score, cmap="magma", s=14, alpha=.8)
ax[0].set_xlabel("claim amount"); ax[0].set_ylabel("days to report")
ax[0].set_title("Claims coloured by anomaly score"); fig.colorbar(sc, ax=ax[0], label="score")

ax[1].hist(df.anomaly_score, bins=40, color="#2386c8")
ax[1].axvline(df[df.flagged==1].anomaly_score.min(), ls="--", color="#e06666", label="flag threshold")
ax[1].set_title("Anomaly score distribution"); ax[1].set_xlabel("score"); ax[1].legend()
plt.tight_layout(); plt.show()

queue = df[df.flagged==1].sort_values("anomaly_score", ascending=False).head(10)
queue[feat+["anomaly_score"]].round(2)
"""),
md("""## 4. Business value
- **Prioritized review** — investigators start with the top of the queue, not a random sample.
- **Unsupervised** — no labelled fraud needed; it flags what's *unusual*, then humans judge.
- **Translation** — the deliverable isn't a model; it's a ranked, explainable worklist plugged into BI.

In practice I'd pair this with domain rules and feed confirmed cases back to improve targeting over time.

*— Aman Bohra*
"""),
])
print("ALL BUILT 2")
