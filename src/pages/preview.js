import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Float } from "@react-three/drei";
import styles from "@/styles/preview.module.css";
import { modelConfigs } from "@/config/modelConfigs";

const ModelGroup = ({ models, customization, templateId }) => {
  if (!models || !modelConfigs[templateId]) return null;

  return models.map((modelId, index) => {
    const modelConfig = modelConfigs[templateId].available.find(
      (m) => m.id === modelId
    );

    if (!modelConfig) return null;

    const position = [(index - (models.length - 1) / 2) * 2, 0, 0];

    return (
      <mesh key={modelId} position={position} scale={modelConfig.defaultScale}>
        {getGeometry(modelConfig.geometry)}
        <meshStandardMaterial
          color={customization?.colors?.primary || "#2a9d8f"}
          metalness={customization?.material?.metalness || 0}
          roughness={customization?.material?.roughness || 0.5}
        />
      </mesh>
    );
  });
};

const getGeometry = (geometryType) => {
  switch (geometryType) {
    case "box":
      return <boxGeometry args={[1, 1, 1]} />;
    case "sphere":
      return <sphereGeometry args={[0.5, 32, 32]} />;
    case "cylinder":
      return <cylinderGeometry args={[0.5, 0.5, 1, 32]} />;
    case "torus":
      return <torusGeometry args={[0.3, 0.2, 16, 32]} />;
    case "torusKnot":
      return <torusKnotGeometry args={[0.3, 0.1, 64, 8]} />;
    case "octahedron":
      return <octahedronGeometry args={[0.5]} />;
    case "icosahedron":
      return <icosahedronGeometry args={[0.5]} />;
    case "cone":
      return <coneGeometry args={[0.5, 1, 32]} />;
    case "dodecahedron":
      return <dodecahedronGeometry args={[0.5]} />;
    default:
      return <boxGeometry args={[1, 1, 1]} />;
  }
};

const MinimalTemplate = ({ customization, templateId = "minimal" }) => (
  <Canvas camera={{ position: [3, 2, 5] }}>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} />
    <ModelGroup
      models={customization?.selectedModels}
      customization={customization}
      templateId={templateId}
    />
    <OrbitControls enableZoom={false} />
  </Canvas>
);

const CreativeTemplate = ({ customization, templateId = "creative" }) => (
  <Canvas camera={{ position: [0, 0, 8] }}>
    <ambientLight intensity={0.2} />
    <pointLight position={[10, 10, 10]} intensity={0.8} />
    <Stars
      radius={50}
      depth={50}
      count={5000}
      factor={customization?.animations === "dynamic" ? 6 : 4}
      saturation={0.9}
    />
    <Float speed={2} rotationIntensity={1}>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[i * 2 - 4, Math.sin(i) * 2, -3]}>
          <sphereGeometry args={[0.3 + i * 0.1, 32, 32]} />
          <meshStandardMaterial
            color={customization?.colors?.secondary || "#2a9d8f"}
            emissive={customization?.colors?.primary || "#ffffff"}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </Float>
    <ModelGroup
      models={customization.selectedModels}
      customization={customization}
      templateId={templateId}
    />
    <OrbitControls
      enableZoom={false}
      autoRotate
      autoRotateSpeed={customization?.animations === "dynamic" ? 1 : 0.5}
    />
  </Canvas>
);

const ProfessionalTemplate = ({
  customization,
  templateId = "professional",
}) => (
  <Canvas camera={{ position: [3, 2, 5] }}>
    <ambientLight intensity={0.6} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
    <group position={[0, 0, 0]}>
      <mesh position={[-1.5, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={customization?.colors?.primary || "#34495e"}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
        <meshStandardMaterial
          color={customization?.colors?.secondary || "#3498db"}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[1.5, 0, 0]}>
        <dodecahedronGeometry args={[0.7]} />
        <meshStandardMaterial
          color={customization?.colors?.accent || "#2ecc71"}
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>
    </group>
    <ModelGroup
      models={customization.selectedModels}
      customization={customization}
      templateId={templateId}
    />
    <OrbitControls enableZoom={false} />
  </Canvas>
);

const CustomTemplate = ({ customization, templateId = "custom" }) => (
  <Canvas camera={{ position: [3, 2, 5] }}>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} />
    {customization?.objects?.map((obj, index) => (
      <mesh key={index} position={obj.position}>
        {obj.geometry === "box" && <boxGeometry args={obj.size} />}
        {obj.geometry === "sphere" && <sphereGeometry args={obj.size} />}
        {obj.geometry === "cylinder" && <cylinderGeometry args={obj.size} />}
        <meshStandardMaterial color={obj.color} />
      </mesh>
    ))}
    <ModelGroup
      models={customization.selectedModels}
      customization={customization}
      templateId={templateId}
    />
    <OrbitControls enableZoom={false} />
  </Canvas>
);

const getTemplateComponent = (templateId) => {
  switch (templateId) {
    case "minimal":
      return MinimalTemplate;
    case "creative":
      return CreativeTemplate;
    case "professional":
      return ProfessionalTemplate;
    case "custom":
      return CustomTemplate;
    default:
      return MinimalTemplate;
  }
};

export default function Preview() {
  const router = useRouter();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const savedSettings = localStorage.getItem("portfolioSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    } else {
      router.push("/create");
    }
  }, [router]);

  if (!settings) return <div>Loading...</div>;

  const SelectedTemplate = getTemplateComponent(settings.templateId);

  return (
    <div className={styles.previewContainer}>
      <div className={styles.previewHeader}>
        <Link href="/create">
          <button className={styles.backButton}>← Back to Editor</button>
        </Link>
        <button className={styles.publishButton}>Publish Portfolio</button>
      </div>

      <div className={styles.previewCanvas}>
        <SelectedTemplate
          customization={settings.customization}
          templateId={settings.templateId}
          content={settings.content}
        />
      </div>
    </div>
  );
}
