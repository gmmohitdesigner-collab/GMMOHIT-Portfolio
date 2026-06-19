"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTransition } from "@/context/TransitionContext";

export default function PageTransition() {
  const { isTransitioning } = useTransition();

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="transition-shutter"
          initial={{ top: "-100%" }}
          animate={{ top: "0%" }}
          exit={{ top: "100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-[#1C1C1C] pointer-events-auto flex items-center justify-center"
        >
          {/* Optional: Add a subtle loading spinner or logo here if desired */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
