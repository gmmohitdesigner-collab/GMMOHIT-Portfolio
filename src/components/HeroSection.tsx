"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedText from "./AnimatedText";

export default function HeroSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Stagger effect for entrance animations
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" as const }
        },
    };

    const imageVariants = {
        hidden: { clipPath: "inset(0 0 0 100%)" },
        show: {
            clipPath: "inset(0 0 0 0%)",
            transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 2 }
        },
    };

    return (
        <section className="w-full flex flex-col pt-24 md:pt-32 pb-12 overflow-hidden relative" id="home" aria-labelledby="hero-heading">

            {/* Hero Content */}
            <div className="w-full flex flex-col z-10 px-4 md:px-12 lg:px-16">
                <AnimatedText
                    el="h1"
                    id="hero-heading"
                    className="font-monument text-[40px] leading-[1.1] md:text-[60px] lg:text-[77px] tracking-tight uppercase"
                    text={["Designer.", "Strategist.", "Creator."]}
                    staggerDuration={0.2}
                />

                <div className="w-full mt-10 md:mt-16 lg:mt-24 flex flex-col md:flex-row md:items-center md:justify-end gap-10 md:gap-16 lg:gap-32">

                    <motion.div
                        className="relative w-full md:w-[450px] lg:w-[600px] aspect-[16/9] md:aspect-[1.8/1] overflow-hidden order-1 md:order-2"
                        variants={imageVariants}
                        initial="hidden"
                        animate="show"
                    >
                        {/* The user provided Image - Home.jpeg */}
                        <Image
                            src="/assets/Image - Home.jpeg"
                            alt="GM Mohit Hero Image"
                            fill
                            className="object-cover relative"
                            priority
                        />
                    </motion.div>

                    <div className="order-2 md:order-1 flex flex-col justify-center">
                        <AnimatedText
                            el="p"
                            className="font-circular text-base md:text-lg lg:text-xl leading-relaxed md:max-w-[320px] lg:max-w-[400px]"
                            text="I craft digital experiences where elegance meets intention — helping ambitious brands stand apart with design that feels as good as it looks."
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
                            text={["Things I Can Help you", "with."]}
                            staggerDuration={0.05}
                        />
                        <AnimatedText
                            el="p"
                            className="font-circular text-base md:text-lg lg:text-xl"
                            text="WEB & MOBILE / UI&UX"
                            staggerDuration={0.02}
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
