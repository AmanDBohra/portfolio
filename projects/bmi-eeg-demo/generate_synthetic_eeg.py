"""Generate synthetic multi-channel EEG-like epochs for demo purposes.

Each class is a distinct dominant frequency band with added noise, standing
in for the kind of separable-but-noisy signal a real BMI decoder has to
handle. This is entirely synthetic and unrelated to any real EEG dataset.
"""
from __future__ import annotations

import numpy as np

N_CHANNELS = 8
N_SAMPLES = 128  # per epoch
CLASS_FREQUENCIES_HZ = {0: 8.0, 1: 12.0, 2: 20.0}  # e.g. alpha / low-beta / beta
SAMPLING_RATE_HZ = 128.0


def generate_epoch(label: int, noise_std: float = 0.6) -> np.ndarray:
    freq = CLASS_FREQUENCIES_HZ[label]
    t = np.arange(N_SAMPLES) / SAMPLING_RATE_HZ
    epoch = np.zeros((N_CHANNELS, N_SAMPLES))
    for ch in range(N_CHANNELS):
        phase = np.random.uniform(0, 2 * np.pi)
        amplitude = np.random.uniform(0.8, 1.2)
        epoch[ch] = amplitude * np.sin(2 * np.pi * freq * t + phase)
    epoch += np.random.normal(0, noise_std, size=epoch.shape)
    return epoch


def generate_dataset(n_per_class: int = 200) -> tuple[np.ndarray, np.ndarray]:
    X, y = [], []
    for label in CLASS_FREQUENCIES_HZ:
        for _ in range(n_per_class):
            X.append(generate_epoch(label))
            y.append(label)
    X = np.array(X).transpose(0, 2, 1)  # (n, time, channels) for Conv1D
    y = np.array(y)
    perm = np.random.permutation(len(y))
    return X[perm], y[perm]
