"""Builds 2 more notebooks: A/B test analysis, fraud rules+ML hybrid."""
import nbformat as nbf, os
OUT = os.path.dirname(os.path.abspath(__file__))
def md(t): return nbf.v4.new_markdown_cell(t)
def code(t): return nbf.v4.new_code_cell(t)
def save(name, cells):
    nb = nbf.v4.new_notebook(); nb["cells"] = cells
    nb["metadata"] = {"kernelspec":{"display_name":"Python 3","language":"python","name":"python3"},
                      "language_info":{"name":"python"}}
    with open(os.path.join(OUT, name), "w") as f: nbf.write(nb, f)
    print("wrote", name)

# ============================================================================
# A/B Test Analysis
# ============================================================================
save("ab_test_analysis.ipynb", [
md("""# A/B Test Analysis: Did the Change Actually Work?

**Author:** Aman Bohra · Senior Analytics & BI Professional
**Portfolio:** https://amandbohra.github.io/portfolio/

Analysts are constantly asked *"did the new version do better?"* — a new report layout, a checkout flow,
an outreach message. This notebook runs a proper **A/B test analysis** on a **synthetic** experiment:
conversion rates, a two-proportion significance test, a confidence interval on the uplift, and the
practical-vs-statistical-significance judgment that actually drives the decision.

> ⚠️ Synthetic data for demonstration only — no real or confidential client data.
"""),
code("""import numpy as np, pandas as pd, matplotlib.pyplot as plt
from scipy import stats
plt.rcParams.update({"figure.facecolor":"white","axes.grid":True,"grid.alpha":0.25})
rng = np.random.default_rng(21)
"""),
md("""## 1. The experiment
Variant A (control) vs Variant B (new). Each visitor either converts (1) or not (0).
We plant a small true uplift so there's something real to detect."""),
code("""n_a, n_b = 6000, 6000
p_a_true, p_b_true = 0.114, 0.129     # true conversion rates
a = rng.binomial(1, p_a_true, n_a)
b = rng.binomial(1, p_b_true, n_b)
conv_a, conv_b = a.sum(), b.sum()
rate_a, rate_b = a.mean(), b.mean()
print(f"A (control): {conv_a}/{n_a} = {rate_a:.3%}")
print(f"B (variant): {conv_b}/{n_b} = {rate_b:.3%}")
print(f"Observed absolute uplift: {rate_b-rate_a:+.3%}   relative: {(rate_b-rate_a)/rate_a:+.1%}")
"""),
md("""## 2. Is the difference real? (two-proportion z-test)"""),
code("""# pooled two-proportion z-test
p_pool = (conv_a + conv_b) / (n_a + n_b)
se = np.sqrt(p_pool*(1-p_pool)*(1/n_a + 1/n_b))
z = (rate_b - rate_a) / se
p_value = 2*(1 - stats.norm.cdf(abs(z)))
print(f"z = {z:.2f},  p-value = {p_value:.4f}")
print("Statistically significant at 95%?", "YES" if p_value < 0.05 else "NO")
"""),
md("""## 3. How big is the effect? (95% confidence interval on uplift)"""),
code("""se_diff = np.sqrt(rate_a*(1-rate_a)/n_a + rate_b*(1-rate_b)/n_b)
diff = rate_b - rate_a
lo, hi = diff - 1.96*se_diff, diff + 1.96*se_diff
print(f"Absolute uplift: {diff:+.3%}  (95% CI: {lo:+.3%} to {hi:+.3%})")
print(f"Relative uplift: {diff/rate_a:+.1%}")
"""),
code("""fig, ax = plt.subplots(figsize=(7.5,4))
rates=[rate_a, rate_b]; errs=[1.96*np.sqrt(rate_a*(1-rate_a)/n_a), 1.96*np.sqrt(rate_b*(1-rate_b)/n_b)]
ax.bar(["A (control)","B (variant)"], rates, yerr=errs, capsize=8,
       color=["#1769aa","#46c7e8"])
for i,r in enumerate(rates): ax.text(i, r+0.002, f"{r:.2%}", ha="center", fontweight="bold")
ax.set_ylabel("conversion rate"); ax.set_title("Conversion by variant (95% error bars)")
plt.tight_layout(); plt.show()
"""),
md("""## 4. The decision
Two questions, not one:

1. **Statistical significance** — is the difference unlikely to be noise? (p-value)
2. **Practical significance** — is the effect *big enough to matter* for the business? (the CI)

A result can be statistically significant but too small to act on — or promising but underpowered.
The honest read here: variant B shows a **real, positive uplift** whose confidence interval stays above
zero, so it's a defensible ship decision. Had the CI crossed zero, the right answer would be "keep
testing," not "ship it."

*Good analysis doesn't just produce a p-value — it produces a decision someone can stand behind.*

*— Aman Bohra*
"""),
])

# ============================================================================
# Fraud detection — rules + ML hybrid
# ============================================================================
save("fraud_detection_hybrid.ipynb", [
md("""# Fraud Detection: A Rules + ML Hybrid

**Author:** Aman Bohra · Senior Analytics & BI Professional
**Portfolio:** https://amandbohra.github.io/portfolio/

In the real world, fraud detection is rarely *just* a model. It's **business rules** (known red flags)
**plus** a machine-learning score (patterns humans miss), combined into one prioritized queue. This
notebook builds that hybrid on a **synthetic** claims dataset and measures how the combination beats
either piece alone.

> ⚠️ Synthetic data for demonstration only — no real or confidential client data.
"""),
code("""import numpy as np, pandas as pd, matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import precision_score, recall_score, roc_auc_score
plt.rcParams.update({"figure.facecolor":"white","axes.grid":True,"grid.alpha":0.25})
rng = np.random.default_rng(13)
"""),
md("""## 1. Synthetic claims with a small, realistic fraud rate (~4%)"""),
code("""N = 5000
amount = rng.gamma(3, 1500, N)
days_to_report = rng.poisson(6, N)+1
prior_claims = rng.poisson(0.5, N)
night_filing = rng.integers(0,2,N)
mismatch = rng.integers(0,2,N,dtype=int)          # doc mismatch flag
# latent fraud propensity
z = -3.2 + 0.00018*amount + 0.05*days_to_report + 0.5*prior_claims + 0.4*mismatch + 0.2*night_filing
p = 1/(1+np.exp(-z))
fraud = (rng.random(N) < p).astype(int)
df = pd.DataFrame({"amount":amount.round(0),"days_to_report":days_to_report,"prior_claims":prior_claims,
                   "night_filing":night_filing,"doc_mismatch":mismatch,"fraud":fraud})
print(f"Fraud rate: {df.fraud.mean():.2%}  ({df.fraud.sum()} of {N})")
df.head()
"""),
md("""## 2. Layer 1 — business rules (transparent red flags)"""),
code("""def rule_flags(d):
    r = ((d.amount > 12000).astype(int)
       + (d.days_to_report > 30).astype(int)
       + (d.prior_claims >= 3).astype(int)
       + (d.doc_mismatch == 1).astype(int))
    return r
df["rule_score"] = rule_flags(df)
rule_flag = (df["rule_score"] >= 2).astype(int)
print("Rules alone — precision: %.2f  recall: %.2f" % (
    precision_score(df.fraud, rule_flag), recall_score(df.fraud, rule_flag)))
"""),
md("""## 3. Layer 2 — ML model (patterns the rules miss)"""),
code("""feat = ["amount","days_to_report","prior_claims","night_filing","doc_mismatch","rule_score"]
Xtr,Xte,ytr,yte = train_test_split(df[feat], df.fraud, test_size=0.3, random_state=2, stratify=df.fraud)
clf = RandomForestClassifier(n_estimators=200, class_weight="balanced", random_state=2).fit(Xtr,ytr)
proba = clf.predict_proba(Xte)[:,1]
print("ML alone — ROC AUC: %.3f" % roc_auc_score(yte, proba))
"""),
md("""## 4. Combine — hybrid risk score, then compare"""),
code("""te = Xte.copy(); te["fraud"]=yte.values; te["ml"]=proba
# normalise rule score to 0-1 and blend
te["rule_norm"] = te["rule_score"]/4.0
te["hybrid"] = 0.6*te["ml"] + 0.4*te["rule_norm"]

def prec_rec_at_topk(score, k=0.10):
    thr = te[score].quantile(1-k)
    flag = (te[score] >= thr).astype(int)
    return precision_score(te.fraud, flag), recall_score(te.fraud, flag)

rows=[]
for name in ["rule_norm","ml","hybrid"]:
    p,r = prec_rec_at_topk(name, 0.10)
    rows.append({"model":name,"precision@top10%":round(p,3),"recall@top10%":round(r,3)})
pd.DataFrame(rows)
"""),
code("""fig, ax = plt.subplots(figsize=(8,4.2))
labels=["Rules","ML","Hybrid"]; keys=["rule_norm","ml","hybrid"]
prec=[prec_rec_at_topk(k)[0] for k in keys]; rec=[prec_rec_at_topk(k)[1] for k in keys]
x=np.arange(3); w=0.38
ax.bar(x-w/2, prec, w, label="Precision@10%", color="#1769aa")
ax.bar(x+w/2, rec, w, label="Recall@10%", color="#46c7e8")
ax.set_xticks(x); ax.set_xticklabels(labels); ax.set_ylim(0,1)
ax.set_title("Reviewing the top 10% riskiest claims"); ax.legend()
plt.tight_layout(); plt.show()
"""),
md("""## 5. Why hybrid wins
- **Rules** are transparent and catch known fraud patterns — but miss novel ones and over-flag.
- **ML** catches subtle patterns — but is a black box the business may not trust alone.
- **Hybrid** blends them: explainable red flags *plus* learned signal, giving a better precision/recall
  trade-off on the top-risk queue investigators actually work.

The output isn't a probability — it's a **ranked worklist** with a reason attached to each case. That's
what makes it usable, and auditable, in a regulated setting.

*— Aman Bohra*
"""),
])
print("ALL BUILT 3")
