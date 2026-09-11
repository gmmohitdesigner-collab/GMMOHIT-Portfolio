"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import AnimatedText from "./AnimatedText";
import ScrollSkew from "./ScrollSkew";
import { useLoading } from "@/context/LoadingContext";

export default function HeroSection() {
    const { isExitComplete } = useLoading();
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });
    
    // Parallax movement for the image
    const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

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
                    <h1 id="hero-heading" aria-label="GM Mohit — Creative Designer and Developer Portfolio">
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
                            className="w-full h-full overflow-hidden"
                            variants={imageVariants}
                            initial="hidden"
                            animate={isExitComplete ? "show" : "hidden"}
                            style={{ y: yParallax }}
                        >
                                {/* The user provided Image - Home.jpeg */}
                                <Image
                                    src="/assets/Image - Home.jpeg"
                                    alt="GM Mohit Portrait and Digital Portfolio"
                                    fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                                priority
                            />
                        </motion.div>
                    </ScrollSkew>

                    <div className="order-2 md:order-1 flex flex-col justify-center">
                        <AnimatedText
                            el="p"
                            className="font-circular text-base md:text-lg lg:text-xl leading-relaxed md:max-w-[320px] lg:max-w-[400px]"
                            text="I build digital experiences where elegance meets intention. I help ambitious brands break through the noise with design that performs as well as it looks."
                            staggerDuration={0.01}
                        />
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
