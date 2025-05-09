import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  Float,
  PerspectiveCamera,
  Text3D,
} from "@react-three/drei";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-mobile";

const FloatingObject = ({
  position,
  scale,
  color,
  speed = 1,
  rotationFactor = 0.01,
}) => {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.sin(time * speed * 0.3) * rotationFactor;
    mesh.current.rotation.y = Math.sin(time * speed * 0.2) * rotationFactor;
    mesh.current.position.y += Math.sin(time * speed) * 0.002;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={color} metalness={0.1} roughness={0.2} />
    </mesh>
  );
};

const FloatingText = ({
  text,
  position,
  color = "#4deeea",
  size = 0.8,
  rotation = [0, 0, 0],
}) => {
  const textRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    textRef.current.rotation.y = Math.sin(time * 0.2) * 0.08;
  });

  return (
    <Float
      speed={3}
      rotationIntensity={0.2}
      floatIntensity={1.5}
      position={position}
    >
      <group ref={textRef}>
        <Text3D
          font="/fonts/Inter_Regular.json"
          size={size}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelSegments={5}
          rotation={new THREE.Euler(rotation[0], rotation[1], rotation[2])}
        >
          {text}
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            metalness={0.3}
            roughness={0.2}
          />
        </Text3D>
      </group>
    </Float>
  );
};

const SceneObjects = () => {
  const isMobile = useIsMobile();

  // Drastically reduce scales for mobile
  const objectScale = isMobile ? 0.3 : 1;
  const textScale = isMobile ? 0.4 : 1;

  return (
    <>
      {/* Central object - smaller on mobile */}
      <FloatingObject
        position={[0, 0, 0]}
        scale={[1.5 * objectScale, 1.5 * objectScale, 1.5 * objectScale]}
        color="#8b5cf6"
        speed={0.7}
      />

      {/* Only render additional objects on desktop */}
      {!isMobile && (
        <>
          <FloatingObject
            position={[-5, 2, -2]}
            scale={[1 * objectScale, 1 * objectScale, 1 * objectScale]}
            color="#4deeea"
            speed={1.2}
          />
          <FloatingObject
            position={[6, -1, -4]}
            scale={[1.5 * objectScale, 1.5 * objectScale, 1.5 * objectScale]}
            color="#ff00e0"
            speed={0.8}
          />
          <FloatingObject
            position={[4, 3, -6]}
            scale={[0.8 * objectScale, 0.8 * objectScale, 0.8 * objectScale]}
            color="#fe5e41"
            speed={1.5}
          />
          <FloatingObject
            position={[-5, -3, -3]}
            scale={[1.2 * objectScale, 1.2 * objectScale, 1.2 * objectScale]}
            color="#4361ee"
            speed={1}
          />
        </>
      )}

      {/* Different text positioning and size based on device */}
      {isMobile ? (
        <>
          <FloatingText
            text="Hello"
            position={[-1, 1.2, -1.5]}
            color="#4deeea"
            size={textScale}
            rotation={[0, Math.PI * 0.05, 0]}
          />
          <FloatingText
            text="World"
            position={[1, -0.5, -1.5]}
            color="#ff00e0"
            size={textScale}
            rotation={[0, -Math.PI * 0.05, 0]}
          />
        </>
      ) : (
        <>
          <FloatingText
            text="Hello"
            position={[-4, 0, -2]}
            color="#4deeea"
            size={1}
            rotation={[0, Math.PI * 0.1, 0]}
          />
          <FloatingText
            text="World"
            position={[3, 1, -3]}
            color="#ff00e0"
            size={1}
            rotation={[0, -Math.PI * 0.1, 0]}
          />
        </>
      )}
    </>
  );
};

const Experience = () => {
  const isMobile = useIsMobile();

  return (
    <Canvas className="fixed top-0 left-0 w-full h-full" dpr={[1, 2]}>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, isMobile ? 6 : 10]}
        fov={isMobile ? 50 : 75}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight
          position={[-10, -10, -5]}
          intensity={0.5}
          color="#4deeea"
        />
      </PerspectiveCamera>
      <Stars
        radius={isMobile ? 30 : 50}
        depth={isMobile ? 30 : 50}
        count={isMobile ? 1000 : 5000}
        factor={4}
        fade
        speed={1}
      />
      <SceneObjects />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
      />
      <fog
        attach="fog"
        args={["#0a192f", isMobile ? 3 : 5, isMobile ? 15 : 30]}
      />
    </Canvas>
  );
};

export default Experience;
