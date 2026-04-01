"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import MagneticNavLink from "./MagneticNavLink";
import MagneticMenuButton from "./MagneticMenuButton";

export default function NavBar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const lenis = useLenis();

    // Headroom (hide on scroll down) effect
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 100) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    // Lock body scroll when overlay is open
    useEffect(() => {
        if (menuOpen) {
            lenis?.stop();
            document.body.style.overflow = "hidden";
        } else {
            lenis?.start();
            document.body.style.overflow = "";
        }
        return () => { 
            lenis?.start();
            document.body.style.overflow = ""; 
        };
    }, [menuOpen, lenis]);

    // Animation variants for the mobile menu
    const menuVariants = {
        initial: { y: "-100%" },
        animate: { 
            y: 0,
            transition: { 
                duration: 0.8, 
                ease: [0.76, 0, 0.24, 1] as const,
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        },
        exit: { 
            y: "-100%",
            transition: { 
                duration: 0.8, 
                ease: [0.76, 0, 0.24, 1] as const,
                staggerChildren: 0.05,
                staggerDirection: -1 
            }
        }
    };

    const itemVariants = {
        initial: { y: "100%" },
        animate: { 
            y: 0, 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } 
        },
        exit: { 
            y: "100%", 
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as const } 
        }
    };

    const mobileLinks = [
        { title: "HOME", num: "①", href: "#home" },
        { title: "ABOUT", num: "②", href: "#about" },
        { title: "WORK", num: "③", href: "#work" },
    ];

    return (
        <>
            <motion.nav
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" }
                }}
                animate={hidden && !menuOpen ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-0 left-0 w-full flex justify-between items-center px-4 md:px-12 lg:px-16 py-6 md:py-8 z-50 text-brand-bg mix-blend-difference pointer-events-auto"
            >
                {/* Branding (Left) */}
                <div className="font-monument text-lg md:text-2xl tracking-[-0.02em] leading-[0.85] z-[61] flex flex-col">
                    <span>GM</span>
                    <span>MOHIT</span>
                </div>

                {/* Navigation Links (Center-Left) */}
                <div className="hidden md:flex flex-col gap-1 font-circular text-[12px] tracking-[-0.02em] uppercase">
                    <MagneticNavLink href="#home" className="flex items-center ml-0"><span className="font-serif italic mr-1 text-[10px] relative top-[1px]">①</span> HOME</MagneticNavLink>
                    <MagneticNavLink href="#about" className="flex items-center ml-[20px]"><span className="font-serif italic mr-1 text-[10px] relative top-[1px]">②</span> ABOUT</MagneticNavLink>
                    <MagneticNavLink href="#work" className="flex items-center ml-[40px]"><span className="font-serif italic mr-1 text-[10px] relative top-[1px]">③</span> WORKS</MagneticNavLink>
                </div>

                {/* Social Links (Center-Right) */}
                <div className="hidden md:flex flex-col gap-1 font-circular text-[12px] tracking-[-0.02em] uppercase">
                    <MagneticNavLink href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center ml-0"><span className="font-serif italic mr-1 text-[10px] relative top-[1px]">①</span> INSTAGRAM</MagneticNavLink>
                    <MagneticNavLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center ml-[20px]"><span className="font-serif italic mr-1 text-[10px] relative top-[1px]">②</span> LINKED IN</MagneticNavLink>
                    <MagneticNavLink href="https://behance.net" target="_blank" rel="noopener noreferrer" className="flex items-center ml-[40px]"><span className="font-serif italic mr-1 text-[10px] relative top-[1px]">③</span> BEHANCE</MagneticNavLink>
                </div>

                {/* Availability & Contact (Right) */}
                <div className="hidden md:flex flex-col items-end gap-1 text-right w-[180px] lg:w-[220px]">
                    <span className="font-circular text-[12px] opacity-60 uppercase tracking-[-0.02em] leading-relaxed">
                        AVAILABLE FOR PROJECTS
                    </span>
                    <MagneticNavLink href="mailto:HELLO@GMMOHIT.COM" className="font-circular font-normal text-[12px] uppercase tracking-[-0.02em]">
                        HELLO@GMMOHIT.COM
                    </MagneticNavLink>
                    <MagneticNavLink href="#contact" className="font-circular font-normal text-[12px] uppercase tracking-[-0.02em] mt-[2px]">
                        SEND PROJECT INQUIRY
                    </MagneticNavLink>
                </div>

            </motion.nav>
            {/* Mobile Hamburger (Visible below md, persistent on top) */}
            <div className="md:hidden fixed top-6 right-4 sm:right-6 z-[71]">
                <MagneticMenuButton 
                    isOpen={menuOpen} 
                    onClick={() => setMenuOpen(!menuOpen)} 
                />
            </div>


            {/* Fullscreen Mobile Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="fixed inset-0 bg-[#E8E3DA] text-[#3F352C] z-[60] flex flex-col p-6 sm:p-12 md:hidden overflow-y-auto"
                    >
                        {/* Overlay Header */}
                        <div className="flex justify-between items-center w-full pb-12">
                            <div className="font-monument text-lg tracking-tight invisible">GM MOHIT</div>
                            {/* The close button is now unified in the main NavBar and stays on top via Z-index */}
                            <div className="w-10 h-10 md:hidden" />
                        </div>

                        {/* Staggered Menu Items */}
                        <div className="flex-1 flex flex-col justify-center gap-6 sm:gap-8 my-auto">
                            {mobileLinks.map((item) => (
                                <div key={item.title} className="overflow-hidden">
                                    <motion.a
                                        href={item.href}
                                        onClick={() => setMenuOpen(false)}
                                        variants={itemVariants}
                                        className="font-monument text-5xl sm:text-[64px] uppercase flex items-start w-fit hover:opacity-70 transition-opacity"
                                    >
                                        {item.title}
                                        <span className="font-serif text-sm sm:text-base mt-2 ml-1 opacity-60">{item.num}</span>
                                    </motion.a>
                                </div>
                            ))}
                        </div>

                        {/* Overlay Footer & Social Links */}
                        <motion.div
                            variants={{
                                initial: { opacity: 0, y: 20 },
                                animate: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.5 } },
                                exit: { opacity: 0, y: 20 }
                            }}
                            className="flex flex-col gap-6 sm:gap-8 pt-12 pb-4 mt-auto"
                        >
                            <div className="flex justify-center gap-8 sm:gap-12 w-full px-2" aria-label="Social Links">
                                <a href="https://instagram.com" aria-label="Visit Instagram profile" className="w-10 h-10 rounded-full border border-current flex items-center justify-center hover:bg-[#3F352C] hover:text-[#E8E3DA] transition-colors group">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                                </a>
                                <a href="https://linkedin.com" aria-label="Visit LinkedIn profile" className="w-10 h-10 rounded-full border border-current flex items-center justify-center hover:bg-[#3F352C] hover:text-[#E8E3DA] transition-colors group">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                                </a>
                                <a href="https://behance.net" aria-label="Visit Behance profile" className="w-10 h-10 rounded-full border border-current flex items-center justify-center hover:bg-[#3F352C] hover:text-[#E8E3DA] transition-colors group">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M22.244 0H1.756C.787 0 0 .787 0 1.756v20.488C0 23.213.787 24 1.756 24h20.488C23.213 24 24 23.213 24 22.244V1.756C24 .787 23.213 0 22.244 0zm-10.05 15.688c-.125.688-.413 1.25-.863 1.688-.45.438-1.025.763-1.725.975-.712.213-1.538.313-2.488.313H4.401v-9.35h3.012c.988 0 1.838.1 2.538.3s1.262.538 1.675 1.013c.413.475.612 1.1.612 1.875 0 1.1-.387 1.9-1.163 2.4-.775.5-1.788.663-3.038.488.938.2 1.713.563 2.3 1.088.588.525.875 1.225.862 2.1zm5.212-3.15h4.163c-.025 1.162-.35 2.1-.975 2.8-.625.7-1.475 1.05-2.55 1.05-1.125 0-2.025-.387-2.7-1.162-.675-.775-1.013-1.875-1.013-3.3 0-1.425.338-2.525 1.013-3.3.675-.775 1.575-1.163 2.7-1.163 1.075 0 1.925.35 2.55 1.05.625.7.95 1.637.975 2.8h-4.163v1.225zM15.432 9.038h4.163v1.125h-4.163V9.038zM7.113 11.238H9.35c.425 0 .763-.125 1.025-.375.263-.25.4-.588.4-.988 0-.413-.138-.75-.413-.988C10.088 8.638 9.75 8.513 9.35 8.513H7.113v2.725zm2.238 6.012H7.113V13.15h2.238c.463 0 .825.138 1.1.413.275.275.413.637.413 1.075 0 .438-.138.8-.413 1.075-.275.263-.637.388-1.1.388l.006.124z"/></svg>
                                </a>
                                <a href="https://x.com" aria-label="Visit X profile" className="w-10 h-10 rounded-full border border-current flex items-center justify-center hover:bg-[#3F352C] hover:text-[#E8E3DA] transition-colors group">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
                                </a>
                            </div>

                            <div className="flex items-center gap-4 text-[10px] sm:text-xs font-circular opacity-60 uppercase tracking-widest w-full justify-between mt-4">
                                <span>✦</span>
                                <span>FOR WORK — CONTACT BELOW</span>
                                <span>✦</span>
                            </div>
                            <a href="mailto:HELLO@GMMOHIT.COM" aria-label="Email G M Mohit" className="w-full py-5 sm:py-6 rounded-full bg-[#3F352C] text-[#E8E3DA] flex justify-center items-center hover:opacity-90 transition-opacity">
                                <span className="font-serif italic text-2xl sm:text-3xl lowercase">hello@gmmohit.com</span>
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
