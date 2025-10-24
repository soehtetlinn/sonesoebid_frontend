import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Torus } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// 3D Logo/Text Component
function FloatingLogo() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
      groupRef.current.rotation.y += 0.01;
      
      // Mouse interaction
      groupRef.current.position.x = mouse.x * 0.5;
      groupRef.current.position.z = mouse.y * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Create "SHL" using basic shapes */}
      <group>
        {/* S shape using torus */}
        <Torus position={[-1.5, 0, 0]} args={[0.3, 0.1, 8, 16]}>
          <meshStandardMaterial 
            color="#20B2AA" 
            transparent 
            opacity={0.9}
            emissive="#20B2AA"
            emissiveIntensity={0.3}
          />
        </Torus>
        
        {/* H shape using boxes */}
        <Box position={[-0.5, 0, 0]} args={[0.1, 0.6, 0.1]}>
          <meshStandardMaterial 
            color="#20B2AA" 
            transparent 
            opacity={0.9}
            emissive="#20B2AA"
            emissiveIntensity={0.3}
          />
        </Box>
        <Box position={[-0.3, 0, 0]} args={[0.1, 0.6, 0.1]}>
          <meshStandardMaterial 
            color="#20B2AA" 
            transparent 
            opacity={0.9}
            emissive="#20B2AA"
            emissiveIntensity={0.3}
          />
        </Box>
        <Box position={[-0.4, 0, 0]} args={[0.3, 0.1, 0.1]}>
          <meshStandardMaterial 
            color="#20B2AA" 
            transparent 
            opacity={0.9}
            emissive="#20B2AA"
            emissiveIntensity={0.3}
          />
        </Box>
        
        {/* L shape using boxes */}
        <Box position={[0.2, 0, 0]} args={[0.1, 0.6, 0.1]}>
          <meshStandardMaterial 
            color="#20B2AA" 
            transparent 
            opacity={0.9}
            emissive="#20B2AA"
            emissiveIntensity={0.3}
          />
        </Box>
        <Box position={[0.4, -0.25, 0]} args={[0.3, 0.1, 0.1]}>
          <meshStandardMaterial 
            color="#20B2AA" 
            transparent 
            opacity={0.9}
            emissive="#20B2AA"
            emissiveIntensity={0.3}
          />
        </Box>
      </group>
    </group>
  );
}

// Animated geometric shapes
function AnimatedShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x = mouse.y * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central rotating shapes */}
      <Sphere position={[0, 0, -2]} args={[0.3, 32, 32]}>
        <meshStandardMaterial 
          color="#20B2AA" 
          transparent 
          opacity={0.6}
          emissive="#20B2AA"
          emissiveIntensity={0.2}
        />
      </Sphere>
      
      <Box position={[1, 0, -1]} args={[0.2, 0.2, 0.2]}>
        <meshStandardMaterial 
          color="#4A90E2" 
          transparent 
          opacity={0.7}
        />
      </Box>
      
      <Torus position={[-1, 0, -1]} args={[0.2, 0.1, 16, 32]}>
        <meshStandardMaterial 
          color="#7B68EE" 
          transparent 
          opacity={0.6}
        />
      </Torus>
    </group>
  );
}

// Particle system for background - optimized
function BackgroundParticles() {
  const points = useRef<THREE.Points>(null);
  const particleCount = 100;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y += 0.001;
      points.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.02} 
        color="#20B2AA" 
        transparent 
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Main 3D Hero Component
export default function ThreeHero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ background: 'transparent' }}
          gl={{ antialias: true, alpha: true }}
        >
          {/* Lighting setup */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} color="#20B2AA" intensity={0.8} />
          <pointLight position={[10, -10, -5]} color="#4A90E2" intensity={0.6} />

          {/* 3D Elements */}
          <BackgroundParticles />
          <AnimatedShapes />
          {isLoaded && <FloatingLogo />}

          {/* Subtle camera movement */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate 
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 2.2}
          />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div 
          className="text-center max-w-4xl mx-auto px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-extrabold mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <span className="bg-gradient-to-r from-brand-teal via-blue-500 to-purple-600 bg-clip-text text-transparent">
              SHL Hub
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            The future of marketplace trading is here. Buy, sell, and discover amazing products in a revolutionary 3D experience.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-brand-teal to-teal-600 text-white font-semibold rounded-full text-lg hover:from-teal-600 hover:to-brand-teal transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Marketplace
            </motion.button>
            
            <motion.button
              className="px-8 py-4 border-2 border-brand-teal text-brand-teal font-semibold rounded-full text-lg hover:bg-brand-teal hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-brand-teal rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-brand-teal rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
