"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";

interface CarouselProps {
  images: string[];
  className?: string;
}

const AUTO_DELAY = 5000; // 5 seconds
const DRAG_BUFFER = 50;
const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

export function ImageCarousel({ images, className = "" }: CarouselProps) {
  const [imgIndex, setImgIndex] = useState(0);
  const dragX = useMotionValue(0);

  // Auto-play functionality
  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();
      if (x === 0) {
        setImgIndex((pv) => {
          if (pv === images.length - 1) {
            return 0;
          }
          return pv + 1;
        });
      }
    }, AUTO_DELAY);
    return () => clearInterval(intervalRef);
  }, [dragX, images.length]);

  const onDragEnd = () => {
    const x = dragX.get();
    if (x <= -DRAG_BUFFER && imgIndex < images.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing"
      >
        {images.map((imgSrc, idx) => (
          <motion.div
            key={idx}
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            animate={{
              scale: imgIndex === idx ? 0.95 : 0.85,
            }}
            transition={SPRING_OPTIONS}
            className="aspect-square w-full shrink-0 rounded-xl bg-zinc-700 object-cover"
          />
        ))}
      </motion.div>

      {/* Navigation Dots */}
      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`h-2 w-2 rounded-full transition-colors ${
              idx === imgIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
