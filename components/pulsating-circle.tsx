'use client'

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const PulsatingCircle = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return (
      <div className="relative w-2 h-2">
        <div className="absolute rounded-full bg-green-300" style={{ 
          width: "100%", 
          height: "100%" 
        }} />
      </div>
    );
  }
  
  return (
    <div className="relative w-2 h-2">
      <motion.div
        className="absolute rounded-full bg-green-400"
        style={{
          left: '-100%',
          top: '-100%',
          width: '300%',
          height: '300%'
        }}
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0, 0]
        }}
        transition={{
          duration: 2.5,
          ease: [0.215, 0.61, 0.355, 1],
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
      <motion.div
        className="absolute w-full h-full rounded-full bg-green-300"
        animate={{
          scale: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 2.5,
          ease: [0.455, 0.03, 0.515, 0.955],
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
    </div>
  );
};