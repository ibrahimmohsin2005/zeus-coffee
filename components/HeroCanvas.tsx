'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function HeroCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<(HTMLImageElement | null)[]>([]); // Changed to Ref
    const [isLoaded, setIsLoaded] = useState(false);
    const totalFrames = 240; // Updated to 240 frames

    // Smooth Scroll Physics ("600% Smoother")
    // We dampen the scroll progress to create a "heavy" fluid feel for the frames
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Create a smoothed version specifically for the canvas/video frames
    // Create a smoothed version specifically for the canvas/video frames
    const smoothProgress = useSpring(scrollYProgress, { mass: 0.5, stiffness: 150, damping: 30 });

    // Physics: high damping = less oscillation, low stiffness = "loose/heavy" feel
    // const smoothedScroll = useSpring(smoothProgress, { mass: 0.5, stiffness: 50, damping: 20 }); // Removed redundant line

    // Map SMOOTH scroll to frame index
    const frameIndex = useTransform(smoothProgress, [0, 1], [0, totalFrames - 1]);

    // Text Animations - Retimed for "Perfect Middle Ground"
    // User wants "AWAKEN" and "ELEVATE" to have more time, but "ZEUS" to still appear relatively fast.
    // Previous: Zeus at 16%. New: Zeus at 20%.

    // Stage 1: "AWAKEN" (0% -> 10%) - +25% duration
    const opacityText1 = useTransform(scrollYProgress, [0.0, 0.02, 0.08, 0.10], [0, 1, 1, 0]);
    const scaleText1 = useTransform(scrollYProgress, [0.0, 0.10], [0.9, 1.05]);

    // Stage 2: "ELEVATE" (10% -> 20%) - +25% duration
    const opacityText2 = useTransform(scrollYProgress, [0.10, 0.12, 0.18, 0.20], [0, 1, 1, 0]);
    const scaleText2 = useTransform(scrollYProgress, [0.10, 0.20], [0.9, 1.05]);

    // Stage 3: "ZEUS" (20% -> End)
    // Starts at 20%, pops in faster (5% duration vs previous 10%)
    const opacityText3 = useTransform(scrollYProgress, [0.20, 0.25, 1], [0, 1, 1]);
    const scaleText3 = useTransform(scrollYProgress, [0.20, 1], [0.95, 1.05]);

    // Subtitle: "The Science..."
    // Slightly delayed to 22% so it doesn't clash with Zeus entrance
    const opacitySubtitle = useTransform(scrollYProgress, [0.22, 0.28, 1], [0, 1, 1]);
    const scaleSubtitle = useTransform(scrollYProgress, [0.22, 1], [0.95, 1.05]);

    // Preload Images - Parallel & Non-Blocking
    useEffect(() => {
        // Initialize array with nulls
        imagesRef.current = new Array(totalFrames).fill(null);

        const loadImage = (index: number) => {
            const img = new Image();
            // Filename format: ezgif-frame-001.jpg
            const filename = `/sequence/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;
            img.src = filename;
            img.onload = () => {
                imagesRef.current[index] = img;
                // If the first frame is loaded, we can start showing something immediately
                if (index === 0) setIsLoaded(true);
            };
        };

        // Fire off all requests in parallel
        // The browser will handle the concurrency and queuing
        for (let i = 0; i < totalFrames; i++) {
            loadImage(i);
        }
    }, [totalFrames]);

    // Render Canvas
    useEffect(() => {
        // We need at least the first frame or "isLoaded" to be true to start rendering loop
        if (!isLoaded) return;

        const render = (index: number) => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (!canvas || !ctx) return;

            // Try to get the specific frame
            let img = imagesRef.current[index];

            // Fallback: If current frame isn't loaded, search backwards for the nearest loaded frame
            // This prevents blinking/flashing while scrolling if the network is slightly behind
            if (!img) {
                for (let i = index - 1; i >= 0; i--) {
                    if (imagesRef.current[i]) {
                        img = imagesRef.current[i];
                        break;
                    }
                }
            }

            // If we still don't have an image (e.g. frame 0 failed?), we can't draw anything yet
            if (!img) return;

            // Responsive "Cover" Logic (fills screen on mobile)
            const canvasWidth = canvas.width = window.innerWidth;
            const canvasHeight = canvas.height = window.innerHeight;

            // Use Math.max for "cover" effect (stops letterboxing on mobile)
            const scale = Math.max(canvasWidth / img.width, canvasHeight / img.height);
            const x = (canvasWidth / 2) - (img.width / 2) * scale;
            const y = (canvasHeight / 2) - (img.height / 2) * scale;

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        };

        // Initial Render
        render(0);

        // Subscribe to scroll changes
        const unsubscribe = frameIndex.on("change", (latest) => {
            render(Math.floor(latest));
        });

        return () => unsubscribe();
    }, [isLoaded, frameIndex]); // Removed 'images' dependency as it's now a ref

    return (
        <div ref={containerRef} className="relative h-[300vh] bg-espresso">
            {/* Sticky Canvas Wrapper */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-condensation text-xs tracking-widest uppercase animate-pulse">
                        Brewing Assets...
                    </div>
                )}
                <canvas ref={canvasRef} className="block w-full h-full object-cover" />

                {/* Stage 1 Text: AWAKEN */}
                <motion.div
                    style={{ opacity: opacityText1, scale: scaleText1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
                >
                    <h1 className="text-[18vw] sm:text-[12rem] font-bold tracking-tighter-custom leading-none text-white mix-blend-overlay">
                        AWAKEN.
                    </h1>
                </motion.div>

                {/* Stage 2 Text: ELEVATE */}
                <motion.div
                    style={{ opacity: opacityText2, scale: scaleText2 }}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
                >
                    <h1 className="text-[18vw] sm:text-[12rem] font-bold tracking-tighter-custom leading-none text-white mix-blend-overlay">
                        ELEVATE.
                    </h1>
                </motion.div>

                {/* Stage 3 Text: ZEUS */}
                <motion.div
                    style={{ opacity: opacityText3, scale: scaleText3 }}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
                >
                    <h1 className="text-[18vw] sm:text-[12rem] font-bold tracking-tighter-custom leading-none text-white mix-blend-overlay">
                        ZEUS.
                    </h1>
                </motion.div>

                {/* Subtitle: The Science... */}
                <motion.div
                    style={{ opacity: opacitySubtitle, scale: scaleSubtitle }}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 pt-[30vh] sm:pt-[16rem]"
                >
                    <p className="text-xs sm:text-lg tracking-[0.2em] text-white/80 uppercase font-medium text-center px-4">
                        The science of the perfect cold brew
                    </p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                    className="absolute bottom-10 text-white/30 text-[10px] tracking-widest uppercase animate-bounce"
                >
                    Scroll to Pour
                </motion.div>
            </div>
        </div>
    );
}
