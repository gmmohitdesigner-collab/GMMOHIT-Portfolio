"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AsciiTorus from "./AsciiTorus";

export default function ServicesSection() {
    const targetRef = useRef<HTMLElement>(null);
    // We have 4 slides: Title Slide + 3 Services.
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Translate from 0 to -75% (since 4 panels = 400vw, -75% of 400vw = -300vw, showing the 4th panel)
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
    
    // Progress bar width
    const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
            desc: "Bringing static pixels to life with physics-driven motion and precise, considered implementation."
        },
    ];

    return (
        <>
            {/* Mobile Fallback: Vertical Stack */}
            <section className="w-full flex flex-col bg-[#3F352C] text-[#E8E3DA] py-24 px-4 gap-24 md:hidden" id="services-mobile">
                {/* Slide 1 Mobile Equivalent */}
                <div className="flex flex-col gap-12 min-h-[80svh] justify-center relative">
                    <p className="font-circular text-xl leading-tight max-w-sm">
                        Most designers make things look good. I make things feel inevitable — where every pixel has a reason.
                    </p>
                    <div className="w-full flex justify-center py-16 opacity-80 mix-blend-screen text-[#E8E3DA]" aria-hidden="true">
                        <AsciiTorus />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between font-mono text-xs opacity-50">
                            <span>GM MOHIT</span>
                            <span>/2026/</span>
                        </div>
                        {/* Fluid, not text-5xl. "Services@26" is a single unbreakable
                            token and Monument Extended is a very wide face: at a fixed
                            48px it renders 428px of text into a 312px box on a 344px
                            phone, which widened the whole document to 444px and dragged
                            every fixed/inset-0 element (nav, PageTransition) out with it.
                            9vw keeps it inside the padding on a Z Fold cover screen and
                            still reaches the original 48px from ~533px up. */}
                        <h2 className="font-monument text-[clamp(1.75rem,9vw,3rem)] text-[#E8E3DA] tracking-tighter uppercase leading-[0.8]">
                            Services@26
                        </h2>
                    </div>
                </div>

                {/* Services Mobile */}
                {services.map((svc) => (
                    <div key={svc.id} className="flex flex-col border-t border-[#E8E3DA]/20 pt-8 gap-4">
                        <span className="font-mono text-sm opacity-50">({svc.id})</span>
                        <h3 className="font-monument text-3xl tracking-tighter uppercase">
                            {svc.title} <br/><span className="font-serif italic font-light lowercase text-[#E8E3DA]">{svc.subtitle}</span>
                        </h3>
                        <p className="font-circular opacity-70 text-sm mt-4">{svc.desc}</p>
                    </div>
                ))}
            </section>

            {/* Desktop Horizontal Scroll */}
            <section 
                ref={targetRef} 
                /* Scroll-distance track — see note in creative-ants: stays `vh`. */
                className="w-full relative h-[400vh] bg-[#3F352C] text-[#E8E3DA] hidden md:block" 
                id="services"
            >
                <div className="sticky top-0 h-[100svh] overflow-hidden flex items-center">
                    <motion.div 
                        style={{ x }} 
                        className="flex w-[400vw] h-full relative"
                    >
                        {/* Slide 1: Title Screen (Screenshot Match) */}
                        <div className="w-screen h-full flex flex-col relative px-12 lg:px-24 py-16">
                            {/* Top Left Quote */}
                            <div className="w-full max-w-[500px] mt-8">
                                <p className="font-circular text-2xl lg:text-[2rem] leading-[1.1] tracking-tight m-0">
                                    Most designers make things look good. I make things feel inevitable — where every pixel has a reason.
                                </p>
                            </div>

                            {/* Middle Axis Labels */}
                            <div className="absolute top-1/2 -translate-y-1/2 left-12 lg:left-24">
                                <span className="font-mono text-xs tracking-widest opacity-40">GM MOHIT</span>
                            </div>
                            <div className="absolute top-1/2 -translate-y-1/2 right-12 lg:right-24">
                                <span className="font-mono text-xs tracking-widest opacity-40">/2026/</span>
                            </div>

                            {/* Scroll Badge */}
                            <div className="absolute top-[40%] right-12 lg:right-32 bg-[#E8E3DA] text-[#3F352C] px-2 py-1">
                                <span className="font-mono text-[10px] tracking-widest font-bold uppercase">Scroll</span>
                            </div>

                            {/* Center Graphic */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] flex items-center justify-center opacity-90 text-[#E8E3DA] mix-blend-screen pointer-events-none" aria-hidden="true">
                                <AsciiTorus />
                            </div>

                            {/* Bottom Left Title */}
                            <div className="absolute bottom-16 left-12 lg:left-24">
                                <h2 className="font-monument text-[12vw] text-[#E8E3DA] tracking-tighter leading-[0.75] m-0">
                                    Services@26
                                </h2>
                            </div>
                        </div>

                        {/* Slides 2, 3, 4: Service Cards */}
                        {services.map((svc, idx) => (
                            <div key={svc.id} className="w-screen h-full flex items-center justify-center p-12 lg:p-32">
                                <div className="w-full max-w-[1200px] h-full max-h-[800px] flex flex-col justify-between border-l-2 border-[#E8E3DA]/50 pl-12 py-12 relative group hover:border-[#E8E3DA] transition-colors duration-500">
                                    
                                    <div className="flex justify-between items-start w-full">
                                        <span className="font-mono text-lg lg:text-2xl opacity-50">({svc.id})</span>
                                        {/* Tech glitch aesthetic element */}
                                        <span className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity text-[#E8E3DA]">*SYS_MODULE_ACTIVE</span>
                                    </div>

                                    <div className="flex flex-col gap-8">
                                        <h3 className="font-monument text-[6vw] lg:text-[8vw] tracking-tighter uppercase leading-[0.8] m-0">
                                            {svc.title} <br/>
                                            <span className="font-serif italic font-light lowercase text-[#E8E3DA]">
                                                {svc.subtitle}
                                            </span>
                                        </h3>
                                        <p className="font-circular text-xl lg:text-3xl max-w-2xl opacity-70 leading-tight">
                                            {svc.desc}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        ))}

                    </motion.div>

                    {/* Fixed Progress Bar (Bottom Edge) */}
                    <motion.div 
                        className="absolute bottom-0 left-0 h-1 bg-[#E8E3DA]" 
                        style={{ width: progressWidth }} 
                    />
                </div>
            </section>
        </>
    );
}
