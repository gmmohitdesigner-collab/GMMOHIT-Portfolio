"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import Image from "next/image";
import AnimatedText from "./AnimatedText";
import ScrollSkew from "./ScrollSkew";
import { useLoading } from "@/context/LoadingContext";

const DirectionalButton = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleMouseEnter = (e: React.MouseEvent) => {
        if (!buttonRef.current || window.matchMedia('(hover: none)').matches) return;
        const rect = buttonRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setIsHovered(true);
    };

    const handleMouseLeave = (e: React.MouseEvent) => {
        if (!buttonRef.current || window.matchMedia('(hover: none)').matches) return;
        const rect = buttonRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setIsHovered(false);
    };

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative flex items-center justify-center overflow-hidden font-circular text-xs md:text-sm uppercase tracking-[0.2em] border border-[#3F352C] px-8 py-4 rounded-full"
        >
            {/* Base Text */}
            <span className="relative z-10 text-[#3F352C]">
                {children}
            </span>

            {/* Expanding Overlay with Inverted Text */}
            <motion.div
                className="absolute inset-0 bg-[#3F352C] pointer-events-none flex items-center justify-center z-20"
                initial={false}
                animate={{
                    clipPath: isHovered 
                        ? `circle(150% at ${position.x}px ${position.y}px)` 
                        : `circle(0% at ${position.x}px ${position.y}px)`,
                }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            >
                <span className="text-[#E8E3DA]" aria-hidden="true">
                    {children}
                </span>
            </motion.div>
        </button>
    );
};

export default function HeroSection() {
    const { isExitComplete } = useLoading();
    const sectionRef = useRef<HTMLElement>(null);
    const lenis = useLenis();

    const handleScrollToWork = () => {
        const element = document.getElementById("work");
        if (element) {
            if (lenis) {
                lenis.scrollTo(element, {
                    duration: 2.0,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            } else {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });
    
    // Parallax movement for the image
    // Maps scroll from top to bottom into a subtle vertical shift
    const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    const imageVariants = {
        hidden: { clipPath: "inset(0 0 0 100%)" },
        show: {
            clipPath: "inset(0 0 0 0%)",
            // The asset is already cached by the loader, so there is nothing to
            // wait for -- the old delay:2 was dead time before a ready image.
            transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 }
        },
    };

    return (
        <section ref={sectionRef} className="w-full flex flex-col pt-24 md:pt-32 pb-12 overflow-hidden relative" id="home" aria-labelledby="hero-heading">

            {/* Hero Content */}
            <div className="w-full flex flex-col z-10 px-4 md:px-12 lg:px-16">
                <div className="relative">
                    {/* The h1 now WRAPS the visible headline instead of hiding beside
                        it -- Google discounts text that never renders. aria-label gives
                        screen readers the clean sentence, since the animation splits the
                        text into per-character spans that read as "C r e a t i v e". */}
                    <h1 id="hero-heading" aria-label="GM Mohit | Creative Designer and Developer Portfolio">
                        {/* el="span" (not div) because an h1 may only contain phrasing
                            content; `block` keeps the exact same layout the div had. */}
                        <AnimatedText
                            el="span"
                            aria-hidden="true"
                            className="block font-monument text-[40px] leading-[1.1] md:text-[60px] lg:text-[77px] tracking-tight uppercase"
                            text={["Creative.", "Designer.", "Developer."]}
                            staggerDuration={0.02}
                            splitLevel="char"
                        />
                    </h1>
                </div>

                <div className="w-full mt-10 md:mt-16 lg:mt-24 flex flex-col md:flex-row md:items-center md:justify-end gap-10 md:gap-16 lg:gap-32">

                    {/* Negative right margin cancels the parent's px-12/px-16 so the
                        image bleeds flush to the viewport edge instead of stopping at
                        the grid gutter. Section already has overflow-hidden, so the
                        scroll-skew corners can't cause horizontal scroll. */}
                    <ScrollSkew className="relative w-full md:w-[450px] lg:w-[600px] md:-mr-12 lg:-mr-16 aspect-[16/9] md:aspect-[1.8/1] order-1 md:order-2 z-10">
                        <motion.div
                            className="w-full h-full overflow-hidden relative"
                            variants={imageVariants}
                            initial="hidden"
                            animate={isExitComplete ? "show" : "hidden"}
                        >
                            {/* Inner wrapper for true parallax. It is taller than the container 
                                so it doesn't reveal empty space when translating. */}
                            <motion.div 
                                className="absolute inset-0 w-full h-[130%] -top-[15%]" 
                                style={{ y: yParallax }}
                            >
                                <Image
                                    src="/assets/Image - Home.jpeg"
                                    alt="GM Mohit Portrait and Digital Portfolio"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                        </motion.div>
                    </ScrollSkew>

                    <div className="order-2 md:order-1 flex flex-col justify-center mt-6 md:mt-0">
                        <AnimatedText
                            el="p"
                            className="font-circular text-base md:text-lg lg:text-xl leading-relaxed md:max-w-[320px] lg:max-w-[400px]"
                            text="I build digital experiences where elegance meets intention. I help ambitious brands break through the noise with design that performs as well as it looks."
                            staggerDuration={0.01}
                        />

                        {/* Brutalist Primary CTAs */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={isExitComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.8, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
                            className="flex items-center gap-6 mt-10 md:mt-12"
                        >
                            <DirectionalButton onClick={handleScrollToWork}>
                                View Works
                            </DirectionalButton>
                            <a href="mailto:hello@gmmohit.com" className="font-circular text-xs md:text-sm uppercase tracking-[0.2em] border-b border-[#3F352C] pb-1 hover:opacity-50 transition-opacity duration-300">
                                Let&apos;s Talk
                            </a>
                        </motion.div>
                    </div>

                </div>

                {/* Services Teaser */}
                <div className="w-full mt-16 md:mt-24 lg:mt-32 uppercase">
                    <div className="flex flex-col gap-4">
                        <AnimatedText
                            el="p"
                            className="font-circular text-xs md:text-sm lg:text-base opacity-60"
                            text={["CORE", "EXPERTISE"]}
                            staggerDuration={0.05}
                        />
                        <AnimatedText
                            el="p"
                            className="font-circular text-base md:text-lg lg:text-xl"
                            text="WEB & MOBILE / UI&UX / AI-DRIVEN ENGINEERING"
                            staggerDuration={0.02}
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
