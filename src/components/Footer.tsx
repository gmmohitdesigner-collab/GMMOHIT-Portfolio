"use client";

import { motion } from "framer-motion";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="w-full bg-[#E8E3DA] text-[#3F352C] pt-24 pb-6 flex flex-col relative z-20 overflow-hidden font-circular rounded-t-[40px] md:rounded-t-[80px] shadow-[0_-15px_40px_rgba(63,53,44,0.04)] border-t border-[#3F352C]/10 mt-12 md:mt-24">
            
            <div className="px-4 md:px-12 lg:px-[172px] flex flex-col w-full relative z-10">
                
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-32 lg:mb-40 gap-16">
                    
                    {/* Mission Statement / Sign-off */}
                    <div className="flex flex-col gap-6 w-full lg:w-1/2">
                        <motion.h3 
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                           className="font-circular text-3xl md:text-5xl lg:text-[54px] tracking-tight leading-[1.15]"
                        >
                            Crafting digital <br className="hidden md:block"/> 
                            legacies through <br className="hidden md:block"/> 
                            <span className="italic opacity-60">intentional design.</span>
                        </motion.h3>
                    </div>

                    {/* Utilities Block */}
                    <div className="flex flex-row flex-wrap gap-12 lg:gap-20 w-full lg:w-auto mt-8 lg:mt-0">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.05, ease: [0.33, 1, 0.68, 1] }}
                            className="flex flex-col gap-5"
                        >
                            <span className="font-mono text-[10px] tracking-widest uppercase opacity-40">Navigation</span>
                            <div className="flex flex-col gap-2 font-circular text-sm md:text-base uppercase tracking-widest">
                                <a href="#home" className="hover:opacity-70 transition-opacity flex items-center"><span className="font-serif italic mr-2 text-[10px] relative top-[1px]">①</span> HOME</a>
                                <a href="#about" className="hover:opacity-70 transition-opacity flex items-center"><span className="font-serif italic mr-2 text-[10px] relative top-[1px]">②</span> ABOUT</a>
                                <a href="#work" className="hover:opacity-70 transition-opacity flex items-center"><span className="font-serif italic mr-2 text-[10px] relative top-[1px]">③</span> WORKS</a>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
                            className="flex flex-col gap-5"
                        >
                            <span className="font-mono text-[10px] tracking-widest uppercase opacity-40">Socials</span>
                            <div className="flex flex-col gap-2 font-circular text-sm md:text-base uppercase tracking-widest">
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity flex items-center"><span className="font-serif italic mr-2 text-[10px] relative top-[1px]">①</span> INSTAGRAM</a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity flex items-center"><span className="font-serif italic mr-2 text-[10px] relative top-[1px]">②</span> LINKED IN</a>
                                <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity flex items-center"><span className="font-serif italic mr-2 text-[10px] relative top-[1px]">③</span> BEHANCE</a>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
                            className="flex flex-col gap-5"
                        >
                            <span className="font-mono text-[10px] tracking-widest uppercase opacity-40">Local Time</span>
                            <div className="flex flex-col gap-0.5">
                                <span className="font-circular text-sm md:text-base font-medium">New Delhi, IN</span>
                                <span className="font-mono text-[11px] opacity-70">GMT +5:30</span>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                            className="flex flex-col gap-5"
                        >
                            <span className="font-mono text-[10px] tracking-widest uppercase opacity-40">Return</span>
                            <button 
                                onClick={scrollToTop} 
                                className="group flex items-center gap-3 font-circular text-sm md:text-base uppercase tracking-widest hover:opacity-70 transition-opacity"
                            >
                                Top 
                                <span className="w-8 h-8 rounded-full border border-[#3F352C]/30 flex items-center justify-center transform transition-all duration-300 group-hover:border-[#3F352C] group-hover:-translate-y-1">
                                    ↑
                                </span>
                            </button>
                        </motion.div>
                    </div>
                </div>

                {/* Footer Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center py-6 border-t border-[#3F352C]/15 font-mono text-[10px] md:text-xs tracking-widest uppercase gap-4 md:gap-0 backdrop-blur-sm bg-[#E8E3DA]/50 rounded-lg md:rounded-none md:bg-transparent">
                    <span className="opacity-60">© {new Date().getFullYear()} GM Mohit</span>
                    
                    <a href="mailto:HELLO@GMMOHIT.COM" className="opacity-60 hover:opacity-100 transition-all duration-300 decoration-[#3F352C]/40 underline-offset-4 hover:underline">
                        say hello
                    </a>

                    <span className="opacity-60">Designed & Hand-Coded</span>
                </div>
            </div>

            {/* Massive Background Anchor Text */}
            <div className="absolute bottom-0 left-0 w-full flex justify-center items-end pointer-events-none select-none overflow-hidden h-full z-0">
                <h1 
                    className="font-monument text-[25vw] sm:text-[23vw] uppercase leading-[0.7] tracking-tighter m-0 text-transparent transform translate-y-[20%] md:translate-y-[22%]" 
                    style={{ WebkitTextStroke: "max(1px, 0.15vw) rgba(63,53,44,0.12)" }}
                >
                    GM MOHIT
                </h1>
            </div>

        </footer>
    );
}
