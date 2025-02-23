import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CustomizationPanel from "@/components/CustomizationPanel";
import ContentForm from "@/components/ContentForm";
import styles from "@/styles/create.module.css";
import { templateConfigs, getTemplateDefaults } from "@/config/templateConfigs";
import ModelSelector from "@/components/ModelSelector";

// Inline Template Components
const MinimalScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color="#2A9D8F" />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#264653" />
      </mesh>
    </>
  );
};

const CreativeScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh position={[-1, 0, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#E76F51" />
      </mesh>
      <mesh position={[1, 0, 0]}>
        <torusGeometry args={[0.5, 0.2, 16, 32]} />
        <meshStandardMaterial color="#2A9D8F" />
      </mesh>
    </>
  );
};

const ProfessionalScene = () => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <group position={[0, 0, 0]}>
        <mesh position={[-1.5, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#34495e"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
          <meshStandardMaterial
            color="#3498db"
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[1.5, 0, 0]}>
          <dodecahedronGeometry args={[0.7]} />
          <meshStandardMaterial
            color="#2ecc71"
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>
      </group>
    </>
  );
};

const CustomScene = ({ customObjects = [] }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {customObjects.map((obj, index) => (
        <mesh key={index} position={obj.position}>
          {obj.geometry === "box" && <boxGeometry args={obj.size} />}
          {obj.geometry === "sphere" && <sphereGeometry args={obj.size} />}
          {obj.geometry === "cylinder" && <cylinderGeometry args={obj.size} />}
          <meshStandardMaterial color={obj.color} />
        </mesh>
      ))}
    </>
  );
};

const MinimalPreview = () => (
  <Canvas camera={{ position: [3, 2, 5] }}>
    <MinimalScene />
    <OrbitControls enableZoom={false} />
  </Canvas>
);

const CreativePreview = () => (
  <Canvas camera={{ position: [3, 3, 3] }}>
    <CreativeScene />
    <OrbitControls enableZoom={false} />
  </Canvas>
);

const ProfessionalPreview = () => (
  <Canvas camera={{ position: [3, 2, 5] }}>
    <ProfessionalScene />
    <OrbitControls enableZoom={false} />
  </Canvas>
);

const CustomPreview = () => (
  <Canvas camera={{ position: [3, 2, 5] }}>
    <CustomScene
      customObjects={[
        {
          geometry: "box",
          position: [-1, 0, 0],
          size: [1, 1, 1],
          color: "#e74c3c",
        },
        {
          geometry: "sphere",
          position: [1, 0, 0],
          size: [0.5, 32, 32],
          color: "#9b59b6",
        },
      ]}
    />
    <OrbitControls enableZoom={false} />
  </Canvas>
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

  const handleContentUpdate = (updates) => {
    setContent(updates);
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
                  <template.preview />
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
              <selectedTemplate.preview
                customization={{
                  ...customization,
                  selectedModels,
                }}
              />
            </div>
            <div className={styles.customizationTools}>
              <CustomizationPanel onUpdate={handleCustomizationUpdate} />
              <ModelSelector
                templateId={selectedTemplate.id}
                selected={selectedModels}
                onSelect={handleModelSelect}
              />
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
          <h2>Add Your Content</h2>
          <ContentForm onUpdate={handleContentUpdate} />
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
                View 3D Preview
              </button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
