"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

export type TransitionState = "IDLE" | "ENTERING" | "COVERED" | "ROUTING" | "EXITING";

interface TransitionContextType {
  transitionState: TransitionState;
  transitionTitle: string | null;
  startTransition: (href: string, title?: string) => void;
  reportCovered: () => void;
  reportExited: () => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [transitionState, setTransitionState] = useState<TransitionState>("IDLE");
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);
  const [transitionTitle, setTransitionTitle] = useState<string | null>(null);
  
  const router = useRouter();
  const pathname = usePathname();
  const lastPathnameRef = useRef(pathname);

  // 1. User clicks a link
  const startTransition = (href: string, title?: string) => {
    // Only allow starting if we are idle (prevent spamming)
    if (transitionState !== "IDLE") return;
    
    // If they are already on the page, don't transition
    if (pathname === href) return;

    setPendingRoute(href);
    setTransitionTitle(title || null);
    setTransitionState("ENTERING");
    
    // Lock scrolling
    document.body.style.overflow = "hidden";
  };

  // 2. PageTransition overlay finishes entering and calls this
  const reportCovered = () => {
    if (transitionState !== "ENTERING") return;
    
    if (pendingRoute) {
      setTransitionState("ROUTING");
      router.push(pendingRoute);
    }
  };

  // 3. Watch for pathname change to trigger exit
  useEffect(() => {
    if (transitionState === "ROUTING" && pathname !== lastPathnameRef.current) {
      // The page has changed underneath! Wait a tiny tick for paint, then exit.
      setTimeout(() => {
        setTransitionState("EXITING");
      }, 50);
    }
    lastPathnameRef.current = pathname;
  }, [pathname, transitionState]);

  // 4. PageTransition overlay finishes exiting and calls this
  const reportExited = () => {
    setTransitionState("IDLE");
    setPendingRoute(null);
    // Keep transitionTitle so it doesn't abruptly disappear during the exit animation
    
    // Unlock scrolling
    document.body.style.overflow = "";
  };

  return (
    <TransitionContext.Provider 
      value={{ 
        transitionState, 
        transitionTitle,
        startTransition, 
        reportCovered, 
        reportExited 
      }}
    >
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
