"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export function MinimalPreview() {
  return (
    <Canvas camera={{ position: [3, 2, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color="#2A9D8F" />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#264653" />
      </mesh>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}

export function CreativePreview() {
  return (
    <Canvas camera={{ position: [3, 3, 3] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh position={[-1, 0, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#E76F51" />
      </mesh>
      <mesh position={[1, 0, 0]}>
        <torusGeometry args={[0.5, 0.2, 16, 32]} />
        <meshStandardMaterial color="#2A9D8F" />
      </mesh>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}

export function ProfessionalPreview() {
  return (
    <Canvas camera={{ position: [3, 2, 5] }}>
      <ambientLight intensity={0.6} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <group position={[0, 0, 0]}>
        <mesh position={[-1.5, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#34495e"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
          <meshStandardMaterial
            color="#3498db"
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[1.5, 0, 0]}>
          <dodecahedronGeometry args={[0.7]} />
          <meshStandardMaterial
            color="#2ecc71"
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>
      </group>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}

export function CustomPreview() {
  return (
    <Canvas camera={{ position: [3, 2, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh position={[-1, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#e74c3c" />
      </mesh>
      <mesh position={[1, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#9b59b6" />
      </mesh>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
