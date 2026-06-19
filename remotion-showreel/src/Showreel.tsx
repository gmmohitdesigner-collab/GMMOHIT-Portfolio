import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, staticFile } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { Image } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { EffectComposer, DepthOfField, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { Vector2, Vector3 } from 'three';

// Buttery smooth ease-in-out curve for fluid, premium camera transitions
const easeSmooth = Easing.bezier(0.4, 0, 0.2, 1);

// --- EXACT SPATIAL LAYOUT FROM IMAGE (DEEP PERSPECTIVE CLUSTER) ---
// --- EXACT SPATIAL LAYOUT FROM IMAGE (DEEP PERSPECTIVE CLUSTER) ---
const baseScreens = [
  // 1. Center Hero (Z = 0)
  { id: 'hero', src: 'assets/Homepage UI.png', position: [0, 0, 0], scale: [20, 12] },
  
  // 2. Top Left (Z = -30)
  { id: 'top-left', src: 'assets/UIcard2.png', position: [-18, 14, -30], scale: [8, 6] },
  
  // 3. Top Right (Z = -60)
  { id: 'top-right', src: 'assets/UIcard3.png', position: [25, 15, -60], scale: [12, 8] },
  
  // 4. Bottom Left (Z = -90)
  { id: 'bottom-left', src: 'assets/UIcard4.png', position: [-32, -26, -90], scale: [14, 10] },
];

// Dynamically generate 4 repeating cycles to create the illusion of an infinite repeating tunnel
const screens = [];
for (let cycle = 0; cycle < 4; cycle++) {
  const zOffset = cycle * -120; // Push each cycle 120 units deeper
  baseScreens.forEach((screen) => {
    screens.push({
      ...screen,
      id: `${screen.id}-cycle${cycle}`,
      position: [screen.position[0], screen.position[1], screen.position[2] + zOffset] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
    });
  });
}

const MovingCanvasRig = ({ children }: { children: React.ReactNode }) => {
  const frame = useCurrentFrame();
  const { camera } = useThree();

  // Dynamic Tour Keyframes: Seamless 8-Second Loop (480 Frames @ 60fps)
  // Hero (Z=0) -> TopLeft (Z=-30) -> TopRight (Z=-60) -> BottomLeft (Z=-90) -> Hero Cycle 1 (Z=-120)
  const keyframes = [0, 120, 240, 360, 480];

  const targetX = interpolate(frame, keyframes, [0, -18, 25, -32, 0], { easing: easeSmooth, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const targetY = interpolate(frame, keyframes, [0, 14, 15, -26, 0], { easing: easeSmooth, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const targetZ = interpolate(frame, keyframes, [0, -30, -60, -90, -120], { easing: easeSmooth, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Dynamically pull the canvas closer to the camera to maintain 60% viewport
  // At frame 480, it resolves seamlessly back to the 24 dolly distance of the next Hero card
  const dollyDistance = interpolate(frame, keyframes, [24, 12, 16, 20, 24], { easing: easeSmooth, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  // The camera's mathematical Z position if the camera were moving
  const camZ = targetZ + dollyDistance;

  // Add subtle high-frequency drift, mathematically locked to loop perfectly over 480 frames
  // (5 full cycles for X, 4 full cycles for Y to create an organic, non-repeating Lissajous path)
  const driftX = Math.sin((frame * Math.PI * 2 * 5) / 480) * 0.2;
  const driftY = Math.cos((frame * Math.PI * 2 * 4) / 480) * 0.2;

  // 1. The camera is locked permanently to the origin. It never moves, pans, or tilts.
  camera.position.set(0, 0, 0);
  camera.rotation.set(0, 0, 0);

  // Calculate Chromatic Aberration intensity dynamically based on transition speed
  const isWhipPan = false; 
  const caOffset = 0.0005;

  const focusTarget = useMemo(() => new Vector3(), []);
  
  useFrame(() => {
    // Because the canvas moves the active object to X=0, Y=0 relative to the camera,
    // the focus target is always purely the negative dolly distance on the Z-axis!
    focusTarget.set(0, 0, -dollyDistance);
  });

  return (
    <>
      <EffectComposer multisampling={4}>
        <DepthOfField
          target={focusTarget}
          focalLength={0.02}
          bokehScale={6}
          height={1080}
        />
        <ChromaticAberration
          offset={new Vector2(caOffset, caOffset)}
          radialModulation={true}
          modulationOffset={0.5}
        />
        <Noise opacity={0.04} />
      </EffectComposer>

      {/* 2. The entire layout is wrapped in a master group that translates in the opposite direction! */}
      {/* This creates the illusion of moving the camera, but actually moves the "Figma Artboard" */}
      <group position={[-targetX + driftX, -targetY + driftY, -camZ]}>
        {children}
      </group>
    </>
  );
};

export const Showreel: React.FC = () => {
  const { width, height } = useVideoConfig();
  
  return (
    <AbsoluteFill>
      <ThreeCanvas
        width={width}
        height={height}
        linear
        camera={{ fov: 45 }}
      >
        <color attach="background" args={['#EFECE6']} />
        
        <MovingCanvasRig>
          {screens.map((screen) => (
            <Image
              key={screen.id}
              url={staticFile(screen.src)}
              position={screen.position as [number, number, number]}
              rotation={screen.rotation as [number, number, number]}
              scale={screen.scale as [number, number]}
              transparent
            />
          ))}
        </MovingCanvasRig>
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
