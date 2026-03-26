"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import AnimatedText from "./AnimatedText";

export default function AboutSection() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax for the huge watermark
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    
    // Parallax for main heading
    const headingY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

    const textRevealVariants: Variants = {
        hidden: { y: "120%", opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: { duration: 1, ease: [0.33, 1, 0.68, 1] }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    return (
        <section 
            ref={containerRef} 
            className="w-full relative flex flex-col items-center py-32 md:py-48 lg:py-64 bg-[#E8E3DA] text-[#3F352C] overflow-hidden" 
            id="about" 
            aria-labelledby="about-heading"
        >
            {/* Massive Background Parallax Text Layer */}
            <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center pointer-events-none opacity-[0.03] select-none z-0"
                style={{ y: backgroundY }}
            >
                <div className="font-monument text-[25vw] leading-none whitespace-nowrap tracking-widest text-[#3F352C]">
                    CORE
                </div>
            </motion.div>

            <div className="w-full max-w-[1700px] px-4 md:px-12 lg:px-16 flex flex-col z-10">
                {/* Overhead Label */}
                <motion.div 
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="overflow-hidden mb-8 md:mb-12"
                >
                    <motion.p variants={textRevealVariants} className="font-mono text-xs md:text-sm tracking-widest uppercase opacity-60">
                        ( The Mindset )
                    </motion.p>
                </motion.div>

                <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-32">
                    {/* Left: Massive Main Heading */}
                    <motion.div 
                        className="w-full lg:w-[60%] flex flex-col"
                        style={{ y: headingY }}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                    >
                        <div className="overflow-hidden leading-[0.85] pb-4">
                            <motion.h2 variants={textRevealVariants} id="about-heading" className="font-monument text-[10vw] sm:text-[8vw] lg:text-[6.5vw] uppercase tracking-tighter m-0 whitespace-nowrap">
                                <span className="text-transparent" style={{ WebkitTextStroke: "1px #3F352C" }}>DESIGN </span>
                                <span>THAT</span>
                            </motion.h2>
                        </div>
                        <div className="overflow-hidden leading-[0.85] pb-4">
                            <motion.h2 variants={textRevealVariants} className="font-monument text-[10vw] sm:text-[8vw] lg:text-[6.5vw] uppercase tracking-tighter m-0 whitespace-nowrap">
                                <span className="font-serif italic font-light lowercase tracking-normal pr-2 md:pr-4">demands</span>
                            </motion.h2>
                        </div>
                        <div className="overflow-hidden leading-[0.85] pb-4">
                            <motion.h2 variants={textRevealVariants} className="font-monument text-[10vw] sm:text-[8vw] lg:text-[6.5vw] uppercase tracking-tighter m-0 whitespace-nowrap">
                                <span>ATTENTION</span>
                                <span className="font-serif italic font-light lowercase tracking-normal pl-2 md:pl-4">.</span>
                            </motion.h2>
                        </div>
                    </motion.div>

                    {/* Right: Dense Copy & Philosophy */}
                    <motion.div 
                        className="w-full lg:w-[35%] flex flex-col gap-12 md:gap-16 pt-0 lg:pt-16"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                    >
                        {/* Quote or Core thesis */}
                        <div className="relative">
                            <span className="absolute -left-6 md:-left-8 top-[-8px] text-4xl md:text-6xl font-serif italic text-transparent opacity-20" style={{ WebkitTextStroke: "1px #3F352C" }}>"</span>
                            <AnimatedText
                                el="p"
                                className="font-circular text-2xl md:text-3xl lg:text-4xl leading-tight m-0"
                                text="Curiosity that shapes absolute clarity."
                                delay={0.2}
                            />
                        </div>

                        {/* Detailed Description */}
                        <div className="flex flex-col gap-6 font-circular text-base md:text-lg lg:text-xl leading-relaxed opacity-80">
                            <AnimatedText
                                el="p"
                                className="m-0"
                                text="I’m a designer who believes digital spaces should feel as visceral and intentional as physical ones."
                                delay={0.3}
                                staggerDuration={0.01}
                            />
                            <AnimatedText
                                el="p"
                                className="m-0"
                                text="With every project, I craft identities that radiate trust, beauty, and precision — design that elevates brands while staying obsessively true to the people behind them."
                                delay={0.4}
                                staggerDuration={0.01}
                            />
                            <AnimatedText
                                el="p"
                                className="m-0"
                                text="It’s a ritual of detail, a practice of brutal refinement, and a pursuit of work that outlasts the noise."
                                delay={0.5}
                                staggerDuration={0.01}
                            />
                        </div>

                        {/* Metrics or Attributes (optional but adds to vibe) */}
                        <div className="flex flex-col gap-4 pt-8 border-t border-[#3F352C]/20">
                            {[
                                { num: "01", label: "BRUTAL REFINEMENT", desc: "Stripping away the unnecessary to reveal raw intent." },
                                { num: "02", label: "CINEMATIC MOTION", label2: "& INTERACTION", desc: "Physics-driven experiences that feel heavy, fluid, and alive." }
                            ].map((item, idx) => (
                                <motion.div key={idx} variants={textRevealVariants} className="flex gap-4 md:gap-8 items-start group cursor-default">
                                    <span className="font-mono text-xs opacity-50 mt-1">{item.num}</span>
                                    <div className="flex flex-col">
                                        <h4 className="font-monument text-sm md:text-base tracking-widest">{item.label}</h4>
                                        {item.label2 && <h4 className="font-monument text-sm md:text-base tracking-widest">{item.label2}</h4>}
                                        <p className="font-circular text-xs md:text-sm opacity-60 mt-2 max-w-[280px] transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
