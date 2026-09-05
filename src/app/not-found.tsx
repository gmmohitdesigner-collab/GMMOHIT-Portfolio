"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedText from '@/components/AnimatedText';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center bg-[#E8E3DA] text-[#3F352C]">
      <NavBar />
      <section className="flex-1 w-full flex flex-col items-center justify-center px-6 md:px-12 py-32 text-center">
        <AnimatedText
          text="404"
          el="h1"
          className="text-8xl md:text-[12rem] tracking-tighter leading-none mb-6 font-monument uppercase text-[#3F352C]"
          delay={0.1}
        />
        <AnimatedText
          text="Lost in the void."
          el="h2"
          className="text-2xl md:text-4xl font-circular font-medium mb-12 opacity-80"
          delay={0.3}
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="flex flex-col items-center space-y-8"
        >
          <p className="max-w-md opacity-60 text-lg font-circular">
            The page you are looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
          <Link 
            href="/" 
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#3F352C] text-[#E8E3DA] rounded-full overflow-hidden font-mono text-sm tracking-widest uppercase transition-transform hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              Back to Home
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
                <path d="M19 12H5"></path>
                <path d="M12 19l-7-7 7-7"></path>
              </svg>
            </span>
          </Link>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}
