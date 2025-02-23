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
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customization, setCustomization] = useState(null);
  const [content, setContent] = useState(null);
  const [selectedModels, setSelectedModels] = useState([]);

  // Replace the templates array definition
  const templates = Object.entries(templateConfigs).map(([id, config]) => ({
    id,
    ...config,
    preview: previewComponents[config.name],
  }));

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCustomization(getTemplateDefaults(template.id));
  };

  const handleNextStep = () => {
    if (selectedTemplate) {
      setStep(2);
    }
  };

  const handleCustomizationUpdate = (updates) => {
    setCustomization({
      ...updates,
      selectedModels: selectedModels,
    });
  };

  const handleModelSelect = (models) => {
    setSelectedModels(models);
    handleCustomizationUpdate({
      ...customization,
      selectedModels: models,
    });
  };

  const handleContentUpdate = (contentData) => {
    setContent(contentData);
    // This will trigger the preview update automatically through the store
  };

  const handlePreview = () => {
    const portfolioSettings = {
      templateId: selectedTemplate.id,
      customization,
      content,
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
          <div className={styles.previewCustomizeContainer}>
            <div className={styles.livePreview}>
              <ClientOnly>
                <selectedTemplate.preview
                  customization={{
                    ...customization,
                    selectedModels,
                  }}
                />
              </ClientOnly>
            </div>
            <div className={styles.customizationTools}>
              <CustomizationPanel onUpdate={handleCustomizationUpdate} />
              <ClientOnly>
                <ModelSelector
                  templateId={selectedTemplate.id}
                  selected={selectedModels}
                  onSelect={handleModelSelect}
                />
              </ClientOnly>
            </div>
          </div>
          <div className={styles.navigationButtons}>
            <button className={styles.secondaryBtn} onClick={() => setStep(1)}>
              Back
            </button>
            <button
              className={styles.primaryBtn}
              onClick={() => setStep(3)}
              disabled={!customization}
            >
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
                disabled={!content}
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
