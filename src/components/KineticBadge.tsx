"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";

interface KineticBadgeProps {
    className?: string;
    text?: string;
}

export default function KineticBadge({ 
    className = "", 
    text = "GM MOHIT • DIGITAL CRAFTSMAN • ESTABLISHED 2024 • " 
}: KineticBadgeProps) {
    const baseRotation = useRef(0);
    const scrollVelocity = useMotionValue(0);
    
    // Smooth the raw scroll velocity
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    
    // Convert scroll velocity into a rotation multiplier. 
    // Negative scroll (up) slows it down or reverses it, positive (down) speeds it up.
    const velocityMultiplier = useTransform(smoothVelocity, [-1000, 0, 1000], [-5, 0, 5]);

    useLenis(({ velocity }) => {
        scrollVelocity.set(velocity);
    });

    const rotation = useMotionValue(0);

    useAnimationFrame((t, delta) => {
        // Base constant spin speed (degrees per millisecond)
        let moveBy = 0.015 * delta;
        // Add scroll momentum
        moveBy += moveBy * velocityMultiplier.get();
        baseRotation.current += moveBy;
        rotation.set(baseRotation.current);
    });

    return (
        <motion.div 
            style={{ rotate: rotation }} 
            className={`relative w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center ${className}`}
        >
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                <path
                    id="badgeTextPath"
                    d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                    fill="none"
                />
                <text className="font-monument text-[8.5px] uppercase tracking-[0.165em]" fill="currentColor">
                    <textPath href="#badgeTextPath" startOffset="0%">
                        {text}
                    </textPath>
                </text>
            </svg>
            {/* Center geometric element to anchor it visually */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 border-[1px] border-current rounded-full opacity-30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-current rounded-full" />
        </motion.div>
    );
}
