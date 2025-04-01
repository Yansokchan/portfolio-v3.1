
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

const Particles = ({ count = 5000 }) => {
  const mesh = useRef<THREE.Points>(null!);
  const hover = useRef(false);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color = new THREE.Color();
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      
      color.setHSL(Math.random(), 0.7, 0.7);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    return geometry;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    mesh.current.rotation.x = Math.sin(time / 10) * 0.2;
    mesh.current.rotation.y = Math.sin(time / 10) * 0.2;

    const positions = particlesGeometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const { t, factor, speed, xFactor, yFactor, zFactor } = particles[i];
      
      // Update position
      const curZ = positions[i3 + 2];
      const curY = positions[i3 + 1];
      const curX = positions[i3];
      
      // Move particles
      positions[i3] = curX + Math.sin((time + t) / factor) * speed * xFactor;
      positions[i3 + 1] = curY + Math.cos((time + t) / factor) * speed * yFactor;
      positions[i3 + 2] = curZ + Math.sin((time + t) / factor) * speed * zFactor;
    }
    
    particlesGeometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <primitive object={particlesGeometry} attach="geometry" />
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const ParticleBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Particles count={4000} />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
