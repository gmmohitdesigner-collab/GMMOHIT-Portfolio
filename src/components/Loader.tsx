"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

// Videos only. Images are deliberately absent: next/image already emits its own
// <link rel="preload" as="image" imageSrcSet> for anything marked priority, and
// it preloads the OPTIMIZED url. Warming the raw file here downloaded a second
// copy the page never displays -- 300 KB of raw JPEG next to the 27 KB WebP the
// browser actually uses.
const ROUTE_VIDEOS: Record<string, string[]> = {
  "/": ["/works/teaure/Teaure.mp4", "/works/creative-ants/CreativeAnts.mp4"],
  "/works/teaure": ["/works/teaure/teaure-scroll v2.mp4", "/assets/Showreel.mp4"],
  "/works/creative-ants": ["/works/creative-ants/CreativeAnts.mp4"],
};

// The odometer has five designed stops: 00 -> 02 -> 34 -> 68 -> 100, with the
// counter travelling bottom-right to top-right as it climbs.
const STOP_TOP = ["100%", "98%", "66%", "32%", "0%"];
const STOP_Y = ["-100%", "-98%", "-66%", "-32%", "0%"];
const STEP_EASE = [0.65, 0, 0.35, 1] as const;

// ponytail: MIN/MAX are the calibration knobs. MIN keeps the five-step
// choreography legible when assets come straight from cache (without it the
// counter snaps 0->100 and the whole sequence is lost). MAX guarantees nobody is
// ever trapped behind a stalled asset on a bad connection. Tune on real devices.
const MIN_MS = 2200;
const MAX_MS = 7000;
const HOLD_AT_100_MS = 300;

// Maps 0..1 progress onto the five odometer stops. Exported so the mapping can
// be asserted -- the failure mode here is silent and defeats the whole point:
// reaching stop 4 ("100") before loading is actually complete.
export function stepForProgress(progress: number): number {
  if (progress >= 1) return 4;
  if (progress <= 0) return 0;
  return Math.min(3, Math.floor(progress * 4));
}

function Tape({
  digits,
  step,
  delay = 0,
}: {
  digits: string[];
  step: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ y: "-4em" }}
      animate={{ y: `${step - 4}em` }}
      transition={{ duration: 0.45, ease: STEP_EASE, delay }}
      className="flex flex-col items-center relative will-change-transform w-[0.6em]"
    >
      {digits.map((d, i) => (
        <span key={i} className="whitespace-pre flex justify-center items-center h-[1em]">
          {d}
        </span>
      ))}
    </motion.div>
  );
}

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const pathname = usePathname();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const route = pathname ?? "/";
    const current = ROUTE_VIDEOS[route] ?? [];
    const rest = Object.entries(ROUTE_VIDEOS)
      .filter(([r]) => r !== route)
      .flatMap(([, v]) => v);

    // Videos warm the cache but are NOT counted toward progress. Counting them
    // meant the bar was gated on ~11.6 MB that cannot finish on a slow
    // connection, so MAX_MS fired every time and the counter jumped to 100.
    const injected: HTMLLinkElement[] = [];
    const warm = (src: string, priority: "high" | "low") => {
      const link = document.createElement("link");
      // prefetch rather than preload: fills the same cache, but a preload is a
      // *mandatory* high-priority fetch that outranked the hero image.
      link.rel = "prefetch";
      link.as = "video";
      link.href = src;
      link.fetchPriority = priority;
      document.head.appendChild(link);
      injected.push(link);
    };
    current.forEach((src) => warm(src, "high"));
    rest.forEach((src) => warm(src, "low"));

    // Progress = what the FIRST SCREEN actually needs, which is exactly two
    // things: the webfonts (a swap after the curtain lifts is the most visible
    // "still loading" artefact) and the window load event, which waits on the
    // priority-preloaded hero image but NOT on prefetch links or preload=metadata
    // video. Two honest signals beat five unreliable ones.
    const total = 2;
    let loaded = 0;
    const bump = () => {
      loaded += 1;
    };

    document.fonts.ready.then(bump).catch(bump);
    if (document.readyState === "complete") bump();
    else window.addEventListener("load", bump, { once: true });

    const start = performance.now();
    let holdTimer: ReturnType<typeof setTimeout> | undefined;
    let lastStep = -1;

    const setIfChanged = (s: number) => {
      if (s !== lastStep) {
        lastStep = s;
        setStep(s);
      }
    };

    const tick = () => {
      const elapsed = performance.now() - start;
      // Never faster than the choreography, never ahead of what actually loaded.
      const progress = Math.min(elapsed / MIN_MS, loaded / total);
      const timedOut = elapsed >= MAX_MS;

      if (progress >= 1 || timedOut) {
        setIfChanged(4);
        clearInterval(poll);
        holdTimer = setTimeout(onComplete, HOLD_AT_100_MS);
        return;
      }

      setIfChanged(stepForProgress(progress));
    };

    // setInterval, NOT requestAnimationFrame. rAF is paused entirely in
    // background tabs, so a visitor who opens the site in a new tab and comes
    // back would find the curtain permanently stuck. Timers still fire there
    // (throttled to ~1s), so the loader always finishes. There is nothing to
    // gain from frame timing here either -- the counter only changes 5 times and
    // Framer Motion drives the actual tween.
    const poll = setInterval(tick, 100);
    tick();

    return () => {
      clearInterval(poll);
      if (holdTimer) clearTimeout(holdTimer);
      window.removeEventListener("load", bump);
      injected.forEach((link) => link.remove());
    };
  }, [onComplete, pathname]);

  return (
    <motion.div
      key="preloader"
      initial={{ y: "0%" }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] pointer-events-auto bg-[#3F352C] font-sans text-white overflow-hidden"
    >
      {/* Top Left Branding */}
      <div className="absolute top-0 left-0 p-6 sm:p-8 md:p-12 flex flex-col text-[10px] sm:text-xs md:text-sm tracking-widest font-medium leading-relaxed uppercase">
        <div className="text-white">GM MOHIT</div>
        <div className="text-white/60">PORTFOLIO &copy;2026</div>
      </div>

      {/* Animated Counter (Independent Mechanical Columns) */}
      <motion.div
        initial={{ top: "100%", y: "-100%" }}
        animate={{ top: STOP_TOP[step], y: STOP_Y[step] }}
        transition={{ duration: 0.45, ease: STEP_EASE }}
        className="absolute right-0 px-6 sm:px-8 md:px-12 py-6 sm:py-8 md:py-12 flex items-start text-white text-5xl sm:text-7xl md:text-[8vw] font-medium tracking-tighter will-change-transform tabular-nums"
      >
        {/* The 1em mask for the scrolling odometer tapes */}
        <div className="relative overflow-hidden flex" style={{ height: "1em", lineHeight: "1em" }}>
          <Tape digits={["1", " ", " ", " ", " "]} step={step} />
          {/* TENS drags a beat behind the others -- that lag is what makes the
              odometer read as mechanical rather than as one sliding block. */}
          <Tape digits={["0", "6", "3", "0", "0"]} step={step} delay={0.04} />
          <Tape digits={["0", "8", "4", "2", "0"]} step={step} />
        </div>
      </motion.div>
    </motion.div>
  );
}
