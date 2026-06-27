"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import { useRouter, usePathname } from "next/navigation";
import MagneticNavLink from "./MagneticNavLink";
import MagneticMenuButton from "./MagneticMenuButton";

export default function NavBar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const lenis = useLenis();
    const router = useRouter();
    const pathname = usePathname();

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
        { title: "WORK", num: "②", href: "#work" },
        { title: "ABOUT", num: "③", href: "#about" },
    ];

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        if (targetId.startsWith("#")) {
            e.preventDefault();
            
            if (pathname !== "/") {
                router.push(`/${targetId}`);
                if (menuOpen) setMenuOpen(false);
                return;
            }

            const element = document.querySelector(targetId) as HTMLElement | null;
            if (element) {
                // Close menu first so body overflow is restored
                if (menuOpen) setMenuOpen(false);

                if (lenis) {
                    // Force Lenis to start in case the menu overlay had it stopped
                    lenis.start();
                    
                    // Ordered sections in layout
                    const sections = ["#home", "#work", "#about"];
                    
                    // Determine current active section based on closest top distance
                    let currentIndex = 0;
                    let minDistance = Infinity;
                    
                    sections.forEach((id, index) => {
                        const sec = document.querySelector(id);
                        if (sec) {
                            const rect = sec.getBoundingClientRect();
                            // Adding a slight offset because sections might trigger slightly below the top
                            const distance = Math.abs(rect.top);
                            if (distance < minDistance) {
                                minDistance = distance;
                                currentIndex = index;
                            }
                        }
                    });
                    
                    const targetIndex = sections.indexOf(targetId);
                    
                    // Check if jumping one section or staying on the same (adjacent)
                    const isAdjacent = targetIndex !== -1 && Math.abs(targetIndex - currentIndex) <= 1;
                    
                    // Slower for adjacent (3s), current speed for distant (2s)
                    const scrollDuration = isAdjacent ? 3.0 : 2.0;

                    lenis.scrollTo(element, {
                        duration: scrollDuration,
                        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                    });
                } else {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }
        }
    };

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
                    <MagneticNavLink href="#home" onClick={(e) => handleScroll(e, "#home")} className="flex items-center ml-0"><span className="font-serif italic mr-1 text-[10px] relative top-[1px]">①</span> HOME</MagneticNavLink>
                    <MagneticNavLink href="#work" onClick={(e) => handleScroll(e, "#work")} className="flex items-center ml-[20px]"><span className="font-serif italic mr-1 text-[10px] relative top-[1px]">②</span> WORKS</MagneticNavLink>
                    <MagneticNavLink href="#about" onClick={(e) => handleScroll(e, "#about")} className="flex items-center ml-[40px]"><span className="font-serif italic mr-1 text-[10px] relative top-[1px]">③</span> ABOUT</MagneticNavLink>
                </div>

                {/* Social Links (Center-Right) */}
                <div className="hidden md:flex flex-col gap-1 font-circular text-[12px] tracking-[-0.02em] uppercase">
                    <MagneticNavLink href="https://www.instagram.com/noblessedesigns/" target="_blank" rel="noopener noreferrer" className="flex items-center ml-0"><span className="font-serif italic mr-1 text-[10px] relative top-[1px]">①</span> INSTAGRAM</MagneticNavLink>
                    <MagneticNavLink href="https://www.linkedin.com/in/gmmohit/" target="_blank" rel="noopener noreferrer" className="flex items-center ml-[20px]"><span className="font-serif italic mr-1 text-[10px] relative top-[1px]">②</span> LINKED IN</MagneticNavLink>
                    <MagneticNavLink href="https://www.behance.net/gmmohit" target="_blank" rel="noopener noreferrer" className="flex items-center ml-[40px]"><span className="font-serif italic mr-1 text-[10px] relative top-[1px]">③</span> BEHANCE</MagneticNavLink>
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
                                        onClick={(e) => handleScroll(e, item.href)}
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
                                <a href="https://www.instagram.com/noblessedesigns/" target="_blank" rel="noopener noreferrer" aria-label="Visit Instagram profile" className="w-10 h-10 rounded-full border border-current flex items-center justify-center hover:bg-[#3F352C] hover:text-[#E8E3DA] transition-colors group">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                                </a>
                                <a href="https://www.linkedin.com/in/gmmohit/" target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn profile" className="w-10 h-10 rounded-full border border-current flex items-center justify-center hover:bg-[#3F352C] hover:text-[#E8E3DA] transition-colors group">
                                    <span className="font-circular font-bold text-sm tracking-tighter">in</span>
                                </a>
                                <a href="https://www.behance.net/gmmohit" target="_blank" rel="noopener noreferrer" aria-label="Visit Behance profile" className="w-10 h-10 rounded-full border border-current flex items-center justify-center hover:bg-[#3F352C] hover:text-[#E8E3DA] transition-colors group">
                                    <span className="font-circular font-bold text-sm tracking-tighter">Bē</span>
                                </a>
                                <a href="https://x.com/G_M_Mohit" target="_blank" rel="noopener noreferrer" aria-label="Visit X profile" className="w-10 h-10 rounded-full border border-current flex items-center justify-center hover:bg-[#3F352C] hover:text-[#E8E3DA] transition-colors group">
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
