"use client";

import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";

const services = [
    { id: "1", title: "Visual Design / User Centered Design" },
    { id: "2", title: "Interaction Design / Animation" },
    { id: "3", title: "Creative Implementation" },
];

export default function ServicesSection() {
    return (
        <section className="w-full flex flex-col items-start py-16 md:py-20 lg:py-24 px-4 md:px-12 lg:px-[172px] gap-12 md:gap-16 lg:gap-20 bg-brand-bg relative" id="services" aria-labelledby="services-heading">

            <AnimatedText
                el="h2"
                id="services-heading"
                className="font-monument text-2xl md:text-4xl lg:text-[49px] uppercase tracking-tight"
                text="Services"
            />

            <ul className="w-full flex flex-col items-center p-0 m-0 list-none">

                {/* Top Border for first item */}
                <div className="w-full h-px bg-brand-text opacity-20"></div>

                {services.map((service, index) => (
                    <motion.li
                        key={service.id}
                        className="w-full flex flex-col"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <div className="w-full flex items-center py-8 md:py-12 lg:py-16 gap-8 md:gap-16 lg:gap-24 hover:pl-4 transition-all duration-300">
                            <AnimatedText
                                el="span"
                                className="font-circular text-lg md:text-2xl lg:text-[31px]"
                                text={service.id}
                                delay={index * 0.1}
                            />
                            <AnimatedText
                                el="span"
                                className="font-circular text-lg md:text-2xl lg:text-[31px]"
                                text={service.title}
                                delay={index * 0.1}
                                staggerDuration={0.015}
                            />
                        </div>
                        {/* Bottom Border */}
                        <div className="w-full h-px bg-brand-text opacity-20"></div>
                    </motion.li>
                ))}

            </ul>

        </section>
    );
}
