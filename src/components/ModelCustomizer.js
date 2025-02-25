import { useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import usePortfolioStore from "@/store/portfolioStore";
import styles from "@/styles/ModelCustomizer.module.css";

export default function ModelCustomizer({
  theme,
  onColorChange,
  onModelUpdate,
  selectedModels,
}) {
  const { templateSettings, setTemplateSettings } = usePortfolioStore();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [modelColor, setModelColor] = useState("#ffffff");

  useEffect(() => {
    if (templateSettings?.modelColor) {
      setModelColor(templateSettings.modelColor);
    }
  }, [templateSettings?.modelColor]);

  const handleColorChange = (newColor) => {
    const color = newColor.hex;
    setModelColor(color);
    setTemplateSettings({
      ...templateSettings,
      modelColor: color,
    });
  };

  return (
    <div className={styles.customizer}>
      <div className={styles.colorSection}>
        <h3>Model Color</h3>
        <div className={styles.colorPicker}>
          <div
            className={styles.colorSwatch}
            style={{ backgroundColor: modelColor }}
            onClick={() => setShowColorPicker(!showColorPicker)}
          />
          {showColorPicker && (
            <div className={styles.popover}>
              <div
                className={styles.cover}
                onClick={() => setShowColorPicker(false)}
              />
              <ChromePicker color={modelColor} onChange={handleColorChange} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
