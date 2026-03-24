"use client";

import AnimatedText from "./AnimatedText";

export default function AboutSection() {
    return (
        <section className="w-full flex flex-col items-center py-16 md:py-24 lg:py-40 gap-16 md:gap-24 lg:gap-32 bg-brand-bg relative overflow-hidden" id="about" aria-labelledby="about-heading">

            {/* About Header */}
            <div className="w-full px-4 md:px-12 lg:px-[172px] flex flex-col">
                <AnimatedText
                    el="h2"
                    id="about-heading"
                    className="flex flex-col font-monument text-2xl md:text-3xl lg:text-[49px] leading-[1.1] md:leading-[1.1] lg:leading-[1.1] uppercase tracking-tight max-w-[450px]"
                    text={["DESIGN THAT", "DEMANDS", "ATTENTION"]}
                />
            </div>

            {/* About Content */}
            <div className="w-full px-4 md:px-12 lg:px-[172px] flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
                <div className="relative overflow-hidden">
                    <AnimatedText
                        el="p"
                        className="font-circular text-lg md:text-xl lg:text-[31px] max-w-[300px] leading-tight m-0"
                        text="Curiosity that shapes clarity"
                    />
                </div>

                <div className="font-circular text-lg md:text-xl lg:text-[31px] leading-snug md:max-w-[400px] lg:max-w-[500px] flex flex-col gap-6">
                    <AnimatedText
                        el="p"
                        className="m-0"
                        text="I’m a designer who believes digital spaces should feel as intentional as physical ones."
                        staggerDuration={0.01}
                    />
                    <AnimatedText
                        el="p"
                        className="m-0"
                        text="With every project, I craft identities that radiate trust, beauty, and clarity — design that elevates brands while staying true to people."
                        staggerDuration={0.01}
                    />
                    <AnimatedText
                        el="p"
                        className="m-0"
                        text="Each collaboration is more than a website."
                        staggerDuration={0.01}
                    />
                    <AnimatedText
                        el="p"
                        className="m-0"
                        text="It’s a ritual of detail, a practice of refinement, and a pursuit of work that lasts."
                        staggerDuration={0.01}
                    />
                </div>
            </div>

        </section>
    );
}
