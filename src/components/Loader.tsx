"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'counting' | 'narrative'>('counting');

  // Time exactly the hardware-accelerated CSS odometer and ring finish (2500ms).
  // Leave a 500ms pause after they hit 100% (total 3000ms), then switch to narrative.
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('narrative');
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);

  // Hold the branding text in view for 1.2s before unshuttering natively
  useEffect(() => {
    if (phase === 'narrative') {
      const timer = setTimeout(() => {
        onComplete();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  const showNarrative = phase === 'narrative';

  return (
    <motion.div
      key="preloader"
      className="fixed inset-0 z-[9999] pointer-events-auto font-serif"
    >
      {/* 
        LEFT PANEL 
        Starts left-0, bounds left 50%.
        `calc(50vw + 1px)` actively fixes the sub-pixel "gap seam" bug exactly.
      */}
      <motion.div
        initial={{ x: "0%" }}
        exit={{ x: "-100%" }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }} 
        className="absolute left-0 top-0 w-[calc(50vw+1px)] h-full bg-[#212121] z-10 origin-left overflow-hidden will-change-transform"
      >
        <AnimatePresence>
          {showNarrative && (
             <motion.div 
               initial={{ y: "150%", opacity: 0 }}
               animate={{ y: "-50%", opacity: 1 }}
               transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
               className="absolute top-1/2 right-0 pr-[3vw] lg:pr-[2vw] text-white font-monument text-3xl sm:text-5xl md:text-7xl lg:text-[8vw] uppercase leading-none tracking-wider pointer-events-none whitespace-nowrap"
             >
               GM
             </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 
        RIGHT PANEL 
        Starts right-0, bounds right 50%.
      */}
      <motion.div
        initial={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        className="absolute right-0 top-0 w-[50vw] h-full bg-[#212121] z-10 origin-right overflow-hidden will-change-transform"
      >
        <AnimatePresence>
          {showNarrative && (
             <motion.div 
               initial={{ y: "150%", opacity: 0 }}
               animate={{ y: "-50%", opacity: 1 }}
               transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
               className="absolute top-1/2 left-0 pl-[3vw] lg:pl-[2vw] text-white font-monument text-3xl sm:text-5xl md:text-7xl lg:text-[8vw] uppercase leading-none tracking-wider pointer-events-none whitespace-nowrap"
             >
                MOHIT
             </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 
        PURE CSS ODOMETER & RING OVERLAY 
      */}
      <AnimatePresence>
        {phase === 'counting' && (
          <motion.div 
            exit={{ y: "-50%", opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
          >
            {/* The TrueKind Odometer Engine: Uses raw Y-axis transformations of pre-rendered digits rather than React state tracking. Guarantees 0 frame drops and physics-perfect sliding. */}
            <div 
              className="flex items-center text-white text-[35vw] sm:text-[30vw] md:text-[25vw] italic font-light tracking-tighter"
              style={{ lineHeight: '1em', height: '1em' }}
            >
              {/* Tens (0-9) */}
              {/* Invisible leading zero ensures the 2-digit box maintains exact stable width before 10. */}
              <div className="relative overflow-hidden w-[0.6em] h-[1em]">
                <motion.div
                  initial={{ y: "0em" }}
                  animate={{ y: "-9em" }}
                  transition={{ duration: 2.5, ease: [0.33, 1, 0.68, 1] }}
                  className="absolute top-0 left-0 w-full flex flex-col will-change-transform"
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <span key={i} className={`h-[1em] w-full flex justify-center items-center ${i === 0 ? "text-transparent" : "text-white"}`}>
                      {i % 10}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Units (0-99) */}
              <div className="relative overflow-hidden w-[0.6em] h-[1em]">
                <motion.div
                  initial={{ y: "0em" }}
                  animate={{ y: "-99em" }}
                  transition={{ duration: 2.5, ease: [0.33, 1, 0.68, 1] }}
                  className="absolute top-0 left-0 w-full flex flex-col will-change-transform"
                >
                  {Array.from({ length: 100 }, (_, i) => (
                    <span key={i} className="h-[1em] w-full flex justify-center items-center">
                      {i % 10}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Perfect SVG Progress Ring synchronization */}
            <div className="absolute bottom-12 md:bottom-20">
               <svg width="40" height="40" viewBox="0 0 100 100" className="transform -rotate-90">
                 <circle
                   cx="50" cy="50" r="45"
                   stroke="rgba(255,255,255,0.15)"
                   strokeWidth="3"
                   fill="transparent"
                 />
                 <motion.circle
                   cx="50" cy="50" r="45"
                   stroke="#ffffff"
                   strokeWidth="3"
                   fill="transparent"
                   strokeDasharray="283"
                   initial={{ strokeDashoffset: 283 }}
                   animate={{ strokeDashoffset: 0 }}
                   transition={{ duration: 2.5, ease: [0.33, 1, 0.68, 1] }}
                   className="will-change-transform"
                 />
               </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
