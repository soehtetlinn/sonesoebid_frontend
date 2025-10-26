import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sphere, Box, Torus } from '@react-three/drei';
import { motion } from 'framer-motion';
import AnimatedPlanets from './AnimatedPlanets';

// Metroid-inspired space shapes
function AnimatedShapes() {
  return (
    <>
      {/* Central energy core */}
      <Sphere position={[0, 0, 0]} args={[0.8, 32, 32]}>
        <meshStandardMaterial 
          color="#00FFFF" 
          emissive="#00FFFF"
          emissiveIntensity={0.6}
        />
      </Sphere>
      
      {/* Energy rings */}
      <Torus position={[0, 0, 0]} args={[1.2, 0.05, 16, 32]} rotation={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#00FFFF" 
          emissive="#00FFFF"
          emissiveIntensity={0.4}
        />
      </Torus>
      
      {/* Space station module */}
      <Box position={[2, 0, 0]} args={[0.6, 0.3, 0.3]} rotation={[0, 0.5, 0]}>
        <meshStandardMaterial 
          color="#C0C0C0" 
          emissive="#C0C0C0"
          emissiveIntensity={0.2}
        />
      </Box>
      
      {/* Energy conduit */}
      <mesh position={[-2, 0, 0]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
        <meshStandardMaterial 
          color="#00FF00" 
          emissive="#00FF00"
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Energy crystal */}
      <mesh position={[0, 1.5, 0]} rotation={[0.5, 0.5, 0]}>
        <octahedronGeometry args={[0.4]} />
        <meshStandardMaterial 
          color="#FF00FF" 
          emissive="#FF00FF"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Space debris */}
      <mesh position={[-1, -1, 0]} rotation={[0, 0, 0.5]}>
        <dodecahedronGeometry args={[0.2]} />
        <meshStandardMaterial 
          color="#FF6600" 
          emissive="#FF6600"
          emissiveIntensity={0.3}
        />
      </mesh>
    </>
  );
}

// Simple 3D Hero Component
export default function SimpleThreeHero() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
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
    </div>
  );
}
