"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface MetadataItem {
    label: string;
    value: string;
}

interface HeroSectionProps {
    title: string;
    description: string;
    bgVisualSrc: string;
    mainUiSrc: string;
    floatingElements?: string[];
    metadata: MetadataItem[];
}

export default function HeroSection({ title, description, bgVisualSrc, mainUiSrc, floatingElements, metadata }: HeroSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    
    // Parallax for midground and foreground
    const midgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <section ref={containerRef} className="w-full min-h-[100vh] relative flex items-center overflow-hidden bg-[#1a1512]">
            {/* DEPTH LEVEL 1: Background */}
            <motion.div 
                className="absolute inset-0 w-full h-full"
                style={{ scale: bgScale, y: bgY }}
            >
                <Image 
                    src={bgVisualSrc} 
                    alt="Atmospheric Background" 
                    fill 
                    className="object-cover opacity-80 blur-[8px]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a1512]/60 via-[#1a1512]/20 to-[#1a1512]/80" />
                <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
            </motion.div>

            <div className="w-full max-w-[1600px] mx-auto px-4 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 mt-24 md:mt-0">
                
                {/* Text (Left Side) */}
                <motion.div 
                    className="w-full md:w-[45%] flex flex-col gap-8 text-[#fcf5ee] relative z-30"
                    style={{ y: textY }}
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.15 } }
                    }}
                >
                    <div className="flex flex-col gap-6">
                        <motion.h1 
                            className="font-monument text-[16vw] md:text-[8vw] leading-[0.85] tracking-tighter uppercase drop-shadow-2xl"
                            variants={fadeUpVariants}
                        >
                            {title}
                        </motion.h1>
                        
                        <motion.p 
                            className="font-circular text-xl md:text-2xl leading-relaxed opacity-80 max-w-[480px]"
                            variants={fadeUpVariants}
                        >
                            {description}
                        </motion.p>
                    </div>

                    <motion.div 
                        className="grid grid-cols-2 gap-8 md:gap-12 mt-8 pt-8 border-t border-white/10 max-w-[480px]"
                        variants={fadeUpVariants}
                    >
                        {metadata.map((item, idx) => (
                            <div key={idx} className="flex flex-col gap-1">
                                <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest opacity-40">{item.label}</span>
                                <span className="font-circular text-sm md:text-base font-medium">{item.value}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* DEPTH LEVEL 2 & 3: Midground and Foreground UI */}
                <div className="w-full md:w-[60%] h-[60vh] md:h-[90vh] relative perspective-1000 flex items-center justify-center md:justify-end mt-12 md:mt-0">
                    
                    {/* Midground: Main UI Mockup */}
                    <motion.div 
                        className="absolute right-0 md:right-[-10%] w-[90%] md:w-[80%] aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 z-20"
                        style={{ 
                            y: midgroundY,
                            rotateY: -12,
                            rotateX: 5,
                            z: -100
                        }}
                        initial={{ opacity: 0, y: 100, rotateY: -20 }}
                        animate={{ opacity: 1, y: 0, rotateY: -12 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    >
                        <Image src={mainUiSrc} alt="Main UI Mockup" fill className="object-cover" priority />
                    </motion.div>

                    {/* Foreground: Floating Elements */}
                    {floatingElements && floatingElements.map((src, idx) => (
                        <motion.div
                            key={idx}
                            className={`absolute z-30 rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/20 backdrop-blur-md bg-white/5 ${idx === 0 ? 'w-[40%] bottom-[10%] left-[5%]' : 'w-[30%] top-[20%] right-[-5%]'}`}
                            style={{ 
                                y: foregroundY,
                                rotateY: idx === 0 ? 5 : -5,
                                z: 50
                            }}
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 + (idx * 0.2) }}
                        >
                            <div className="relative w-full aspect-[4/3]">
                                <Image src={src} alt={`Floating UI ${idx + 1}`} fill className="object-cover" />
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
