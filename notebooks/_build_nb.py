"""Builds market_basket_analysis.ipynb with nbformat, then it is executed via nbconvert."""
import nbformat as nbf
import os

nb = nbf.v4.new_notebook()
cells = []

cells.append(nbf.v4.new_markdown_cell(
"""# Market Basket Analysis — Retail Purchase Affinity

**Author:** Aman Bohra · Senior Analytics & BI Professional
**Portfolio:** https://amandbohra.github.io/portfolio/

This notebook demonstrates the analytical approach behind my supply-chain work, where I applied the
**Apriori algorithm** to Bill-of-Materials hierarchies to reduce inventory costs by ~15% and improve
supply-chain accuracy by ~20%.

Here I use the same technique on a **synthetic retail dataset** — market basket analysis to uncover which
products are frequently bought together, and turn those patterns into **association rules** for
cross-sell, bundling, and planogram decisions.

> ⚠️ **Note:** All data below is randomly generated for demonstration. No real or confidential client
> data is used.
"""))

cells.append(nbf.v4.new_code_cell(
"""import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, association_rules

plt.rcParams.update({"figure.facecolor": "white", "axes.grid": True, "grid.alpha": 0.25})
rng = np.random.default_rng(42)
"""))

cells.append(nbf.v4.new_markdown_cell(
"""## 1. Generate synthetic transactions

We simulate 2,000 baskets from a small catalogue, deliberately planting a few real-world affinities
(e.g. *bread + butter + milk*, *pasta + pasta sauce*, *diapers + baby wipes*) so the algorithm has
genuine patterns to recover."""))

cells.append(nbf.v4.new_code_cell(
"""catalogue = ["Bread","Butter","Milk","Eggs","Coffee","Pasta","Pasta Sauce",
             "Diapers","Baby Wipes","Beer","Chips","Cheese","Tomatoes","Cereal"]

# affinity groups that often co-occur
affinities = [
    (["Bread","Butter","Milk"], 0.55),
    (["Pasta","Pasta Sauce","Tomatoes"], 0.50),
    (["Diapers","Baby Wipes"], 0.60),
    (["Beer","Chips"], 0.45),
    (["Coffee","Milk"], 0.40),
    (["Bread","Cheese"], 0.35),
]

def make_basket():
    items = set()
    # seed with 0-2 affinity groups
    for group, p in affinities:
        if rng.random() < p * 0.6:
            for it in group:
                if rng.random() < p:
                    items.add(it)
    # add random noise items
    for it in rng.choice(catalogue, size=rng.integers(0, 3), replace=False):
        items.add(it)
    if not items:
        items.add(rng.choice(catalogue))
    return sorted(items)

transactions = [make_basket() for _ in range(2000)]
print(f"{len(transactions)} baskets generated")
print("Example baskets:")
for t in transactions[:5]:
    print("  ", t)
"""))

cells.append(nbf.v4.new_markdown_cell(
"""## 2. One-hot encode the baskets

Apriori needs a one-hot (boolean) matrix: one row per basket, one column per product."""))

cells.append(nbf.v4.new_code_cell(
"""te = TransactionEncoder()
onehot = te.fit(transactions).transform(transactions)
basket_df = pd.DataFrame(onehot, columns=te.columns_)
basket_df.head()
"""))

cells.append(nbf.v4.new_markdown_cell(
"""## 3. Frequent itemsets (Apriori)

`min_support = 0.04` keeps itemsets that appear in at least ~4% of baskets."""))

cells.append(nbf.v4.new_code_cell(
"""freq = apriori(basket_df, min_support=0.04, use_colnames=True)
freq["itemsets"] = freq["itemsets"].apply(lambda s: ", ".join(sorted(s)))
freq = freq.sort_values("support", ascending=False).reset_index(drop=True)
freq.head(12)
"""))

cells.append(nbf.v4.new_markdown_cell(
"""## 4. Association rules

We generate rules and rank by **lift** (how much more likely the consequent is, given the antecedent,
versus baseline). Lift > 1 = positive association."""))

cells.append(nbf.v4.new_code_cell(
"""freq2 = apriori(basket_df, min_support=0.04, use_colnames=True)
rules = association_rules(freq2, metric="lift", min_threshold=1.1)

def fmt(s):
    return ", ".join(sorted(s))
rules["antecedents"] = rules["antecedents"].apply(fmt)
rules["consequents"] = rules["consequents"].apply(fmt)
top = (rules[["antecedents","consequents","support","confidence","lift"]]
       .sort_values("lift", ascending=False)
       .round(3)
       .head(12)
       .reset_index(drop=True))
top
"""))

cells.append(nbf.v4.new_markdown_cell(
"""## 5. Visualise the strongest rules"""))

cells.append(nbf.v4.new_code_cell(
"""fig, axes = plt.subplots(1, 2, figsize=(13, 4.5))

# (a) item frequency
freqs = basket_df.mean().sort_values(ascending=True)
axes[0].barh(freqs.index, freqs.values, color="#2386c8")
axes[0].set_title("Product purchase frequency (support)")
axes[0].set_xlabel("share of baskets")

# (b) support vs confidence, sized by lift
sc = axes[1].scatter(rules["support"], rules["confidence"],
                     s=(rules["lift"]**2)*60, c=rules["lift"],
                     cmap="winter", alpha=0.8, edgecolors="white", linewidths=0.6)
axes[1].set_title("Association rules: support vs confidence (size/colour = lift)")
axes[1].set_xlabel("support"); axes[1].set_ylabel("confidence")
fig.colorbar(sc, ax=axes[1], label="lift")
plt.tight_layout()
plt.show()
"""))

cells.append(nbf.v4.new_markdown_cell(
"""## 6. From patterns to business value

The rules above translate directly into decisions:

- **Cross-sell / bundling** — pair high-lift items (e.g. *Pasta → Pasta Sauce*) in promotions and
  recommendation widgets.
- **Planogram & placement** — co-locate frequently-linked products to lift basket size.
- **Inventory & replenishment** — forecast linked items together to avoid stock-outs on the "partner"
  product; this is exactly the lever I used on Bill-of-Materials data to cut inventory cost ~15%.
- **Targeted marketing** — build segments around association rules rather than single-product behaviour.

**The point:** the algorithm is a means, not the end. The value is in translating *"these items move
together"* into a decision someone in the business actually makes.

---
*Reproduce:* `pip install pandas mlxtend matplotlib` then run this notebook top to bottom.
"""))

nb["cells"] = cells
nb["metadata"] = {
    "kernelspec": {"display_name": "Python 3", "language": "python", "name": "python3"},
    "language_info": {"name": "python"},
}
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "market_basket_analysis.ipynb")
with open(out, "w") as f:
    nbf.write(nb, f)
print("wrote", out)
