"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import MagneticNavLink from "./MagneticNavLink";

export default function NavBar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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
        if (menuOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [menuOpen]);

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
                className="fixed top-0 left-0 w-full flex justify-between items-start px-4 md:px-12 lg:px-16 py-6 md:py-8 z-50 text-brand-bg mix-blend-difference pointer-events-auto"
            >
                {/* Branding (Left) */}
                <div className="font-monument text-lg md:text-2xl tracking-[-0.02em] leading-[0.85] z-[61] flex flex-col justify-center my-auto h-full">
                    <span>GM</span>
                    <span>MOHIT</span>
                </div>

                {/* Navigation Links (Center-Left) */}
                <div className="hidden md:flex flex-col gap-1 font-circular text-[12px] tracking-[-0.02em] uppercase mt-1">
                    <MagneticNavLink href="#home" className="flex items-center ml-0"><span className="font-serif italic mr-1 text-[10px] relative top-[1px]">①</span> HOME</MagneticNavLink>
                    <MagneticNavLink href="#about" className="flex items-center ml-[20px]"><span className="font-serif italic mr-1 text-[10px] relative top-[1px]">②</span> ABOUT</MagneticNavLink>
                    <MagneticNavLink href="#work" className="flex items-center ml-[40px]"><span className="font-serif italic mr-1 text-[10px] relative top-[1px]">③</span> WORKS</MagneticNavLink>
                </div>

                {/* Social Links (Center-Right) */}
                <div className="hidden md:flex flex-col gap-1 font-circular text-[12px] tracking-[-0.02em] uppercase mt-1">
                    <MagneticNavLink href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center ml-0"><span className="font-serif italic mr-1 text-[10px] relative top-[1px]">①</span> INSTAGRAM</MagneticNavLink>
                    <MagneticNavLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center ml-[20px]"><span className="font-serif italic mr-1 text-[10px] relative top-[1px]">②</span> LINKED IN</MagneticNavLink>
                    <MagneticNavLink href="https://behance.net" target="_blank" rel="noopener noreferrer" className="flex items-center ml-[40px]"><span className="font-serif italic mr-1 text-[10px] relative top-[1px]">③</span> BEHANCE</MagneticNavLink>
                </div>

                {/* Availability & Contact (Right) */}
                <div className="hidden md:flex flex-col items-end gap-1 text-right mt-1 w-[180px] lg:w-[220px]">
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

                {/* Mobile Hamburger (Visible below md) */}
                <button 
                    onClick={() => setMenuOpen(true)} 
                    className="md:hidden flex flex-col gap-[6px] items-end mt-1 z-[61] p-2 -mr-2"
                    aria-label="Open Menu"
                >
                    <div className="w-8 h-[2px] bg-current"></div>
                    <div className="w-6 h-[2px] bg-current"></div>
                </button>
            </motion.nav>

            {/* Fullscreen Mobile Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 bg-[#E8E3DA] text-[#1A1818] z-[60] flex flex-col p-6 sm:p-12 md:hidden overflow-y-auto"
                    >
                        {/* Overlay Header */}
                        <div className="flex justify-between items-center w-full pb-12">
                            <div className="font-monument text-lg tracking-tight invisible">GM MOHIT</div>
                            <button onClick={() => setMenuOpen(false)} className="w-10 h-10 flex flex-col justify-center items-center relative z-50" aria-label="Close Menu">
                                <motion.div className="w-8 h-[2px] bg-current absolute" animate={{ rotate: 45 }} />
                                <motion.div className="w-8 h-[2px] bg-current absolute" animate={{ rotate: -45 }} />
                            </button>
                        </div>

                        {/* Staggered Menu Items */}
                        <div className="flex-1 flex flex-col justify-center gap-6 sm:gap-8 my-auto">
                            {mobileLinks.map((item, i) => (
                                <div key={item.title} className="overflow-hidden">
                                    <motion.a
                                        href={item.href}
                                        onClick={() => setMenuOpen(false)}
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        exit={{ y: "100%" }}
                                        transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.76, 0, 0.24, 1] }}
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
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="flex flex-col gap-6 sm:gap-8 pt-12 pb-4 mt-auto"
                        >
                            <div className="flex justify-between gap-4 w-full px-2" aria-label="Social Links">
                                <a href="https://instagram.com" className="w-10 h-10 rounded-full border border-current flex items-center justify-center text-xs font-circular hover:bg-[#1A1818] hover:text-[#E8E3DA] transition-colors">IN</a>
                                <a href="https://linkedin.com" className="w-10 h-10 rounded-full border border-current flex items-center justify-center text-xs font-circular hover:bg-[#1A1818] hover:text-[#E8E3DA] transition-colors">LI</a>
                                <a href="https://behance.net" className="w-10 h-10 rounded-full border border-current flex items-center justify-center text-xs font-circular hover:bg-[#1A1818] hover:text-[#E8E3DA] transition-colors">BE</a>
                            </div>

                            <div className="flex items-center gap-4 text-[10px] sm:text-xs font-circular opacity-60 uppercase tracking-widest w-full justify-between mt-4">
                                <span>✦</span>
                                <span>FOR WORK — CONTACT BELOW</span>
                                <span>✦</span>
                            </div>
                            <a href="mailto:HELLO@GMMOHIT.COM" className="w-full py-5 sm:py-6 rounded-full bg-[#1A1818] text-[#E8E3DA] flex justify-center items-center hover:opacity-90 transition-opacity">
                                <span className="font-serif italic text-2xl sm:text-3xl lowercase">hello@gmmohit.com</span>
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
