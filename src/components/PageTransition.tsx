"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { useTransition } from "@/context/TransitionContext";

const NUM_ROWS = 5;
const DURATION = 0.7;
const STAGGER = 0.08;
// GSAP's "power4.inOut" is easeInOutQuart; its cubic-bezier is [0.76, 0, 0.24, 1]
// -- the same curve already used in HeroSection and Loader, so the transition
// keeps the identical feel it had under GSAP.
const EASE = [0.76, 0, 0.24, 1] as const;
// The last row is the one that finishes last (0.7 + 4 x 0.08 = 1.02s), which is
// when the old GSAP timeline's onComplete fired. Only that row reports.
const LAST_ROW = NUM_ROWS - 1;

// TransitionState has five members. COVERED and ROUTING are the window where the
// screen is fully masked and the route swaps underneath -- nothing moves, but they
// are declared explicitly so an unmatched variant label can never leave the rows
// in an arbitrary position.
const HOLD = { duration: 0 } as const;

const rowVariants: Variants = {
  // Instant reset while the overlay is hidden, so the next transition starts clean.
  IDLE: { x: "-100%", transition: HOLD },
  ENTERING: (i: number) => ({
    x: "0%",
    transition: { duration: DURATION, ease: EASE, delay: i * STAGGER },
  }),
  COVERED: { x: "0%", transition: HOLD },
  ROUTING: { x: "0%", transition: HOLD },
  EXITING: (i: number) => ({
    x: "100%",
    transition: { duration: DURATION, ease: EASE, delay: i * STAGGER },
  }),
};

const textVariants: Variants = {
  IDLE: { y: "100%", transition: HOLD },
  // 0.16s offset lines the type up with the middle row, as in the original.
  ENTERING: { y: "0%", transition: { duration: DURATION, ease: EASE, delay: 0.16 } },
  COVERED: { y: "0%", transition: HOLD },
  ROUTING: { y: "0%", transition: HOLD },
  EXITING: { y: "-100%", transition: { duration: DURATION, ease: EASE, delay: 0.16 } },
};

export default function PageTransition() {
  const { transitionState, transitionTitle, reportCovered, reportExited } = useTransition();

  const isVisible = transitionState !== "IDLE";

  // Drives the navigation state machine. Gated on transitionState so the instant
  // IDLE reset -- which also completes -- never reports a phase that didn't run.
  const handleRowComplete = (i: number) => {
    if (i !== LAST_ROW) return;
    if (transitionState === "ENTERING") reportCovered();
    else if (transitionState === "EXITING") reportExited();
  };

  return (
    <div
      className="fixed inset-0 z-[99999] pointer-events-none flex flex-col"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      {/* The 5 Rows */}
      {[...Array(NUM_ROWS)].map((_, i) => (
        <motion.div
          key={`row-${i}`}
          custom={i}
          variants={rowVariants}
          initial="IDLE"
          animate={transitionState}
          onAnimationComplete={() => handleRowComplete(i)}
          className="w-full bg-[#E8E3DA] pointer-events-auto"
          style={{ height: `${100 / NUM_ROWS}vh` }}
        />
      ))}

      {/* The Brand Loader Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[50]">
        <div className="overflow-hidden">
          {/* Not a heading: this is transition chrome. As an <h2> it rendered
              before every page's real <h1>, breaking the document outline on
              all four routes. aria-hidden keeps it out of the a11y tree too. */}
          <motion.div
            aria-hidden="true"
            variants={textVariants}
            initial="IDLE"
            animate={transitionState}
            className="text-[#1a1512] text-4xl md:text-6xl tracking-[0.2em] font-serif"
          >
            {transitionTitle || "GMMOHIT"}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
