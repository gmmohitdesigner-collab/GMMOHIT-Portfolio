"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import AnimatedText from "./AnimatedText";

interface ProjectCardProps {
    index: string;
    category: string;
    targetYear: string;
    title: string;
    description: string;
    videoSrc: string;
    containerVariants: Variants;
    itemVariants: Variants;
}

const ProjectCard = ({ 
    index, category, targetYear, title, description, videoSrc, 
    containerVariants, itemVariants 
}: ProjectCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // 1. Image Parallax
    const yMove = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
    
    // 2. Scale-on-Scroll 
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 1.1]);
    
    // 3. Grayscale-to-Color 
    const filter = useTransform(scrollYProgress, [0.1, 0.45], ["grayscale(100%)", "grayscale(0%)"]);

    // 4. Subtle 3D Tilt Physics
    const x = useSpring(0, { stiffness: 100, damping: 20 });
    const y = useSpring(0, { stiffness: 100, damping: 20 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const tiltX = (e.clientX - centerX) / 40; 
        const tiltY = -(e.clientY - centerY) / 40; 
        x.set(tiltX);
        y.set(tiltY);
    };

    const resetMouse = () => {
        x.set(0);  y.set(0);
    };

    // Separating the first letter for the curly script font "Drop-Cap" style
    const firstLetter = title.charAt(0);
    const restOfTitle = title.slice(1);

    return (
        <motion.div ref={ref} className="w-full flex flex-col items-center relative my-16 max-w-[1400px] mx-auto" variants={itemVariants}>
            
            {/* Massive Display Title (Left Aligned, Overlapping) */}
            <div className="w-full flex justify-start px-4 md:px-12 lg:px-16 z-10 relative pointer-events-none mb-[-5%] md:mb-[-6%] lg:mb-[-4%]">
                <motion.h3 
                    className="flex items-baseline text-[55px] sm:text-[90px] md:text-[120px] lg:text-[150px] uppercase tracking-tighter m-0 leading-[0.8] text-[#E8E3DA]"
                    variants={itemVariants}
                >
                    <span className="font-serif italic font-light lowercase md:mr-1 tracking-normal">{firstLetter}</span>
                    <span className="font-monument">{restOfTitle}</span>
                </motion.h3>
            </div>

            {/* Centered Widescreen 16:9 Video Container */}
            <div className="w-full flex justify-center px-4 md:px-12 lg:px-16 z-0 perspective-[1000px]">
                <motion.div 
                    className="w-full md:w-[90%] lg:w-[85%] aspect-[16/9] bg-[#3F352C] relative overflow-hidden group"
                    onMouseMove={handleMouse}
                    onMouseLeave={resetMouse}
                    style={{ rotateX: y, rotateY: x }} 
                >
                    <motion.div 
                        style={{ y: yMove, scale, filter }} 
                        className="w-full h-[120%] absolute top-[-10%]"
                    >
                        <video autoPlay muted loop playsInline className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.03]">
                            <source src={videoSrc} type="video/mp4" />
                        </video>
                    </motion.div>

                    {/* Action Arrow Button (Top Right Inside Mask) */}
                    <div className="absolute top-4 right-4 md:top-8 md:right-8 w-20 h-20 md:w-28 md:h-28 bg-[#E8E3DA] rounded-full flex items-center justify-center text-[#3F352C] transform transition-transform duration-500 ease-out group-hover:scale-110 shadow-lg cursor-pointer">
                        <motion.div
                            className="absolute inset-0 w-full h-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                        >
                            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                                <path
                                    id={`textPath-${index}`}
                                    d="M 50, 50 m -32, 0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0"
                                    fill="none"
                                />
                                <text className="font-circular text-[10px] uppercase font-bold tracking-[0.165em]" fill="currentColor">
                                    <textPath href={`#textPath-${index}`} startOffset="0%">
                                        VIEW CASE STUDY • VIEW CASE STUDY • 
                                    </textPath>
                                </text>
                            </svg>
                        </motion.div>
                        <span className="text-xl md:text-3xl font-light scale-x-[-1] rotate-90 relative z-10 transition-transform duration-300 group-hover:rotate-45">↙</span>
                    </div>
                </motion.div>
            </div>

            {/* Metadata & Description (Stacked below natively) */}
            <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end px-4 md:px-12 lg:px-16 mt-6 md:mt-10 gap-6 md:w-[90%] lg:w-[85%] mx-auto">
                <motion.div variants={itemVariants} className="flex gap-4 font-mono text-[10px] md:text-[11px] tracking-widest uppercase opacity-60">
                    <span>{index}</span>
                    <span>—</span>
                    <span>{category} / {targetYear}</span>
                </motion.div>

                <AnimatedText
                    el="p"
                    className="font-circular text-base md:text-xl lg:text-[22px] leading-relaxed opacity-80 max-w-[400px] md:max-w-[450px]"
                    text={description}
                    delay={0.2}
                    staggerDuration={0.1}
                />
            </div>
            
        </motion.div>
    );
};

export default function FeaturedWorksSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Parallax background map
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as const }
        },
    };

    const textRevealVariants: Variants = {
        hidden: { y: "100%" },
        show: {
            y: 0,
            transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as const }
        }
    };

    return (
        <section ref={containerRef} className="w-full flex flex-col items-center py-24 md:py-32 gap-16 md:gap-32 relative overflow-hidden bg-[#3F352C] text-[#E8E3DA]" id="work" aria-labelledby="work-heading">
            {/* Massive Background Parallax Text Layer */}
            <motion.div 
                className="absolute inset-0 z-[-1] flex justify-center items-center pointer-events-none opacity-[0.04] select-none"
                style={{ y: backgroundY }}
            >
                <div className="font-monument text-[30vw] leading-none whitespace-nowrap tracking-widest text-[#E8E3DA]">
                    WORKS
                </div>
            </motion.div>

            {/* Section Title */}
            <motion.h2
                id="work-heading"
                className="flex items-center gap-2 md:gap-4 lg:gap-8 font-monument text-[18px] sm:text-2xl md:text-4xl lg:text-[49px] uppercase tracking-tight px-4 md:px-12 lg:px-16 w-full max-w-[1400px]"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="relative overflow-hidden w-full flex justify-between items-center border-b border-current pb-4 md:pb-8">
                    <motion.div className="flex items-center gap-2 md:gap-4" variants={textRevealVariants}>
                        <span>WO</span>
                        <span className="text-transparent" style={{ WebkitTextStroke: "1px #E8E3DA" }}>R</span>
                        <span>KS</span>
                    </motion.div>
                    <motion.span className="block text-xs md:text-sm tracking-widest uppercase opacity-60 font-mono" variants={textRevealVariants}>
                        ( Selected )
                    </motion.span>
                </div>
            </motion.h2>

            {/* Projects Container (Standardized format) */}
            <motion.div
                className="w-full flex flex-col gap-24 md:gap-40 lg:gap-56 max-w-[1700px]"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Project 1: TEAURE */}
                <ProjectCard
                    index="01"
                    category="E-COMMERCE"
                    targetYear="2026"
                    title="TEAURE"
                    description="Organic blends crafted for calm, presence, and unmatched holistic purity."
                    videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                    containerVariants={containerVariants}
                    itemVariants={itemVariants}
                />

                {/* Project 2: CREATIVE ANTS */}
                <ProjectCard
                    index="02"
                    category="AGENCY SITE"
                    targetYear="2025"
                    title="CREATIVE ANTS"
                    description="A modern creative agency pushing the absolute boundaries of spatial interaction and web design."
                    videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
                    containerVariants={containerVariants}
                    itemVariants={itemVariants}
                />
            </motion.div>
        </section>
    );
}
