"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import Loader from "./Loader";
import { LoadingProvider, useLoading } from "@/context/LoadingContext";

function PreloaderContent({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const { isExitComplete, setIsExitComplete } = useLoading();
  const lenis = useLenis();

  useEffect(() => {
    // Before the exit is entirely complete, we keep scrolling disabled
    if (!isExitComplete) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    
    // Clean up if component unmounts unpredictably
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [isExitComplete, lenis]);

  return (
    <>
      <AnimatePresence mode="wait" onExitComplete={() => setIsExitComplete(true)}>
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div 
        className={!isExitComplete ? "h-screen overflow-hidden pointer-events-none" : ""}
      >
        {children}
      </div>
    </>
  );
}

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <PreloaderContent>{children}</PreloaderContent>
    </LoadingProvider>
  );
}
