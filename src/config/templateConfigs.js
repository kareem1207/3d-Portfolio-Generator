export const templateConfigs = {
  minimal: {
    name: "Minimal 3D",
    description: "Clean and professional portfolio with subtle 3D elements",
    features: [
      "Simple geometric shapes",
      "Subtle animations",
      "Fast loading time",
      "Perfect for minimalists",
    ],
    customizationOptions: {
      colors: {
        primary: "#2A9D8F",
        secondary: "#264653",
        background: "#ffffff",
      },
      animations: ["none", "subtle"],
      cameraAngles: ["front", "isometric"],
      lightingPresets: ["soft", "sharp"],
    },
  },
  creative: {
    name: "Creative Space",
    description: "Bold and artistic design with interactive 3D objects",
    features: [
      "Interactive star field",
      "Floating elements",
      "Dynamic animations",
      "Eye-catching effects",
    ],
    customizationOptions: {
      colors: {
        primary: "#E76F51",
        secondary: "#2A9D8F",
        accent: "#F4A261",
        background: "#264653",
      },
      animations: ["moderate", "dynamic"],
      particleCount: [1000, 3000, 5000],
      interactivityLevel: ["low", "medium", "high"],
    },
  },
  professional: {
    name: "Professional 3D",
    description: "Sophisticated design with modern 3D elements",
    features: [
      "Metallic materials",
      "Professional lighting",
      "Smooth transitions",
      "Business-focused layout",
    ],
    customizationOptions: {
      colors: {
        primary: "#34495e",
        secondary: "#3498db",
        accent: "#2ecc71",
        background: "#ecf0f1",
      },
      materials: {
        metalness: [0.3, 0.5, 0.8],
        roughness: [0.2, 0.4, 0.6],
      },
      lighting: ["studio", "outdoor", "office"],
      animations: ["subtle", "moderate"],
    },
  },
  custom: {
    name: "Custom Template Builder",
    description: "Create your own unique 3D template",
    features: [
      "Full customization control",
      "Custom model support",
      "Code editor for models",
      "Interactive preview",
      "Personal info display",
    ],
    customizationOptions: {
      geometries: ["box", "sphere", "cylinder", "torus", "cone"],
      materials: ["standard", "physical", "toon", "metallic"],
      animations: ["none", "rotate", "float", "pulse"],
      interactions: ["drag", "click", "hover"],
      maxObjects: 10,
      customModels: {
        enabled: true,
        maxCount: 5,
        defaultCode: `
new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: '#ff0000' })
)`,
      },
      text3D: {
        fonts: ["helvetiker", "droid"],
        sizes: [0.3, 0.5, 0.7],
        heights: [0.1, 0.2, 0.3],
      },
    },
  },
};

export const getTemplateDefaults = (templateId) => {
  const config = templateConfigs[templateId];

  if (!config || !config.customizationOptions) {
    return {
      colors: {
        primary: "#2A9D8F",
        secondary: "#264653",
        background: "#ffffff",
      },
      animations: "none",
      lighting: "soft",
      material: {
        metalness: 0,
        roughness: 0.5,
      },
    };
  }

  const {
    colors = {},
    animations = [],
    lighting = [],
  } = config.customizationOptions;

  return {
    colors: Object.entries(colors).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {}),
    animations: animations[0] || "none",
    lighting: lighting[0] || "soft",
    material: {
      metalness: config.customizationOptions?.materials?.metalness?.[0] ?? 0,
      roughness: config.customizationOptions?.materials?.roughness?.[0] ?? 0.5,
    },
  };
};
