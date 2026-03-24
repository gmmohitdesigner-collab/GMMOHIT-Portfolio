"use client";

import AnimatedText from "./AnimatedText";

export default function ContactSection() {
    return (
        <section className="w-full flex flex-col items-center py-16 md:py-24 lg:py-32 gap-16 md:gap-20 bg-brand-bg relative overflow-hidden" id="contact" aria-labelledby="contact-heading">

            <div className="w-full px-4 md:px-12 lg:px-[172px] flex flex-col gap-12 md:gap-16 lg:gap-20">

                {/* Contact Message Header */}
                <h2 id="contact-heading" className="m-0 font-normal w-full flex flex-col md:flex-row justify-between items-start md:items-center font-circular text-3xl md:text-5xl lg:text-[61px] leading-[1.1] md:leading-[1.1] tracking-tight gap-4">
                    <AnimatedText el="span" className="flex flex-col" text={["Let’s Create", "Legacies"]} />
                    <AnimatedText el="span" className="flex flex-col text-left md:text-right" text={["Send a", "Message"]} delay={0.1} />
                </h2>

                {/* Email Address */}
                <div className="w-full flex flex-col gap-2 items-start mt-8 md:mt-0">
                    <AnimatedText
                        el="a"
                        href="mailto:HELLO@GMMOHIT.COM"
                        className="font-monument text-3xl md:text-5xl lg:text-[61px] uppercase tracking-tight hover:opacity-70 transition-opacity"
                        text="HELLO@GMMOHIT.COM"
                    />
                    {/* Underline */}
                    <div className="w-fit min-w-[300px] md:min-w-[600px] lg:min-w-[899px] h-px bg-brand-text mt-2"></div>
                </div>

            </div>

            {/* Social and Navigation Links */}
            <div className="w-full px-4 md:px-12 lg:px-[172px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-12 mt-8 md:mt-16">

                <div className="flex flex-col gap-4 font-circular text-xs md:text-sm uppercase">
                    <a href="#home" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
                        <span className="w-5 h-5 rounded-full border border-brand-text flex items-center justify-center text-[10px]">1</span>
                        HOME
                    </a>
                    <a href="#work" className="flex items-center gap-3 hover:opacity-70 transition-opacity ml-4 md:ml-6">
                        <span className="w-5 h-5 rounded-full border border-brand-text flex items-center justify-center text-[10px]">2</span>
                        WORK
                    </a>
                    <a href="#about" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
                        <span className="w-5 h-5 rounded-full border border-brand-text flex items-center justify-center text-[10px]">3</span>
                        ABOUT
                    </a>
                </div>

                <div className="flex flex-col gap-4 font-circular text-xs md:text-sm uppercase">
                    <a href="#" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
                        <span className="w-5 h-5 rounded-full border border-brand-text flex items-center justify-center text-[10px]">1</span>
                        INSTAGRAM
                    </a>
                    <a href="#" className="flex items-center gap-3 hover:opacity-70 transition-opacity ml-4 md:ml-6">
                        <span className="w-5 h-5 rounded-full border border-brand-text flex items-center justify-center text-[10px]">2</span>
                        LINKEDIN
                    </a>
                    <a href="#" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
                        <span className="w-5 h-5 rounded-full border border-brand-text flex items-center justify-center text-[10px]">3</span>
                        BEHANCE
                    </a>
                </div>

            </div>

        </section>
    );
}
