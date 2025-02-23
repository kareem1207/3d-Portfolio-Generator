"use client";
import { useState } from "react";
import styles from "@/styles/modelSelector.module.css";

const availableModels = [
  { id: "box1", type: "box", name: "Cube", scale: 1 },
  { id: "sphere1", type: "sphere", name: "Sphere", scale: 1 },
  { id: "cylinder1", type: "cylinder", name: "Cylinder", scale: 1 },
  { id: "box2", type: "box", name: "Large Cube", scale: 1.5 },
  { id: "sphere2", type: "sphere", name: "Large Sphere", scale: 1.5 },
];

export default function ModelSelector({ onSelect, selected = [] }) {
  const handleModelToggle = (model) => {
    const isSelected = selected.find((m) => m.id === model.id);
    let newSelected;

    if (isSelected) {
      newSelected = selected.filter((m) => m.id !== model.id);
    } else {
      if (selected.length < 3) {
        // Limit to 3 models
        newSelected = [...selected, model];
      } else {
        return; // Don't add if limit reached
      }
    }

    onSelect(newSelected);
  };

  return (
    <div className={styles.modelSelector}>
      <h3>Select Models (max 3)</h3>
      <div className={styles.modelGrid}>
        {availableModels.map((model) => (
          <button
            key={model.id}
            className={`${styles.modelButton} ${
              selected.find((m) => m.id === model.id) ? styles.selected : ""
            }`}
            onClick={() => handleModelToggle(model)}
          >
            {model.name}
          </button>
        ))}
      </div>
    </div>
  );
}
