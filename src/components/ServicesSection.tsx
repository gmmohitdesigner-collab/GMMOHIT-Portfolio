"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

const services = [
    { 
        id: "01", 
        title: "STRATEGY", 
        subtitle: "& DIRECTION", 
        desc: "Defining the core purpose and identifying the pathways to elevate your digital presence." 
    },
    { 
        id: "02", 
        title: "VISUAL", 
        subtitle: "DESIGN", 
        desc: "Creating pixel-perfect, brutalist, and highly aesthetic interfaces that demand attention." 
    },
    { 
        id: "03", 
        title: "CREATIVE", 
        subtitle: "DEVELOPMENT", 
        desc: "Bringing static pixels to life with physics-driven motion, WebGL, and precise implementation." 
    },
];

export default function ServicesSection() {
    const containerRef = useRef<HTMLElement>(null);
    
    // Parallax background map
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

    const textRevealVariants: Variants = {
        hidden: { y: "120%", opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
        }
    };

    const lineVariants: Variants = {
        hidden: { scaleX: 0 },
        show: {
            scaleX: 1,
            transition: { duration: 1.2, ease: [0.33, 1, 0.68, 1] }
        }
    };

    return (
        <section 
            ref={containerRef} 
            className="w-full flex flex-col items-center py-32 md:py-48 lg:py-64 relative overflow-hidden bg-[#3F352C] text-[#E8E3DA]" 
            id="services" 
            aria-labelledby="services-heading"
        >
            {/* Massive Background Parallax Text Layer */}
            <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center pointer-events-none opacity-[0.03] select-none z-0"
                style={{ y: backgroundY }}
            >
                <div className="font-monument text-[25vw] leading-none whitespace-nowrap tracking-widest text-[#E8E3DA]">
                    SKILLS
                </div>
            </motion.div>

            {/* Container */}
            <div className="w-full max-w-[1700px] px-4 md:px-12 lg:px-16 flex flex-col z-10">
                
                {/* Section Title Header */}
                <motion.div 
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ staggerChildren: 0.2 }}
                    className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-32 gap-8"
                >
                    <div className="overflow-hidden pb-4">
                        <motion.h2 variants={textRevealVariants} id="services-heading" className="flex items-baseline text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] uppercase tracking-tighter m-0 leading-[0.8] whitespace-nowrap">
                            <span className="font-monument">SERV</span>
                            <span className="font-serif italic font-light lowercase md:ml-2 tracking-normal text-transparent" style={{ WebkitTextStroke: "1px #E8E3DA" }}>ices</span>
                        </motion.h2>
                    </div>

                    <div className="overflow-hidden pb-4">
                        <motion.span variants={textRevealVariants} className="block text-xs md:text-sm tracking-widest uppercase opacity-60 font-mono">
                            ( Disciplines )
                        </motion.span>
                    </div>
                </motion.div>

                {/* Services Accordion List */}
                <ul className="w-full flex flex-col p-0 m-0 list-none">
                    {/* Top Top Border */}
                    <motion.div 
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={lineVariants}
                        className="w-full h-[1px] bg-[#E8E3DA] opacity-20 origin-left"
                    />

                    {services.map((service, index) => (
                        <motion.li
                            key={service.id}
                            className="w-full group cursor-pointer relative"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
                        >
                            <div className="w-full flex flex-col lg:flex-row items-start lg:items-center py-8 md:py-16 gap-6 md:gap-12 relative z-10 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:px-4 md:group-hover:px-8">
                                
                                {/* Identifier Row */}
                                <div className="w-full lg:w-[10%] flex overflow-hidden">
                                    <motion.span variants={textRevealVariants} className="font-mono text-xs md:text-sm opacity-50 transition-opacity duration-300 group-hover:opacity-100">
                                        [ {service.id} ]
                                    </motion.span>
                                </div>
                                
                                {/* Title Group */}
                                <div className="w-full lg:w-[50%] flex flex-col lg:flex-row lg:items-baseline overflow-hidden">
                                    <motion.h3 variants={textRevealVariants} className="font-monument text-3xl md:text-5xl lg:text-7xl tracking-tighter uppercase transition-all duration-500 ease-out group-hover:text-transparent group-hover:[-webkit-text-stroke:1px_#E8E3DA]">
                                        {service.title} 
                                        <span className="block lg:inline-block font-serif italic font-light lowercase text-2xl md:text-4xl lg:text-6xl tracking-normal opacity-70 group-hover:opacity-100 lg:ml-4 lg:translate-y-[-0.1em] transition-all duration-500">
                                            {service.subtitle}
                                        </span>
                                    </motion.h3>
                                </div>

                                {/* Description */}
                                <div className="w-full lg:w-[40%] flex overflow-hidden lg:justify-end">
                                    <motion.p variants={textRevealVariants} className="font-circular text-sm md:text-base lg:text-lg opacity-60 max-w-[320px] lg:text-right transition-all duration-500 group-hover:opacity-100">
                                        {service.desc}
                                    </motion.p>
                                </div>
                                
                                {/* Hover Expanding Background */}
                                <div className="absolute inset-0 bg-[#E8E3DA] scale-y-0 origin-center transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-y-100 z-[-1] opacity-[0.03] pointer-events-none" />
                            </div>

                            {/* Bottom Divider */}
                            <motion.div 
                                variants={lineVariants}
                                className="w-full h-[1px] bg-[#E8E3DA] opacity-20 origin-left transition-all duration-500 group-hover:opacity-50"
                            />
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
