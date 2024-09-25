"use client";

// Hero.tsx
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { InstancedMesh } from "three";
import * as THREE from "three";

const ThreeRender: React.FC = () => {
  return (
    <Canvas
      style={{ width: "100%", height: "100vh" }}
      camera={{ position: [0, 0, 10], fov: 75 }}
    >
      <ambientLight />
      <Scene />
    </Canvas>
  );
};

const Scene: React.FC = () => {
  const meshRef = useRef<InstancedMesh>(null!);
  const { size } = useThree();
  const count = 1000;

  // Store instance positions
  const positions = useRef<THREE.Vector3[]>([]);
  const mouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    // Initialize positions
    positions.current = Array.from({ length: count }, () => {
      return new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
    });

    // Set initial matrices
    const dummy = new THREE.Object3D();
    positions.current.forEach((position, i) => {
      dummy.position.copy(position);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  // Mouse movement handler
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / size.width) * 2 - 1;
      mouse.current.y = -(event.clientY / size.height) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [size]);

  // Animation loop
  useFrame(() => {
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const position = positions.current[i];

      // Update positions based on mouse movement
      position.x += (mouse.current.x * 10 - position.x) * 0.05;
      position.y += (mouse.current.y * 10 - position.y) * 0.05;

      dummy.position.copy(position);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshNormalMaterial />
    </instancedMesh>
  );
};

export default ThreeRender;
