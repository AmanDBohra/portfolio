# Brain-Machine Interface — EEG Classification Demo

**This is an original demo built for this portfolio, not the actual code
from the 2021 Fractal Analytics project.** That work is proprietary and
confidential to the employer, so its real dataset, model architecture, and
results are intentionally not reproduced here. This repository instead
independently re-implements the *general approach* — EEG signal
classification with a CNN — on synthetic, generated-on-the-fly EEG-like data,
to demonstrate the technique described on the portfolio site.

## Concept

A brain-machine interface's translation layer has to convert noisy,
individual-specific electrophysiological (EEG) signals into commands an
external system can act on — which means training a model to generalize a
user's neural intent into a consistent, actionable class label (e.g. "move
cursor left" vs. "move cursor right").

## Architecture

```
  generate_synthetic_eeg.py
        │
        │  synthetic multi-channel EEG epochs
        │  (sinusoidal signals + noise, one
        │   frequency band per class)
        ▼
  ┌───────────────────────┐
  │  train_cnn.py          │
  │                         │
  │  1D-CNN over channels   │
  │  x time samples:        │
  │   Conv1D -> ReLU ->     │
  │   MaxPool -> Conv1D ->  │
  │   ReLU -> GlobalAvgPool │
  │   -> Dense -> Softmax   │
  │                         │
  │  train/test split,      │
  │  ROC-AUC evaluation      │
  └───────────┬─────────────┘
              ▼
      classification report
      + ROC curve (per class)
```

## Repository layout

```
bmi-eeg-demo/
├── README.md
├── requirements.txt
├── generate_synthetic_eeg.py   # synthetic EEG epoch generator
└── train_cnn.py                # CNN classifier + ROC evaluation
```

## Running it

```bash
pip install -r requirements.txt
python train_cnn.py
```

This generates a synthetic dataset in memory, trains a small 1D-CNN, and
prints a classification report with per-class ROC-AUC — mirroring the
evaluation approach (ROC-based metrics) described in the project write-up,
without touching any real or proprietary data.
