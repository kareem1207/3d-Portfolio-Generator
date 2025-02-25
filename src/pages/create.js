import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CustomizationPanel from "@/components/CustomizationPanel";
import ContentForm from "@/components/ContentForm";
import styles from "@/styles/create.module.css";
import { templateConfigs, getTemplateDefaults } from "@/config/templateConfigs";
import dynamic from "next/dynamic";
import ClientOnly from "@/components/ClientOnly";
import UserProfileForm from "@/components/UserProfileForm";
import PortfolioPreview from "@/components/PortfolioPreview";
import usePortfolioStore from "@/store/portfolioStore"; // Add this import
import { themeConfigs } from "@/utils/themeConfigs";
import { modelDictionary } from "@/utils/modelDictionary";

const ModelSelector = dynamic(() => import("@/components/ModelSelector"), {
  ssr: false,
  loading: () => <div>Loading 3D components...</div>,
});

// Dynamic imports for preview components
const MinimalPreview = dynamic(
  () =>
    import("@/components/TemplatePreview").then((mod) => ({
      default: mod.MinimalPreview,
    })),
  { ssr: false }
);
const CreativePreview = dynamic(
  () =>
    import("@/components/TemplatePreview").then((mod) => ({
      default: mod.CreativePreview,
    })),
  { ssr: false }
);
const ProfessionalPreview = dynamic(
  () =>
    import("@/components/TemplatePreview").then((mod) => ({
      default: mod.ProfessionalPreview,
    })),
  { ssr: false }
);
const CustomPreview = dynamic(
  () =>
    import("@/components/TemplatePreview").then((mod) => ({
      default: mod.CustomPreview,
    })),
  { ssr: false }
);

// Add this preview components mapping before CreatePortfolio component
const previewComponents = {
  "Minimal 3D": MinimalPreview,
  "Creative Space": CreativePreview,
  "Professional 3D": ProfessionalPreview,
  "Custom Template Builder": CustomPreview,
};

export default function CreatePortfolio() {
  const {
    setTemplateSettings,
    updateColors,
    updateModels,
    setUserData,
    templateSettings,
    userData, // Add this to destructuring
  } = usePortfolioStore();
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customization, setCustomization] = useState(null);
  const [content, setContent] = useState(null);
  const [selectedModels, setSelectedModels] = useState([]);
  const [themeModels, setThemeModels] = useState([]);

  // Replace the templates array definition
  const templates = Object.entries(templateConfigs).map(([id, config]) => ({
    id,
    ...config,
    preview: previewComponents[config.name],
  }));

  const getThemeKey = (templateName) => {
    const themeMap = {
      "Minimal 3D": "minimal3D",
      "Creative Space": "creativeSpace",
      "Professional 3D": "professional3D",
      "Custom Template Builder": "custom",
    };
    return themeMap[templateName] || "minimal3D";
  };

  const getModelDictionaryKey = (templateName) => {
    const modelMap = {
      "Minimal 3D": "minimal",
      "Creative Space": "creative",
      "Professional 3D": "professional",
      "Custom Template Builder": "custom",
    };
    return modelMap[templateName] || "minimal";
  };

  const handleTemplateSelect = (template) => {
    const themeKey = getThemeKey(template.name);
    const modelKey = getModelDictionaryKey(template.name);

    const themeConfig = themeConfigs[themeKey];
    const modelConfig = modelDictionary[modelKey];

    if (!themeConfig || !modelConfig) {
      console.error("Theme or model configuration not found:", template.name);
      return;
    }

    setTemplateSettings({
      id: template.id,
      ...getTemplateDefaults(template.id),
      maxModels: themeConfig.shapes.maxModels,
      allowedModels: modelConfig.allowed,
    });

    setThemeModels(modelConfig.allowed);
    setSelectedTemplate(template);
    setSelectedModels([]); // Reset selected models when changing template
  };

  const handleNextStep = () => {
    if (selectedTemplate) {
      setStep(2);
    }
  };

  const handleCustomizationUpdate = (updates) => {
    setTemplateSettings({
      ...updates,
      models: selectedModels,
    });
  };

  const handleColorUpdate = (colors) => {
    updateColors(colors);
  };

  const handleModelSelect = (models) => {
    if (!selectedTemplate) return;

    const modelKey = getModelDictionaryKey(selectedTemplate.name);
    const modelConfig = modelDictionary[modelKey];

    if (!modelConfig) {
      console.error("Model configuration not found");
      return;
    }

    if (modelKey !== "custom" && models.length > modelConfig.maxCount) {
      alert(
        `${selectedTemplate.name} allows maximum ${modelConfig.maxCount} models`
      );
      return;
    }

    setSelectedModels(models);
    updateModels(models);
  };

  const handleContentUpdate = (contentData) => {
    setUserData(contentData);
  };

  const handlePreview = () => {
    const portfolioSettings = {
      templateId: selectedTemplate.id,
      customization: templateSettings, // Use templateSettings instead of customization
      content: userData, // Use userData instead of content
    };
    localStorage.setItem(
      "portfolioSettings",
      JSON.stringify(portfolioSettings)
    );
  };

  const TemplateFeatures = ({ template }) => (
    <div className={styles.templateFeatures}>
      <h4>Features:</h4>
      <ul>
        {template.features.map((feature, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            ✓ {feature}
          </motion.li>
        ))}
      </ul>
    </div>
  );

  const renderModelSelector = () => {
    if (!selectedTemplate) return null;

    const modelKey = getModelDictionaryKey(selectedTemplate.name);
    const currentModelConfig = modelDictionary[modelKey];

    if (!currentModelConfig) {
      console.error("Model configuration not found");
      return null;
    }

    return (
      <div className={styles.modelSelection}>
        <h3>Available Models for {selectedTemplate.name}</h3>
        <ModelSelector
          selected={selectedModels}
          onSelect={handleModelSelect}
          availableModels={currentModelConfig.allowed}
          maxModels={currentModelConfig.maxCount}
          isCustomTheme={selectedTemplate.name.includes("Custom")}
        />
      </div>
    );
  };

  return (
    <div className={styles.creatorContainer}>
      <div className={styles.stepsIndicator}>
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className={`${styles.step} ${step >= num ? styles.active : ""}`}
          >
            {num}
          </div>
        ))}
      </div>

      {step === 1 && (
        <section className={styles.templateSelection}>
          <h2>Choose Your Template</h2>
          <div className={styles.templatesGrid}>
            {templates.map((template) => (
              <motion.div
                key={template.id}
                className={`${styles.templateCard} ${
                  selectedTemplate?.id === template.id ? styles.selected : ""
                }`}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleTemplateSelect(template)}
              >
                <div className={styles.templatePreviewContainer}>
                  <ClientOnly>
                    {template.preview && <template.preview />}
                  </ClientOnly>
                </div>
                <div className={styles.templateInfo}>
                  <h3>{template.name}</h3>
                  <p>{template.description}</p>
                  <TemplateFeatures template={template} />
                </div>
              </motion.div>
            ))}
          </div>
          <div className={styles.navigationButtons}>
            <button
              className={styles.primaryBtn}
              onClick={handleNextStep}
              disabled={!selectedTemplate}
            >
              Continue with {selectedTemplate?.name || "selected template"}
            </button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className={styles.customizationSection}>
          <h2>Customize Your Portfolio</h2>
          <div className={styles.customizationLayout}>
            <div className={styles.previewSection}>
              <ClientOnly>
                <div className={styles.previewContainer}>
                  <PortfolioPreview
                    models={selectedModels}
                    theme={selectedTemplate.name}
                  />
                </div>
              </ClientOnly>
            </div>

            <div className={styles.controlsSection}>
              <CustomizationPanel
                onUpdate={handleCustomizationUpdate}
                theme={selectedTemplate.name}
              />
              {renderModelSelector()}
            </div>
          </div>

          <div className={styles.navigationButtons}>
            <button className={styles.secondaryBtn} onClick={() => setStep(1)}>
              Back
            </button>
            <button className={styles.primaryBtn} onClick={() => setStep(3)}>
              Continue to Content
            </button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className={styles.contentSection}>
          <div className={styles.splitView}>
            <div className={styles.formPane}>
              <h2>Add Your Content</h2>
              <ContentForm onUpdate={handleContentUpdate} />
            </div>
            <div className={styles.previewPane}>
              <h2>Live Preview</h2>
              <PortfolioPreview />
            </div>
          </div>
          <div className={styles.navigationButtons}>
            <button className={styles.secondaryBtn} onClick={() => setStep(2)}>
              Back
            </button>
            <Link href="/preview">
              <button
                className={styles.primaryBtn}
                onClick={handlePreview}
                disabled={
                  !userData?.name || !userData?.email || !userData?.title
                }
              >
                View Full Screen Preview
              </button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
