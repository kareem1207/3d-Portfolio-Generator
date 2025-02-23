"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { getGeometry } from "@/utils/geometryHelpers";

export default function ModelPreview({ model }) {
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
}
