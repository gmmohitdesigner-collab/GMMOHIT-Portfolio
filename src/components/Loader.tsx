"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

// Warm only what the route being loaded actually renders. Previously every page
// warmed all eight assets, which meant the homepage force-downloaded 36 MB of
// Teaure-only media -- including a 26 MB scroll loop it never shows -- at high
// priority, competing with the hero image for bandwidth.
const ROUTE_ASSETS: Record<string, { images: string[]; videos: string[] }> = {
  "/": {
    images: ["/assets/Image - Home.jpeg"],
    videos: ["/works/teaure/Teaure.mp4", "/works/creative-ants/CreativeAnts.mp4"],
  },
  "/works/teaure": {
    images: [
      "/works/teaure/Background Element.png",
      "/works/teaure/Mobilemockup1.png",
      "/works/teaure/teaure_webshowcase.png",
    ],
    videos: ["/works/teaure/teaure-scroll v2.mp4", "/assets/Showreel.mp4"],
  },
  "/works/creative-ants": {
    images: [],
    videos: ["/works/creative-ants/CreativeAnts.mp4"],
  },
};

export default function Loader({ onComplete }: { onComplete: () => void }) {
  // No need for useMotionValue anymore, we fall back to hardware-accelerated static CSS strips
  // The transition logic is entirely mapped geometrically.
  const pathname = usePathname();

  useEffect(() => {
    const route = pathname ?? "/";
    const current = ROUTE_ASSETS[route] ?? { images: [], videos: [] };
    // Every OTHER route's media still gets cached during the counter, so landing
    // on a case study later is instant. The loader exists to buy this time.
    const rest = Object.entries(ROUTE_ASSETS)
      .filter(([r]) => r !== route)
      .flatMap(([, a]) => [...a.images, ...a.videos]);

    const injected: HTMLLinkElement[] = [];
    const warm = (src: string, priority: "high" | "low") => {
      const link = document.createElement("link");
      // prefetch rather than preload: fills the same cache, but a preload is a
      // *mandatory* high-priority fetch that outranked the hero image.
      link.rel = "prefetch";
      link.as = src.endsWith(".mp4") ? "video" : "image";
      link.href = src;
      link.fetchPriority = priority;
      document.head.appendChild(link);
      injected.push(link);
    };

    // This route's hero image is the LCP element -- fetch it eagerly, first.
    current.images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    current.videos.forEach((src) => warm(src, "high"));
    // Everything else backfills behind them for the rest of the 5.3s counter.
    rest.forEach((src) => warm(src, "low"));

    // Hold at 100 for a crisp 300ms (over 5s total animation), then trigger the upward shutter exit natively
    const timer = setTimeout(() => {
      onComplete(); 
    }, 5300); 
    
    return () => {
      clearTimeout(timer);
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
        animate={{ 
          top: ["100%", "100%", "98%", "98%", "66%", "66%", "32%", "32%", "0%"],
          y:   ["-100%", "-100%", "-98%", "-98%", "-66%", "-66%", "-32%", "-32%", "0%"]
        }}
        transition={{ 
          duration: 5.0,
          times: [0.0, 0.04, 0.20, 0.30, 0.44, 0.54, 0.66, 0.78, 1.0],
          ease: Array(8).fill([0.65, 0, 0.35, 1])
        }}
        className="absolute right-0 px-6 sm:px-8 md:px-12 py-6 sm:py-8 md:py-12 flex items-start text-white text-5xl sm:text-7xl md:text-[8vw] font-medium tracking-tighter will-change-transform tabular-nums"
      >
        {/* The 1em mask for the scrolling odometer tapes */}
        <div className="relative overflow-hidden flex" style={{ height: '1em', lineHeight: '1em' }}>
          
          {/* HUNDREDS */}
          <motion.div 
            initial={{ y: "-4em" }}
            style={{ transform: "translateY(-4em)" }}
            animate={{ y: ["-4em", "-4em", "-3em", "-3em", "-2em", "-2em", "-1em", "-1em", "0em"] }}
            transition={{
              duration: 5.0,
              times: [0.0, 0.04, 0.20, 0.30, 0.44, 0.54, 0.66, 0.78, 1.0], // Base Times
              ease: Array(8).fill([0.65, 0, 0.35, 1])
            }}
            className="flex flex-col items-center relative will-change-transform w-[0.6em]"
          >
            {["1", " ", " ", " ", " "].map((d, i) => (
              <span key={i} className="whitespace-pre flex justify-center items-center h-[1em]">{d}</span>
            ))}
          </motion.div>

          {/* TENS (Dynamic Speed - Drags slightly behind the Units!) */}
          <motion.div 
            initial={{ y: "-4em" }}
            style={{ transform: "translateY(-4em)" }}
            animate={{ y: ["-4em", "-4em", "-3em", "-3em", "-2em", "-2em", "-1em", "-1em", "0em"] }}
            transition={{
              duration: 5.0,
              times: [0.0, 0.05, 0.22, 0.31, 0.46, 0.55, 0.68, 0.79, 1.0], // Delayed staggered times
              ease: Array(8).fill([0.65, 0, 0.35, 1])
            }}
            className="flex flex-col items-center relative will-change-transform w-[0.6em]"
          >
            {["0", "6", "3", "0", "0"].map((d, i) => (
              <span key={i} className="whitespace-pre flex justify-center items-center h-[1em]">{d}</span>
            ))}
          </motion.div>

          {/* UNITS */}
          <motion.div 
            initial={{ y: "-4em" }}
            style={{ transform: "translateY(-4em)" }}
            animate={{ y: ["-4em", "-4em", "-3em", "-3em", "-2em", "-2em", "-1em", "-1em", "0em"] }}
            transition={{
              duration: 5.0,
              times: [0.0, 0.04, 0.20, 0.30, 0.44, 0.54, 0.66, 0.78, 1.0], // Base Times
              ease: Array(8).fill([0.65, 0, 0.35, 1])
            }}
            className="flex flex-col items-center relative will-change-transform w-[0.6em]"
          >
            {["0", "8", "4", "2", "0"].map((d, i) => (
              <span key={i} className="whitespace-pre flex justify-center items-center h-[1em]">{d}</span>
            ))}
          </motion.div>

        </div>
      </motion.div>
    </motion.div>
  );
}
