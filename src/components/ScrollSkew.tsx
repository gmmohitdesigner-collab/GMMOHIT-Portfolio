"use client";

import { useLenis } from "lenis/react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

export default function ScrollSkew({ 
    children, 
    className = "" 
}: { 
    children: React.ReactNode, 
    className?: string 
}) {
    // Track the raw velocity from Lenis
    const velocityTracker = useMotionValue(0);
    
    // Apply a physics spring to the velocity so the skew smoothly 
    // bounces back to 0 when scrolling stops, rather than instantly snapping
    const smoothVelocity = useSpring(velocityTracker, {
        damping: 50,
        stiffness: 400
    });

    // Map the smoothed velocity to a rotation/skew angle.
    // -150 velocity -> -3 degrees
    // 150 velocity -> 3 degrees
    // Using clamp to ensure it never skews so much it breaks the layout
    const skew = useTransform(smoothVelocity, [-150, 0, 150], [-3, 0, 3]);

    useLenis(({ velocity }) => {
        velocityTracker.set(velocity);
    });

    return (
        <motion.div 
            style={{ skewY: skew }} 
            className={`origin-center ${className}`}
        >
            {children}
        </motion.div>
    );
}
