import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Real solar system data (scaled for visualization)
const SOLAR_SYSTEM_DATA = {
  sun: {
    radius: 0.5, // Scaled down for visualization
    color: '#FFD700',
    emissive: '#FFD700',
    emissiveIntensity: 1.0,
    rotationSpeed: 0.01
  },
  planets: [
    {
      name: 'Mercury',
      radius: 0.02,
      distance: 1.5,
      color: '#8B4513',
      orbitalSpeed: 0.08,
      rotationSpeed: 0.05,
      texture: null // Will use procedural
    },
    {
      name: 'Venus',
      radius: 0.03,
      distance: 2.2,
      color: '#FFA500',
      orbitalSpeed: 0.06,
      rotationSpeed: 0.04,
      texture: null
    },
    {
      name: 'Earth',
      radius: 0.03,
      distance: 3.0,
      color: '#4169E1',
      orbitalSpeed: 0.05,
      rotationSpeed: 0.03,
      texture: null
    },
    {
      name: 'Mars',
      radius: 0.025,
      distance: 4.5,
      color: '#FF4500',
      orbitalSpeed: 0.04,
      rotationSpeed: 0.025,
      texture: null
    },
    {
      name: 'Jupiter',
      radius: 0.15,
      distance: 7.5,
      color: '#FFD700',
      orbitalSpeed: 0.02,
      rotationSpeed: 0.015,
      texture: null
    },
    {
      name: 'Saturn',
      radius: 0.12,
      distance: 10.0,
      color: '#FAD5A5',
      orbitalSpeed: 0.015,
      rotationSpeed: 0.01,
      texture: null,
      hasRings: true
    },
    {
      name: 'Uranus',
      radius: 0.08,
      distance: 12.5,
      color: '#4FD0E7',
      orbitalSpeed: 0.01,
      rotationSpeed: 0.008,
      texture: null
    },
    {
      name: 'Neptune',
      radius: 0.08,
      distance: 15.0,
      color: '#4B70DD',
      orbitalSpeed: 0.008,
      rotationSpeed: 0.005,
      texture: null
    }
  ]
};

// Realistic Sun Component
function RealisticSun() {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((state) => {
    timeRef.current = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      meshRef.current.rotation.y = timeRef.current * SOLAR_SYSTEM_DATA.sun.rotationSpeed;
    }
  });

  return (
    <Sphere ref={meshRef} args={[SOLAR_SYSTEM_DATA.sun.radius, 64, 64]}>
      <meshStandardMaterial 
        color={SOLAR_SYSTEM_DATA.sun.color}
        emissive={SOLAR_SYSTEM_DATA.sun.emissive}
        emissiveIntensity={SOLAR_SYSTEM_DATA.sun.emissiveIntensity}
        roughness={0.1}
        metalness={0.0}
      />
    </Sphere>
  );
}

// Realistic Planet Component with accurate orbital mechanics
function RealisticPlanet({ planetData, index }: { planetData: any; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((state) => {
    timeRef.current = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      // Planet rotation on its axis
      meshRef.current.rotation.y += planetData.rotationSpeed;
    }
    
    if (groupRef.current) {
      // Orbital motion - planets move in elliptical orbits
      const angle = timeRef.current * planetData.orbitalSpeed;
      const x = Math.cos(angle) * planetData.distance;
      const z = Math.sin(angle) * planetData.distance;
      
      groupRef.current.position.set(x, 0, z);
      
      // Slight orbital inclination for realism
      groupRef.current.rotation.x = Math.sin(angle * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere ref={meshRef} args={[planetData.radius, 32, 32]}>
        <meshStandardMaterial 
          color={planetData.color}
          roughness={0.8}
          metalness={0.1}
        />
      </Sphere>
      
      {/* Saturn's rings */}
      {planetData.hasRings && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[planetData.radius * 1.5, planetData.radius * 2.5, 32]} />
          <meshStandardMaterial 
            color="#C0C0C0" 
            transparent 
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

// Realistic Asteroid Belt
function RealisticAsteroidBelt() {
  const asteroids = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      angle: (i / 100) * Math.PI * 2,
      distance: 6.5 + (Math.random() - 0.5) * 1,
      height: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 0.01 + 0.005,
      speed: Math.random() * 0.01 + 0.005,
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]
    }));
  }, []);

  return (
    <>
      {asteroids.map((asteroid, i) => (
        <Asteroid key={i} {...asteroid} />
      ))}
    </>
  );
}

// Individual Asteroid
function Asteroid({ angle, distance, height, size, speed, rotation }: {
  angle: number;
  distance: number;
  height: number;
  size: number;
  speed: number;
  rotation: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((state) => {
    timeRef.current = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      const newAngle = angle + timeRef.current * speed;
      meshRef.current.position.x = Math.cos(newAngle) * distance;
      meshRef.current.position.z = Math.sin(newAngle) * distance;
      meshRef.current.position.y = height + Math.sin(timeRef.current * 2) * 0.1;
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.02;
      meshRef.current.rotation.z += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} rotation={rotation}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshStandardMaterial 
        color="#8B4513" 
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  );
}

// Realistic Star Field with proper distribution
function RealisticStarField() {
  const meshRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const stars = useMemo(() => {
    const positions = [];
    const colors = [];
    const count = 2000;
    
    for (let i = 0; i < count; i++) {
      // Proper sphere distribution for stars
      const radius = Math.random() * 50 + 50;
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions.push(x, y, z);
      
      // Realistic star colors (blue-white to red giants)
      const hue = Math.random() * 0.2 + 0.5; // Blue to white
      const saturation = Math.random() * 0.3 + 0.1;
      const lightness = Math.random() * 0.3 + 0.7;
      const color = new THREE.Color().setHSL(hue, saturation, lightness);
      colors.push(color.r, color.g, color.b);
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    timeRef.current = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      meshRef.current.rotation.y = timeRef.current * 0.001;
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
        size={0.1}
        transparent
        alphaTest={0.5}
        vertexColors
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main Realistic Solar System Component
export default function RealisticSolarSystem() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 25], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Realistic Space Lighting */}
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 0]} intensity={0.5} color="#FFFFFF" />
        <pointLight position={[0, 0, 0]} color="#FFD700" intensity={3} />
        <pointLight position={[0, 0, 0]} color="#FFA500" intensity={1} />

        {/* Central Sun */}
        <RealisticSun />

        {/* All Planets */}
        {SOLAR_SYSTEM_DATA.planets.map((planet, index) => (
          <RealisticPlanet key={planet.name} planetData={planet} index={index} />
        ))}

        {/* Asteroid Belt between Mars and Jupiter */}
        <RealisticAsteroidBelt />

        {/* Realistic Star Field */}
        <RealisticStarField />

        {/* Enhanced Controls */}
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          autoRotate 
          autoRotateSpeed={0.2}
          maxDistance={50}
          minDistance={2}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
