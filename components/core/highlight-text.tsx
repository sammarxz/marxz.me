"use client";

import { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface HighlightTextProps {
  children: ReactNode;
  delay?: number;
}

export const HighlightText: FC<HighlightTextProps> = ({
  delay = 0,
  children,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "-100px 0px",
  });

  return (
    <motion.span
      ref={ref}
      initial={{ backgroundSize: "0% 100%" }}
      animate={
        inView
          ? {
              backgroundSize: "100% 100%",
              transition: {
                delay,
              },
            }
          : {}
      }
      transition={{
        duration: 0.6,
        ease: "easeInOut",
        transition: {
          delay,
        },
      }}
      className={`text-highlight ${inView ? "active" : ""}`}
    >
      {children}
    </motion.span>
  );
};
