export const themeConfigs = {
  minimal3D: {
    name: "Minimal 3D",
    background: "#f5f5f5",
    shapes: {
      material: {
        type: "MeshStandardMaterial",
        color: "#2196f3",
        metalness: 0.1,
      },
      maxModels: 5, // Match with modelDictionary
      allowedTypes: ["box", "sphere", "cylinder", "cone", "torus"],
      scale: 1,
      complexity: "low",
      description: "Simple geometric shapes for minimal design",
    },
    lighting: {
      ambient: { color: "#ffffff", intensity: 0.5 },
      point: { color: "#ffffff", intensity: 0.8, position: [5, 5, 5] },
    },
    gridHelper: { size: 10, divisions: 10, color: "#cccccc" },
  },
  creativeSpace: {
    name: "Creative Space",
    background: "#1a1a1a",
    shapes: {
      material: {
        type: "MeshPhysicalMaterial",
        color: "#00ff88",
        metalness: 0.5,
        roughness: 0.2,
      },
      maxModels: 8, // Match with modelDictionary
      allowedTypes: ["box", "sphere", "cone", "cylinder", "torus", "torusKnot"],
      scale: 1.2,
    },
    lighting: {
      ambient: { color: "#2200ff", intensity: 0.3 },
      point: { color: "#ff0088", intensity: 1.2, position: [3, 3, 3] },
    },
    gridHelper: { size: 20, divisions: 20, color: "#333333" },
  },
  professional3D: {
    name: "Professional 3D",
    background: "#2c3e50",
    shapes: {
      material: {
        type: "MeshPhysicalMaterial",
        color: "#gold",
        metalness: 0.8,
        roughness: 0.1,
      },
      maxModels: 12, // Match with modelDictionary
      allowedTypes: [
        "box",
        "sphere",
        "cone",
        "cylinder",
        "torus",
        "torusKnot",
        "icosahedron",
        "octahedron",
        "dodecahedron",
      ],
      scale: 0.8,
      complexity: "medium",
      description: "Professional-grade 3D models with refined materials",
    },
    lighting: {
      ambient: { color: "#ffffff", intensity: 0.7 },
      point: { color: "#ffd700", intensity: 1.0, position: [4, 4, 4] },
    },
    gridHelper: { size: 15, divisions: 15, color: "#465670" },
  },
  custom: {
    name: "Custom Template Builder",
    background: "#000000",
    shapes: {
      material: {
        type: "MeshStandardMaterial",
        color: "#00ff00",
        metalness: 0.5,
      },
      maxModels: Infinity, // No limit for custom theme
      allowedTypes: [
        "box",
        "sphere",
        "cylinder",
        "cone",
        "torus",
        "torusKnot",
        "icosahedron",
        "octahedron",
        "dodecahedron",
        "plane",
        "capsule",
        "circle",
        "ring",
        "lathe",
        "extrude",
        "tube",
        "wireframe",
      ],
      scale: 1,
      complexity: "high",
      description: "Unlimited access to all available 3D models",
    },
    lighting: {
      ambient: { color: "#ffffff", intensity: 0.4 },
      point: { color: "#00ff00", intensity: 1.5, position: [2, 2, 2] },
    },
    gridHelper: { size: 30, divisions: 30, color: "#1a1a1a" },
  },
};
