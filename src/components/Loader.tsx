"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function OdometerDigit({ value }: { value: number }) {
  return (
    <div 
      className="relative overflow-hidden h-[1em] w-[0.6em] inline-flex justify-center items-center align-middle"
    >
      <AnimatePresence>
        <motion.span
          key={value}
          initial={{ y: "80%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-80%", opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0 flex justify-center items-center pointer-events-none"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// Fast odometer for units, removes opacity to prevent rendering artifacts/ghosting
function FastOdometerDigit({ value }: { value: number }) {
  return (
    <div 
      className="relative overflow-hidden h-[1em] w-[0.6em] inline-flex justify-center items-center align-middle"
    >
      <AnimatePresence>
        <motion.span
          key={value}
          initial={{ y: "80%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-80%" }}
          transition={{ duration: 0.08, ease: "linear" }}
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
        // Tightened pause to "melt" transition into Phase 2
        setTimeout(() => setPhase('narrative'), 100); 
      }
    };

    if (phase === 'counting') {
      requestAnimationFrame(updateProgress);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'narrative') {
      // Hold narrative briefly then split!
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
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
        Starts top-0, bounds top 50% + 1px to eliminate render seam bugs.
      */}
      <motion.div
        initial={{ y: "0%" }}
        exit={{ y: "-100%" }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 w-full h-[calc(50%+1px)] bg-[#3F352C] z-10 origin-top overflow-hidden will-change-transform"
      >
        <AnimatePresence>
          {showNarrative && (
             <motion.div 
               initial={{ opacity: 0, filter: "blur(4px)", scale: 0.95 }}
               animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
               transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
               // Offset to exact pixel-split
               className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full flex justify-center items-center text-[#fcf5ee] font-monument text-3xl sm:text-5xl md:text-7xl lg:text-[8vw] uppercase leading-none tracking-wider pointer-events-none whitespace-nowrap"
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
               initial={{ opacity: 0, filter: "blur(4px)", scale: 0.95 }}
               animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
               transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
               // Mirror Offset
               className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center text-[#fcf5ee] font-monument text-3xl sm:text-5xl md:text-7xl lg:text-[8vw] uppercase leading-none tracking-wider pointer-events-none whitespace-nowrap"
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
            exit={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
          >
            {/* Massive Editorial Odometer Counter */}
            <div 
              className="font-serif italic text-white text-[30vw] md:text-[25vw] flex tracking-tighter" 
              style={{ fontWeight: 300, lineHeight: 1 }}
            >
              {progress >= 100 && (
                <OdometerDigit value={hundreds} />
              )}
              {(progress >= 10) && (
                <OdometerDigit value={tens} />
              )}
              <FastOdometerDigit value={units} />
            </div>

            {/* Circular Progress Ring at Bottom Center */}
            <div className="absolute bottom-12 md:bottom-20">
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
