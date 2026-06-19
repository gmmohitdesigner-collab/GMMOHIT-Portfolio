"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function CreativeAntsCaseStudy() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.85]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);
    const heroBorderRadius = useTransform(scrollYProgress, [0, 0.2], ["0px", "24px"]);

    return (
        <main className="bg-[#050505] text-white min-h-screen selection:bg-white/20" ref={containerRef}>
            {/* Global Grain Overlay for Premium Feel */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-overlay" style={{ backgroundImage: "url('/noise.png')" }}></div>

            {/* Sticky Nav */}
            <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 mix-blend-difference">
                <Link href="/" className="font-mono text-xs uppercase tracking-widest hover:opacity-70 transition-opacity">
                    [ Back to Index ]
                </Link>
                <div className="font-mono text-xs uppercase tracking-widest opacity-50">
                    2026 / Case Study
                </div>
            </nav>

            {/* Hero Section - Sticky & Scaling */}
            <div className="h-[200vh] w-full relative">
                <motion.div 
                    className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden origin-top"
                    style={{ scale: heroScale, opacity: heroOpacity, borderRadius: heroBorderRadius }}
                >
                    {/* Background Video */}
                    <div className="absolute inset-0 w-full h-full">
                        <video 
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            className="object-cover w-full h-full opacity-40 brightness-75"
                            src="/works/creative-ants/CreativeAnts.mp4"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/20 via-transparent to-[#050505] mix-blend-multiply" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center text-center px-4">
                        <motion.h1 
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-6xl md:text-8xl lg:text-[140px] font-medium tracking-tighter leading-none mb-6"
                        >
                            CREATIVE ANTS
                        </motion.h1>
                        <motion.p 
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="font-mono text-sm md:text-base uppercase tracking-widest opacity-70 max-w-2xl"
                        >
                            Designing a spatial web experience: Blending immersive 3D interfaces with intuitive UX.
                        </motion.p>
                    </div>
                </motion.div>
            </div>

            {/* Content Container */}
            <div className="relative z-20 w-full bg-[#050505] pb-32">
                
                {/* The HR Bento Grid */}
                <section className="max-w-[1400px] mx-auto px-4 md:px-12 py-24 md:py-32">
                    <motion.div 
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-6"
                    >
                        {/* The Problem */}
                        <div className="col-span-1 md:col-span-8 bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <h3 className="font-mono text-xs uppercase tracking-widest opacity-40 mb-8">The Core Challenge</h3>
                            <p className="font-circular text-2xl md:text-4xl leading-snug font-medium text-white/90">
                                How do we design a fully immersive 3D navigation system that feels intuitive to traditional web users without causing motion sickness or confusion?
                            </p>
                        </div>

                        {/* Design System */}
                        <div className="col-span-1 md:col-span-4 bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                            <h3 className="font-mono text-xs uppercase tracking-widest opacity-40 mb-8">The Approach</h3>
                            <ul className="flex flex-col gap-4 font-mono text-sm">
                                <li className="flex justify-between border-b border-white/5 pb-4">
                                    <span className="opacity-60">UX Strategy</span>
                                    <span>Spatial Flow</span>
                                </li>
                                <li className="flex justify-between border-b border-white/5 pb-4">
                                    <span className="opacity-60">Visual Identity</span>
                                    <span>Dark Premium</span>
                                </li>
                                <li className="flex justify-between border-b border-white/5 pb-4">
                                    <span className="opacity-60">Prototyping</span>
                                    <span>Figma to WebGL</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="opacity-60">Execution</span>
                                    <span>Creative Dev</span>
                                </li>
                            </ul>
                        </div>

                        {/* The Impact */}
                        <div className="col-span-1 md:col-span-12 bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="flex-1">
                                <h3 className="font-mono text-xs uppercase tracking-widest opacity-40 mb-4">The Output</h3>
                                <p className="font-circular text-lg opacity-70 max-w-lg">
                                    A multi-award winning digital environment that pushed visual boundaries while maintaining a frictionless user experience.
                                </p>
                            </div>
                            <div className="flex gap-12 md:gap-24">
                                <div>
                                    <p className="text-5xl md:text-7xl font-medium tracking-tighter">SOTD</p>
                                    <p className="font-mono text-xs uppercase tracking-widest opacity-40 mt-2">Awwwards</p>
                                </div>
                                <div>
                                    <p className="text-5xl md:text-7xl font-medium tracking-tighter">2.5x</p>
                                    <p className="font-mono text-xs uppercase tracking-widest opacity-40 mt-2">Engagement Rate</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* The Deep Dive Split Screen */}
                <section className="max-w-[1400px] mx-auto px-4 md:px-12 py-24 border-t border-white/10">
                    <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center">
                        {/* Text / Code Side */}
                        <div className="flex-1 flex flex-col gap-8">
                            <h2 className="font-circular text-4xl md:text-5xl font-medium tracking-tight">Bridging Interface and Space.</h2>
                            <p className="font-circular text-xl opacity-70 leading-relaxed">
                                Great spatial design requires tight collaboration between the UI layer and the 3D canvas. 
                                We designed a motion system where traditional DOM scroll seamlessly drives the camera through a 3D environment, keeping the user in control at all times.
                            </p>
                            
                            {/* Stylized Interaction Block */}
                            <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-6 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto mt-6 shadow-2xl">
                                <div className="flex gap-2 mb-4 opacity-50">
                                    <div className="w-3 h-3 rounded-full bg-white/20" />
                                    <div className="w-3 h-3 rounded-full bg-white/20" />
                                    <div className="w-3 h-3 rounded-full bg-white/20" />
                                </div>
                                <pre className="text-white/70">
                                    <span className="text-[#ff7b72]">const</span> <span className="text-[#79c0ff]">spatialTransition</span> = {`{`}
                                    <br/>
                                    {`  `}/* Scroll-driven motion parameters */
                                    <br/>
                                    {`  `}<span className="text-[#d2a8ff]">trigger</span>: <span className="text-[#a5d6ff]">"viewport-center"</span>,
                                    <br/>
                                    {`  `}<span className="text-[#d2a8ff]">cameraLerp</span>: <span className="text-[#79c0ff]">0.05</span>,
                                    <br/>
                                    {`  `}<span className="text-[#d2a8ff]">easing</span>: <span className="text-[#a5d6ff]">"cubic-bezier(0.16, 1, 0.3, 1)"</span>,
                                    <br/>
                                    {`  `}<span className="text-[#d2a8ff]">uiOverlayOpacity</span>: <span className="text-[#79c0ff]">useScroll</span>(),
                                    <br/>
                                    {`}`}
                                </pre>
                            </div>
                        </div>

                        {/* Visual Side */}
                        <div className="flex-1 w-full aspect-square relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02]">
                            <video 
                                autoPlay 
                                loop 
                                muted 
                                playsInline 
                                className="object-cover w-full h-full opacity-80"
                                src="/works/creative-ants/CreativeAnts.mp4"
                            />
                        </div>
                    </div>
                </section>

                {/* Final Thoughts / Reflection */}
                <section className="max-w-[1400px] mx-auto px-4 md:px-12 py-24 md:py-32 border-t border-white/10 text-center">
                    <h2 className="font-circular text-3xl md:text-5xl font-medium tracking-tight mb-8">Motion is a structural tool.</h2>
                    <p className="font-circular text-xl opacity-70 leading-relaxed max-w-3xl mx-auto">
                        In spatial interfaces, design isn't just about how things look; it's about how they move. By combining rigorous UX principles with high-end creative development, we proved that experimental 3D websites can still be intuitive, accessible, and deeply engaging.
                    </p>
                </section>

            </div>
        </main>
    );
}
