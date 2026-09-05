"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform, wrap } from "framer-motion";
import { useLenis } from "lenis/react";

interface InfiniteMarqueeProps {
    text: string;
    speed?: number; // Base speed
    className?: string;
}

export default function InfiniteMarquee({ 
    text, 
    speed = 2, 
    className = "" 
}: InfiniteMarqueeProps) {
    const baseX = useMotionValue(0);
    const scrollVelocity = useMotionValue(0);
    
    // Smooth the raw scroll velocity
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    
    // We map velocity to an extra speed multiplier. We don't clamp it so fast scrolls give big pushes.
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

    // The text containers are duplicated 4 times inside a flex container.
    // So the total width is 400% of one container.
    // If we move the parent from 0 to -25%, it seamlessly loops because the first item has fully moved offscreen
    // and is perfectly replaced by the second item.
    const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
    
    // Create a really long string by repeating the text
    const repeatedText = `${text} \u00A0\u00A0 `.repeat(4);

    const directionFactor = useRef<number>(1);

    useLenis(({ velocity }) => {
        scrollVelocity.set(velocity);
        // Change scroll direction based on mouse wheel direction
        if (velocity < 0) {
            directionFactor.current = -1;
        } else if (velocity > 0) {
            directionFactor.current = 1;
        }
    });

    useAnimationFrame((t, delta) => {
        // Base movement (extreme slow down for background subtlety)
        let moveBy = directionFactor.current * speed * (delta / 8000);
        
        // Add scroll velocity momentum in the current direction (less intense)
        moveBy += directionFactor.current * Math.abs(velocityFactor.get()) * (delta / 4000);
        
        // Update the motion value (reduced multiplier)
        baseX.set(baseX.get() - moveBy * 0.5);
    });

    return (
        <div className={`overflow-hidden whitespace-nowrap flex flex-nowrap ${className}`}>
            <motion.div className="flex flex-nowrap whitespace-nowrap" style={{ x }}>
                {/* 4 Identical spans for seamless wrapping at -25% */}
                <span className="block pr-8">{repeatedText}</span>
                <span className="block pr-8">{repeatedText}</span>
                <span className="block pr-8">{repeatedText}</span>
                <span className="block pr-8">{repeatedText}</span>
            </motion.div>
        </div>
    );
}
