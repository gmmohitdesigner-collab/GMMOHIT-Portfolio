"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="w-full flex flex-col bg-[#E8E3DA] text-[#3F352C] px-4 md:px-12 lg:px-16 py-16 md:py-32 overflow-hidden z-20 relative">
            
            {/* Top Massive Heading */}
            <div className="flex flex-col gap-2 md:gap-4 mb-24 md:mb-40">
                <div className="overflow-hidden">
                    <motion.h2 
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                        className="font-monument text-[12vw] sm:text-[10vw] lg:text-[8vw] uppercase leading-[0.85] tracking-tighter m-0"
                    >
                        Let's Talk
                    </motion.h2>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 overflow-hidden pt-2">
                    <motion.h2 
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
                        className="font-monument text-[12vw] sm:text-[10vw] lg:text-[8vw] uppercase leading-[0.85] tracking-tighter m-0 text-transparent"
                        style={{ WebkitTextStroke: "2px #3F352C" }}
                    >
                        Connect
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-serif italic text-xl md:text-3xl opacity-80 max-w-[300px] mt-2 md:mt-0 lowercase"
                    >
                        About the Next big thing
                    </motion.p>
                </div>
            </div>

            {/* Links & Socials Grid */}
            <div className="flex flex-col lg:flex-row justify-between w-full border-t border-[#3F352C]/20 pt-16 pb-24 md:pb-32 gap-16 md:gap-24">
                
                {/* Huge Actions */}
                <div className="flex flex-col gap-12 md:gap-16 w-full lg:w-[50%]">
                    <a href="mailto:HELLO@GMMOHIT.COM" className="group flex flex-col gap-2 group">
                        <div className="flex items-center justify-between w-full pb-4 border-b border-[#3F352C]/20 transition-colors duration-500 group-hover:border-[#3F352C]">
                            <span className="font-monument text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter transition-transform duration-500 group-hover:translate-x-4">Write a Message</span>
                            <span className="text-3xl md:text-4xl lg:text-5xl font-light scale-x-[-1] transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2">↙</span>
                        </div>
                    </a>
                    <a href="#" className="group flex flex-col gap-2 group">
                        <div className="flex items-center justify-between w-full pb-4 border-b border-[#3F352C]/20 transition-colors duration-500 group-hover:border-[#3F352C]">
                            <span className="font-monument text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter transition-transform duration-500 group-hover:translate-x-4 text-transparent" style={{ WebkitTextStroke: "1px #3F352C" }}>Discuss Project</span>
                            <span className="text-3xl md:text-4xl lg:text-5xl font-light scale-x-[-1] transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2">↙</span>
                        </div>
                    </a>
                </div>

                {/* Socials Column */}
                <div className="flex flex-col w-full lg:w-[40%]">
                    {[
                        { name: "Behance", handle: "@gmmohit" },
                        { name: "Instagram", handle: "@gmmohit" },
                        { name: "Twitter", handle: "@gmmohit_" },
                        { name: "Dribbble", handle: "@gmmohit" }
                    ].map((social, idx) => (
                        <a key={idx} href="#" className="flex justify-between items-center py-6 md:py-8 border-b border-[#3F352C]/20 group hover:border-[#3F352C] transition-colors duration-500">
                            <span className="font-monument text-xl md:text-2xl uppercase tracking-widest transition-transform duration-500 group-hover:translate-x-2">{social.name}</span>
                            <span className="font-mono text-xs md:text-sm opacity-60 group-hover:opacity-100 transition-opacity uppercase tracking-widest">{social.handle}</span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Bottom Credits Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end w-full border-t border-[#3F352C]/20 pt-8 gap-12 lg:gap-8">
                
                <div className="flex flex-col gap-4 font-mono text-[10px] md:text-xs uppercase opacity-70 tracking-widest w-full lg:w-auto">
                    <p>© 2026 GM Mohit, All rights reserved • Credits</p>
                    <a href="#" className="underline hover:opacity-100 transition-opacity decoration-[#3F352C]/40 underline-offset-4">2020 Portfolio</a>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap lg:flex-nowrap gap-8 sm:gap-12 md:gap-16 font-mono text-[10px] md:text-xs uppercase opacity-80 tracking-widest leading-relaxed">
                    <div className="flex flex-col gap-2">
                        <span className="opacity-40 mb-1">Technologies</span>
                        <span>Framer Motion,</span>
                        <span>React, Tailwind</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="opacity-40 mb-1">Fonts</span>
                        <span>Monument Ext, Circular,</span>
                        <span>Serif Italic</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="opacity-40 mb-1">Designed & Developed By</span>
                        <a href="#" className="underline decoration-[#3F352C]/40 underline-offset-4 hover:opacity-70 transition-opacity">GM Mohit</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
