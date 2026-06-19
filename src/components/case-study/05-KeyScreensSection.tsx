"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LayeredComposition {
    title: string;
    description: string;
    mainVisual: string;
    zoomedVisuals?: string[];
}

interface KeyScreensSectionProps {
    heading: string;
    subheading: string;
    description?: string;
    compositions: LayeredComposition[];
}

export default function KeyScreensSection({ heading, subheading, description, compositions }: KeyScreensSectionProps) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <section className="w-full bg-[#fcf5ee] py-24 md:py-48 overflow-hidden">
            <motion.div 
                className="w-full max-w-[1600px] mx-auto px-4 md:px-12 flex flex-col gap-32 md:gap-48"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    visible: { transition: { staggerChildren: 0.2 } }
                }}
            >
                <motion.div variants={fadeUpVariants} className="flex flex-col gap-6 text-center items-center">
                    <h2 className="font-mono text-xs uppercase tracking-widest opacity-40">{heading}</h2>
                    <h3 className="font-circular text-3xl md:text-5xl lg:text-[70px] font-medium leading-[1.1] max-w-4xl">{subheading}</h3>
                    {description && (
                        <p className="font-circular text-xl opacity-70 max-w-3xl leading-relaxed mt-4 whitespace-pre-line">
                            {description}
                        </p>
                    )}
                </motion.div>

                <div className="flex flex-col gap-32 md:gap-64">
                    {compositions.map((comp, idx) => (
                        <motion.div key={idx} className="flex flex-col items-center gap-16 md:gap-24 w-full" variants={fadeUpVariants}>
                            
                            {/* Layered Composition Block */}
                            <div className="w-full relative flex items-center justify-center min-h-[60vh] md:min-h-[90vh]">
                                {/* Main Visual (Full Width Container) */}
                                <div className="absolute inset-0 w-full h-full bg-[#e8e6e1] rounded-[2rem] overflow-hidden shadow-2xl">
                                    <Image 
                                        src={comp.mainVisual} 
                                        alt={comp.title} 
                                        fill 
                                        className="object-cover opacity-90 hover:scale-105 transition-transform duration-[1.5s]"
                                    />
                                </div>
                                
                                {/* Floating Zoomed Details (Overlapping) */}
                                {comp.zoomedVisuals && comp.zoomedVisuals.length > 0 && (
                                    <div className="relative z-10 w-full max-w-[1200px] flex justify-between px-8 md:px-16 pointer-events-none">
                                        {comp.zoomedVisuals.map((zoomSrc, zIdx) => (
                                            <motion.div 
                                                key={zIdx}
                                                className={`w-[40%] md:w-[30%] aspect-square relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#fcf5ee] ${zIdx % 2 === 0 ? 'mt-[-10%]' : 'mb-[-10%] self-end'}`}
                                                initial={{ y: zIdx % 2 === 0 ? 50 : -50, opacity: 0 }}
                                                whileInView={{ y: 0, opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.2 * zIdx }}
                                            >
                                                <Image src={zoomSrc} alt="UI Detail" fill className="object-cover scale-110" />
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Text Block directly below */}
                            <div className="max-w-3xl text-center flex flex-col gap-6">
                                <h4 className="font-circular text-2xl md:text-4xl font-medium">{comp.title}</h4>
                                <p className="font-circular text-xl md:text-2xl opacity-70 leading-relaxed whitespace-pre-line">{comp.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
