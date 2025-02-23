export function getGeometry(geometryType) {
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
}
