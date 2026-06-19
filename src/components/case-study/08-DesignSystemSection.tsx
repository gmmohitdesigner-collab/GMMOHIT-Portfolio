"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface DesignSystemSectionProps {
    heading: string;
    subheading: string;
    description: string;
    colors: string[];
    typographyImageSrc?: string;
    componentsImageSrc?: string;
}

export default function DesignSystemSection({ heading, subheading, description, colors, typographyImageSrc, componentsImageSrc }: DesignSystemSectionProps) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <section className="w-full bg-[#fcf5ee] py-24 md:py-48">
            <motion.div 
                className="w-full max-w-[1600px] mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 md:gap-32"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    visible: { transition: { staggerChildren: 0.15 } }
                }}
            >
                {/* Left Side: Explanation (Sticky) */}
                <motion.div variants={fadeUpVariants} className="flex flex-col gap-8 md:sticky md:top-32 self-start">
                    <h2 className="font-mono text-xs uppercase tracking-widest opacity-40">{heading}</h2>
                    <h3 className="font-circular text-4xl md:text-5xl font-medium leading-tight">{subheading}</h3>
                    <p className="font-circular text-xl leading-relaxed opacity-70 whitespace-pre-line">
                        {description}
                    </p>
                </motion.div>

                {/* Right Side: Visuals */}
                <div className="flex flex-col gap-12 md:gap-24 pt-8 md:pt-0">
                    
                    {/* Colors */}
                    <motion.div variants={fadeUpVariants} className="flex flex-col gap-6">
                        <h4 className="font-circular text-lg opacity-40">Color Palette</h4>
                        <div className="flex h-32 md:h-48 rounded-[2rem] overflow-hidden shadow-xl border border-black/5">
                            {colors.map((color, idx) => (
                                <div key={idx} className="flex-1 transition-all duration-300 hover:flex-[1.5]" style={{ backgroundColor: color }} />
                            ))}
                        </div>
                    </motion.div>

                    {/* Typography */}
                    {typographyImageSrc && (
                        <motion.div variants={fadeUpVariants} className="flex flex-col gap-6">
                            <h4 className="font-circular text-lg opacity-40">Typography</h4>
                            <div className="w-full aspect-[4/3] relative bg-[#e8e6e1] rounded-[2rem] overflow-hidden shadow-xl border border-black/5">
                                <Image src={typographyImageSrc} alt="Typography Scale" fill className="object-cover" />
                            </div>
                        </motion.div>
                    )}

                    {/* Components */}
                    {componentsImageSrc && (
                        <motion.div variants={fadeUpVariants} className="flex flex-col gap-6">
                            <h4 className="font-circular text-lg opacity-40">Components</h4>
                            <div className="w-full aspect-[4/3] relative bg-[#e8e6e1] rounded-[2rem] overflow-hidden shadow-xl border border-black/5">
                                <Image src={componentsImageSrc} alt="UI Components" fill className="object-cover" />
                            </div>
                        </motion.div>
                    )}

                </div>
            </motion.div>
        </section>
    );
}
