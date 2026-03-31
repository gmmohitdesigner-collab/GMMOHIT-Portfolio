"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function OdometerDigit({ value }: { value: number }) {
  return (
    <div 
      className="relative overflow-hidden h-[1.2em] w-[0.65em] inline-flex justify-center items-center align-middle"
      style={{ lineHeight: 1.2 }}
    >
      <AnimatePresence>
        <motion.span
          key={value}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="absolute inset-0 flex justify-center items-center pointer-events-none"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'counting' | 'narrative'>('counting');

  useEffect(() => {
    let startTime: number;
    const duration = 2500; // Counter sequence duration

    const updateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      const t = Math.min(elapsed / duration, 1);
      // Custom ease to slow down near the end
      const easedT = t === 1 ? 1 : 1 - Math.pow(2, -8 * t);
      
      setProgress(Math.floor(easedT * 100));

      if (t < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => setPhase('narrative'), 400); // Brief pause on 100
      }
    };

    if (phase === 'counting') {
      requestAnimationFrame(updateProgress);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'narrative') {
      // Hold narrative on screen for 1.2 seconds, then trigger the un-shutter exit
      const timer = setTimeout(() => {
        onComplete();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  const hundreds = Math.floor(progress / 100);
  const tens = Math.floor((progress % 100) / 10);
  const units = progress % 10;

  const isCounting = phase === 'counting';
  const showNarrative = phase === 'narrative';

  return (
    <motion.div
      key="preloader"
      className="fixed inset-0 z-[9999] pointer-events-auto"
    >
      {/* 
        TOP PANEL 
        Starts top-0, bounds top 50% of the screen.
      */}
      <motion.div
        initial={{ y: "0%" }}
        exit={{ y: "-100%" }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 w-full h-1/2 bg-[#3F352C] z-10 origin-top overflow-hidden will-change-transform"
      >
        <AnimatePresence>
          {showNarrative && (
             <motion.div 
               initial={{ opacity: 0, filter: "blur(4px)" }}
               animate={{ opacity: 1, filter: "blur(0px)" }}
               transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
               // Translate Y by 50% so the exact horizontal middle of word aligns with the panel split cut line
               className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full flex justify-center items-center text-[#fcf5ee] font-monument text-4xl sm:text-6xl md:text-8xl lg:text-[10vw] uppercase leading-none tracking-wider pointer-events-none whitespace-nowrap"
             >
               GM MOHIT
             </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 
        BOTTOM PANEL 
        Starts bottom-0, bounds bottom 50% of the screen.
      */}
      <motion.div
        initial={{ y: "0%" }}
        exit={{ y: "100%" }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 w-full h-1/2 bg-[#3F352C] z-10 origin-bottom overflow-hidden will-change-transform"
      >
        <AnimatePresence>
          {showNarrative && (
             <motion.div 
               initial={{ opacity: 0, filter: "blur(4px)" }}
               animate={{ opacity: 1, filter: "blur(0px)" }}
               transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
               // Translate Y by -50% to mirror the top panel entirely
               className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center text-[#fcf5ee] font-monument text-4xl sm:text-6xl md:text-8xl lg:text-[10vw] uppercase leading-none tracking-wider pointer-events-none whitespace-nowrap"
             >
                GM MOHIT
             </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 
        COUNTER & PROGRESS RING (floating above everything, z-20)
      */}
      <AnimatePresence>
        {isCounting && (
          <motion.div 
            exit={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
          >
            {/* Odometer Counter */}
            <div className="font-circular text-white text-7xl md:text-9xl tracking-tighter" style={{ fontWeight: 450 }}>
              {progress >= 100 && (
                <OdometerDigit value={hundreds} />
              )}
              {(progress >= 10) && (
                <OdometerDigit value={tens} />
              )}
              <OdometerDigit value={units} />
            </div>

            {/* Circular Progress Ring at Bottom Center */}
            <div className="absolute bottom-8 md:bottom-16">
               <svg width="40" height="40" viewBox="0 0 100 100" className="transform -rotate-90">
                 {/* Background Track */}
                 <circle
                   cx="50" cy="50" r="45"
                   stroke="rgba(255,255,255,0.15)"
                   strokeWidth="2"
                   fill="transparent"
                 />
                 {/* Progress Fill */}
                 <circle
                   cx="50" cy="50" r="45"
                   stroke="#ffffff"
                   strokeWidth="2"
                   fill="transparent"
                   strokeDasharray="283"
                   strokeDashoffset={283 - (283 * progress) / 100}
                   className="transition-all duration-75 ease-linear will-change-transform"
                 />
               </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
