export const modelConfigs = {
  minimal: {
    available: [
      { id: "cube", name: "Cube", geometry: "box", defaultScale: [1, 1, 1] },
      {
        id: "sphere",
        name: "Sphere",
        geometry: "sphere",
        defaultScale: [0.8, 0.8, 0.8],
      },
      {
        id: "cylinder",
        name: "Cylinder",
        geometry: "cylinder",
        defaultScale: [0.5, 1, 0.5],
      },
    ],
    maxSelections: 3,
  },
  creative: {
    available: [
      {
        id: "torus",
        name: "Torus",
        geometry: "torus",
        defaultScale: [1, 1, 0.2],
      },
      {
        id: "torusKnot",
        name: "Torus Knot",
        geometry: "torusKnot",
        defaultScale: [0.6, 0.6, 0.6],
      },
      {
        id: "octahedron",
        name: "Octahedron",
        geometry: "octahedron",
        defaultScale: [1, 1, 1],
      },
      {
        id: "icosahedron",
        name: "Icosahedron",
        geometry: "icosahedron",
        defaultScale: [0.8, 0.8, 0.8],
      },
      {
        id: "sphere",
        name: "Sphere",
        geometry: "sphere",
        defaultScale: [0.7, 0.7, 0.7],
      },
    ],
    maxSelections: 5,
  },
  professional: {
    available: [
      { id: "cube", name: "Cube", geometry: "box", defaultScale: [1, 1, 1] },
      {
        id: "cylinder",
        name: "Cylinder",
        geometry: "cylinder",
        defaultScale: [0.5, 1.5, 0.5],
      },
      {
        id: "cone",
        name: "Cone",
        geometry: "cone",
        defaultScale: [0.7, 1, 0.7],
      },
      {
        id: "dodecahedron",
        name: "Dodecahedron",
        geometry: "dodecahedron",
        defaultScale: [0.8, 0.8, 0.8],
      },
    ],
    maxSelections: 4,
  },
};
