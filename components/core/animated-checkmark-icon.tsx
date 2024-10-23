"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedCheckIconProps {
  initial?: boolean;
  isVisible: boolean;
  className?: string;
  delay?: number;
}

export function AnimatedCheckIcon({
  initial = true,
  isVisible,
  className,
  delay,
}: AnimatedCheckIconProps) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <div ref={ref}>
      <AnimatePresence initial={initial}>
        {isInView && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className={className}
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              exit={{ pathLength: 0 }}
              transition={{
                type: "tween",
                duration: 0.3,
                ease: isVisible ? "easeOut" : "easeIn",
                delay,
              }}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        )}
      </AnimatePresence>
    </div>
  );
}
