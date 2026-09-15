"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

// Module scope, so the objects keep a stable identity across renders instead of
// being rebuilt every time the button re-renders.
const TOP = { closed: "M 4 11 L 28 11", open: "M 8 24 L 24 8" };
const BOTTOM = { closed: "M 10 21 L 28 21", open: "M 8 8 L 24 24" };
const PATH_TRANSITION = { duration: 0.5, ease: [0.76, 0, 0.24, 1] as const };

export default function MagneticMenuButton({
    isOpen, 
    onClick 
}: { 
    isOpen: boolean; 
    onClick: () => void 
}) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    // The two bars are animated with a plain `animate` object rather than named
    // variants. Via variants this logged "<path> attribute d: Expected moveto
    // path command ('M' or 'm'), 'undefined'" twice on every client-side
    // navigation: remounting resolved the variant a frame late, so motion-dom
    // wrote d="undefined" before the real value landed. Animating the value
    // directly takes variant resolution out of the path entirely.

    return (
        <motion.button
            ref={buttonRef}
            onClick={onClick}
            initial={false}
            animate={{ 
                backgroundColor: isOpen ? "#3F352C" : "rgba(255, 255, 255, 0)",
                color: isOpen ? "#E8E3DA" : "currentColor" 
            }}
            transition={{ duration: 0.4 }}
            className={`
                relative h-12 w-12 md:h-14 md:w-14 flex items-center justify-center rounded-full z-[70] cursor-pointer
            `}
            aria-label={isOpen ? "Close Mobile Menu" : "Open Mobile Menu"}
        >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="overflow-visible">
                <motion.path
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    d={TOP.closed}
                    initial={false}
                    animate={{ d: isOpen ? TOP.open : TOP.closed }}
                    transition={PATH_TRANSITION}
                />
                <motion.path
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    d={BOTTOM.closed}
                    initial={false}
                    animate={{ d: isOpen ? BOTTOM.open : BOTTOM.closed }}
                    transition={PATH_TRANSITION}
                />
            </svg>
        </motion.button>
    );
}
