import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Individual Planet Component
function Planet({ 
  position, 
  radius, 
  color, 
  emissive, 
  emissiveIntensity, 
  orbitRadius, 
  orbitSpeed, 
  rotationSpeed,
  texture 
}: {
  position: [number, number, number];
  radius: number;
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
  orbitRadius?: number;
  orbitSpeed?: number;
  rotationSpeed?: number;
  texture?: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((state) => {
    timeRef.current = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      // Planet rotation
      meshRef.current.rotation.y += (rotationSpeed || 0.01);
    }
    
    if (groupRef.current && orbitRadius && orbitSpeed) {
      // Orbital motion
      const angle = timeRef.current * orbitSpeed;
      groupRef.current.position.x = Math.cos(angle) * orbitRadius;
      groupRef.current.position.z = Math.sin(angle) * orbitRadius;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Sphere ref={meshRef} args={[radius, 32, 32]}>
        <meshStandardMaterial 
          color={color}
          emissive={emissive || color}
          emissiveIntensity={emissiveIntensity || 0.1}
          roughness={0.8}
          metalness={0.2}
        />
      </Sphere>
    </group>
  );
}

// Asteroid Belt Component
function AsteroidBelt({ count = 20, radius = 8 }) {
  const asteroids = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      distance: radius + (Math.random() - 0.5) * 2,
      height: (Math.random() - 0.5) * 1,
      size: Math.random() * 0.1 + 0.05,
      speed: Math.random() * 0.01 + 0.005,
    }));
  }, [count, radius]);

  return (
    <>
      {asteroids.map((asteroid, i) => (
        <Asteroid
          key={i}
          angle={asteroid.angle}
          distance={asteroid.distance}
          height={asteroid.height}
          size={asteroid.size}
          speed={asteroid.speed}
        />
      ))}
    </>
  );
}

// Individual Asteroid Component
function Asteroid({ angle, distance, height, size, speed }: {
  angle: number;
  distance: number;
  height: number;
  size: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((state) => {
    timeRef.current = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      const newAngle = angle + timeRef.current * speed;
      meshRef.current.position.x = Math.cos(newAngle) * distance;
      meshRef.current.position.z = Math.sin(newAngle) * distance;
      meshRef.current.position.y = height + Math.sin(timeRef.current * 2) * 0.2;
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshStandardMaterial 
        color="#8B4513" 
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  );
}

// Enhanced Star Field Component based on the tutorial
function StarField({ count = 1000 }) {
  const meshRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const stars = useMemo(() => {
    const positions = [];
    const colors = [];
    
    for (let i = 0; i < count; i++) {
      // Create stars in a sphere pattern like the tutorial
      const radius = Math.random() * 25 + 25;
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions.push(x, y, z);
      
      // Add color variation
      const hue = Math.random() * 0.1 + 0.5; // Blue-white stars
      const color = new THREE.Color().setHSL(hue, 0.2, Math.random() * 0.5 + 0.5);
      colors.push(color.r, color.g, color.b);
    }
    
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    timeRef.current = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      // Rotate the starfield slowly
      meshRef.current.rotation.y = timeRef.current * 0.01;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={stars.positions.length / 3}
          array={new Float32Array(stars.positions)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={stars.colors.length / 3}
          array={new Float32Array(stars.colors)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        transparent
        alphaTest={0.5}
        vertexColors
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Individual Star Component
function Star({ position, size, twinkle }: {
  position: [number, number, number];
  size: number;
  twinkle: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((state) => {
    timeRef.current = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      const scale = 1 + Math.sin(timeRef.current * twinkle * 10) * 0.3;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 4, 4]} />
      <meshStandardMaterial 
        color="#FFFFFF" 
        emissive="#FFFFFF"
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}

// Main Animated Planets Scene
export default function AnimatedPlanets() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Space Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} color="#FFFFFF" />
        <pointLight position={[0, 0, 0]} color="#FFD700" intensity={2} />
        <pointLight position={[5, 5, 5]} color="#87CEEB" intensity={0.5} />

        {/* Central Sun - Enhanced like the tutorial */}
        <Planet
          position={[0, 0, 0]}
          radius={1.5}
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={1.2}
          rotationSpeed={0.01}
        />

        {/* Mercury - Closest to sun */}
        <Planet
          position={[0, 0, 0]}
          radius={0.2}
          color="#8B4513"
          orbitRadius={2.5}
          orbitSpeed={0.08}
          rotationSpeed={0.05}
        />

        {/* Venus */}
        <Planet
          position={[0, 0, 0]}
          radius={0.25}
          color="#FFA500"
          orbitRadius={3.5}
          orbitSpeed={0.06}
          rotationSpeed={0.04}
        />

        {/* Earth */}
        <Planet
          position={[0, 0, 0]}
          radius={0.3}
          color="#4169E1"
          orbitRadius={4.5}
          orbitSpeed={0.05}
          rotationSpeed={0.03}
        />

        {/* Mars */}
        <Planet
          position={[0, 0, 0]}
          radius={0.25}
          color="#FF4500"
          orbitRadius={5.5}
          orbitSpeed={0.04}
          rotationSpeed={0.025}
        />

        {/* Jupiter - Gas Giant */}
        <Planet
          position={[0, 0, 0]}
          radius={0.8}
          color="#FFD700"
          orbitRadius={8}
          orbitSpeed={0.02}
          rotationSpeed={0.015}
        />

        {/* Saturn - Gas Giant with rings */}
        <Planet
          position={[0, 0, 0]}
          radius={0.7}
          color="#FAD5A5"
          orbitRadius={10}
          orbitSpeed={0.015}
          rotationSpeed={0.01}
        />

        {/* Uranus - Ice Giant */}
        <Planet
          position={[0, 0, 0]}
          radius={0.5}
          color="#4FD0E7"
          orbitRadius={12}
          orbitSpeed={0.01}
          rotationSpeed={0.008}
        />

        {/* Neptune - Ice Giant */}
        <Planet
          position={[0, 0, 0]}
          radius={0.5}
          color="#4B70DD"
          orbitRadius={14}
          orbitSpeed={0.008}
          rotationSpeed={0.005}
        />

        {/* Asteroid Belt */}
        <AsteroidBelt count={30} radius={7} />

        {/* Star Field */}
        <StarField count={150} />

        {/* Enhanced orbit controls like the tutorial */}
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          autoRotate 
          autoRotateSpeed={0.5}
          maxDistance={30}
          minDistance={5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
