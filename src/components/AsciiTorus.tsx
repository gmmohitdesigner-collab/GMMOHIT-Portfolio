"use client";

import { useEffect, useRef } from "react";

interface AsciiTorusProps {
    className?: string;
}

export default function AsciiTorus({ className = "" }: AsciiTorusProps) {
    const preRef = useRef<HTMLPreElement>(null);

    useEffect(() => {
        let animationFrameId: number;
        let currentA = 0;
        let currentB = 0;

        const renderFrame = () => {
            const b = [];
            const z = [];
            currentA += 0.015; // Rotation speed X (Slowed down for elegance)
            currentB += 0.008; // Rotation speed Y (Slowed down for elegance)
            
            const cA = Math.cos(currentA), sA = Math.sin(currentA),
                  cB = Math.cos(currentB), sB = Math.sin(currentB);
            
            for(let k = 0; k < 1760; k++) {
                b[k] = k % 80 === 79 ? "\n" : " ";
                z[k] = 0;
            }
            
            for(let j = 0; j < 6.28; j += 0.07) {
                const ct = Math.cos(j), st = Math.sin(j);
                for(let i = 0; i < 6.28; i += 0.02) {
                    const sp = Math.sin(i), cp = Math.cos(i),
                          h = ct + 2,
                          D = 1 / (sp * h * sA + st * cA + 5),
                          t = sp * h * cA - st * sA;
                    
                    const x = 0 | (40 + 30 * D * (cp * h * cB - t * sB)),
                          y = 0 | (12 + 15 * D * (cp * h * sB + t * cB)),
                          o = x + 80 * y,
                          N = 0 | (8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));
                    
                    if(y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
                        z[o] = D;
                        b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
                    }
                }
            }
            
            if (preRef.current) {
                preRef.current.innerHTML = b.join("");
            }
            animationFrameId = requestAnimationFrame(renderFrame);
        };

        renderFrame();
        
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div aria-hidden="true" className={`flex items-center justify-center font-mono ${className}`}>
            <pre ref={preRef} className="text-[#3F352C] opacity-70 leading-none text-[6px] sm:text-[8px] md:text-[10px] tracking-tight" />
        </div>
    );
}
