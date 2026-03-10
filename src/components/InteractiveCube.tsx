import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

function SpinningCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.6;
      if (hovered) {
        meshRef.current.rotation.z += delta * 1.2;
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.15 : 1}
    >
      <boxGeometry args={[2.2, 2.2, 2.2]} />
      <meshStandardMaterial
        color={hovered ? "#e040a0" : "#56c8e8"}
        wireframe
        wireframeLinewidth={1.5}
      />
    </mesh>
  );
}

const InteractiveCube = () => {
  return (
    <div className="absolute inset-0 pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <SpinningCube />
      </Canvas>
    </div>
  );
};

export default InteractiveCube;
