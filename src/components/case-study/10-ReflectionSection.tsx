"use client";

import { motion } from "framer-motion";

interface ReflectionSectionProps {
    learnings: string[];
    futureScope?: string[];
    closingThought?: string;
}

export default function ReflectionSection({ learnings, futureScope, closingThought }: ReflectionSectionProps) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <section className="w-full bg-[#fcf5ee] py-32 md:py-48">
            <motion.div 
                className="w-full max-w-[1400px] mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 md:gap-32"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    visible: { transition: { staggerChildren: 0.15 } }
                }}
            >
                {/* Left Side: Title */}
                <motion.div variants={fadeUpVariants} className="flex flex-col gap-4">
                    <h2 className="font-mono text-xs uppercase tracking-widest opacity-40">Reflection</h2>
                    <h3 className="font-circular text-4xl md:text-5xl font-medium leading-tight">Looking Back</h3>
                </motion.div>

                {/* Right Side: Bullet points */}
                <motion.div className="flex flex-col gap-16" variants={fadeUpVariants}>
                    <div className="flex flex-col gap-8">
                        <h4 className="font-circular text-xl md:text-2xl opacity-50 border-b border-black/10 pb-4">Key Learnings</h4>
                        <ul className="flex flex-col gap-6 font-circular text-xl md:text-2xl leading-relaxed opacity-80 list-none">
                            {learnings.map((learning, idx) => (
                                <li key={idx} className="flex gap-6 items-start">
                                    <span className="opacity-40 mt-1">—</span>
                                    <span>{learning}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {futureScope && futureScope.length > 0 && (
                        <div className="flex flex-col gap-8">
                            <h4 className="font-circular text-xl md:text-2xl opacity-50 border-b border-black/10 pb-4">Future Scope</h4>
                            <ul className="flex flex-col gap-6 font-circular text-xl md:text-2xl leading-relaxed opacity-80 list-none">
                                {futureScope.map((scope, idx) => (
                                    <li key={idx} className="flex gap-6 items-start">
                                        <span className="opacity-40 mt-1">—</span>
                                        <span>{scope}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </motion.div>
            </motion.div>

            {/* Full Width Closing Thought */}
            {closingThought && (
                <motion.div 
                    className="w-full max-w-[1400px] mx-auto px-4 md:px-12 mt-24 md:mt-32 pt-16 md:pt-24 border-t border-black/10 text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUpVariants}
                >
                    <p className="font-circular text-2xl md:text-4xl leading-relaxed font-medium opacity-80 max-w-4xl mx-auto whitespace-pre-line">
                        {closingThought}
                    </p>
                </motion.div>
            )}
        </section>
    );
}
