"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface SolutionSectionProps {
    heading?: string;
    approachText: string;
    visualSrc: string;
    isVideo?: boolean;
    align?: "left" | "right";
}

export default function SolutionSection({ heading = "The Approach", approachText, visualSrc, isVideo = false, align = "left" }: SolutionSectionProps) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <section className="w-full py-24 md:py-48 overflow-hidden">
            <motion.div 
                className={`w-full max-w-[1600px] mx-auto px-4 md:px-12 flex flex-col gap-16 md:gap-32 items-center ${align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    visible: { transition: { staggerChildren: 0.2 } }
                }}
            >
                {/* Text Block */}
                <motion.div variants={fadeUpVariants} className="w-full md:w-[40%] flex flex-col gap-8 md:px-12">
                    <h2 className="font-circular text-3xl md:text-5xl font-medium leading-tight">{heading}</h2>
                    <p className="font-circular text-xl md:text-2xl leading-relaxed opacity-70 whitespace-pre-line">
                        {approachText}
                    </p>
                </motion.div>

                {/* Massive Image Block */}
                <motion.div 
                    className="w-full md:w-[60%] aspect-[4/3] md:aspect-[16/10] bg-[#3F352C] relative overflow-hidden rounded-[2rem] shadow-2xl"
                    variants={fadeUpVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    {isVideo ? (
                        <video 
                            autoPlay 
                            muted 
                            loop 
                            playsInline 
                            className="w-full h-full object-cover"
                        >
                            <source src={visualSrc} type="video/mp4" />
                        </video>
                    ) : (
                        <Image 
                            src={visualSrc} 
                            alt="Solution Overview" 
                            fill 
                            className="object-cover"
                        />
                    )}
                </motion.div>
            </motion.div>
        </section>
    );
}
