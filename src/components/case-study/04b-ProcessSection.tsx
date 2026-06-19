"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProcessStep {
    title: string;
    description: string;
    imageSrc: string;
}

interface ProcessSectionProps {
    heading: string;
    subheading?: string;
    steps: ProcessStep[];
}

export default function ProcessSection({ heading, subheading, steps }: ProcessSectionProps) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <section className="w-full bg-[#f4f0ec] py-24 md:py-48 text-[#1a1512] overflow-hidden">
            <motion.div 
                className="w-full max-w-[1400px] mx-auto px-4 md:px-12 flex flex-col gap-16 md:gap-32"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    visible: { transition: { staggerChildren: 0.2 } }
                }}
            >
                {/* Header */}
                <motion.div variants={fadeUpVariants} className="flex flex-col gap-6 max-w-4xl">
                    <h2 className="font-mono text-xs uppercase tracking-widest opacity-40">{heading}</h2>
                    {subheading && (
                        <h3 className="font-circular text-3xl md:text-5xl lg:text-[60px] font-medium leading-[1.1]">{subheading}</h3>
                    )}
                </motion.div>

                {/* Process Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                    {steps.map((step, idx) => (
                        <motion.div key={idx} variants={fadeUpVariants} className="flex flex-col gap-8">
                            <div className="relative w-full aspect-[4/3] bg-black/5 overflow-hidden rounded-sm">
                                {/* Placeholder logic - remove the conditional if real images are always provided */}
                                {step.imageSrc ? (
                                    <Image 
                                        src={step.imageSrc} 
                                        alt={step.title} 
                                        fill 
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-30 font-mono text-sm uppercase">
                                        [ Placeholder Image ]
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-4">
                                <span className="font-mono text-sm opacity-40">0{idx + 1}</span>
                                <h4 className="font-circular text-2xl font-medium">{step.title}</h4>
                                <p className="font-circular text-lg opacity-70 leading-relaxed whitespace-pre-line">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
