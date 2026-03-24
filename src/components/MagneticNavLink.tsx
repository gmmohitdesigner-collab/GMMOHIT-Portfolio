"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticNavLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export default function MagneticNavLink({
  children,
  href,
  className = "",
  target,
  rel,
  onClick
}: MagneticNavLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    
    // Calculate bounding rect
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    // Find middle point
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Displacement scaling (subtle 15px max)
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative inline-flex overflow-hidden group/link cursor-pointer ${className}`}
    >
      <span className="relative flex items-center transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/link:-translate-y-full">
        {children}
      </span>
      <span className="absolute inset-0 flex items-center transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover/link:translate-y-0">
        {children}
      </span>
    </motion.a>
  );
}
