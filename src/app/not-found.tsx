"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedText from '@/components/AnimatedText';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center">
      <NavBar />
      <section className="flex-1 w-full flex flex-col items-center justify-center px-6 md:px-12 py-32 text-center">
        <AnimatedText
          text="404"
          el="h1"
          className="text-8xl md:text-[12rem] font-bold tracking-tighter leading-none mb-6 text-foreground font-[family-name:var(--font-monument)]"
          delay={0.1}
        />
        <AnimatedText
          text="Lost in the void."
          el="h2"
          className="text-2xl md:text-4xl font-medium mb-12 text-foreground/80"
          delay={0.3}
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="flex flex-col items-center space-y-8"
        >
          <p className="max-w-md text-foreground/60 text-lg">
            The page you are looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
          <Link 
            href="/" 
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-foreground text-background rounded-full overflow-hidden font-medium transition-transform hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              Back to Home
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
          </Link>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}
