import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { modelDictionary } from "@/utils/modelDictionary";
import styles from "@/styles/ThemeModelsDisplay.module.css";

function ModelDisplay({ type, position }) {
  return (
    <mesh position={position}>
      {type === "box" && <boxGeometry args={[1, 1, 1]} />}
      {type === "sphere" && <sphereGeometry args={[0.5, 32, 32]} />}
      {type === "cylinder" && <cylinderGeometry args={[0.5, 0.5, 1, 32]} />}
      {type === "cone" && <coneGeometry args={[0.5, 1, 32]} />}
      {type === "torus" && <torusGeometry args={[0.5, 0.2, 16, 32]} />}
      {type === "dodecahedron" && <dodecahedronGeometry args={[0.5]} />}
      {type === "icosahedron" && <icosahedronGeometry args={[0.5]} />}
      {type === "octahedron" && <octahedronGeometry args={[0.5]} />}
      {type === "tetrahedron" && <tetrahedronGeometry args={[0.5]} />}
      {type === "torusKnot" && <torusKnotGeometry args={[0.3, 0.1, 64, 8]} />}
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  );
}

export default function ThemeModelsDisplay() {
  return (
    <div className={styles.container}>
      {Object.entries(modelDictionary).map(([theme, config]) => (
        <div key={theme} className={styles.themeSection}>
          <h3>{theme.charAt(0).toUpperCase() + theme.slice(1)} Theme Models</h3>
          <div className={styles.modelDisplay}>
            <Canvas camera={{ position: [0, 2, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <group>
                {config.allowed.map((modelType, index) => (
                  <ModelDisplay
                    key={modelType}
                    type={modelType}
                    position={[
                      (index % 3) * 2 - 2,
                      Math.floor(index / 3) * -2 + 1,
                      0,
                    ]}
                  />
                ))}
              </group>
              <OrbitControls />
            </Canvas>
          </div>
          <div className={styles.modelList}>
            <p>Available Models: {config.allowed.join(", ")}</p>
            <p>Max Models Allowed: {config.maxCount}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
