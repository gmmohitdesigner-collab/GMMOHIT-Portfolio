"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  
  // Format to pad leading spaces like '  0', ' 67', '100' exactly matching Richard Ekwonye layout
  const formatted = useTransform(rounded, (latest) => {
    if (latest < 10) return `  ${latest}`;
    if (latest < 100) return ` ${latest}`;
    return `${latest}`;
  });

  // Start the pure numerical counter on mount
  useEffect(() => {
    // 4 pause points synchronized exactly by times array
    const controls = animate(count, [0, 14, 14, 38, 38, 65, 65, 89, 89, 100], { 
      duration: 3.0, 
      times: [0, 0.12, 0.20, 0.32, 0.40, 0.58, 0.66, 0.82, 0.88, 1],
      ease: "easeInOut" 
    });
    
    // Hold at 100 for a crisp 300ms, then trigger the upward shutter exit natively
    const timer = setTimeout(() => {
      onComplete(); 
    }, 3300); 
    
    return () => {
      controls.stop();
      clearTimeout(timer);
    };
  }, [count, onComplete]);

  return (
    <motion.div
      key="preloader"
      initial={{ y: "0%" }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} 
      className="fixed inset-0 z-[9999] pointer-events-auto bg-[#000000] font-sans text-white overflow-hidden"
    >
      {/* Top Left Branding */}
      <div className="absolute top-0 left-0 p-6 sm:p-8 md:p-12 flex flex-col text-[10px] sm:text-xs md:text-sm tracking-widest font-medium leading-relaxed uppercase">
        <div className="text-white">GM MOHIT</div>
        <div className="text-white/60">PORTFOLIO &copy;2026</div>
      </div>

      {/* Animated Counter (Moving Bottom to Top dynamically with pauses) */}
      <motion.div 
        initial={{ top: "100%", y: "-100%" }} 
        animate={{ 
          top: ["100%", "86%", "86%", "62%", "62%", "35%", "35%", "11%", "11%", "0%"],
          y: ["-100%", "-86%", "-86%", "-62%", "-62%", "-35%", "-35%", "-11%", "-11%", "0%"]
        }}
        transition={{ 
          duration: 3.0,
          times: [0, 0.12, 0.20, 0.32, 0.40, 0.58, 0.66, 0.82, 0.88, 1],
          ease: "easeInOut"
        }}
        className="absolute right-0 px-6 sm:px-8 md:px-12 py-6 sm:py-8 md:py-12 flex items-start text-white text-5xl sm:text-7xl md:text-[8vw] font-medium tracking-tighter will-change-transform"
        style={{ lineHeight: '1em' }}
      >
        <motion.span className="whitespace-pre">
          {formatted}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
