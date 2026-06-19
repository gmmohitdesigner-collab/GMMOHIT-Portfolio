"use client";

import { motion } from "framer-motion";

interface Metric {
    value: string;
    label: string;
}

interface OutcomeSectionProps {
    heading?: string;
    statement: string;
    metrics?: Metric[];
}

export default function OutcomeSection({ heading = "Outcome & Impact", statement, metrics }: OutcomeSectionProps) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <section className="w-full bg-[#111111] text-[#fcf5ee] py-32 md:py-48">
            <motion.div 
                className="w-full max-w-[1400px] mx-auto px-4 md:px-12 flex flex-col gap-24 md:gap-32"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    visible: { transition: { staggerChildren: 0.15 } }
                }}
            >
                <motion.div variants={fadeUpVariants} className="flex flex-col gap-8 max-w-4xl">
                    <h2 className="font-mono text-xs uppercase tracking-widest opacity-40">{heading}</h2>
                    <p className="font-circular text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.2] opacity-90 whitespace-pre-line">
                        {statement}
                    </p>
                </motion.div>

                {metrics && metrics.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12 border-t border-white/10 pt-24">
                        {metrics.map((metric, idx) => (
                            <motion.div key={idx} className="flex flex-col gap-4" variants={fadeUpVariants}>
                                <span className="font-monument text-6xl md:text-7xl lg:text-[100px] leading-[0.9] tracking-tighter text-white">{metric.value}</span>
                                <span className="font-circular text-lg md:text-xl opacity-50 leading-snug">{metric.label}</span>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </section>
    );
}
