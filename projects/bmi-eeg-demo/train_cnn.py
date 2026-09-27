"""Train a small 1D-CNN to classify synthetic EEG epochs into 3 classes,
evaluated with a classification report and per-class ROC-AUC."""
from __future__ import annotations

import numpy as np
from sklearn.metrics import classification_report, roc_auc_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import label_binarize
from tensorflow import keras
from tensorflow.keras import layers

from generate_synthetic_eeg import N_CHANNELS, N_SAMPLES, generate_dataset


def build_model(n_classes: int) -> keras.Model:
    model = keras.Sequential(
        [
            layers.Input(shape=(N_SAMPLES, N_CHANNELS)),
            layers.Conv1D(32, kernel_size=5, activation="relu"),
            layers.MaxPooling1D(pool_size=2),
            layers.Conv1D(64, kernel_size=5, activation="relu"),
            layers.GlobalAveragePooling1D(),
            layers.Dense(32, activation="relu"),
            layers.Dense(n_classes, activation="softmax"),
        ]
    )
    model.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])
    return model


def main() -> None:
    X, y = generate_dataset(n_per_class=200)
    n_classes = len(set(y))
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, stratify=y, random_state=42
    )

    model = build_model(n_classes)
    model.fit(X_train, y_train, epochs=15, batch_size=16, validation_split=0.1, verbose=0)

    y_pred_proba = model.predict(X_test, verbose=0)
    y_pred = np.argmax(y_pred_proba, axis=1)

    print(classification_report(y_test, y_pred))

    y_test_bin = label_binarize(y_test, classes=list(range(n_classes)))
    auc = roc_auc_score(y_test_bin, y_pred_proba, average=None, multi_class="ovr")
    for cls, score in enumerate(auc):
        print(f"Class {cls} ROC-AUC: {score:.3f}")


if __name__ == "__main__":
    main()
