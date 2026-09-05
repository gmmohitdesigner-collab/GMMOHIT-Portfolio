"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useLoading } from "@/context/LoadingContext";

const skillCategories = [
    {
        title: "UI design",
        total: "(06)",
        skills: [
            "Visual direction",
            "Design concept",
            "Typography",
            "Color",
            "Composition",
            "UI style guide"
        ]
    },
    {
        title: "UX design",
        total: "(05)",
        skills: [
            "UX research",
            "Usability testing",
            "User flow",
            "Wireframing",
            "Prototyping"
        ]
    },
    {
        title: "Creative dev",
        total: "(04)",
        skills: [
            "React & Next.js",
            "WebGL & Three.js",
            "Framer Motion",
            "Physics & Interaction"
        ]
    }
];

export default function AboutSection() {
    const { isExitComplete } = useLoading();
    const containerRef = useRef<HTMLElement>(null);

    const textRevealVariants: Variants = {
        hidden: { y: "100%", opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <section 
            ref={containerRef} 
            className="w-full relative flex flex-col items-center py-24 md:py-32 lg:py-48 bg-[#E8E3DA] text-[#3F352C]" 
            id="about" 
            aria-labelledby="about-heading"
        >
            <div className="w-full max-w-[1700px] px-4 md:px-12 lg:px-16 flex flex-col lg:flex-row justify-between z-10 relative gap-16 lg:gap-8">
                
                {/* Left Column: Sticky Anchor */}
                <div className="w-full lg:w-[35%] relative">
                    <motion.div 
                        className="lg:sticky lg:top-[120px] flex flex-col w-full"
                        initial="hidden"
                        whileInView={isExitComplete ? "show" : "hidden"}
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                    >
                        {/* Title */}
                        <div className="overflow-hidden pb-4">
                            <motion.h2 
                                id="about-heading" 
                                variants={textRevealVariants}
                                className="font-monument text-[15vw] sm:text-[12vw] lg:text-[5.5vw] uppercase tracking-tighter leading-[0.85] flex flex-col m-0"
                            >
                                <span className="flex items-center">
                                    Design
                                    {/* Accent Dot */}
                                    <span className="w-2 h-2 lg:w-3 lg:h-3 bg-[#3F352C] rounded-full ml-1 md:ml-2 mb-2 lg:mb-4" />
                                </span>
                                <span>skill sets</span>
                            </motion.h2>
                        </div>

                        {/* Thick divider */}
                        <motion.div 
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                            className="w-full max-w-[280px] lg:max-w-[340px] h-1.5 md:h-2 bg-[#3F352C] mt-8 mb-12 origin-left" 
                        />
                        
                        {/* Meta tag */}
                        <div className="overflow-hidden">
                            <motion.span variants={textRevealVariants} className="block font-mono text-xs opacity-60 mb-8">
                                (GPT® — 579)
                            </motion.span>
                        </div>

                        {/* Philosophy */}
                        <div className="overflow-hidden">
                            <motion.p variants={textRevealVariants} className="font-circular text-sm md:text-base lg:text-lg opacity-80 leading-relaxed mb-16 max-w-[320px] m-0">
                                I propose an end-to-end design process that spans my skills in Digital Product Design for websites and mobile applications, with a high-standard UI/Visual and UX prudence.
                            </motion.p>
                        </div>

                        {/* Arrow Icon */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20, y: 20 }}
                            whileInView={{ opacity: 0.15, x: 0, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#3F352C]">
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Right Column: Scrolling Lists */}
                <div className="w-full lg:w-[50%] flex flex-col gap-24 mt-8 lg:mt-0 pb-32">
                    {skillCategories.map((category, catIndex) => (
                        <motion.div 
                            key={category.title}
                            className="flex flex-col w-full"
                            initial="hidden"
                            whileInView={isExitComplete ? "show" : "hidden"}
                            viewport={{ once: true, margin: "-100px" }}
                            variants={containerVariants}
                        >
                            {/* Category Heading */}
                            <div className="overflow-hidden mb-10">
                                <motion.h3 variants={textRevealVariants} className="font-monument tracking-tighter text-3xl md:text-4xl lg:text-5xl m-0">
                                    {category.title}
                                </motion.h3>
                            </div>

                            <div className="flex flex-col w-full">
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.div 
                                        key={skill}
                                        variants={{
                                            hidden: { opacity: 0, x: -20 },
                                            show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                                        }}
                                        className="flex w-full items-center py-5 md:py-6 border-b border-[#3F352C]/20 group hover:bg-[#3F352C]/[0.02] transition-colors"
                                    >
                                        <span className="font-mono text-xs md:text-sm opacity-50 w-16 md:w-20">
                                            {skillIndex === 0 ? category.total : ""}
                                        </span>
                                        <span className="font-circular text-base md:text-lg lg:text-xl flex-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                            {skill}
                                        </span>
                                        <span className="font-mono text-xs md:text-sm opacity-60 group-hover:text-[#3F352C] group-hover:opacity-100 transition-all">
                                            {skillIndex + 1}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
