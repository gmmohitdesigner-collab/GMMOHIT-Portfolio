"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export default function MagneticMenuButton({ 
    isOpen, 
    onClick 
}: { 
    isOpen: boolean; 
    onClick: () => void 
}) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    // SVG Path Variants
    const pathVariants = {
        top: {
            closed: { d: "M 4 11 L 28 11" },
            open: { d: "M 8 24 L 24 8" }, // Diagonal 1
        },
        bottom: {
            closed: { d: "M 10 21 L 28 21" }, // Shorter top-to-left line
            open: { d: "M 8 8 L 24 24" }, // Diagonal 2
        }
    };

    return (
        <motion.button
            ref={buttonRef}
            onClick={onClick}
            initial={false}
            animate={{ 
                backgroundColor: isOpen ? "#1A1818" : "rgba(255, 255, 255, 0)",
                color: isOpen ? "#E8E3DA" : "currentColor" 
            }}
            transition={{ duration: 0.4 }}
            className={`
                relative h-12 w-12 md:h-14 md:w-14 flex items-center justify-center rounded-full z-[70] cursor-pointer
                ${!isOpen && 'mix-blend-difference'}
            `}
            aria-label={isOpen ? "Close Mobile Menu" : "Open Mobile Menu"}
        >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="overflow-visible">
                <motion.path
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    animate={isOpen ? "open" : "closed"}
                    variants={pathVariants.top}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                />
                <motion.path
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    animate={isOpen ? "open" : "closed"}
                    variants={pathVariants.bottom}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                />
            </svg>
        </motion.button>
    );
}
