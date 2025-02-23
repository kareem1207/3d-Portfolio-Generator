"use client";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import styles from "@/styles/modelSelector.module.css";
import { modelConfigs } from "@/config/modelConfigs";
import dynamic from "next/dynamic";

const ModelPreview = dynamic(() => import("./ModelPreview"), {
  ssr: false,
  loading: () => <div className={styles.modelPreviewLoading}>Loading...</div>,
});

export default function ModelSelector({ templateId, selected, onSelect }) {
  if (!templateId || !modelConfigs[templateId]) {
    return (
      <div className={styles.modelSelector}>
        <h3>No models available</h3>
      </div>
    );
  }

  const config = modelConfigs[templateId];
  const maxSelections = config?.maxSelections || 3; // Default to 3 if not specified
  const availableModels = config?.available || [];

  const handleToggleModel = (modelId) => {
    const isSelected = selected.includes(modelId);
    if (isSelected) {
      onSelect(selected.filter((id) => id !== modelId));
    } else if (selected.length < maxSelections) {
      onSelect([...selected, modelId]);
    }
  };

  if (availableModels.length === 0) {
    return (
      <div className={styles.modelSelector}>
        <h3>No models available for this template</h3>
      </div>
    );
  }

  return (
    <div className={styles.modelSelector}>
      <h3>Select 3D Models (Max: {maxSelections})</h3>
      <div className={styles.modelsGrid}>
        {availableModels.map((model) => (
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
