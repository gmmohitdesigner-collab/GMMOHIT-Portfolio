"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import AnimatedText from "./AnimatedText";

interface ProjectCardProps {
    title: string;
    description: string;
    videoSrc: string;
    containerVariants: Variants;
    itemVariants: Variants;
    reverse?: boolean;
}

const ProjectCard = ({ title, description, videoSrc, containerVariants, itemVariants, reverse = false }: ProjectCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const yMove = useTransform(scrollYProgress, [0, 1], reverse ? ["-10%", "10%"] : ["10%", "-10%"]);

    return (
        <motion.div ref={ref} className="w-full flex flex-col gap-8 md:gap-14 items-center" variants={itemVariants}>
            <div className={`w-full flex flex-col items-start md:items-end justify-between px-4 md:px-12 lg:px-16 gap-4 md:gap-8 ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                <div className="flex flex-col md:w-auto">
                    <AnimatedText
                        el="h3"
                        className="font-monument text-3xl md:text-5xl lg:text-[61px] uppercase tracking-tight m-0 leading-none"
                        text={title}
                    />
                    <div className="w-full h-px bg-brand-text mt-2"></div>
                </div>
                <div className="flex flex-col md:mb-[9px]">
                    <AnimatedText
                        el="p"
                        className={`font-circular text-base md:text-xl lg:text-2xl opacity-80 max-w-[280px] ${reverse ? 'md:text-left' : 'md:text-right'}`}
                        text={description}
                        delay={0.1}
                        staggerDuration={0.015}
                    />
                </div>
            </div>

            <div className="w-full px-4 md:px-12 lg:px-16 max-w-[1400px]">
                <div className="w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[1.4/1] bg-gray-200 relative overflow-hidden group">
                    <motion.div style={{ y: yMove }} className="w-full h-[120%] absolute top-[-10%] sm:h-full sm:top-0">
                        {/* Placeholder video - no controls, looping */}
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            aria-label={`Demo video of ${title}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        >
                            <source src={videoSrc} type="video/mp4" />
                        </video>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default function FeaturedWorksSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" as const }
        },
    };

    const textRevealVariants: Variants = {
        hidden: { y: "100%" },
        show: {
            y: 0,
            transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
        }
    };

    return (
        <section className="w-full flex flex-col items-center py-16 md:py-24 lg:py-32 gap-16 md:gap-24 lg:gap-32" id="work" aria-labelledby="work-heading">

            {/* Section Title */}
            <motion.h2
                id="work-heading"
                className="flex items-center gap-2 md:gap-4 lg:gap-8 font-monument text-[18px] sm:text-2xl md:text-4xl lg:text-[49px] uppercase tracking-tight"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="relative overflow-hidden">
                    <motion.span className="block" variants={textRevealVariants}>Featured</motion.span>
                </div>
                <div className="flex items-center relative overflow-hidden">
                    <motion.div className="flex items-center" variants={textRevealVariants}>
                        <span>WO</span>
                        <span className="text-transparent" style={{ WebkitTextStroke: "1px black" }}>R</span>
                        <span>KS</span>
                    </motion.div>
                </div>
            </motion.h2>

            {/* Projects Container */}
            <motion.div
                className="w-full flex flex-col gap-16 md:gap-24 lg:gap-32"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
            >

                {/* Project 1: TEAURE */}
                <ProjectCard
                    title="TEAURE"
                    description="Organic blends crafted for calm, presence, and purity."
                    videoSrc="https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-a-man-with-heads-in-the-sky-32530-large.mp4"
                    containerVariants={containerVariants}
                    itemVariants={itemVariants}
                />

                {/* Project 2: CREATIVE ANTS */}
                <ProjectCard
                    title="CREATIVE ANTS"
                    description="A creative agency pushing the boundaries of spatial design."
                    videoSrc="https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-2380-large.mp4"
                    containerVariants={containerVariants}
                    itemVariants={itemVariants}
                    reverse={true}
                />


            </motion.div>
        </section>
    );
}
