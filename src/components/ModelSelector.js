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

const ModelSelector = ({
  selected,
  onSelect,
  availableModels,
  maxModels,
  isCustomTheme,
}) => {
  const handleModelChange = (model) => {
    const isSelected = selected.includes(model);
    let newSelection;

    if (isSelected) {
      newSelection = selected.filter((m) => m !== model);
    } else {
      if (!isCustomTheme && selected.length >= maxModels) {
        alert(`Maximum ${maxModels} models allowed for this template`);
        return;
      }
      newSelection = [...selected, model];
    }

    onSelect(newSelection);
  };

  return (
    <div className={styles.modelSelector}>
      <div className={styles.modelList}>
        {availableModels.map((model) => (
          <button
            key={model}
            className={`${styles.modelButton} ${
              selected.includes(model) ? styles.selected : ""
            }`}
            onClick={() => handleModelChange(model)}
          >
            {model}
          </button>
        ))}
      </div>
      <div className={styles.modelCount}>
        Selected: {selected.length}
        {!isCustomTheme && ` / ${maxModels}`}
      </div>
    </div>
  );
};

export default ModelSelector;
