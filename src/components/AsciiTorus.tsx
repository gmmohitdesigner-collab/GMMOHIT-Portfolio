"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface AsciiTorusProps {
    className?: string;
}

// Pure frame computation, pulled out of the loop so a single static frame can be
// rendered for reduced-motion and touch users without spinning up rAF at all.
function computeFrame(a: number, b: number): string {
    const out: string[] = [];
    const z: number[] = [];
    const cA = Math.cos(a), sA = Math.sin(a),
          cB = Math.cos(b), sB = Math.sin(b);

    for (let k = 0; k < 1760; k++) {
        out[k] = k % 80 === 79 ? "\n" : " ";
        z[k] = 0;
    }

    for (let j = 0; j < 6.28; j += 0.07) {
        const ct = Math.cos(j), st = Math.sin(j);
        for (let i = 0; i < 6.28; i += 0.02) {
            const sp = Math.sin(i), cp = Math.cos(i),
                  h = ct + 2,
                  D = 1 / (sp * h * sA + st * cA + 5),
                  t = sp * h * cA - st * sA;

            const x = 0 | (40 + 30 * D * (cp * h * cB - t * sB)),
                  y = 0 | (12 + 15 * D * (cp * h * sB + t * cB)),
                  o = x + 80 * y,
                  N = 0 | (8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));

            if (y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
                z[o] = D;
                out[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
            }
        }
    }
    return out.join("");
}

// An angle where the torus reads clearly as a 3D form rather than an edge-on
// sliver -- this is what static viewers get instead of nothing.
const STATIC_A = 1.1;
const STATIC_B = 0.6;

export default function AsciiTorus({ className = "" }: AsciiTorusProps) {
    const preRef = useRef<HTMLPreElement>(null);
    const prefersReduced = useReducedMotion();

    useEffect(() => {
        const el = preRef.current;
        if (!el) return;

        // Read the media query here rather than holding it in state -- this effect
        // is client-only, so there is no SSR mismatch to guard against, and state
        // would just cause an extra render.
        const isCoarse = window.matchMedia("(pointer: coarse)").matches;

        // Static frame for anyone who asked for less motion, and for touch
        // devices -- an uncapped rAF loop on a mid-range phone is a battery and
        // jank cost for decoration. Still renders, just doesn't spin.
        if (prefersReduced || isCoarse) {
            el.textContent = computeFrame(STATIC_A, STATIC_B);
            return;
        }

        let frameId = 0;
        let idleId: number | undefined;
        let a = 0;
        let b = 0;

        const renderFrame = () => {
            a += 0.015; // Rotation speed X (Slowed down for elegance)
            b += 0.008; // Rotation speed Y (Slowed down for elegance)
            if (preRef.current) preRef.current.textContent = computeFrame(a, b);
            frameId = requestAnimationFrame(renderFrame);
        };

        // Paint a frame immediately so the slot is never empty, then defer the
        // loop until the main thread is free -- this runs below the fold and has
        // no business competing with the hero for the first paint.
        el.textContent = computeFrame(STATIC_A, STATIC_B);
        const start = () => { frameId = requestAnimationFrame(renderFrame); };
        if (typeof requestIdleCallback === "function") {
            idleId = requestIdleCallback(start, { timeout: 2000 });
        } else {
            idleId = window.setTimeout(start, 600);
        }

        return () => {
            cancelAnimationFrame(frameId);
            if (idleId !== undefined) {
                if (typeof cancelIdleCallback === "function") cancelIdleCallback(idleId);
                else clearTimeout(idleId);
            }
        };
    }, [prefersReduced]);

    return (
        <div aria-hidden="true" className={`flex items-center justify-center font-mono ${className}`}>
            <pre ref={preRef} className="text-[#3F352C] opacity-70 leading-none text-[6px] sm:text-[8px] md:text-[10px] tracking-tight" />
        </div>
    );
}
