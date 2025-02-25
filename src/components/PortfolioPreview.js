"use client";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Text3D,
  Float,
  Box,
  Sphere,
  Cylinder,
} from "@react-three/drei";
import { Suspense, useEffect } from "react";
import * as THREE from "three";
import usePortfolioStore from "@/store/portfolioStore";
import styles from "@/styles/create.module.css";

function Skills({ skills, startPosition = [0, 0, 0] }) {
  if (!skills) return null;

  const skillsArray = skills.split(",").map((skill) => skill.trim());
  return skillsArray.map((skill, index, arr) => (
    <Text3D
      key={skill}
      font="/fonts/helvetiker_regular.typeface.json"
      size={0.3}
      height={0.05}
      position={[
        startPosition[0] + (index - arr.length / 2) * 2,
        startPosition[1],
        startPosition[2],
      ]}
    >
      {skill}
      <meshStandardMaterial color={"#2ecc71"} />
    </Text3D>
  ));
}

function SocialLinks({ links, startPosition = [0, -2, 0] }) {
  return Object.entries(links).map(([platform, url], index) => {
    if (!url) return null;

    return (
      <group
        key={platform}
        position={[
          startPosition[0] + index * 2,
          startPosition[1],
          startPosition[2],
        ]}
        onClick={() => window.open(url, "_blank")}
      >
        <mesh>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#4a9eff" />
        </mesh>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.2}
          height={0.1}
          position={[-0.2, -0.4, 0]}
        >
          {platform}
          <meshStandardMaterial color="#ffffff" />
        </Text3D>
      </group>
    );
  });
}

function ModelComponent({ type, scale = 1, position, material }) {
  // Get model color from material or use a default
  const modelMaterial = {
    ...material,
    color: material.modelColor || material.color || "#ffffff",
  };

  switch (type) {
    case "box":
      return (
        <mesh position={position} scale={scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={modelMaterial.color} />
        </mesh>
      );
    case "sphere":
      return (
        <mesh position={position} scale={scale}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color={modelMaterial.color} />
        </mesh>
      );
    case "cylinder":
      return (
        <mesh position={position} scale={scale}>
          <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
          <meshStandardMaterial color={modelMaterial.color} />
        </mesh>
      );
    case "cone":
      return (
        <mesh position={position} scale={scale}>
          <coneGeometry args={[0.5, 1, 32]} />
          <meshStandardMaterial color={modelMaterial.color} />
        </mesh>
      );
    case "torus":
      return (
        <mesh position={position} scale={scale}>
          <torusGeometry args={[0.5, 0.2, 16, 32]} />
          <meshStandardMaterial color={modelMaterial.color} />
        </mesh>
      );
    case "dodecahedron":
      return (
        <mesh position={position} scale={scale}>
          <dodecahedronGeometry args={[0.5]} />
          <meshStandardMaterial color={modelMaterial.color} />
        </mesh>
      );
    case "icosahedron":
      return (
        <mesh position={position} scale={scale}>
          <icosahedronGeometry args={[0.5]} />
          <meshStandardMaterial color={modelMaterial.color} />
        </mesh>
      );
    case "octahedron":
      return (
        <mesh position={position} scale={scale}>
          <octahedronGeometry args={[0.5]} />
          <meshStandardMaterial color={modelMaterial.color} />
        </mesh>
      );
    case "tetrahedron":
      return (
        <mesh position={position} scale={scale}>
          <tetrahedronGeometry args={[0.5]} />
          <meshStandardMaterial color={modelMaterial.color} />
        </mesh>
      );
    case "torusKnot":
      return (
        <mesh position={position} scale={scale}>
          <torusKnotGeometry args={[0.3, 0.1, 64, 8]} />
          <meshStandardMaterial color={modelMaterial.color} />
        </mesh>
      );
    default:
      return null;
  }
}

function Scene() {
  const { userData, templateSettings } = usePortfolioStore();

  const materialProps = {
    color: templateSettings?.colors?.primary || "#ffffff",
    modelColor: templateSettings?.modelColor || "#ffffff",
    metalness: templateSettings?.material?.metalness || 0,
    roughness: templateSettings?.material?.roughness || 0.5,
  };

  return (
    <>
      <ambientLight
        intensity={templateSettings?.lighting === "soft" ? 0.5 : 0.3}
      />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={templateSettings?.lighting === "sharp" ? 1 : 0.7}
      />

      {/* Name */}
      <Float
        floatIntensity={templateSettings?.animations === "dynamic" ? 2 : 0.5}
      >
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={1}
          height={0.2}
          position={[0, 2, 0]}
          curveSegments={32}
          bevelEnabled
          bevelSize={0.02}
          bevelThickness={0.1}
        >
          {userData?.name || "Your Name"}
          <meshStandardMaterial {...materialProps} />
        </Text3D>
      </Float>

      {/* Title */}
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.5}
        height={0.1}
        position={[0, 0.5, 0]}
      >
        {userData?.title || "Your Title"}
        <meshStandardMaterial
          color={templateSettings?.colors?.secondary || "#cccccc"}
          metalness={(templateSettings?.material?.metalness || 0) * 0.8}
          roughness={(templateSettings?.material?.roughness || 0.5) * 1.2}
        />
      </Text3D>

      {/* Bio Text */}
      {userData?.bio && (
        <group position={[0, -0.5, 0]}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.25}
            height={0.05}
            position={[-2, 0, 0]}
            maxWidth={4}
          >
            {userData.bio}
            <meshStandardMaterial
              color={templateSettings?.colors?.text || "#999999"}
              metalness={templateSettings?.material?.metalness * 0.5}
              roughness={templateSettings?.material?.roughness * 1.5}
            />
          </Text3D>
        </group>
      )}

      {/* Skills */}
      <group position={[0, -2, 0]}>
        <Skills skills={userData?.skills} startPosition={[0, -1, 0]} />
      </group>

      {/* Social Links */}
      <group position={[0, -4, 0]}>
        <SocialLinks links={userData?.socialLinks || {}} />
      </group>

      {/* Custom Models */}
      <group position={[0, 0, -2]}>
        {templateSettings?.models?.map((model, index) => (
          <ModelComponent
            key={index}
            type={model.type} // This should now correctly receive 'box', 'sphere', or 'cylinder'
            scale={model.scale || 1}
            position={[
              index * 2 - ((templateSettings.models.length || 1) - 1),
              -2,
              0,
            ]}
            material={materialProps}
          />
        ))}
      </group>
    </>
  );
}

// Remove the Model component as we're using ModelComponent
// Remove renderModels function as it's no longer needed

export default function PortfolioPreview({
  fullScreen = false,
  models = [],
  theme,
  modelColor,
}) {
  const { templateSettings } = usePortfolioStore();

  return (
    <div
      style={{
        width: "100%",
        height: fullScreen ? "100%" : "500px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{
          background: templateSettings?.colors?.background || "#000000",
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>

        <OrbitControls
          enableZoom={true}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minDistance={3}
          maxDistance={20}
          autoRotate={templateSettings?.animations === "dynamic"}
          autoRotateSpeed={1}
        />
        {/* Remove the renderModels() call here */}
      </Canvas>
    </div>
  );
}
