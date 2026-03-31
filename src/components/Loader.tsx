"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 2500; // Total loading duration

    const updateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Calculate linear time progress 0 to 1
      const t = Math.min(elapsed / duration, 1);
      
      // Apply easeOutExpo for premium counting feel (fast start, slow end)
      const easedT = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      
      setProgress(Math.floor(easedT * 100));

      if (t < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        // Hold at 100% for a brief moment before triggering exit
        setTimeout(onComplete, 300);
      }
    };

    requestAnimationFrame(updateProgress);
  }, [onComplete]);

  // Framer motion variants for the text stagger reveal
  const text = "GM MOHIT";
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2, // Small pause before text starts sliding up
      },
    },
  };

  const itemVariants = {
    hidden: { y: "110%" },
    show: {
      y: "0%",
      transition: {
        duration: 1.2,
        ease: [0.33, 1, 0.68, 1] as const, // Heavy and intentional easing per user request
      },
    },
  };

  return (
    <motion.div
      key="preloader"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-auto"
      // Wait for exit to be triggered by AnimatePresence
    >
      {/* 
        The "Un-shutter" Split Background 
        Top panel moves up, Bottom panel moves down upon exit.
      */}
      <motion.div
        initial={{ y: "0%" }}
        exit={{ y: "-100%" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 w-full h-1/2 bg-brand-bg z-0 origin-top will-change-transform"
      />
      <motion.div
        initial={{ y: "0%" }}
        exit={{ y: "100%" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 w-full h-1/2 bg-brand-bg z-0 origin-bottom will-change-transform"
      />

      {/* Counter */}
      <motion.div
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-8 right-8 z-10 font-circular text-3xl md:text-5xl text-brand-text font-medium"
      >
        {progress}%
      </motion.div>

      {/* Main Text Content */}
      <motion.div
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="relative z-10 flex gap-[2vw] md:gap-4 overflow-hidden"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex gap-4 md:gap-8 text-4xl sm:text-6xl md:text-8xl lg:text-[10vw] font-monument text-brand-text uppercase leading-none tracking-wider"
        >
          {words.map((word, wordIndex) => (
            <div key={wordIndex} className="flex overflow-hidden pb-2 md:pb-4">
              {word.split("").map((char, charIndex) => (
                <motion.div
                  key={charIndex}
                  variants={itemVariants}
                  className="inline-block relative will-change-transform"
                >
                  {char}
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Shimmer Effect overlay: passes over the text after completely revealed */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ 
            delay: 1.5, // starts right after text finishes dropping in
            duration: 1.5, 
            ease: "easeInOut" 
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fcf5ee]/70 to-transparent pointer-events-none mix-blend-screen w-[50%] will-change-transform"
        />
      </motion.div>
    </motion.div>
  );
}
