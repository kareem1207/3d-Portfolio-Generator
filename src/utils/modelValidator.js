const validateModelCode = (code) => {
  try {
    // Add check for model size
    if (code.length > 50000) {
      return {
        isValid: false,
        error: "Model code exceeds size limit",
      };
    }

    // Basic validation - ensure code contains necessary Three.js elements
    const containsMesh = code.includes("mesh") || code.includes("Mesh");
    const containsGeometry =
      code.includes("geometry") || code.includes("Geometry");
    const containsMaterial =
      code.includes("material") || code.includes("Material");

    if (!containsMesh || !containsGeometry || !containsMaterial) {
      return {
        isValid: false,
        error: "Code must define a mesh with geometry and material",
      };
    }

    // Remove potential harmful code patterns
    const hasUnsafePatterns = /eval|Function|require|import|process/g.test(
      code
    );
    if (hasUnsafePatterns) {
      return {
        isValid: false,
        error: "Code contains unsafe patterns",
      };
    }

    // Add check for basic Three.js scene setup
    const hasSceneSetup = code.includes("scene.add") || code.includes("add(");
    if (!hasSceneSetup) {
      return {
        isValid: false,
        error: "Code must include scene setup",
      };
    }

    return {
      isValid: true,
      code: code,
    };
  } catch (error) {
    return {
      isValid: false,
      error: error.message,
    };
  }
};

export { validateModelCode };
