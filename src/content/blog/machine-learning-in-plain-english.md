---
title: "Machine Learning in Plain English"
date: 2026-09-12
tags: Explained Simply, Data Science, Machine Learning
readingTime: 6 min
excerpt: "What machine learning actually is — how it learns, where it goes wrong, and the few terms (features, overfitting, precision vs recall) that matter — without the math."
---

Machine learning sounds mysterious. It isn't. Strip away the math and it's one simple idea: **instead of writing rules by hand, you let the computer learn the rules from examples.**

## The core idea

Suppose you want software to recognize a cat. The old way: write rules — "has pointy ears, whiskers, fur…". You'd fail instantly; there are too many exceptions.

The machine-learning way: **show it thousands of labelled photos** ("cat" / "not cat") and let it figure out the pattern itself.
*It's how a child learns "cat" — by seeing many cats, not by memorizing a definition.*

That's it. Everything else is refinement.

## The ingredients

- **Data** — the examples it learns from. More (good) data usually beats a cleverer model.
- **Features** — the meaningful signals you feed it. Turning raw data into good features is called **feature engineering**.
  *Like prepping ingredients before cooking — the model only tastes what you prepare.*
- **Model** — the thing that learns the pattern.
- **Training** — showing the model examples so it adjusts itself.
- **Inference** — using the trained model on new, unseen data.

## Where it goes wrong: overfitting

The classic failure is **overfitting** — the model *memorizes* the training examples instead of learning the general pattern. It looks brilliant on data it has seen and falls apart on data it hasn't.
*Like a student who memorizes past exam papers but fails the real exam.* The fix is to test the model on data it never trained on.

## Judging a model: precision vs. recall

Accuracy alone can lie (if 99% of claims are legitimate, a model that says "legit" every time is 99% accurate and useless). Two better measures:

- **Precision** — of everything the model flagged, how much was actually right?
- **Recall** — of all the real cases out there, how many did it catch?

*Picture a fishing net: precision is how little junk you haul in; recall is how few real fish you miss.* You usually trade one for the other, and the right balance depends on the cost of a miss vs. a false alarm.

## Supervised vs. unsupervised (one line each)

- **Supervised** — you have labelled answers to learn from (e.g., "this claim was fraud"). Predicting churn is supervised.
- **Unsupervised** — no labels; the model finds structure on its own. Anomaly detection and market-basket analysis are unsupervised.

## The part that actually matters

A model in a notebook changes nothing. The value shows up only when its output becomes a **decision** — a ranked list an investigator works, a forecast a planner trusts, a score that routes a case. The modelling is maybe 20% of the job. Framing the problem and delivering the decision is the other 80%.

*— Aman Bohra*
