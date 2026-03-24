"use client";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="w-full flex items-center justify-between px-4 md:px-12 lg:px-16 py-8 md:py-12 bg-brand-bg relative overflow-hidden">
            <p className="font-circular text-xs md:text-sm lg:text-base opacity-60">
                @2025 GM MOHIT ALL RIGHTS RESERVED
            </p>

            <button
                onClick={scrollToTop}
                className="flex items-center gap-2 group hover:opacity-70 transition-opacity"
                aria-label="Scroll to top"
            >
                <span className="font-circular text-sm md:text-lg lg:text-[31px]">SCROLL TO TOP</span>
                <div className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 rounded-full border border-brand-text flex items-center justify-center group-hover:-translate-y-1 transition-transform">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8">
                        <path d="M12 20V4M12 4L5 11M12 4L19 11" stroke="#3F352C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </button>
        </footer>
    );
}
