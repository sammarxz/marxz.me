"use client";

import React, { useRef, useState, forwardRef } from "react";
import { cn } from "@/lib/utils"; // Ensure you have this utility

interface InputSpotlightBorderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  spotlightColor?: string;
  containerClassName?: string;
  maskSize?: string;
  showSpotlight?: boolean;
}

export const InputSpotlightBorder = forwardRef<
  HTMLInputElement,
  InputSpotlightBorderProps
>(
  (
    {
      spotlightColor = "#8678F9",
      containerClassName,
      className,
      maskSize = "30%",
      showSpotlight = true,
      disabled,
      ...props
    },
    ref
  ) => {
    const divRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
      if (!divRef.current || isFocused || !showSpotlight) return;

      const div = divRef.current;
      const rect = div.getBoundingClientRect();

      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
      setIsFocused(true);
      setOpacity(1);
    };

    const handleBlur = () => {
      setIsFocused(false);
      setOpacity(0);
    };

    const handleMouseEnter = () => {
      if (!showSpotlight) return;
      setOpacity(1);
    };

    const handleMouseLeave = () => {
      if (!showSpotlight) return;
      setOpacity(0);
    };

    return (
      <div className={cn("relative w-full", containerClassName)}>
        <input
          ref={ref}
          onMouseMove={handleMouseMove}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          disabled={disabled}
          className={cn(
            "h-12 w-full cursor-default rounded-md border border-gray-800 bg-gray-950 p-3.5 text-gray-100 transition-colors duration-500 placeholder:select-none placeholder:text-gray-500 focus:border-[#8678F9] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        {showSpotlight && (
          <input
            ref={divRef}
            disabled
            style={{
              border: `1px solid ${spotlightColor}`,
              opacity,
              WebkitMaskImage: `radial-gradient(${maskSize} 30px at ${position.x}px ${position.y}px, black 45%, transparent)`,
            }}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-10 h-12 w-full cursor-default rounded-md border bg-[transparent] p-3.5 opacity-0 transition-opacity duration-500 placeholder:select-none"
          />
        )}
      </div>
    );
  }
);

InputSpotlightBorder.displayName = "InputSpotlightBorder";
