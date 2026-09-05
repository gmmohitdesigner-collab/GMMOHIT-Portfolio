"use client";

import { useEffect, useRef, useState } from "react";

type Point = {
  x: number;
  y: number;
};

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsReady(true);
    // Detect if the device primarily uses touch
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (!isReady || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const numPoints = 50; // The length/segments of the ribbon
    const maxRadius = 1.5; // Fine pen line
    const points: Point[] = [];
    
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let hasMoved = false; // Prevents the trail from drawing from the center on load

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      
      // Initialize points
      if (points.length === 0) {
        for (let i = 0; i < numPoints; i++) {
          points.push({ x: 0, y: 0 }); // They will be teleported on first move
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        // Teleport all points instantly to the first mouse position
        mouseX = e.clientX;
        mouseY = e.clientY;
        currentX = mouseX;
        currentY = mouseY;
        for (let i = 0; i < numPoints; i++) {
          points[i].x = mouseX;
          points[i].y = mouseY;
        }
      } else {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!hasMoved) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Spring Physics: The head (point 0) chases the mouse
      currentX += (mouseX - currentX) * 0.3;
      currentY += (mouseY - currentY) * 0.3;
      
      points[0].x = currentX;
      points[0].y = currentY;

      // Kinematic Chain: Every subsequent point chases the point immediately in front of it!
      // This creates the physical "whipping" and "ribbon" drag effect
      for (let i = 1; i < numPoints; i++) {
        // The tension factor (0.4) controls how stiff the ribbon is
        points[i].x += (points[i - 1].x - points[i].x) * 0.4;
        points[i].y += (points[i - 1].y - points[i].y) * 0.4;
      }

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Draw the ribbon using Quadratic Bezier Curves for absolute smoothness
      for (let i = 1; i < numPoints - 1; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];

        // Easing function for the thickness: tapers off beautifully at the tail
        const progress = 1 - i / numPoints;
        const easeProgress = Math.pow(progress, 1.2); 

        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;

        ctx.beginPath();
        
        if (i === 1) {
          ctx.moveTo(p0.x, p0.y);
        } else {
          const prevMidX = (p0.x + p1.x) / 2;
          const prevMidY = (p0.y + p1.y) / 2;
          ctx.moveTo(prevMidX, prevMidY);
        }

        ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);

        ctx.lineWidth = easeProgress * maxRadius;
        
        // Pure white ink, fading out towards the tail
        // When combined with mix-blend-difference on the canvas, this magically 
        // turns dark charcoal/brown over beige backgrounds, and light beige over dark backgrounds!
        ctx.strokeStyle = `rgba(255, 255, 255, ${easeProgress})`; 
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isReady]);

  if (!isReady || isTouchDevice) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none mix-blend-difference">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
