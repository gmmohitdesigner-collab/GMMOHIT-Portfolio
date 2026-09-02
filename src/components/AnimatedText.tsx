"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { useLoading } from "@/context/LoadingContext";

interface AnimatedTextProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
    text: string | string[];
    className?: string; // Applied to the wrapper element
    textClassName?: string; // Applied to the inner motion span elements
    el?: React.ElementType; // e.g. "h1", "p", "span", "div"
    delay?: number; // Delay before animation starts
    staggerDuration?: number; // Delay between each word/line/char
    once?: boolean; // Whether the animation should only play once
    splitLevel?: "word" | "char"; // How to split the text
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any; // Allow any other prop, like href
}

export default function AnimatedText({
    text,
    className = "",
    textClassName = "",
    el: Wrapper = "div",
    delay = 0,
    staggerDuration = 0.02,
    once = true,
    splitLevel = "word",
    ...props
}: AnimatedTextProps) {
    const { isExitComplete } = useLoading();
    const isArray = Array.isArray(text);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDuration,
                delayChildren: delay,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: "100%" },
        show: {
            y: 0,
            transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
        },
    };

    const renderContent = () => {
        if (splitLevel === "char") {
            const lines = isArray ? text : [text as string];
            return lines.map((line, lineIndex) => (
                <span key={lineIndex} className={isArray ? "block w-full" : "inline-block"}>
                    {line.split("").map((char, charIndex) => (
                        <span 
                            key={`${lineIndex}-${charIndex}`} 
                            className="overflow-hidden inline-block align-bottom" 
                            style={{ paddingBottom: '0.1em', marginBottom: '-0.1em' }}
                        >
                            <motion.span 
                                variants={itemVariants} 
                                className={`inline-block ${textClassName}`}
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        </span>
                    ))}
                    {/* Add a space between array elements if they aren't blocks, though array is usually used for block lines */}
                    {!isArray && lineIndex < lines.length - 1 && "\u00A0"}
                </span>
            ));
        }

        // Default word/line splitting
        const items = isArray ? text : (text as string).split(" ");
        return items.map((item, index) => (
            <span
                key={index}
                className={`overflow-hidden align-bottom ${isArray ? "block w-full" : "inline-block"}`}
                style={{ paddingBottom: '0.1em', marginBottom: '-0.1em' }}
            >
                <motion.span
                    variants={itemVariants}
                    className={`inline-block ${textClassName}`}
                >
                    {item}{!isArray && index < items.length - 1 && "\u00A0"}
                </motion.span>
            </span>
        ));
    };

    return (
        <Wrapper className={className} {...props}>
            <motion.span
                className="inline-block w-full"
                variants={containerVariants}
                initial="hidden"
                whileInView={isExitComplete ? "show" : "hidden"}
                viewport={{ once, margin: "-50px" }}
            >
                {renderContent()}
            </motion.span>
        </Wrapper>
    );
}
