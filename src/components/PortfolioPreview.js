"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text3D, Center, Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import usePortfolioStore from "@/store/portfolioStore";
import { motion } from "framer-motion";
import styles from "@/styles/create.module.css";

function UserText({ text, position, size = 0.5, color = "#ffffff" }) {
  return (
    <Float floatIntensity={0.5} rotationIntensity={0.2}>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={size}
        height={0.2}
        position={position}
        curveSegments={32}
        bevelEnabled
        bevelSize={0.02}
        bevelThickness={0.1}
      >
        {text}
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </Text3D>
    </Float>
  );
}

function SocialLinks({ links, startPosition = [0, -2, 0] }) {
  const linkRefs = useRef([]);

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
        <mesh ref={(el) => (linkRefs.current[index] = el)}>
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

function Skills({ skills, startPosition = [0, 0, 0] }) {
  if (!skills) return null;

  const skillsArray = skills.split(",").map((skill) => skill.trim());

  return skillsArray.map((skill, index) => (
    <group
      key={skill}
      position={[
        startPosition[0] + (index - skillsArray.length / 2) * 2,
        startPosition[1],
        startPosition[2],
      ]}
    >
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.3}
        height={0.1}
      >
        {skill}
        <meshStandardMaterial color="#2ecc71" />
      </Text3D>
    </group>
  ));
}

export default function PortfolioPreview({ fullScreen = false }) {
  const { userData, templateConfig } = usePortfolioStore();

  const containerClassName = fullScreen ? styles.fullScreenPreview : "";

  return (
    <div
      className={containerClassName}
      style={{ width: "100%", height: "100%" }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: templateConfig.colors?.background || "#000000" }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        <Suspense fallback={null}>
          {/* Name */}
          <UserText
            text={userData.name || "Your Name"}
            position={[0, 2, 0]}
            size={1}
            color={templateConfig.colors?.primary || "#ffffff"}
          />

          {/* Title */}
          <UserText
            text={userData.title || "Your Title"}
            position={[0, 0.5, 0]}
            size={0.5}
            color={templateConfig.colors?.secondary || "#cccccc"}
          />

          {/* Bio */}
          {userData.bio && (
            <UserText
              text={userData.bio}
              position={[0, -1, 0]}
              size={0.3}
              color={templateConfig.colors?.text || "#999999"}
            />
          )}

          {/* Skills */}
          <group position={[0, -2, 0]}>
            <Skills skills={userData.skills} startPosition={[0, -3, 0]} />
          </group>

          {/* Social Links */}
          <group position={[0, -4, 0]}>
            <SocialLinks links={userData.socialLinks || {}} />
          </group>
        </Suspense>

        <OrbitControls
          enableZoom={fullScreen}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minDistance={5}
          maxDistance={20}
        />
      </Canvas>
    </div>
  );
}
