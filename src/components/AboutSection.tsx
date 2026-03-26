"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

export default function AboutSection() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Deep slow parallax for background elements
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    
    // Parallax for text to float over the background
    const textY = useTransform(scrollYProgress, [0, 1], ["10%", "-5%"]);

    const textRevealVariants: Variants = {
        hidden: { y: "110%", opacity: 0, rotate: 2 },
        show: {
            y: 0,
            opacity: 1,
            rotate: 0,
            transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] }
        }
    };

    return (
        <section 
            ref={containerRef} 
            className="w-full relative flex flex-col items-center justify-center min-h-[120vh] bg-[#3F352C] text-[#E8E3DA] overflow-hidden" 
            id="about" 
            aria-labelledby="about-heading"
        >
            {/* Film Grain Noise Overlay */}
            <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.08] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

            {/* Background Parallax Portrait / Massive Text */}
            <motion.div 
                className="absolute inset-0 w-full h-full flex flex-col justify-center items-center pointer-events-none opacity-[0.03] select-none z-0 overflow-hidden"
                style={{ y: bgY }}
            >
                <h1 className="font-monument text-[35vw] leading-[0.7] tracking-tighter text-[#E8E3DA]">WHO</h1>
                <h1 className="font-monument text-[35vw] leading-[0.7] tracking-tighter text-transparent" style={{ WebkitTextStroke: "2px #E8E3DA" }}>AM I</h1>
            </motion.div>

            {/* Centralized Massive Typography Area */}
            <motion.div 
                className="w-full max-w-[1400px] px-4 md:px-12 lg:px-16 flex flex-col items-center text-center z-10"
                style={{ y: textY }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ staggerChildren: 0.15 }}
            >
                {/* Intro Heading */}
                <div className="mb-16 lg:mb-24 flex flex-col items-center">
                    <div className="overflow-hidden pb-4">
                        <motion.h2 
                            variants={textRevealVariants} 
                            id="about-heading" 
                            className="font-monument text-[10vw] sm:text-[8vw] lg:text-[7vw] leading-[0.9] uppercase tracking-tighter m-0 whitespace-nowrap"
                        >
                            I design
                        </motion.h2>
                    </div>
                    <div className="overflow-hidden pb-4">
                        <motion.h2 
                            variants={textRevealVariants}
                            className="font-monument text-[10vw] sm:text-[8vw] lg:text-[7vw] leading-[0.9] uppercase tracking-tighter m-0 whitespace-nowrap italic font-serif font-light lowercase text-transparent" 
                            style={{ WebkitTextStroke: "1.5px #E8E3DA" }}
                        >
                            experiences
                        </motion.h2>
                    </div>
                    <div className="overflow-hidden pb-4">
                        <motion.h2 
                            variants={textRevealVariants}
                            className="font-monument text-[10vw] sm:text-[8vw] lg:text-[7vw] leading-[0.9] uppercase tracking-tighter m-0 whitespace-nowrap"
                        >
                            not just websites.
                        </motion.h2>
                    </div>
                </div>

                {/* Sub Text Center Aligned */}
                <div className="w-full max-w-[800px] flex flex-col gap-10 font-circular text-lg md:text-2xl lg:text-3xl leading-snug md:leading-tight lg:leading-tight text-[#E8E3DA]/80">
                    <div className="overflow-hidden">
                        <motion.p variants={textRevealVariants} className="m-0">
                            I’m a designer who believes digital spaces should feel as visceral and intentional as physical ones.
                        </motion.p>
                    </div>
                    <div className="overflow-hidden">
                        <motion.p variants={textRevealVariants} className="m-0">
                            With every project, I craft identities that radiate trust, beauty, and precision — elevating brands while staying obsessively true to the people behind them.
                        </motion.p>
                    </div>
                    <div className="overflow-hidden mt-8">
                        <motion.p variants={textRevealVariants} className="m-0 font-serif italic text-3xl md:text-4xl lg:text-5xl text-[#E8E3DA] !opacity-100">
                            "A pursuit of work that outlasts the noise."
                        </motion.p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
