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

    // Tracked in CSS pixels because the context is scaled by dpr below: clearing
    // with canvas.width/height would clear dpr x dpr times the needed area every
    // frame (4x the work at 200% scaling, 1.56x at Windows' common 125%).
    let cssWidth = 0;
    let cssHeight = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      cssWidth = window.innerWidth;
      cssHeight = window.innerHeight;
      // Assigning width/height resets the transform, so the scale below is not
      // cumulative across resizes.
      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;
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

    // These factors are authored against a 60fps frame. Applied raw, the trail's
    // speed becomes a function of the display's refresh rate and of whatever
    // frames the browser happens to drop -- which is why it feels different in
    // Chrome and Opera on the same machine. Normalising by delta time makes the
    // motion identical at 60Hz, 120Hz, 144Hz or while frames are being missed.
    const HEAD_CHASE = 0.3; // how hard point 0 chases the cursor, per 60fps frame
    const CHAIN_TENSION = 0.4; // how stiff the ribbon is, per 60fps frame
    const perFrame = (factor: number, dt: number) => 1 - Math.pow(1 - factor, dt * 60);

    let lastTime = performance.now();

    const render = (now: number) => {
      // Clamp dt so returning from a background tab doesn't teleport the ribbon.
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      ctx.clearRect(0, 0, cssWidth, cssHeight);

      if (!hasMoved) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Spring Physics: The head (point 0) chases the mouse
      const headK = perFrame(HEAD_CHASE, dt);
      currentX += (mouseX - currentX) * headK;
      currentY += (mouseY - currentY) * headK;

      points[0].x = currentX;
      points[0].y = currentY;

      // Kinematic Chain: Every subsequent point chases the point immediately in front of it!
      // This creates the physical "whipping" and "ribbon" drag effect
      const chainK = perFrame(CHAIN_TENSION, dt);
      for (let i = 1; i < numPoints; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * chainK;
        points[i].y += (points[i - 1].y - points[i].y) * chainK;
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

    render(performance.now());

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isReady]);

  // Touch guard only -- a cursor trail is meaningless without a cursor. This is
  // a device-capability check, not a motion-preference one.
  // Returning null also stops the rAF loop: the effect bails on a null canvas ref.
  if (!isReady || isTouchDevice) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none mix-blend-difference">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
