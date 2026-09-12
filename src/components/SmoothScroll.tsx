"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

/**
 * SmoothScroll Component
 * Integrates Lenis for high-end inertial scrolling.
 * Configured with premium easing and duration.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const prefersReduced = useReducedMotion();

    // Inertial scrolling is itself a motion effect -- it decouples the page from
    // the user's input and is a common trigger for motion sensitivity. Hand back
    // native scrolling rather than just softening the easing.
    if (prefersReduced) return <>{children}</>;

    return (
        <ReactLenis
            root
            options={{
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
                infinite: false,
            }}
        >
            {children}
        </ReactLenis>
    );
}
