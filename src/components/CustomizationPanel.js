"use client";
import { useState } from "react";
import usePortfolioStore from "@/store/portfolioStore";
import styles from "@/styles/customizationPanel.module.css";

export default function CustomizationPanel() {
  const { templateSettings, setTemplateSettings } = usePortfolioStore();

  const handleColorChange = (colorKey, value) => {
    setTemplateSettings({
      ...templateSettings,
      colors: {
        ...templateSettings.colors,
        [colorKey]: value,
      },
    });
  };

  const handleMaterialChange = (property, value) => {
    setTemplateSettings({
      ...templateSettings,
      material: {
        ...templateSettings.material,
        [property]: parseFloat(value),
      },
    });
  };

  return (
    <div className={styles.panel}>
      <section className={styles.section}>
        <h3>Colors</h3>
        <div className={styles.colorInputs}>
          <div className={styles.colorGroup}>
            <label>Primary</label>
            <input
              type="color"
              value={templateSettings.colors.primary}
              onChange={(e) => handleColorChange("primary", e.target.value)}
            />
          </div>
          <div className={styles.colorGroup}>
            <label>Secondary</label>
            <input
              type="color"
              value={templateSettings.colors.secondary}
              onChange={(e) => handleColorChange("secondary", e.target.value)}
            />
          </div>
          <div className={styles.colorGroup}>
            <label>Background</label>
            <input
              type="color"
              value={templateSettings.colors.background}
              onChange={(e) => handleColorChange("background", e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3>Material</h3>
        <div className={styles.sliderGroup}>
          <label>Metalness: {templateSettings.material.metalness}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={templateSettings.material.metalness}
            onChange={(e) => handleMaterialChange("metalness", e.target.value)}
          />
        </div>
        <div className={styles.sliderGroup}>
          <label>Roughness: {templateSettings.material.roughness}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={templateSettings.material.roughness}
            onChange={(e) => handleMaterialChange("roughness", e.target.value)}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h3>Animation</h3>
        <select
          value={templateSettings.animations}
          onChange={(e) =>
            setTemplateSettings({
              ...templateSettings,
              animations: e.target.value,
            })
          }
          className={styles.selectInput}
        >
          <option value="none">None</option>
          <option value="subtle">Subtle</option>
          <option value="dynamic">Dynamic</option>
        </select>
      </section>
    </div>
  );
}
