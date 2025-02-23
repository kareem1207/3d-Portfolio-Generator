import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import styles from "@/styles/modelSelector.module.css";
import { modelConfigs } from "@/config/modelConfigs";

const ModelPreview = ({ model }) => {
  // Map geometry names to actual Three.js geometry components
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

  return (
    <Canvas camera={{ position: [2, 2, 2] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh scale={model.defaultScale}>
        {getGeometry(model.geometry)}
        <meshStandardMaterial color="#2a9d8f" />
      </mesh>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default function ModelSelector({ templateId, selected, onSelect }) {
  const config = modelConfigs[templateId];

  const handleToggleModel = (modelId) => {
    const isSelected = selected.includes(modelId);
    if (isSelected) {
      onSelect(selected.filter((id) => id !== modelId));
    } else if (selected.length < config.maxSelections) {
      onSelect([...selected, modelId]);
    }
  };

  return (
    <div className={styles.modelSelector}>
      <h3>Select 3D Models (Max: {config.maxSelections})</h3>
      <div className={styles.modelsGrid}>
        {config.available.map((model) => (
          <div
            key={model.id}
            className={`${styles.modelCard} ${
              selected.includes(model.id) ? styles.selected : ""
            }`}
            onClick={() => handleToggleModel(model.id)}
          >
            <div className={styles.modelPreview}>
              <ModelPreview model={model} />
            </div>
            <p>{model.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
