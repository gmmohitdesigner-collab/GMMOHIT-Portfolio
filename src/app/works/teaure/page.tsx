"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function TeaureCaseStudy() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);

    // Parallax values for floating images
    const floatY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const floatY2 = useTransform(scrollYProgress, [0, 1], [50, -150]);
    const floatY3 = useTransform(scrollYProgress, [0, 1], [-50, 100]);

    return (
        <main className="bg-[#EAE8E3] text-[#1C1C1C] min-h-screen selection:bg-[#1C1C1C] selection:text-[#EAE8E3] overflow-hidden" ref={containerRef}>
            
            {/* Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.2] z-50 mix-blend-multiply" style={{ backgroundImage: "url('/noise.png')" }}></div>

            {/* Persistent Editorial Header */}
            <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-8 mix-blend-difference text-white">
                <div className="font-sans text-[10px] uppercase tracking-[0.2em]">
                    GM MOHIT © 2026
                </div>
                <Link href="/" className="font-sans text-[10px] uppercase tracking-[0.2em] hover:opacity-50 transition-opacity">
                    [ CLOSE ]
                </Link>
            </nav>

            <div className="fixed bottom-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-8 mix-blend-difference text-white pointer-events-none">
                <div className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-50">
                    TEAURE — CONCEPT
                </div>
                <div className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-50">
                    SCROLL TO EXPLORE
                </div>
            </div>

            {/* 01 - Hero Section */}
            <section className="relative min-h-[100vh] w-full flex flex-col justify-center px-6 md:px-12 pt-48 md:pt-32 pb-24">
                <motion.div style={{ y: heroY }} className="z-10 flex flex-col">
                    <h1 className="font-serif text-[15vw] leading-[0.8] tracking-tighter mb-12">
                        Teaure.
                    </h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start mt-8 md:mt-16">
                        <div className="col-span-1 md:col-span-5 lg:col-span-4 flex flex-col gap-8 font-sans text-[11px] uppercase tracking-[0.15em] opacity-70">
                            <div className="flex flex-col gap-2 border-t border-[#1C1C1C]/20 pt-4">
                                <span className="opacity-50">Role</span>
                                <span>Lead Designer & Developer</span>
                            </div>
                            <div className="flex flex-col gap-2 border-t border-[#1C1C1C]/20 pt-4">
                                <span className="opacity-50">Timeline</span>
                                <span>4 Weeks</span>
                            </div>
                            <div className="flex flex-col gap-2 border-t border-[#1C1C1C]/20 pt-4">
                                <span className="opacity-50">Services</span>
                                <span>UI/UX, Frontend, Motion</span>
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-7 lg:col-span-6 lg:col-start-7 flex flex-col gap-6">
                            <p className="font-serif text-2xl md:text-3xl leading-snug">
                                Organic blends crafted for calm, presence, and unmatched holistic purity.
                            </p>
                            <p className="font-sans text-sm md:text-base leading-relaxed opacity-70 max-w-md">
                                A fictional wellness brand created to explore how cinematic storytelling can transform digital commerce into a more immersive experience.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Asymmetrical Floating Hero Image */}
                <motion.div 
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="relative mt-12 md:mt-0 md:absolute md:top-1/4 md:right-[5%] w-full md:w-[40vw] max-w-[500px] aspect-[3/4] z-0 overflow-hidden bg-[#D9D7D2] shadow-2xl mx-auto rounded-[6px]"
                >
                    <div 
                        className="absolute inset-0 w-full h-full bg-cover bg-right opacity-80 mix-blend-multiply"
                        style={{ backgroundImage: "url('/works/teaure/Background Element.png')" }}
                    />
                </motion.div>
            </section>

            {/* 02 - Project Premise */}
            <section className="relative w-full px-6 md:px-12 py-32 md:py-48 flex flex-col items-center border-t border-[#1C1C1C]/10">
                <div className="max-w-4xl text-center flex flex-col items-center relative z-10">
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-50 mb-12 block">
                        01 / The Premise
                    </span>
                    <h2 className="font-serif italic text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-12">
                        Can digital commerce feel as calming and intentional as the ritual of preparing tea?
                    </h2>
                    <p className="font-sans text-lg md:text-xl leading-relaxed opacity-70 max-w-2xl text-left md:text-center">
                        Most wellness websites focus primarily on transactions. This project explores how storytelling, motion, and atmosphere can transform online shopping into a more immersive and emotionally engaging experience. 
                        <br/><br/>
                        Rather than optimizing purely for conversion, the concept investigates how intentional design can create stronger connections between product, brand, and user.
                    </p>
                </div>

                {/* Massive Visual Anchor for Premise */}
                <motion.div style={{ y: floatY1 }} className="w-full md:w-[100vw] h-auto md:h-[80vh] mt-16 md:mt-32 flex items-center justify-center overflow-hidden">
                    <video 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="w-full aspect-square md:w-auto md:h-full md:aspect-square object-cover rounded-[6px] md:rounded-none shadow-sm md:shadow-none"
                    >
                        <source src="/works/teaure/teaure-scroll v2.mp4" type="video/mp4" />
                    </video>
                </motion.div>
            </section>

            {/* 03 & 04 - Context and Insights */}
            <section className="relative w-full px-6 md:px-12 py-32 flex flex-col border-t border-[#1C1C1C]/10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 justify-between">
                    <div className="w-full lg:w-[47%] flex flex-col relative z-10">
                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-50 mb-12 block">
                            02 / Context
                        </span>
                        <h2 className="font-serif text-5xl md:text-6xl tracking-tight leading-none mb-12">
                            Designing for Presence.
                        </h2>
                        <p className="font-sans text-base md:text-lg leading-relaxed opacity-70 whitespace-pre-line">
                            {`Teaure is a conceptual project combining brand creation with product exploration.

The project began with a simple observation:
Most wellness products promise calm, mindfulness, and balance, yet their digital experiences often feel rushed and transactional.

This exploration investigates what happens when the digital experience becomes an extension of the product itself.`}
                        </p>

                        {/* Visual placed below Context and to the left of Insights */}
                        <motion.div style={{ y: floatY2 }} className="relative mt-16 lg:mt-32 w-[90%] lg:w-[85%] lg:ml-auto lg:translate-x-12 rounded-[6px] aspect-[4/5] bg-[#D9D7D2] shadow-2xl z-0 overflow-hidden">
                            <div 
                                className="absolute inset-0 w-full h-full bg-cover bg-center scale-110"
                                style={{ backgroundImage: "url('/works/teaure/Mobilemockup1.png')" }}
                            />
                        </motion.div>
                    </div>

                    <div className="w-full lg:w-[47%] flex flex-col pt-12 lg:pt-32 relative z-10">
                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-50 mb-12 block">
                            03 / Insights
                        </span>
                        <h3 className="font-serif text-3xl md:text-4xl mb-12">The Gap in Wellness Commerce.</h3>
                        
                        <div className="flex flex-col gap-12 font-sans">
                            <div className="flex gap-6 border-b border-[#1C1C1C]/10 pb-8">
                                <span className="text-[10px] opacity-50 font-mono mt-1">01</span>
                                <div>
                                    <h4 className="text-lg uppercase tracking-widest mb-4">Sensory Disconnect</h4>
                                    <p className="opacity-70 leading-relaxed">Digital experiences often feel flat and disconnected from the calming nature of wellness products.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 border-b border-[#1C1C1C]/10 pb-8">
                                <span className="text-[10px] opacity-50 font-mono mt-1">02</span>
                                <div>
                                    <h4 className="text-lg uppercase tracking-widest mb-4">Story Over Specs</h4>
                                    <p className="opacity-70 leading-relaxed">Users frequently connect with mood, rituals, and emotion before evaluating product details.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <span className="text-[10px] opacity-50 font-mono mt-1">03</span>
                                <div>
                                    <h4 className="text-lg uppercase tracking-widest mb-4">Interrupted Flow</h4>
                                    <p className="opacity-70 leading-relaxed">Traditional shopping patterns often disrupt immersion during key moments of discovery.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 05 - Design Constraints */}
            <section className="relative w-full px-6 md:px-12 py-32 border-t border-[#1C1C1C]/10 flex flex-col items-center">
                <div className="w-full max-w-4xl border border-[#1C1C1C]/20 p-10 md:p-24 bg-[#E2DFD8] relative z-10 rounded-[6px] shadow-sm">
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-50 mb-8 block text-center">
                        04 / Realism
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-center mb-12">
                        Designing Within Constraints
                    </h2>
                    <p className="font-sans text-base md:text-lg leading-relaxed opacity-80 text-center max-w-xl mx-auto mb-12">
                        Even within a conceptual project, several constraints shaped design decisions to ensure the project felt grounded in real-world considerations.
                    </p>
                    
                    <ul className="flex flex-col gap-6 font-serif text-xl md:text-2xl text-center max-w-2xl mx-auto">
                        <li className="italic">Rich visuals must not compromise performance.</li>
                        <li className="italic">Motion should support usability rather than distract.</li>
                        <li className="italic">Product information must remain accessible and clear.</li>
                        <li className="italic">Storytelling cannot interfere with discoverability.</li>
                        <li className="italic">The experience must balance atmosphere with conversion intent.</li>
                    </ul>
                </div>
                
                {/* Visual Breakout (Estrela 3-Column Collage) */}
                <motion.div style={{ y: floatY3 }} className="w-full max-w-6xl mt-12 lg:mt-[-100px] relative z-0 flex flex-col lg:flex-row gap-4 lg:gap-6 h-auto lg:h-[60vh]">
                    {/* Left 50% Photo */}
                    <div className="w-full lg:w-1/2 h-[40vh] lg:h-full bg-[#D9D7D2] rounded-[6px] relative overflow-hidden flex items-center justify-center shadow-xl">
                        <div 
                            className="absolute inset-0 w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: "url('/works/teaure/teaure_webshowcase.png')" }}
                        />
                    </div>
                    {/* Middle 25% Typography Block */}
                    <div className="w-full lg:w-1/4 h-[30vh] lg:h-full bg-[#1C1C1C] text-[#FAF9F6] p-8 lg:p-10 flex flex-col justify-between rounded-[6px] shadow-xl relative overflow-hidden">
                        <div className="flex justify-between w-full items-start">
                            <span className="font-sans text-[10px] opacity-40 tracking-[0.2em] uppercase">Typeface</span>
                            <span className="font-serif italic text-2xl opacity-40">Aa</span>
                        </div>
                        <div className="flex flex-col gap-6 mt-4">
                            {/* Primary Serif */}
                            <div className="flex flex-col">
                                <span className="font-serif text-5xl md:text-6xl mb-2 block opacity-90 leading-none">Ag</span>
                                <div className="flex justify-between items-end mt-2 border-t border-[#FAF9F6]/20 pt-3">
                                    <p className="font-serif text-xs md:text-sm opacity-80 leading-snug tracking-wide">
                                        Cormorant<br/>Garamond
                                    </p>
                                    <span className="font-serif italic text-[10px] opacity-60">Primary</span>
                                </div>
                            </div>
                            {/* Secondary Sans */}
                            <div className="flex flex-col">
                                <span className="font-sans font-medium text-4xl md:text-5xl mb-2 block opacity-90 leading-none tracking-tight">Aa</span>
                                <div className="flex justify-between items-end mt-2 border-t border-[#FAF9F6]/20 pt-3">
                                    <p className="font-sans text-[10px] md:text-xs opacity-80 leading-relaxed tracking-wide">
                                        Plus Jakarta<br/>Sans
                                    </p>
                                    <span className="font-sans text-[10px] opacity-60 uppercase tracking-widest">Secondary</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right 25% Logo Block */}
                    <div className="w-full lg:w-1/4 aspect-square self-center bg-[#FAF9F6] rounded-[6px] border border-[#1C1C1C]/10 shadow-xl relative overflow-hidden p-8 lg:p-12">
                        <div 
                            className="w-full h-full bg-contain bg-center bg-no-repeat"
                            style={{ backgroundImage: "url('/works/teaure/TeaureLogo.png')" }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* 05 - Design Decisions (Estrela "Our Role" Layout) */}
            <section className="relative w-full px-6 md:px-12 py-32 md:py-48 bg-[#FAF9F6] border-t border-[#1C1C1C]/10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 max-w-7xl mx-auto">
                    {/* Left Sticky Column */}
                    <div className="w-full lg:w-1/3 flex flex-col lg:sticky lg:top-32 h-fit">
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-[#1C1C1C]">
                            Design Decisions
                        </h2>
                    </div>

                    {/* Right Scrolling Column with 1px borders */}
                    <div className="w-full lg:w-2/3 flex flex-col border-t border-[#1C1C1C]/10">
                        {/* Decision 1 */}
                        <div className="py-12 flex flex-col lg:flex-row gap-4 lg:gap-8 border-b border-[#1C1C1C]/10 items-start lg:items-center">
                            <div className="lg:w-1/3 font-serif text-xl md:text-2xl tracking-tight text-[#1C1C1C]">Atmosphere</div>
                            <div className="lg:w-2/3 font-sans text-sm md:text-base leading-relaxed opacity-60 text-left lg:text-right">
                                Users often form emotional impressions before rational decisions. Large visual storytelling establishes context before introducing specifications.
                            </div>
                        </div>
                        {/* Decision 2 */}
                        <div className="py-12 flex flex-col lg:flex-row gap-4 lg:gap-8 border-b border-[#1C1C1C]/10 items-start lg:items-center">
                            <div className="lg:w-1/3 font-serif text-xl md:text-2xl tracking-tight text-[#1C1C1C]">Unified Space</div>
                            <div className="lg:w-2/3 font-sans text-sm md:text-base leading-relaxed opacity-60 text-left lg:text-right">
                                Instead of redirecting users through disconnected steps, the cart behaves as an extension of the browsing experience, preserving continuity.
                            </div>
                        </div>
                        {/* Decision 3 */}
                        <div className="py-12 flex flex-col lg:flex-row gap-4 lg:gap-8 border-b border-[#1C1C1C]/10 items-start lg:items-center">
                            <div className="lg:w-1/3 font-serif text-xl md:text-2xl tracking-tight text-[#1C1C1C]">Motion Continuity</div>
                            <div className="lg:w-2/3 font-sans text-sm md:text-base leading-relaxed opacity-60 text-left lg:text-right">
                                Transitions maintain context and create smoother movement between states. Motion exists to support comprehension, not simply to attract attention.
                            </div>
                        </div>
                        {/* Decision 4 */}
                        <div className="py-12 flex flex-col lg:flex-row gap-4 lg:gap-8 border-b border-[#1C1C1C]/10 items-start lg:items-center">
                            <div className="lg:w-1/3 font-serif text-xl md:text-2xl tracking-tight text-[#1C1C1C]">Depth Hierarchy</div>
                            <div className="lg:w-2/3 font-sans text-sm md:text-base leading-relaxed opacity-60 text-left lg:text-right">
                                Foreground elements remain sharp and actionable. Background elements provide context without competing. Focus emerges naturally rather than through aggressive UI.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 06 - Massive Showreel */}
            <section className="relative w-full py-24 xl:py-0 xl:h-screen bg-[#FAF9F6] flex items-center justify-center overflow-hidden border-t border-[#1C1C1C]/10 px-6 xl:px-0">
                <div className="absolute top-8 left-6 xl:top-12 xl:left-12 z-20">
                    <button className="px-6 py-2 rounded-full border border-[#1C1C1C]/20 bg-white/50 backdrop-blur-md font-sans text-[10px] uppercase tracking-widest text-[#1C1C1C] hover:bg-[#1C1C1C]/5 transition-colors">
                        All work
                    </button>
                </div>
                
                <div className="w-full aspect-video xl:aspect-auto xl:w-[80vw] xl:h-[80vh] relative z-10 rounded-[6px] xl:rounded-xl overflow-hidden shadow-2xl border border-[#1C1C1C]/5 bg-[#EAE8E3]">
                    <video 
                        src="/assets/Showreel.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* 07 - Symmetric Image Containers */}
            <section className="relative w-full px-6 md:px-12 py-32 bg-[#FAF9F6]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto items-stretch">
                    
                    {/* Left: Square Image (Floating UI) */}
                    <div className="w-full bg-[#EAE8E3] rounded-[6px] aspect-square relative overflow-hidden shadow-sm">
                        <img 
                            src="/works/teaure/floatingUI-right-new.png" 
                            alt="Teaure Floating UI"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                    
                    {/* Right: Environment Image */}
                    <div className="w-full aspect-square md:aspect-auto md:h-1/2 bg-[#EAE8E3] rounded-[6px] relative overflow-hidden shadow-sm">
                        <img 
                            key="env-img-center"
                            src="/works/teaure/teaure_premise_environment.png" 
                            alt="Teaure Environment View"
                            className="absolute inset-0 w-full h-full object-cover object-center"
                        />
                    </div>
                    
                </div>
            </section>

            {/* 09 - Wow Section */}
            <section className="relative w-full px-6 md:px-12 py-48 md:py-64 border-t border-[#1C1C1C]/10 flex justify-center text-center">
                <div className="max-w-5xl flex flex-col items-center">
                    <h2 className="font-serif text-5xl md:text-7xl lg:text-[100px] leading-[0.9] tracking-tighter mb-16">
                        Designing the Feeling,<br/>
                        <span className="italic">Not Just the Interface</span>
                    </h2>
                    <p className="font-sans text-xl md:text-2xl leading-relaxed opacity-70 max-w-2xl whitespace-pre-line">
                        {`Most interfaces optimize for speed and efficiency.
This project explores a different approach.

An experience where users are not rushed,
but gently guided through interaction.

The goal was not to make users move faster,
but to make them feel something while they move.`}
                    </p>
                </div>
            </section>

            {/* 10 - Design System */}
            <section className="relative w-full px-6 md:px-12 py-32 border-t border-[#1C1C1C]/10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
                    <div className="col-span-1 lg:col-span-5 flex flex-col">
                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-50 mb-12 block">
                            07 / System
                        </span>
                        <h2 className="font-serif text-5xl md:text-6xl tracking-tight leading-none mb-12">
                            Built for Atmosphere and Clarity.
                        </h2>
                        <p className="font-sans text-lg leading-relaxed opacity-70 max-w-md whitespace-pre-line">
                            {`The visual language balances warmth with precision.

Neutral earthy tones create familiarity.
Editorial typography introduces sophistication.
Minimal interface elements reduce visual noise.

The system is designed to support the experience, not dominate it.`}
                        </p>
                    </div>

                    <div className="col-span-1 lg:col-span-6 lg:col-start-7 flex flex-col gap-12 border-t border-[#1C1C1C]/10 pt-12 lg:pt-0 lg:border-t-0">
                        <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-50 mb-8 block">
                            Design Principles
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 font-sans text-sm tracking-[0.1em] uppercase">
                            <div className="flex flex-col gap-4 border-l border-[#1C1C1C]/20 pl-4">
                                <span className="opacity-40 text-[10px]">Typography</span>
                                <span>Calm Before Conversion</span>
                            </div>
                            <div className="flex flex-col gap-4 border-l border-[#1C1C1C]/20 pl-4">
                                <span className="opacity-40 text-[10px]">Layout</span>
                                <span>Clarity Over Complexity</span>
                            </div>
                            <div className="flex flex-col gap-4 border-l border-[#1C1C1C]/20 pl-4">
                                <span className="opacity-40 text-[10px]">Content</span>
                                <span>Storytelling Over Promotion</span>
                            </div>
                            <div className="flex flex-col gap-4 border-l border-[#1C1C1C]/20 pl-4">
                                <span className="opacity-40 text-[10px]">Interaction</span>
                                <span>Motion With Purpose</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Massive Visual Anchor for Design System */}
                <div className="w-full mt-24 relative z-10 pb-12">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 xl:gap-6">
                        <div className="w-[90%] md:w-[80%] xl:w-full mr-auto xl:mr-0 aspect-[5/4] rounded-[6px] overflow-hidden shadow-sm group bg-[#EAE8E3]">
                            <img src="/works/teaure/UIcard2.png" alt="System Component" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2000ms] ease-out" />
                        </div>
                        <div className="w-[90%] md:w-[80%] xl:w-full ml-auto xl:ml-0 aspect-[5/4] rounded-[6px] overflow-hidden shadow-sm group bg-[#EAE8E3] xl:translate-y-16">
                            <img src="/works/teaure/UIcard3.png" alt="System Component" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2000ms] ease-out" />
                        </div>
                        <div className="w-[90%] md:w-[80%] xl:w-full mr-auto xl:mr-0 aspect-[5/4] rounded-[6px] overflow-hidden shadow-sm group bg-[#EAE8E3]">
                            <img src="/works/teaure/UIcard4.png" alt="System Component" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2000ms] ease-out" />
                        </div>
                    </div>
                </div>

                {/* Design System Details Board (Reference Layout) */}
                <div className="w-full mt-12 md:mt-24 flex flex-col xl:grid xl:grid-cols-2 gap-8 h-auto xl:min-h-[900px]">
                    
                    {/* Left Column: Colors */}
                    <div className="flex flex-col rounded-[6px] overflow-hidden shadow-sm h-[500px] md:h-[600px] xl:h-full w-full max-w-2xl mx-auto xl:max-w-none">
                        {/* Color 1 */}
                        <div className="flex-1 bg-[#FCF5EE] p-8 md:p-12 flex flex-col justify-start text-[#3F352C]">
                            <span className="font-sans text-lg md:text-xl mb-2">Cream White</span>
                            <span className="font-sans text-sm md:text-base uppercase opacity-70">#FCF5EE</span>
                        </div>
                        {/* Color 2 */}
                        <div className="flex-1 bg-[#574233] p-8 md:p-12 flex flex-col justify-start text-[#FCF5EE]">
                            <span className="font-sans text-lg md:text-xl mb-2">Warm Earth</span>
                            <span className="font-sans text-sm md:text-base uppercase opacity-70">#574233</span>
                        </div>
                        {/* Color 3 */}
                        <div className="flex-1 bg-[#3F352C] p-8 md:p-12 flex flex-col justify-start text-[#FCF5EE]">
                            <span className="font-sans text-lg md:text-xl mb-2">Roasted Cacao</span>
                            <span className="font-sans text-sm md:text-base uppercase opacity-70">#3F352C</span>
                        </div>
                        {/* Color 4 */}
                        <div className="flex-1 bg-[#1C1C1C] p-8 md:p-12 flex flex-col justify-start text-[#FCF5EE]">
                            <span className="font-sans text-lg md:text-xl mb-2">Charcoal Black</span>
                            <span className="font-sans text-sm md:text-base uppercase opacity-70">#1C1C1C</span>
                        </div>
                    </div>

                    {/* Right Column: Typography */}
                    <div className="bg-[#FAF9F6] rounded-[6px] p-10 xl:p-16 flex flex-col shadow-sm h-auto xl:h-full overflow-hidden border border-[#1C1C1C]/5 w-full max-w-2xl mx-auto xl:max-w-none">
                        
                        {/* Typeface 1: Cormorant Garamond */}
                        <div className="flex flex-col justify-between flex-1 pb-12 border-b border-[#3F352C]/10">
                            <div>
                                <h3 className="font-serif text-6xl md:text-[6.5rem] xl:text-[7rem] 2xl:text-[8rem] leading-[0.85] text-[#3F352C] tracking-tight">
                                    Cormorant<br/>Garamond
                                </h3>
                            </div>
                            <div className="pt-8 flex justify-between items-end text-[#3F352C] mt-8">
                                <div className="flex flex-col gap-2 font-serif text-xl md:text-3xl tracking-wide max-w-[70%]">
                                    <span className="break-words">AaBbCcDdEeFfGgHhIiJjKkLlMmNn</span>
                                    <span className="break-words">OoPpQqRrSsTtUuVvWwXxYyZz</span>
                                    <span className="font-sans text-sm md:text-base opacity-70 mt-2 tracking-widest">!@#$%^&amp;*()?:;&lt;&gt;[]</span>
                                </div>
                                <div className="flex flex-col gap-1 font-sans text-sm md:text-base text-right">
                                    <span className="opacity-60">Light</span>
                                    <span className="opacity-60">Regular</span>
                                    <span className="font-medium">Medium</span>
                                    <span className="font-bold">Bold</span>
                                </div>
                            </div>
                        </div>

                        {/* Typeface 2: Plus Jakarta Sans */}
                        <div className="flex flex-col justify-between flex-1 pt-12">
                            <div>
                                <h3 className="font-sans font-light text-5xl md:text-[5.5rem] xl:text-[6.5rem] 2xl:text-[7rem] leading-[0.9] text-[#3F352C] tracking-tight">
                                    Plus Jakarta<br/>Sans
                                </h3>
                            </div>
                            <div className="pt-8 flex justify-between items-end text-[#3F352C] mt-8">
                                <div className="flex flex-col gap-2 font-sans text-base md:text-xl tracking-wide max-w-[70%]">
                                    <span className="break-words">AaBbCcDdEeFfGgHhIiJjKkLlMmNn</span>
                                    <span className="break-words">OoPpQqRrSsTtUuVvWwXxYyZz</span>
                                    <span className="font-sans text-xs md:text-sm opacity-70 mt-2 tracking-widest">!@#$%^&amp;*()?:;&lt;&gt;[]</span>
                                </div>
                                <div className="flex flex-col gap-1 font-sans text-sm md:text-base text-right">
                                    <span className="opacity-60">Light</span>
                                    <span className="opacity-60">Regular</span>
                                    <span className="font-medium">Medium</span>
                                    <span className="font-bold">Bold</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 11 & 12 - Expected Impact & Reflection */}
            <section className="relative w-full px-6 md:px-12 py-32 border-t border-[#1C1C1C]/10 mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    
                    {/* Expected Impact */}
                    <div className="flex flex-col border-t border-[#1C1C1C] pt-8">
                        <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-50 mb-12 block">
                            08 / Expected Impact
                        </h3>
                        <p className="font-serif text-3xl md:text-4xl leading-snug mb-12">
                            This concept explores how cinematic storytelling may:
                        </p>
                        <ul className="flex flex-col gap-6 font-sans text-lg opacity-80 list-disc list-outside pl-4">
                            <li>Increase emotional engagement</li>
                            <li>Improve product recall</li>
                            <li>Create stronger brand differentiation</li>
                            <li>Encourage longer session duration</li>
                            <li>Build deeper product connection</li>
                        </ul>
                    </div>

                    {/* Reflection */}
                    <div className="flex flex-col border-t border-[#1C1C1C] pt-8">
                        <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-50 mb-12 block">
                            09 / Reflection: Looking Back
                        </h3>
                        
                        <div className="flex flex-col gap-16 font-sans">
                            <div>
                                <span className="text-[10px] uppercase tracking-[0.2em] opacity-50 mb-6 block border-b border-[#1C1C1C]/10 pb-2">Key Learnings</span>
                                <ul className="flex flex-col gap-4 text-base opacity-80">
                                    <li>— Emotion requires restraint, not excess.</li>
                                    <li>— Motion shapes navigation, not just aesthetics.</li>
                                    <li>— Simplicity is the result of deliberate decisions.</li>
                                    <li>— Brand storytelling influences perceived value.</li>
                                </ul>
                            </div>
                            
                            <div>
                                <span className="text-[10px] uppercase tracking-[0.2em] opacity-50 mb-6 block border-b border-[#1C1C1C]/10 pb-2">Future Exploration</span>
                                <ul className="flex flex-col gap-4 text-base opacity-80">
                                    <li>— Personalized experiences based on behavior.</li>
                                    <li>— Richer motion systems across product flows.</li>
                                    <li>— Interactive exploration using emerging web tech.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-16 pt-8 border-t border-[#1C1C1C]/20">
                            <p className="font-serif italic text-xl opacity-60">
                                If developed further, the next step would be validating these assumptions through usability testing, behavioral analysis, and iterative refinement.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* 13 - Glassmorphic Pill Control (Estrela Style) */}
            <div className="fixed bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-50">
                <button className="bg-[#E2DFD8]/70 backdrop-blur-xl border border-[#1C1C1C]/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] px-8 py-4 rounded-full flex items-center gap-4 hover:bg-[#E2DFD8]/90 transition-all duration-300 group">
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1C1C1C]">Next Case Study</span>
                    <svg className="w-4 h-4 text-[#1C1C1C] group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>

        </main>
    );
}
