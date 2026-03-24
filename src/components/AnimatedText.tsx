"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface AnimatedTextProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
    text: string | string[];
    className?: string; // Applied to the wrapper element
    textClassName?: string; // Applied to the inner motion span elements
    el?: React.ElementType; // e.g. "h1", "p", "span", "div"
    delay?: number; // Delay before animation starts
    staggerDuration?: number; // Delay between each word/line
    once?: boolean; // Whether the animation should only play once
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
    ...props
}: AnimatedTextProps) {
    const isArray = Array.isArray(text);
    // If text is a string, split by words. If array, each element is a line.
    const items = isArray ? text : text.split(" ");

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

    return (
        <Wrapper className={className} {...props}>
            <motion.span
                className="inline-block w-full"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once, margin: "-50px" }}
            >
                {items.map((item, index) => (
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
                ))}
            </motion.span>
        </Wrapper>
    );
}
