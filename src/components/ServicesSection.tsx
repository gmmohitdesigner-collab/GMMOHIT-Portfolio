"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, Variants } from "framer-motion";

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
        subtitle: "DEVELOP", 
        desc: "Bringing static pixels to life with physics-driven motion, WebGL, and precise implementation." 
    },
];

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
    const x = useSpring(0, { stiffness: 100, damping: 20 });
    const y = useSpring(0, { stiffness: 100, damping: 20 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const tiltX = (e.clientX - centerX) / 10; 
        const tiltY = -(e.clientY - centerY) / 10; 
        x.set(tiltX);
        y.set(tiltY);
    };

    const resetMouse = () => {
        x.set(0);  y.set(0);
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, x: 100, rotateY: -15 },
        show: { 
            opacity: 1, 
            x: 0, 
            rotateY: 0,
            transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] } 
        }
    };

    return (
        <motion.div 
            className="w-[75vw] sm:w-[320px] md:w-[360px] lg:w-[400px] flex-shrink-0 perspective-[1200px]"
            variants={cardVariants}
        >
            <motion.div 
                className="w-full aspect-[4/5] bg-[#3F352C] text-[#E8E3DA] flex flex-col justify-between p-6 md:p-8 relative group cursor-pointer shadow-2xl transition-shadow hover:shadow-2xl hover:shadow-[#3F352C]/40 border border-[#3F352C]/10"
                onMouseMove={handleMouse}
                onMouseLeave={resetMouse}
                style={{ rotateX: y, rotateY: x, transformStyle: "preserve-3d" }}
            >
                {/* Large Circular Numerical Index */}
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#E8E3DA] flex items-center justify-center font-mono text-lg md:text-xl z-10 transition-colors duration-500 group-hover:bg-[#E8E3DA] group-hover:text-[#3F352C]">
                    {service.id}
                </div>

                {/* Content */}
                <div className="flex flex-col z-10" style={{ transform: "translateZ(40px)" }}>
                    <h3 className="font-monument text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter leading-none mb-4 pointer-events-none transition-transform duration-500 group-hover:scale-105 origin-left">
                        {service.title}
                        <br/>
                        <span className="font-serif italic font-light lowercase text-2xl md:text-3xl lg:text-4xl tracking-normal opacity-80">{service.subtitle}</span>
                    </h3>
                    <div className="w-full h-px bg-[#E8E3DA]/20 my-4 md:my-6 transition-all duration-500 group-hover:w-[70%]"></div>
                    <p className="font-circular text-xs md:text-sm lg:text-base opacity-80 pointer-events-none group-hover:opacity-100 transition-opacity duration-300">
                        {service.desc}
                    </p>
                </div>
                
                {/* Box Art Internal Overlay for extra 3d depth */}
                <div className="absolute inset-0 border-[1px] border-[#E8E3DA]/20 m-3 md:m-5 pointer-events-none transition-transform duration-500 group-hover:scale-95" style={{ transform: "translateZ(20px)" }}></div>
            </motion.div>
        </motion.div>
    );
}

export default function ServicesSection() {
    const containerRef = useRef<HTMLElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Horizontal scroll mapping: Move the inner container sideways based on vertical scroll of the massive container
    const xMove = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "-45%"]);

    return (
        <section 
            ref={containerRef} 
            className="w-full relative min-h-[300vh] bg-[#E8E3DA] text-[#3F352C] overflow-hidden" 
            id="services" 
            aria-labelledby="services-heading"
        >
            {/* Sticky Container acts as the cinematic viewport for both the content and grain */}
            <div className="w-full h-[100dvh] sticky top-0 flex flex-col justify-center overflow-hidden z-10">
                
                {/* Film Grain Noise Overlay */}
                <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.08] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

                <div className="w-full flex flex-col justify-start relative z-10 mt-8 md:mt-12">
                    {/* Section Title Header */}
                    <div className="w-full px-4 md:px-12 lg:px-[172px] mb-8 md:mb-12">
                        <div className="overflow-hidden">
                            <motion.h2 
                                variants={{ hidden: { y: "120%", opacity: 0, rotate: 2 }, show: { y: 0, opacity: 1, rotate: 0, transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] } } }} 
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                id="services-heading" 
                                className="flex flex-col text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] uppercase tracking-tighter m-0 leading-[0.8] whitespace-nowrap"
                            >
                                <span className="font-monument">MY</span>
                                <span className="font-serif italic font-light lowercase text-transparent" style={{ WebkitTextStroke: "1.5px #3F352C" }}>process</span>
                            </motion.h2>
                        </div>
                    </div>

                    {/* Horizontal Scrolling Grid */}
                    <div className="w-full pl-4 md:pl-12 lg:pl-[172px]" ref={scrollContainerRef}>
                        <motion.div 
                            className="flex gap-8 md:gap-16 items-center w-max pr-[20vw]"
                            style={{ x: xMove }}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ staggerChildren: 0.15, delayChildren: 0.3 }}
                        >
                            {services.map((service, index) => (
                                <ServiceCard key={service.id} service={service} index={index} />
                            ))}
                            
                            {/* Spatztk-style closing empty box */}
                            <motion.div 
                                className="w-[100px] md:w-[200px] aspect-[4/5] border border-[#3F352C]/20 flex items-center justify-center font-mono opacity-50 text-xs md:text-sm tracking-widest uppercase"
                                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                            >
                                END
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
        </section>
    );
}
