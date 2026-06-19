"use client";

import { ReactNode } from "react";

interface CaseStudyLayoutProps {
    children: ReactNode;
}

export default function CaseStudyLayout({ children }: CaseStudyLayoutProps) {
    return (
        <main className="w-full min-h-screen bg-[var(--color-brand-bg)] text-[var(--color-brand-text)] flex flex-col items-center pb-24 md:pb-48">
            {/* 
              Removed global max-width constraint to allow for full-bleed sections.
              Each child section is now responsible for its own max-width and vertical spacing
              to create a dynamic, editorial layout rhythm.
            */}
            {children}
        </main>
    );
}
