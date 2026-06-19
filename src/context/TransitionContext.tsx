"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface TransitionContextType {
  isTransitioning: boolean;
  startTransition: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const startTransition = (href: string) => {
    // Prevent triggering multiple transitions
    if (isTransitioning) return;

    // 1. Trigger the shutter down
    setIsTransitioning(true);

    // 2. Wait for shutter to drop (800ms), then navigate
    setTimeout(() => {
      router.push(href);
      
      // 3. Wait a fraction of a second to ensure Next.js has mounted the new page, then lift shutter
      setTimeout(() => {
        setIsTransitioning(false);
      }, 200);
    }, 800);
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
}
