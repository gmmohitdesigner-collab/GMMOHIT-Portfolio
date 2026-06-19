"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface FeatureBlock {
    title: string;
    description: string;
    visualSrc: string;
    isVideo?: boolean;
    align?: "left" | "right";
}

interface FeatureBreakdownSectionProps {
    features: FeatureBlock[];
}

export default function FeatureBreakdownSection({ features }: FeatureBreakdownSectionProps) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <section className="w-full bg-[#fcf5ee] py-24 md:py-48 flex flex-col gap-32 md:gap-64 overflow-hidden">
            {features.map((feature, idx) => (
                <motion.div 
                    key={idx} 
                    className={`w-full max-w-[1600px] mx-auto px-4 md:px-12 flex flex-col items-center gap-16 md:gap-32 ${feature.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.2 } }
                    }}
                >
                    {/* Text Block (Subordinate to Visual) */}
                    <motion.div variants={fadeUpVariants} className="w-full md:w-[35%] flex flex-col gap-8 md:px-8">
                        <h4 className="font-circular text-3xl md:text-5xl lg:text-[60px] font-medium leading-[1.1] tracking-tight">{feature.title}</h4>
                        <p className="font-circular text-xl md:text-2xl opacity-70 leading-relaxed whitespace-pre-line">{feature.description}</p>
                    </motion.div>

                    {/* Dominant Visual Block (60-70% of section height) */}
                    <motion.div 
                        className="w-full md:w-[65%] min-h-[50vh] md:min-h-[80vh] relative bg-[#e8e6e1] rounded-[2rem] overflow-hidden shadow-2xl"
                        variants={fadeUpVariants}
                    >
                        {feature.isVideo ? (
                            <video 
                                autoPlay 
                                muted 
                                loop 
                                playsInline 
                                className="w-full h-full object-cover"
                            >
                                <source src={feature.visualSrc} type="video/mp4" />
                            </video>
                        ) : (
                            <Image 
                                src={feature.visualSrc} 
                                alt={feature.title} 
                                fill 
                                className="object-cover"
                            />
                        )}
                    </motion.div>
                </motion.div>
            ))}
        </section>
    );
}
