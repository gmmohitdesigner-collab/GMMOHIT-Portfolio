"use client";

import { motion } from "framer-motion";

interface Insight {
    title: string;
    description: string;
}

interface InsightsSectionProps {
    insights: Insight[];
}

export default function InsightsSection({ insights }: InsightsSectionProps) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <motion.section 
            className="w-full max-w-[1400px] mx-auto px-4 md:px-12 py-16 md:py-32 flex flex-col gap-16 md:gap-32"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
                visible: { transition: { staggerChildren: 0.15 } }
            }}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
                {insights.map((insight, idx) => (
                    <motion.div key={idx} className="flex flex-col gap-6" variants={fadeUpVariants}>
                        <span className="font-mono text-sm opacity-30 border-b border-black/10 pb-4 w-full">0{idx + 1}</span>
                        <h4 className="font-circular text-2xl md:text-3xl font-medium tracking-tight mt-4">{insight.title}</h4>
                        <p className="font-circular text-lg opacity-60 leading-relaxed whitespace-pre-line">{insight.description}</p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
