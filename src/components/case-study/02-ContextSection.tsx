"use client";

import { motion } from "framer-motion";

interface ContextSectionProps {
    heading: string;
    paragraph: string;
    bullets?: string[];
}

export default function ContextSection({ heading, paragraph, bullets }: ContextSectionProps) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <motion.section 
            className="w-full max-w-[1400px] mx-auto px-4 md:px-12 py-24 md:py-48 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 md:gap-32"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
                visible: { transition: { staggerChildren: 0.2 } }
            }}
        >
            <motion.div variants={fadeUpVariants} className="flex flex-col gap-4">
                <h3 className="font-circular text-3xl md:text-5xl font-medium leading-tight">{heading}</h3>
            </motion.div>

            <motion.div className="flex flex-col gap-8" variants={fadeUpVariants}>
                <p className="font-circular text-xl md:text-[28px] leading-[1.6] md:leading-[1.8] opacity-80 max-w-3xl whitespace-pre-line">
                    {paragraph}
                </p>
                
                {bullets && bullets.length > 0 && (
                    <ul className="flex flex-col gap-6 font-circular text-lg md:text-xl opacity-70 list-none mt-8">
                        {bullets.map((bullet, idx) => (
                            <li key={idx} className="flex gap-6 items-start">
                                <span className="opacity-40 mt-1.5">—</span>
                                <span className="leading-relaxed">{bullet}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </motion.div>
        </motion.section>
    );
}
