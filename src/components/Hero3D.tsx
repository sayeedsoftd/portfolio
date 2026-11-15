import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

// Animated Distorted Glowing Core Sphere
function GlowingCore({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Parallax mouse interaction + gentle continuous rotation
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mouse.current.y * 0.4 + time * 0.15,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mouse.current.x * 0.4 + time * 0.2,
      0.05
    );
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 64, 64]} scale={1.2}>
      <MeshDistortMaterial
        color="#7C3AED"
        emissive="#3B82F6"
        emissiveIntensity={0.35}
        roughness={0.15}
        metalness={0.85}
        distort={0.42}
        speed={2.2}
        wireframe={false}
      />
    </Sphere>
  );
}

// Orbiting Ring with Neon Glow
function OrbitRing({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    const time = state.clock.getElapsedTime();
    ringRef.current.rotation.x = time * 0.35 + mouse.current.y * 0.2;
    ringRef.current.rotation.y = time * 0.25 + mouse.current.x * 0.2;
    ringRef.current.rotation.z = time * 0.1;
  });

  return (
    <Torus ref={ringRef} args={[2.3, 0.045, 16, 100]}>
      <meshStandardMaterial
        color="#22D3EE"
        emissive="#22D3EE"
        emissiveIntensity={0.8}
        roughness={0.1}
        metalness={0.9}
      />
    </Torus>
  );
}

// Second tilted geometric ring
function SecondRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    const time = state.clock.getElapsedTime();
    ringRef.current.rotation.x = -time * 0.25;
    ringRef.current.rotation.y = time * 0.3;
  });

  return (
    <Torus ref={ringRef} args={[2.7, 0.03, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
      <meshStandardMaterial
        color="#C084FC"
        emissive="#7C3AED"
        emissiveIntensity={0.7}
        roughness={0.2}
        metalness={0.8}
      />
    </Torus>
  );
}

// Floating Small Geometrics
function FloatingParticles() {
  const count = 18;
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 8;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 5;
      const scale = Math.random() * 0.12 + 0.05;
      const speed = Math.random() * 0.8 + 0.4;
      temp.push({ x, y, z, scale, speed });
    }
    return temp;
  }, []);

  return (
    <group>
      {particles.map((p, i) => (
        <Float key={i} speed={p.speed * 2} rotationIntensity={1.5} floatIntensity={2}>
          <Octahedron position={[p.x, p.y, p.z]} scale={p.scale}>
            <meshStandardMaterial
              color={i % 2 === 0 ? "#22D3EE" : "#A78BFA"}
              emissive={i % 2 === 0 ? "#06B6D4" : "#7C3AED"}
              emissiveIntensity={0.6}
              roughness={0.2}
              metalness={0.8}
            />
          </Octahedron>
        </Float>
      ))}
    </group>
  );
}

export default function Hero3D() {
  const mouse = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mouse.current = { x, y };
  };

  return (
    <div 
      className="w-full h-full min-h-[420px] md:min-h-[550px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
      onPointerMove={handlePointerMove}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        {/* Neon Purple Point Light */}
        <pointLight position={[5, 4, 3]} intensity={2.2} color="#7C3AED" />
        {/* Neon Cyan Point Light */}
        <pointLight position={[-5, -4, 2]} intensity={2.0} color="#22D3EE" />
        {/* Fill White Light */}
        <directionalLight position={[0, 5, 5]} intensity={0.6} color="#FFFFFF" />

        <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
          <GlowingCore mouse={mouse} />
          <OrbitRing mouse={mouse} />
          <SecondRing />
        </Float>

        <FloatingParticles />
      </Canvas>

      {/* Decorative gradient aura behind canvas */}
      <div className="absolute inset-0 -z-10 bg-radial from-purple-600/20 via-cyan-500/10 to-transparent blur-3xl pointer-events-none" />
    </div>
  );
}
