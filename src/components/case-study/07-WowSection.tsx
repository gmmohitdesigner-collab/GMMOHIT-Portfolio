"use client";

import { motion } from "framer-motion";

interface WowSectionProps {
    statement: string;
    subStatement?: string;
}

export default function WowSection({ statement, subStatement }: WowSectionProps) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <section className="w-full min-h-[80vh] bg-[#050505] text-[#fcf5ee] flex flex-col items-center justify-center py-32 md:py-64 relative overflow-hidden">
            {/* Subtle Texture / Noise could be added here via a CSS class or image overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay"></div>
            
            <motion.div 
                className="w-full max-w-[1400px] px-4 md:px-12 flex flex-col items-center justify-center text-center gap-12 relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <motion.h2 
                    className="font-circular text-4xl md:text-7xl lg:text-[100px] font-medium leading-[1.1] tracking-tight max-w-5xl"
                    variants={fadeUpVariants}
                >
                    {statement}
                </motion.h2>
                
                {subStatement && (
                    <motion.p 
                        className="font-circular text-xl md:text-3xl opacity-50 max-w-2xl mt-4 whitespace-pre-line"
                        variants={fadeUpVariants}
                    >
                        {subStatement}
                    </motion.p>
                )}
            </motion.div>
        </section>
    );
}
