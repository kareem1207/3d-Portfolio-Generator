import { useState } from "react";
import { motion } from "framer-motion";
import styles from "@/styles/customization.module.css";

export default function CustomizationPanel({ onUpdate }) {
  const [customization, setCustomization] = useState({
    colors: {
      primary: "#3498db",
      secondary: "#2ecc71",
      background: "#ffffff",
    },
    typography: {
      headingFont: "Poppins",
      bodyFont: "Inter",
    },
    layout: "grid",
    animations: "moderate",
  });

  const handleChange = (category, key, value) => {
    setCustomization((prev) => ({
      ...prev,
      [category]:
        typeof prev[category] === "object"
          ? { ...prev[category], [key]: value }
          : value,
    }));
    onUpdate({ ...customization, [category]: value });
  };

  return (
    <div className={styles.customizationPanel}>
      <section>
        <h3>Color Scheme</h3>
        <div className={styles.colorPickers}>
          {Object.entries(customization.colors).map(([key, value]) => (
            <div key={key}>
              <label>{key}</label>
              <input
                type="color"
                value={value}
                onChange={(e) => handleChange("colors", key, e.target.value)}
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3>Typography</h3>
        <select
          value={customization.typography.headingFont}
          onChange={(e) =>
            handleChange("typography", "headingFont", e.target.value)
          }
        >
          <option value="Poppins">Poppins</option>
          <option value="Roboto">Roboto</option>
          <option value="Montserrat">Montserrat</option>
        </select>
        <select
          value={customization.typography.bodyFont}
          onChange={(e) =>
            handleChange("typography", "bodyFont", e.target.value)
          }
        >
          <option value="Inter">Inter</option>
          <option value="Open Sans">Open Sans</option>
          <option value="Lato">Lato</option>
        </select>
      </section>

      <section>
        <h3>Layout</h3>
        <select
          value={customization.layout}
          onChange={(e) => handleChange("layout", null, e.target.value)}
        >
          <option value="grid">Grid</option>
          <option value="masonry">Masonry</option>
          <option value="minimal">Minimal</option>
        </select>
      </section>

      <section>
        <h3>Animations</h3>
        <select
          value={customization.animations}
          onChange={(e) => handleChange("animations", null, e.target.value)}
        >
          <option value="none">None</option>
          <option value="subtle">Subtle</option>
          <option value="moderate">Moderate</option>
          <option value="dynamic">Dynamic</option>
        </select>
      </section>
    </div>
  );
}
