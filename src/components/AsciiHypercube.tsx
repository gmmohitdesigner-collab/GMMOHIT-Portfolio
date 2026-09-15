"use client";

import { useEffect, useRef, useState } from "react";

interface AsciiHypercubeProps {
    className?: string;
}

// 4D Vertex definition
type Vec4 = [number, number, number, number];
const vertices: Vec4[] = [];
for (let i = 0; i < 16; i++) {
    vertices.push([
        (i & 1) ? 1 : -1,
        (i & 2) ? 1 : -1,
        (i & 4) ? 1 : -1,
        (i & 8) ? 1 : -1
    ]);
}

// Edges (pairs of vertex indices that differ by exactly 1 bit)
const edges: [number, number][] = [];
for (let i = 0; i < 16; i++) {
    for (let j = i + 1; j < 16; j++) {
        let diff = i ^ j;
        if ((diff & (diff - 1)) === 0) {
            edges.push([i, j]);
        }
    }
}

// Generate target particles by interpolating along the edges
const numParticlesPerEdge = 30;
const numEdges = edges.length; // 32
const totalParticles = numEdges * numParticlesPerEdge;

type Particle = {
    cx: number;
    cy: number;
    vx: number;
    vy: number;
    tx: number;
    ty: number;
    char: string;
    seed: number;
};

const densityChars = " .,-~:;=!*#$@";

export default function AsciiHypercube({ className = "" }: AsciiHypercubeProps) {
    const preRef = useRef<HTMLPreElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    }, []);

    useEffect(() => {
        const el = preRef.current;
        if (!el) return;

        const width = 320; // Massive grid to prevent clipping
        const height = 120;  
        
        const particles: Particle[] = [];
        for (let i = 0; i < totalParticles; i++) {
            particles.push({
                cx: width / 2,
                cy: height / 2,
                vx: 0,
                vy: 0,
                tx: 0,
                ty: 0,
                char: "@",
                seed: Math.random()
            });
        }

        let frameId = 0;
        let angleXW = 0;
        let angleYW = 0;
        let angleXY = 0;
        
        let mouseX = -100;
        let mouseY = -100;
        let wasHovering = false;

        const onMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width) * width;
            mouseY = ((e.clientY - rect.top) / rect.height) * height;
        };

        const onMouseLeave = () => {
            mouseX = -100;
            mouseY = -100;
        };

        let touchTimeout: NodeJS.Timeout | null = null;
        const onTouchStart = () => {
            // Fake the mouse being exactly in the center to trigger the proximity blast
            mouseX = width / 2;
            mouseY = height / 2;
            
            if (touchTimeout) clearTimeout(touchTimeout);
            
            // Rewind after 2.5 seconds
            touchTimeout = setTimeout(() => {
                mouseX = -100;
                mouseY = -100;
            }, 2500);
        };

        // Always attach mouse events. Touchscreen laptops use mice too!
        containerRef.current?.addEventListener("mousemove", onMouseMove);
        containerRef.current?.addEventListener("mouseleave", onMouseLeave);
        containerRef.current?.addEventListener("touchstart", onTouchStart, { passive: true });

        const renderFrame = () => {
            angleXW += 0.003;
            angleYW += 0.005;
            angleXY += 0.0015;

            const cxW = Math.cos(angleXW), sxW = Math.sin(angleXW);
            const cyW = Math.cos(angleYW), syW = Math.sin(angleYW);
            const cxY = Math.cos(angleXY), sxY = Math.sin(angleXY);

            const rotVertices: Vec4[] = [];
            for (let i = 0; i < 16; i++) {
                let [x, y, z, w] = vertices[i];

                let nx = x * cxW - w * sxW;
                let nw = x * sxW + w * cxW;
                x = nx; w = nw;

                let ny = y * cyW - w * syW;
                nw = y * syW + w * cyW;
                y = ny; w = nw;

                nx = x * cxY - y * sxY;
                ny = x * sxY + y * cxY;
                x = nx; y = ny;

                const distance = 3;
                const wScale = 1 / (distance - w);
                
                const px = x * wScale;
                const py = y * wScale;
                const pz = z * wScale;

                rotVertices.push([px, py, pz, w]);
            }

            let pIndex = 0;
            for (let e = 0; e < edges.length; e++) {
                const [v1, v2] = edges[e];
                const p1 = rotVertices[v1];
                const p2 = rotVertices[v2];

                for (let k = 0; k < numParticlesPerEdge; k++) {
                    const t = k / (numParticlesPerEdge - 1);
                    const ix = p1[0] + (p2[0] - p1[0]) * t;
                    const iy = p1[1] + (p2[1] - p1[1]) * t;
                    const iz = p1[2] + (p2[2] - p1[2]) * t;

                    const scale = 20; 
                    const gridX = Math.floor(width / 2 + ix * scale * 2);
                    const gridY = Math.floor(height / 2 + iy * scale);

                    const depth = Math.max(0, Math.min(1, (iz + 1) / 2));
                    const charIndex = Math.floor(depth * (densityChars.length - 1));

                    const p = particles[pIndex];
                    p.tx = gridX;
                    p.ty = gridY;
                    p.char = densityChars[charIndex];
                    
                    pIndex++;
                }
            }

            const frame = new Array(width * height).fill(" ");
            
            // Calculate proximity to the hypercube mass
            const dxCenter = mouseX - (width / 2);
            const dyCenter = mouseY - (height / 2);
            const distFromCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
            const isHovering = distFromCenter < 25; // Trigger only when close to the cube
            
            const isHoverStart = isHovering && !wasHovering;
            
            // 0.95 friction during hover creates a slow-motion vacuum drift.
            const driftFriction = 0.98;

            for (let i = 0; i < totalParticles; i++) {
                const p = particles[i];

                if (isHoverStart) {
                    // Blast outwards from center
                    const dx = p.cx - (width / 2);
                    const dy = p.cy - (height / 2);
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    
                    // Very soft explosive force for slow-motion effect
                    const blastForce = 0.4 + (p.seed * 0.8);
                    
                    // Multiply X velocity by 3.0 and Y by 0.6 to create a wide horizontal oval blast!
                    p.vx = ((dx / dist) * blastForce + ((Math.random() - 0.5) * 0.5)) * 3.0;
                    p.vy = ((dy / dist) * blastForce + ((Math.random() - 0.5) * 0.5)) * 0.6;
                }

                if (isHovering) {
                    // Drift in vacuum
                    p.vx *= driftFriction;
                    p.vy *= driftFriction;
                    p.cx += p.vx;
                    p.cy += p.vy;
                } else {
                    // "Time Reversal" effect: No elastic bounce, just smooth asymptotic return.
                    p.vx = 0;
                    p.vy = 0;
                    // Move current position a percentage of the way to the target
                    p.cx += (p.tx - p.cx) * 0.08;
                    p.cy += (p.ty - p.cy) * 0.08;
                }

                const drawX = Math.floor(p.cx);
                const drawY = Math.floor(p.cy);

                if (drawX >= 0 && drawX < width && drawY >= 0 && drawY < height) {
                    const idx = drawY * width + drawX;
                    frame[idx] = p.char;
                }
            }

            let out = "";
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    out += frame[y * width + x];
                }
                out += "\n";
            }
            
            wasHovering = isHovering;

            el.textContent = out;
            frameId = requestAnimationFrame(renderFrame);
        };

        frameId = requestAnimationFrame(renderFrame);

        return () => {
            cancelAnimationFrame(frameId);
            if (touchTimeout) clearTimeout(touchTimeout);
            containerRef.current?.removeEventListener("mousemove", onMouseMove);
            containerRef.current?.removeEventListener("mouseleave", onMouseLeave);
            containerRef.current?.removeEventListener("touchstart", onTouchStart);
        };
    }, []);

    return (
        <div 
            ref={containerRef}
            aria-hidden="true" 
            className={`w-full h-full flex items-center justify-center font-mono ${className} cursor-crosshair`}
        >
            <pre ref={preRef} className="leading-[1.1] text-[5px] sm:text-[7px] md:text-[9px] tracking-tight" />
        </div>
    );
}
