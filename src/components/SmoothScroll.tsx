"use client";

import { ReactLenis } from "lenis/react";

/**
 * SmoothScroll Component
 * Integrates Lenis for high-end inertial scrolling.
 * Configured with premium easing and duration.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
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
