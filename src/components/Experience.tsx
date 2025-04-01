
import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  OrbitControls, 
  Stars, 
  Float, 
  PerspectiveCamera,
  Text3D
} from "@react-three/drei";
import * as THREE from "three";

const FloatingObject = ({ position, scale, color, speed = 1, rotationFactor = 0.01 }) => {
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

const FloatingText = ({ text, position, color = "#4deeea", size = 0.8, rotation = [0, 0, 0] }) => {
  // Change the type from useRef<THREE.Mesh> to useRef<THREE.Group> to match Text3D's type
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
          // Convert array to a proper THREE.Euler object
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
  return (
    <>
      <FloatingObject 
        position={[0, 0, 0]} 
        scale={[2, 2, 2]} 
        color="#8b5cf6" 
        speed={0.7} 
      />
      <FloatingObject 
        position={[-5, 2, -2]} 
        scale={[1, 1, 1]} 
        color="#4deeea" 
        speed={1.2} 
      />
      <FloatingObject 
        position={[6, -1, -4]} 
        scale={[1.5, 1.5, 1.5]} 
        color="#ff00e0" 
        speed={0.8} 
      />
      <FloatingObject 
        position={[4, 3, -6]} 
        scale={[0.8, 0.8, 0.8]} 
        color="#fe5e41" 
        speed={1.5} 
      />
      <FloatingObject 
        position={[-5, -3, -3]} 
        scale={[1.2, 1.2, 1.2]} 
        color="#4361ee" 
        speed={1} 
      />
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
  );
};

const Experience = () => {
  return (
    <Canvas className="fixed top-0 left-0 w-full h-full" dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4deeea" />
      </PerspectiveCamera>
      <Stars radius={50} depth={50} count={5000} factor={4} fade speed={1} />
      <SceneObjects />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5} 
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
      />
      <fog attach="fog" args={['#0a192f', 5, 30]} />
    </Canvas>
  );
};

export default Experience;
