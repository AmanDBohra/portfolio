"""Builds three more analysis notebooks (executed separately via nbconvert)."""
import nbformat as nbf
import os

OUT = os.path.dirname(os.path.abspath(__file__))
def md(t): return nbf.v4.new_markdown_cell(t)
def code(t): return nbf.v4.new_code_cell(t)

def save(name, cells):
    nb = nbf.v4.new_notebook()
    nb["cells"] = cells
    nb["metadata"] = {
        "kernelspec": {"display_name": "Python 3", "language": "python", "name": "python3"},
        "language_info": {"name": "python"},
    }
    with open(os.path.join(OUT, name), "w") as f:
        nbf.write(nb, f)
    print("wrote", name)

# ============================================================================
# 1) Insurance Premium Forecasting
# ============================================================================
save("insurance_premium_forecasting.ipynb", [
md("""# Insurance Premium Forecasting

**Author:** Aman Bohra · Senior Analytics & BI Professional
**Portfolio:** https://amandbohra.github.io/portfolio/

Forecasting **Written Premium** is a staple of insurance analytics — it drives capacity planning,
target-setting, and distributor conversations. Here I build a transparent, dependency-light forecast
(trend + seasonality) on a **synthetic** monthly premium series and project the next 12 months.

> ⚠️ Synthetic data for demonstration only — no real or confidential client data.
"""),
code("""import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
plt.rcParams.update({"figure.facecolor": "white", "axes.grid": True, "grid.alpha": 0.25})
rng = np.random.default_rng(7)
"""),
md("""## 1. Generate 48 months of Written Premium
A rising trend, a repeating 12-month seasonal pattern, and random noise."""),
code("""n = 48
t = np.arange(n)
dates = pd.date_range("2022-01-01", periods=n, freq="MS")
trend = 40 + 0.55 * t                              # $M, gently rising
season = 6 * np.sin(2*np.pi*(t % 12)/12) + 3*np.cos(2*np.pi*(t % 12)/6)
noise = rng.normal(0, 1.6, n)
premium = trend + season + noise
s = pd.Series(premium, index=dates, name="WrittenPremium")
s.head()
"""),
code("""ax = s.plot(figsize=(11,4), color="#2386c8", lw=2, marker="o", ms=3)
ax.set_title("Written Premium — history ($M)"); ax.set_ylabel("$M"); plt.tight_layout(); plt.show()
"""),
md("""## 2. Decompose: trend + seasonal profile
Estimate the trend with a centred 12-month moving average, then the average seasonal deviation per
calendar month."""),
code("""ma = s.rolling(12, center=True).mean()
detrended = s - ma
seasonal = detrended.groupby(detrended.index.month).mean()
seasonal -= seasonal.mean()   # centre to zero
print("Seasonal profile ($M deviation by month):")
print(seasonal.round(2).to_string())
"""),
md("""## 3. Forecast the next 12 months
Extrapolate the linear trend and add the seasonal profile back on. A simple, explainable baseline —
exactly the kind of forecast a business can interrogate."""),
code("""# fit a linear trend on t
b1, b0 = np.polyfit(t, s.values, 1)
future_t = np.arange(n, n+12)
future_dates = pd.date_range(s.index[-1] + pd.offsets.MonthBegin(), periods=12, freq="MS")
trend_fc = b0 + b1*future_t
seas_fc = np.array([seasonal.loc[d.month] for d in future_dates])
forecast = pd.Series(trend_fc + seas_fc, index=future_dates, name="Forecast")

# simple band from historical residual spread
resid_std = (s - (b0 + b1*t) - np.array([seasonal.loc[d.month] for d in s.index])).std()
lower, upper = forecast - 1.96*resid_std, forecast + 1.96*resid_std
forecast.round(1)
"""),
code("""fig, ax = plt.subplots(figsize=(11,4.5))
s.plot(ax=ax, color="#1769aa", lw=2, label="History")
forecast.plot(ax=ax, color="#46c7e8", lw=2.5, marker="o", ms=4, label="Forecast (12m)")
ax.fill_between(forecast.index, lower, upper, color="#46c7e8", alpha=0.15, label="95% band")
ax.set_title("Written Premium — 12-month forecast ($M)"); ax.set_ylabel("$M"); ax.legend()
plt.tight_layout(); plt.show()
print(f"Next-12-months total forecast: ${forecast.sum():.0f}M  (avg ${forecast.mean():.1f}M/mo)")
"""),
md("""## 4. Business value
- **Capacity & target setting** — a defensible monthly premium plan by region/line.
- **Early-warning** — actuals falling outside the band flag a conversation, not a fire drill.
- **Explainability** — trend and seasonality are separated, so leadership can see *why* the number moves.

The method is intentionally simple and auditable. In production I'd validate against holdout months and
compare with Holt-Winters / SARIMA — but a transparent baseline is often what the business will actually trust.

*— Aman Bohra*
"""),
])

# ============================================================================
# 2) Policy Retention (Churn) Prediction
# ============================================================================
save("policy_retention_prediction.ipynb", [
md("""# Policy Retention Prediction

**Author:** Aman Bohra · Senior Analytics & BI Professional
**Portfolio:** https://amandbohra.github.io/portfolio/

A classic decision-support model: predict which policyholders are likely **not to renew**, so retention
effort goes where it matters. Built on a **synthetic** P&C policy dataset with logistic regression —
chosen because it's interpretable, which is what makes a model usable for the business.

> ⚠️ Synthetic data for demonstration only — no real or confidential client data.
"""),
code("""import numpy as np, pandas as pd, matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score, roc_curve, confusion_matrix, classification_report
plt.rcParams.update({"figure.facecolor": "white", "axes.grid": True, "grid.alpha": 0.25})
rng = np.random.default_rng(11)
"""),
md("""## 1. Synthetic policyholder dataset
Features with plausible, planted relationships to renewal (e.g. more prior claims and rising premium
lower the odds of renewal; longer tenure raises them)."""),
code("""N = 4000
tenure = rng.integers(1, 12, N)                       # years with insurer
premium = rng.normal(1200, 350, N).clip(300)          # annual premium
premium_hike = rng.normal(0.06, 0.05, N)              # YoY change
claims = rng.poisson(0.6, N)                           # prior claims
age = rng.integers(21, 75, N)
digital = rng.integers(0, 2, N)                        # engaged on digital channel

# latent renewal propensity
z = (0.9 + 0.18*tenure - 2.6*premium_hike - 0.35*claims
     + 0.008*(age-45) + 0.25*digital - 0.0002*(premium-1200))
p = 1/(1+np.exp(-z))
renewed = (rng.random(N) < p).astype(int)

df = pd.DataFrame({"tenure":tenure,"premium":premium.round(0),"premium_hike":premium_hike.round(3),
                   "prior_claims":claims,"age":age,"digital":digital,"renewed":renewed})
print("Renewal rate:", f"{df.renewed.mean():.1%}")
df.head()
"""),
md("""## 2. Train a logistic regression"""),
code("""X = df.drop(columns="renewed"); y = df["renewed"]
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=1, stratify=y)
sc = StandardScaler().fit(Xtr)
clf = LogisticRegression(max_iter=1000).fit(sc.transform(Xtr), ytr)

proba = clf.predict_proba(sc.transform(Xte))[:,1]
pred = (proba >= 0.5).astype(int)
auc = roc_auc_score(yte, proba)
print(f"ROC AUC: {auc:.3f}\\n")
print(classification_report(yte, pred, target_names=["churn","renew"]))
"""),
md("""## 3. ROC curve & what drives renewal"""),
code("""fig, ax = plt.subplots(1, 2, figsize=(13,4.5))
fpr, tpr, _ = roc_curve(yte, proba)
ax[0].plot(fpr, tpr, color="#2386c8", lw=2, label=f"AUC = {auc:.3f}")
ax[0].plot([0,1],[0,1],"--",color="#8ba0b2"); ax[0].set_title("ROC curve")
ax[0].set_xlabel("False positive rate"); ax[0].set_ylabel("True positive rate"); ax[0].legend()

coef = pd.Series(clf.coef_[0], index=X.columns).sort_values()
colors = ["#e06666" if c<0 else "#18a6a6" for c in coef.values]
ax[1].barh(coef.index, coef.values, color=colors)
ax[1].set_title("Standardized coefficients (drivers of renewal)")
plt.tight_layout(); plt.show()
"""),
md("""## 4. Turn scores into action
Rank policyholders by predicted churn risk and focus retention on the riskiest, highest-value book."""),
code("""scored = Xte.copy()
scored["churn_risk"] = 1 - proba
top = scored.sort_values("churn_risk", ascending=False).head(10)
top[["tenure","premium","premium_hike","prior_claims","churn_risk"]].round(3)
"""),
md("""## 5. Business value
- **Targeted retention** — spend effort on the at-risk, high-value segment rather than everyone.
- **Interpretability** — the coefficients show *why* (premium hikes and prior claims push churn up), so
  the business trusts and acts on it.
- **Translation** — the model's real output isn't a probability; it's a prioritized call list.

*This is the "data science → decision" translation I focus on: a model in a notebook changes nothing;
a ranked action list changes retention.*

*— Aman Bohra*
"""),
])

# ============================================================================
# 3) Data Quality Profiling
# ============================================================================
save("data_quality_profiling.ipynb", [
md("""# Data Quality Profiling & Scorecard

**Author:** Aman Bohra · Senior Analytics & BI Professional
**Portfolio:** https://amandbohra.github.io/portfolio/

Before any dashboard is trustworthy, the data underneath has to be. This notebook profiles a
deliberately **messy synthetic dataset** — missing values, duplicates, out-of-range numbers,
inconsistent categories, invalid dates — and produces a **data-quality scorecard**, mirroring the
maker/checker governance I've used to improve accuracy ~35% and cut audit findings ~15%.

> ⚠️ Synthetic data for demonstration only — no real or confidential client data.
"""),
code("""import numpy as np, pandas as pd, matplotlib.pyplot as plt
plt.rcParams.update({"figure.facecolor": "white", "axes.grid": True, "grid.alpha": 0.25})
rng = np.random.default_rng(3)
"""),
md("""## 1. Create a messy dataset (policies)"""),
code("""N = 1500
df = pd.DataFrame({
    "policy_id": [f"P{100000+i}" for i in range(N)],
    "region": rng.choice(["North","South","East","West","north ","WEST"], N, p=[.28,.24,.2,.2,.05,.03]),
    "premium": rng.normal(1200, 300, N).round(0),
    "age": rng.integers(18, 80, N).astype(float),
    "start_date": pd.to_datetime("2023-01-01") + pd.to_timedelta(rng.integers(0, 800, N), unit="D"),
})
# inject quality issues
df.loc[rng.choice(N, 90, replace=False), "premium"] = np.nan            # missing
df.loc[rng.choice(N, 40, replace=False), "age"] = rng.choice([-5,0,150,999], 40)  # out of range
df.loc[rng.choice(N, 25, replace=False), "region"] = None              # missing category
dups = df.sample(30, random_state=1)                                   # duplicate rows
df = pd.concat([df, dups], ignore_index=True)
df.loc[rng.choice(len(df), 20, replace=False), "start_date"] = pd.NaT  # missing dates
print("rows:", len(df))
df.head()
"""),
md("""## 2. Profile: completeness, uniqueness, validity, consistency"""),
code("""report = {}

# completeness (per column)
completeness = 1 - df.isna().mean()

# uniqueness
dup_rows = df.duplicated().sum()
dup_ids = df["policy_id"].duplicated().sum()

# validity
age_valid = df["age"].between(18, 100).mean()
premium_valid = df["premium"].between(100, 5000).mean()
date_valid = df["start_date"].notna().mean()

# consistency: region should be one of a clean set (case/space-insensitive)
clean_regions = {"north","south","east","west"}
region_norm = df["region"].astype(str).str.strip().str.lower()
region_consistent = region_norm.isin(clean_regions).mean()

print("Completeness by column:\\n", (completeness*100).round(1).to_string(), "\\n")
print(f"Duplicate rows: {dup_rows}   Duplicate policy_ids: {dup_ids}")
print(f"Age in [18,100]: {age_valid:.1%}   Premium in [100,5000]: {premium_valid:.1%}")
print(f"Valid start_date: {date_valid:.1%}   Region consistent: {region_consistent:.1%}")
"""),
md("""## 3. Data-quality scorecard
Roll the checks into per-dimension pass rates and an overall score."""),
code("""checks = {
    "Completeness": completeness.mean(),
    "Uniqueness": 1 - (dup_rows/len(df)),
    "Validity (age)": age_valid,
    "Validity (premium)": premium_valid,
    "Validity (dates)": date_valid,
    "Consistency (region)": region_consistent,
}
score = pd.Series(checks).sort_values()
overall = score.mean()

fig, ax = plt.subplots(figsize=(9,4.2))
colors = ["#e06666" if v<0.9 else ("#e0b050" if v<0.97 else "#18a6a6") for v in score.values]
ax.barh(score.index, score.values*100, color=colors)
ax.axvline(95, ls="--", color="#8ba0b2", label="95% target")
ax.set_xlim(0,100); ax.set_xlabel("pass rate (%)")
ax.set_title(f"Data-quality scorecard — overall {overall:.1%}"); ax.legend()
plt.tight_layout(); plt.show()
"""),
md("""## 4. Remediation & governance
The scorecard turns "the data feels off" into specific, assignable fixes:

- **Missing premium/dates** → source validation + required-field checks at ingestion.
- **Out-of-range age** → range constraints and a maker/checker review before load.
- **Inconsistent region** (`"north "`, `"WEST"`) → standardize on a controlled vocabulary.
- **Duplicate rows** → dedupe keys and idempotent loads.

Tracked over time, this overall score becomes an **audit-ready** quality KPI — governance as a habit,
not a quarterly cleanup.

*— Aman Bohra*
"""),
])

print("ALL BUILT")
