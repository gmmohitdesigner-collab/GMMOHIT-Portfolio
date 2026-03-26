"use client";

import { motion } from "framer-motion";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="w-full flex flex-col bg-[#E8E3DA] text-[#3F352C] pt-24 pb-8 overflow-hidden z-20 relative font-circular">
            
            {/* Top Section: Marquee Banner */}
            <div className="relative w-full border-b border-[#3F352C]/20 mb-16 pb-12 flex relative overflow-hidden">
                
                {/* Wavy Rotating Badge Overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 flex items-center justify-center">
                    <div className="relative w-full h-full bg-[#E8E3DA] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(63,53,44,0.15)]">
                        {/* The rotating text */}
                        <svg className="absolute w-full h-full animate-spin-slow origin-center" viewBox="0 0 200 200">
                            <path id="textPathOut" d="M 100, 16 A 84,84 0 1,1 99.9,16" fill="transparent" />
                            <text className="text-[20px] font-mono fill-[#3F352C] uppercase tracking-[0.22em] font-medium">
                                <textPath href="#textPathOut" startOffset="0%">
                                    — REACH OUT — REACH OUT — REACH OUT
                                </textPath>
                            </text>
                        </svg>
                        {/* Static Center Envelope Icon */}
                        <div className="absolute flex items-center justify-center text-[#3F352C]">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="scale-75 md:scale-100">
                                <rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect>
                                <path d="M3 5l9 7 9-7"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Overlaid Italic Script Substitute */}
                <div className="absolute inset-0 z-10 pointer-events-none w-full h-full flex items-center justify-center mix-blend-multiply">
                    <p className="font-circular italic text-[8vw] sm:text-[6vw] md:text-[5vw] text-transparent opacity-80 tracking-normal transform -translate-y-[10%]" 
                       style={{ WebkitTextStroke: "1px #3F352C", textTransform: "lowercase", display: "inline-block" }}>
                        from you
                    </p>
                </div>

                <div className="absolute inset-0 z-10 pointer-events-none w-full h-full flex justify-between px-16 items-start pt-[5%] mix-blend-multiply hidden md:flex">
                     <p className="font-circular italic text-[4vw] text-transparent opacity-80" style={{ WebkitTextStroke: "1px #3F352C", textTransform: "lowercase" }}>
                        i'm eager to hear
                    </p>
                </div>

                {/* Infinite CSS Marquee Wrapper */}
                <div className="flex w-max animate-marquee">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex whitespace-nowrap px-8 items-center" aria-hidden={i !== 0}>
                            <h2 className="font-monument text-[18vw] md:text-[14vw] uppercase leading-[0.85] tracking-[-0.06em] m-0 pr-16 transform scale-y-[1.15]">
                                Send An Email
                            </h2>
                            <h2 className="font-monument text-[18vw] md:text-[14vw] uppercase leading-[0.85] tracking-[-0.06em] m-0 pr-16 transform scale-y-[1.15] opacity-50">
                                Send An Email
                            </h2>
                        </div>
                    ))}
                </div>
            </div>

            {/* Middle Section: Links & Actions */}
            <div className="flex flex-col md:flex-row justify-between w-full px-4 md:px-12 lg:px-16 gap-16 md:gap-8 pb-24 md:pb-32">
                 
                 {/* Left Column: Social Grid */}
                 <div className="flex gap-16 md:gap-32 w-full md:w-1/2">
                      <ul className="flex flex-col gap-6">
                          <li><a href="#" className="font-mono text-[10px] md:text-sm uppercase tracking-widest hover:pl-2 transition-all duration-300 flex items-center gap-2"><span>①</span> Instagram</a></li>
                          <li><a href="#" className="font-mono text-[10px] md:text-sm uppercase tracking-widest hover:pl-2 transition-all duration-300 flex items-center gap-2"><span>②</span> Linked In</a></li>
                          <li><a href="#" className="font-mono text-[10px] md:text-sm uppercase tracking-widest hover:pl-2 transition-all duration-300 flex items-center gap-2"><span>③</span> Behance</a></li>
                      </ul>
                      <ul className="flex flex-col gap-6">
                          <li><a href="#" className="font-mono text-[10px] md:text-sm uppercase tracking-widest hover:pl-2 transition-all duration-300 flex items-center gap-2"><span>④</span> Twitter</a></li>
                          <li><a href="#" className="font-mono text-[10px] md:text-sm uppercase tracking-widest hover:pl-2 transition-all duration-300 flex items-center gap-2"><span>⑤</span> Awwwards</a></li>
                          <li><a href="#" className="font-mono text-[10px] md:text-sm uppercase tracking-widest hover:pl-2 transition-all duration-300 flex items-center gap-2"><span>⑥</span> Dribbble</a></li>
                      </ul>
                 </div>

                 {/* Right Column: CTA Buttons */}
                 <div className="flex flex-col sm:flex-row items-start md:items-end justify-start md:justify-end gap-6 w-full md:w-1/2">
                      <a href="mailto:HELLO@GMMOHIT.COM" className="border border-[#3F352C]/30 rounded-[50px] px-8 py-5 font-mono text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#3F352C] hover:text-[#E8E3DA] transition-all duration-500 whitespace-nowrap">
                          Send a Project Inquiry
                      </a>
                      
                      <div className="flex items-center gap-3 group cursor-pointer" onClick={scrollToTop}>
                          <span className="border border-[#3F352C]/30 rounded-[50px] px-8 py-5 font-mono text-[10px] md:text-xs uppercase tracking-widest group-hover:bg-[#3F352C] group-hover:text-[#E8E3DA] transition-all duration-500 whitespace-nowrap hidden sm:block">
                              Scroll Back To Top
                          </span>
                          <span className="w-14 h-14 rounded-full border border-[#3F352C]/30 flex items-center justify-center group-hover:bg-[#3F352C] group-hover:text-[#E8E3DA] transition-all duration-500 flex-shrink-0">
                              <span className="transform -translate-y-px transition-transform duration-500 group-hover:-translate-y-1">↑</span>
                          </span>
                      </div>
                      
                      {/* Mobile Only explicitly visible label for the arrow */}
                      <span className="sm:hidden font-mono text-[10px] uppercase tracking-widest mt-2 ml-2" onClick={scrollToTop}>
                          Back To Top
                      </span>
                 </div>
            </div>

            {/* Bottom Section: Credits & Branding */}
            <div className="flex flex-col lg:flex-row justify-between items-center w-full px-4 md:px-12 lg:px-16 border-t border-[#3F352C]/20 pt-8 gap-12 lg:gap-4 font-mono text-[10px] md:text-[11px] uppercase tracking-widest pb-4 md:pb-0">
                
                {/* Copyright Line */}
                <div className="w-full lg:w-1/3 flex justify-center lg:justify-start order-2 lg:order-1 opacity-70">
                    <p>© 2026 GM Mohit, All rights reserved • <a href="#" className="underline hover:opacity-100 transition-opacity">Old Folio</a></p>
                </div>
                
                {/* Centered Logo Lockup */}
                <div className="flex flex-col items-center justify-center w-full lg:w-1/3 order-1 lg:order-2 relative mt-4 md:mt-2 h-[80px]">
                    <svg viewBox="0 0 200 80" className="absolute top-0 -mt-8 w-[180px] opacity-70 overflow-visible">
                        <path id="curveLabelBottom" d="M 20,60 A 80,80 0 0,1 180,60" fill="transparent" />
                        <text className="text-[12px] font-mono fill-[#3F352C] uppercase tracking-widest">
                            <textPath href="#curveLabelBottom" startOffset="50%" textAnchor="middle">
                                Designed and Coded By
                            </textPath>
                        </text>
                        {/* 4-point Star graphic */}
                        <path d="M 100,25 Q 100,40 85,40 Q 100,40 100,55 Q 100,40 115,40 Q 100,40 100,25 Z" className="fill-[#3F352C]" />
                    </svg>
                    <span className="font-monument text-3xl md:text-4xl font-black tracking-tighter mt-12 mb-0">GM MOHIT</span>
                </div>

                {/* Hand-Coded Line */}
                <div className="w-full lg:w-1/3 flex justify-center lg:justify-end order-3 opacity-70">
                    <p className="text-center lg:text-right">Purely Hand-Coded, with love & passion • <a href="#" className="underline hover:opacity-100 transition-opacity">Play Tetris</a></p>
                </div>
            </div>

        </footer>
    );
}
