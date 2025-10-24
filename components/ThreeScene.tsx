import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

// Floating particles component - optimized for performance
function FloatingParticles({ count = 50 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const tempObject = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = new Array(count).fill(0).map(() => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
      ] as [number, number, number],
      scale: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.01 + 0.005,
    }));
    return temp;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      particles.forEach((particle, i) => {
        particle.position[1] += particle.speed;
        if (particle.position[1] > 10) particle.position[1] = -10;
        
        tempObject.position.set(...particle.position);
        tempObject.scale.setScalar(particle.scale);
        tempObject.updateMatrix();
        mesh.current.setMatrixAt(i, tempObject.matrix);
      });
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial color="#20B2AA" transparent opacity={0.6} />
    </instancedMesh>
  );
}

// Metroid-inspired space objects
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central energy core */}
      <Sphere position={[0, 0, -2]} args={[0.7, 32, 32]}>
        <meshStandardMaterial 
          color="#00FFFF" 
          transparent 
          opacity={0.9}
          emissive="#00FFFF"
          emissiveIntensity={0.6}
        />
      </Sphere>
      
      {/* Energy rings */}
      <Torus position={[0, 0, -2]} args={[1.2, 0.05, 16, 32]} rotation={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#00FFFF" 
          transparent 
          opacity={0.8}
          emissive="#00FFFF"
          emissiveIntensity={0.4}
        />
      </Torus>
      
      <Torus position={[0, 0, -2]} args={[1.5, 0.03, 16, 32]} rotation={[0.5, 0, 0]}>
        <meshStandardMaterial 
          color="#00FFFF" 
          transparent 
          opacity={0.6}
          emissive="#00FFFF"
          emissiveIntensity={0.3}
        />
      </Torus>
      
      {/* Floating energy crystals */}
      <mesh position={[2, 1, -3]} rotation={[0.5, 0.5, 0]}>
        <octahedronGeometry args={[0.3]} />
        <meshStandardMaterial 
          color="#00FF00" 
          transparent 
          opacity={0.8}
          emissive="#00FF00"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      <mesh position={[-2, -1, -3]} rotation={[0.3, 0.3, 0]}>
        <octahedronGeometry args={[0.25]} />
        <meshStandardMaterial 
          color="#FF00FF" 
          transparent 
          opacity={0.7}
          emissive="#FF00FF"
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Space station modules */}
      <Box position={[1.5, -1.5, -2]} args={[0.6, 0.3, 0.3]} rotation={[0, 0.5, 0]}>
        <meshStandardMaterial 
          color="#C0C0C0" 
          transparent 
          opacity={0.8}
          emissive="#C0C0C0"
          emissiveIntensity={0.2}
        />
      </Box>
      
      <Box position={[-1.5, 1.5, -2]} args={[0.4, 0.4, 0.4]} rotation={[0, -0.5, 0]}>
        <meshStandardMaterial 
          color="#808080" 
          transparent 
          opacity={0.7}
          emissive="#808080"
          emissiveIntensity={0.1}
        />
      </Box>
      
      {/* Energy conduits */}
      <mesh position={[1, 2, -1]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
        <meshStandardMaterial 
          color="#00FFFF" 
          transparent 
          opacity={0.6}
          emissive="#00FFFF"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      <mesh position={[-1, -2, -1]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
        <meshStandardMaterial 
          color="#00FF00" 
          transparent 
          opacity={0.5}
          emissive="#00FF00"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Space debris */}
      <mesh position={[0.8, 1.8, -1.5]} rotation={[0, 0, 0.5]}>
        <dodecahedronGeometry args={[0.15]} />
        <meshStandardMaterial 
          color="#FF6600" 
          transparent 
          opacity={0.7}
          emissive="#FF6600"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      <mesh position={[-0.8, -1.8, -1.5]} rotation={[0, 0, -0.3]}>
        <dodecahedronGeometry args={[0.12]} />
        <meshStandardMaterial 
          color="#FF0066" 
          transparent 
          opacity={0.6}
          emissive="#FF0066"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Metroid-style energy spheres */}
      <Sphere position={[2.5, 0, -4]} args={[0.2, 16, 16]}>
        <meshStandardMaterial 
          color="#00FFFF" 
          transparent 
          opacity={0.8}
          emissive="#00FFFF"
          emissiveIntensity={0.6}
        />
      </Sphere>
      
      <Sphere position={[-2.5, 0, -4]} args={[0.15, 16, 16]}>
        <meshStandardMaterial 
          color="#00FF00" 
          transparent 
          opacity={0.7}
          emissive="#00FF00"
          emissiveIntensity={0.5}
        />
      </Sphere>
      
      {/* Space platform */}
      <Box position={[0, -2.5, -3]} args={[3, 0.1, 1.5]} rotation={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#404040" 
          transparent 
          opacity={0.6}
          emissive="#404040"
          emissiveIntensity={0.1}
        />
      </Box>
    </group>
  );
}

// Interactive space energy core
function MouseFollower() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = (mouse.x * viewport.width) / 2;
      meshRef.current.position.y = (mouse.y * viewport.height) / 2;
      meshRef.current.rotation.x = mouse.y * 0.5;
      meshRef.current.rotation.y = mouse.x * 0.5;
      meshRef.current.rotation.z += 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <octahedronGeometry args={[0.5]} />
      <meshStandardMaterial 
        color="#00FFFF" 
        transparent 
        opacity={0.9}
        emissive="#00FFFF"
        emissiveIntensity={0.6}
        wireframe={false}
      />
    </mesh>
  );
}

// Main 3D Scene Component
export default function ThreeScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Space-themed Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} color="#00FFFF" intensity={1.2} />
        <pointLight position={[10, -10, -5]} color="#00FF00" intensity={0.8} />
        <pointLight position={[0, 10, -5]} color="#FF00FF" intensity={0.6} />
        <pointLight position={[0, 0, 5]} color="#FFFFFF" intensity={0.4} />

        {/* 3D Elements */}
        <FloatingParticles count={50} />
        <FloatingShapes />
        <MouseFollower />

        {/* Subtle orbit controls for interaction */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
