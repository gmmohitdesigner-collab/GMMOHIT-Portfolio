"use client";

import React, { useRef } from "react";
import { useTransition } from "@/context/TransitionContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const NUM_ROWS = 5;

export default function PageTransition() {
  const { transitionState, transitionTitle, reportCovered, reportExited } = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (transitionState === "ENTERING") {
      // 1. Ensure container is visible
      gsap.set(containerRef.current, { autoAlpha: 1 });
      
      // 2. Set initial state of rows (off-screen to the left)
      gsap.set(rowsRef.current, { xPercent: -100 });
      gsap.set(textRef.current, { autoAlpha: 1 });

      // 3. Create the entrance timeline
      const tl = gsap.timeline({
        onComplete: reportCovered
      });

      // Staircase wipe across (left to right)
      tl.to(rowsRef.current, {
        xPercent: 0,
        duration: 0.7,
        ease: "power4.inOut",
        stagger: 0.08,
      }, 0) // Start at time 0
      
      // Mask reveal brand typography (slide up from bottom)
      // Matches the exact duration of a single row (0.7s) and starts with the middle row (0.16s)
      .fromTo(textRef.current,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.7,
          ease: "power4.inOut"
        }, 
        0.16 // Absolute position on timeline (starts with middle row)
      );

    } else if (transitionState === "EXITING") {
      // 4. Create the exit timeline
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(containerRef.current, { autoAlpha: 0 });
          reportExited();
        }
      });

      // Staircase wipe out to the right
      tl.to(rowsRef.current, {
        xPercent: 100,
        duration: 0.7,
        ease: "power4.inOut",
        stagger: 0.08,
      }, 0) // Start at time 0

      // Mask reveal out (slide up to top)
      // Matches the exact duration of a single row (0.7s) and starts with the middle row (0.16s)
      .to(textRef.current, {
        yPercent: -100,
        duration: 0.7,
        ease: "power4.inOut"
      }, 0.16); // Absolute position on timeline (starts with middle row)
    }

  }, [transitionState]);

  const isVisible = transitionState !== "IDLE";

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[99999] pointer-events-none flex flex-col"
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
      {/* The 5 Rows */}
      {[...Array(NUM_ROWS)].map((_, i) => (
        <div
          key={`row-${i}`}
          ref={(el) => { rowsRef.current[i] = el; }}
          className="w-full bg-[#E8E3DA] pointer-events-auto"
          style={{ height: `${100 / NUM_ROWS}vh` }}
        />
      ))}

      {/* The Brand Loader Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[50]">
        <div className="overflow-hidden">
          <h2 
            ref={textRef}
            className="text-[#1a1512] text-4xl md:text-6xl tracking-[0.2em] font-serif"
          >
            {transitionTitle || "GMMOHIT"}
          </h2>
        </div>
      </div>
    </div>
  );
}

