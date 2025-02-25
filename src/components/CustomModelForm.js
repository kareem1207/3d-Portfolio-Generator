"use client";

import { useEffect, useRef } from "react";
import { ModelBuilder } from "./ModelBuilder/ModelBuilder";

const CustomModelForm = ({ onModelAdded, theme = "minimal3D" }) => {
  const containerRef = useRef(null);
  let modelBuilder = null;

  useEffect(() => {
    if (containerRef.current && !modelBuilder) {
      modelBuilder = new ModelBuilder(containerRef.current, theme);
    }

    return () => {
      if (modelBuilder) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [theme]);

  return (
    <div className="custom-model-form">
      <div ref={containerRef} className="model-builder-container" />
    </div>
  );
};

export default CustomModelForm;
