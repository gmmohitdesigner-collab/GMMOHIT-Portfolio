"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import AnimatedText from "./AnimatedText";
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
            transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] as const, delay: 2 }
        },
    };

    return (
        <section ref={sectionRef} className="w-full flex flex-col pt-24 md:pt-32 pb-12 overflow-hidden relative" id="home" aria-labelledby="hero-heading">

            {/* Hero Content */}
            <div className="w-full flex flex-col z-10 px-4 md:px-12 lg:px-16">
                <AnimatedText
                    el="h1"
                    id="hero-heading"
                    className="font-monument text-[40px] leading-[1.1] md:text-[60px] lg:text-[77px] tracking-tight uppercase"
                    text={["Creative.", "Designer.", "Developer."]}
                    staggerDuration={0.2}
                />

                <div className="w-full mt-10 md:mt-16 lg:mt-24 flex flex-col md:flex-row md:items-center md:justify-end gap-10 md:gap-16 lg:gap-32">

                    <motion.div
                        className="relative w-full md:w-[450px] lg:w-[600px] aspect-[16/9] md:aspect-[1.8/1] overflow-hidden order-1 md:order-2"
                        variants={imageVariants}
                        initial="hidden"
                        animate={isExitComplete ? "show" : "hidden"}
                        style={{ y: yParallax }}
                    >
                        {/* The user provided Image - Home.jpeg */}
                        <Image
                            src="/assets/Image - Home.jpeg"
                            alt="GM Mohit Portrait"
                            fill
                            className="object-cover relative"
                            priority
                        />
                    </motion.div>

                    <div className="order-2 md:order-1 flex flex-col justify-center">
                        <AnimatedText
                            el="p"
                            className="font-circular text-base md:text-lg lg:text-xl leading-relaxed md:max-w-[320px] lg:max-w-[400px]"
                            text="I build digital experiences where elegance meets intention. I help ambitious brands break through the noise with design that doesn't just look stunning—it performs."
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
