"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  // No need for useMotionValue anymore, we fall back to hardware-accelerated static CSS strips
  // The transition logic is entirely mapped geometrically.
  
  useEffect(() => {
    // Hold at 100 for a crisp 300ms (over 5s total animation), then trigger the upward shutter exit natively
    const timer = setTimeout(() => {
      onComplete(); 
    }, 5300); 
    
    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);

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

      {/* Animated Counter (Smooth Slider without Scrambling) */}
      <motion.div 
        initial={{ top: "100%", y: "-100%" }} 
        animate={{ 
          top: ["100%", "100%", "98%", "98%", "66%", "66%", "32%", "32%", "0%"],
          y:   ["-100%", "-100%", "-98%", "-98%", "-66%", "-66%", "-32%", "-32%", "0%"]
        }}
        transition={{ 
          duration: 5.0,
          times: [0.0, 0.04, 0.20, 0.30, 0.44, 0.54, 0.66, 0.78, 1.0],
          ease: Array(8).fill([0.65, 0, 0.35, 1])
        }}
        className="absolute right-0 px-6 sm:px-8 md:px-12 py-6 sm:py-8 md:py-12 flex items-start text-white text-5xl sm:text-7xl md:text-[8vw] font-medium tracking-tighter will-change-transform"
      >
        {/* The 1em mask for the specifically curated odometer tape */}
        <div className="relative overflow-hidden" style={{ height: '1em', lineHeight: '1em' }}>
          <motion.div 
            animate={{ 
              y: ["1em", "0em", "-1em", "-1em", "-2em", "-2em", "-3em", "-3em", "-4em"] 
            }}
            transition={{
              duration: 5.0,
              times: [0.0, 0.04, 0.20, 0.30, 0.44, 0.54, 0.66, 0.78, 1.0],
              ease: Array(8).fill([0.65, 0, 0.35, 1])
            }}
            className="flex flex-col items-center relative will-change-transform"
          >
            {/* Direct transition strip mapping: no intermediate scrambling noise */}
            {[" 00", " 02", " 34", " 68", "100"].map((digit, i) => (
              <span key={i} className="whitespace-pre flex justify-center items-center h-[1em]">
                {digit}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
