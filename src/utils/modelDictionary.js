export const modelDictionary = {
  minimal: {
    allowed: ["box", "sphere", "cylinder"],
    maxCount: 3,
  },
  creative: {
    allowed: ["box", "sphere", "cylinder", "cone", "torus", "torusKnot"],
    maxCount: 5,
  },
  professional: {
    allowed: ["box", "sphere", "cylinder", "dodecahedron", "octahedron"],
    maxCount: 4,
  },
  custom: {
    allowed: [
      "box",
      "sphere",
      "cylinder",
      "cone",
      "torus",
      "dodecahedron",
      "icosahedron",
      "octahedron",
      "tetrahedron",
      "torusKnot",
    ],
    maxCount: 10,
  },
};
