"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  // Loader is fully deterministic. It plays its odometer for 2.5s.
  // Then we wait 500ms on '100'. Then it triggers exit.
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(); // Tells PreloaderWrapper to unmount us!
    }, 3000); 
    return () => clearTimeout(timer);
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

      {/* Animated Counter (Moving Bottom to Top dynamically) */}
      {/* The TrueKind Odometer Engine logic re-styled for Richard Ekwonye */}
      <motion.div 
        initial={{ top: "100%", y: "-100%" }} 
        animate={{ top: "0%", y: "0%" }}
        transition={{ duration: 2.5, ease: [0.33, 1, 0.68, 1] }}
        className="absolute right-0 px-6 sm:px-8 md:px-12 py-6 sm:py-8 md:py-12 flex items-start text-white text-5xl sm:text-7xl md:text-[8vw] font-medium tracking-tighter will-change-transform"
        style={{ lineHeight: '1em' }}
      >
        {/* Hundreds (0-1) */}
        <div className="relative overflow-hidden w-[0.6em] h-[1em]">
          <motion.div
            initial={{ y: "0em" }}
            animate={{ y: "-1em" }}
            transition={{ duration: 2.5, ease: [0.33, 1, 0.68, 1] }}
            className="absolute top-0 left-0 w-full flex flex-col will-change-transform"
          >
            {/* The first digit '0' is completely transparent, meaning we only see '  0' to '100' instead of '000' to '100'. */}
            <span className="h-[1em] w-full flex justify-center items-center text-transparent">0</span> 
            <span className="h-[1em] w-full flex justify-center items-center">1</span>
          </motion.div>
        </div>

        {/* Tens (0-10) */}
        <div className="relative overflow-hidden w-[0.6em] h-[1em]">
          <motion.div
            initial={{ y: "0em" }}
            animate={{ y: "-10em" }}
            transition={{ duration: 2.5, ease: [0.33, 1, 0.68, 1] }}
            className="absolute top-0 left-0 w-full flex flex-col will-change-transform"
          >
            {Array.from({ length: 11 }, (_, i) => (
              <span key={i} className={`h-[1em] w-full flex justify-center items-center ${i === 0 ? "text-transparent" : "text-white"}`}>
                {i % 10}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Units (0-100) */}
        <div className="relative overflow-hidden w-[0.6em] h-[1em]">
          <motion.div
            initial={{ y: "0em" }}
            animate={{ y: "-100em" }}
            transition={{ duration: 2.5, ease: [0.33, 1, 0.68, 1] }}
            className="absolute top-0 left-0 w-full flex flex-col will-change-transform"
          >
            {Array.from({ length: 101 }, (_, i) => (
              <span key={i} className="h-[1em] w-full flex justify-center items-center">
                {i % 10}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
