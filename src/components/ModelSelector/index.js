"use client";

import { useState, useEffect } from "react";
import styles from "./ModelSelector.module.css";

export default function ModelSelector({
  selected = [],
  onSelect,
  availableModels = [],
  maxModels,
  isCustomTheme,
  theme,
}) {
  const [customModelName, setCustomModelName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Available Models:", availableModels); // Debug log
    console.log("Current Theme:", theme); // Debug log
  }, [availableModels, theme]);

  const validateModel = (modelName) => {
    const normalized = modelName.toLowerCase().trim();
    return availableModels.includes(normalized);
  };

  const handleModelAdd = (modelName) => {
    setError("");
    const normalized = modelName.toLowerCase().trim();

    // Check for duplicates
    if (selected.includes(normalized)) {
      setError("This model is already added");
      return;
    }

    // Check max models limit for non-custom themes
    if (!isCustomTheme && selected.length >= maxModels) {
      setError(`Maximum ${maxModels} models allowed for ${theme} theme`);
      return;
    }

    // Validate model name
    if (!validateModel(normalized)) {
      setError(
        `Invalid model. Available models: ${availableModels.join(", ")}`
      );
      return;
    }

    onSelect([...selected, normalized]);
    setCustomModelName("");
  };

  const handleModelRemove = (modelToRemove) => {
    onSelect(selected.filter((model) => model !== modelToRemove));
    setError("");
  };

  return (
    <div className={styles.modelSelector}>
      <div className={styles.themeInfo}>
        <h4>Theme: {theme}</h4>
        {!isCustomTheme && <p>Max models allowed: {maxModels}</p>}
      </div>

      <div className={styles.selectedModels}>
        <h4>
          Selected Models ({selected.length}
          {!isCustomTheme && `/${maxModels}`})
        </h4>
        <div className={styles.modelTags}>
          {selected.map((model, index) => (
            <div key={`${model}-${index}`} className={styles.modelTag}>
              {model}
              <button
                onClick={() => handleModelRemove(model)}
                className={styles.removeButton}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.modelInput}>
        {isCustomTheme ? (
          <div className={styles.customInput}>
            <input
              type="text"
              value={customModelName}
              onChange={(e) => setCustomModelName(e.target.value)}
              placeholder="Type model name..."
              list="availableModels"
            />
            <datalist id="availableModels">
              {availableModels.map((model) => (
                <option key={model} value={model} />
              ))}
            </datalist>
            <button onClick={() => handleModelAdd(customModelName)}>
              Add Model
            </button>
          </div>
        ) : (
          <select
            onChange={(e) => handleModelAdd(e.target.value)}
            value=""
            className={styles.modelSelect}
          >
            <option value="" disabled>
              Select a model
            </option>
            {availableModels.map((model) => (
              <option key={model} value={model}>
                {model.charAt(0).toUpperCase() + model.slice(1)}
              </option>
            ))}
          </select>
        )}
      </div>

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
