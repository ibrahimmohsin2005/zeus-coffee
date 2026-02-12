'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function HeroCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
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

    // Text Animations - Retimed for "Immediate" ZEUS Impact
    // Text Animations - The "Aggressive" Split (08/08/84)
    // User wants Zeus EARLIER.

    // Stage 1: "AWAKEN" (0% -> 8%)
    const opacityText1 = useTransform(scrollYProgress, [0.0, 0.02, 0.06, 0.08], [0, 1, 1, 0]);
    const scaleText1 = useTransform(scrollYProgress, [0.0, 0.08], [0.9, 1.05]);

    // Stage 2: "ELEVATE" (8% -> 16%)
    const opacityText2 = useTransform(scrollYProgress, [0.08, 0.10, 0.14, 0.16], [0, 1, 1, 0]);
    const scaleText2 = useTransform(scrollYProgress, [0.08, 0.16], [0.9, 1.05]);

    // Stage 3: "ZEUS" (16% -> End)
    // Starts even earlier to give it maximum "pop" time
    const opacityText3 = useTransform(scrollYProgress, [0.16, 0.25, 1], [0, 1, 1]);
    const scaleText3 = useTransform(scrollYProgress, [0.16, 1], [0.95, 1.05]);

    // Subtitle: "The Science..."
    // Accelerate fade-in to feel "immediate" after ZEUS
    const opacitySubtitle = useTransform(scrollYProgress, [0.18, 0.24, 1], [0, 1, 1]);
    const scaleSubtitle = useTransform(scrollYProgress, [0.18, 1], [0.95, 1.05]);

    // Preload Images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];

        const loadImages = async () => {
            for (let i = 1; i <= totalFrames; i++) {
                const img = new Image();
                // Filename format: ezgif-frame-001.jpg
                const filename = `/sequence/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
                img.src = filename;
                await new Promise<void>((resolve) => {
                    img.onload = () => resolve();
                    img.onerror = () => resolve(); // Skip errors
                });
                loadedImages.push(img);
            }
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, [totalFrames]);

    // Render Canvas
    useEffect(() => {
        if (!isLoaded || images.length === 0) return;

        const render = (index: number) => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (!canvas || !ctx) return;

            const img = images[index];
            if (!img) return;

            // Responsive "Contain" Logic
            const canvasWidth = canvas.width = window.innerWidth;
            const canvasHeight = canvas.height = window.innerHeight;

            const scale = Math.min(canvasWidth / img.width, canvasHeight / img.height);
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
    }, [isLoaded, images, frameIndex]);

    return (
        <div ref={containerRef} className="relative h-[300vh] bg-espresso">
            {/* Sticky Canvas Wrapper */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-condensation text-xs tracking-widest uppercase animate-pulse">
                        Brewing Assets...
                    </div>
                )}
                <canvas ref={canvasRef} className="block w-full h-full object-contain" />

                {/* Stage 1 Text: AWAKEN */}
                <motion.div
                    style={{ opacity: opacityText1, scale: scaleText1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
                >
                    <h1 className="text-[15vw] sm:text-[12rem] font-bold tracking-tighter-custom leading-none text-white mix-blend-overlay">
                        AWAKEN.
                    </h1>
                </motion.div>

                {/* Stage 2 Text: ELEVATE */}
                <motion.div
                    style={{ opacity: opacityText2, scale: scaleText2 }}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
                >
                    <h1 className="text-[15vw] sm:text-[12rem] font-bold tracking-tighter-custom leading-none text-white mix-blend-overlay">
                        ELEVATE.
                    </h1>
                </motion.div>

                {/* Stage 3 Text: ZEUS */}
                {/* Stage 3 Text: ZEUS */}
                <motion.div
                    style={{ opacity: opacityText3, scale: scaleText3 }}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
                >
                    <h1 className="text-[15vw] sm:text-[12rem] font-bold tracking-tighter-custom leading-none text-white mix-blend-overlay">
                        ZEUS.
                    </h1>
                </motion.div>

                {/* Subtitle: The Science... */}
                <motion.div
                    style={{ opacity: opacitySubtitle, scale: scaleSubtitle }}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 pt-[20vw] sm:pt-[16rem]"
                >
                    <p className="text-sm sm:text-lg tracking-[0.2em] text-white/80 uppercase font-medium">
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
