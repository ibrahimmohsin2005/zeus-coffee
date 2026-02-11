'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const totalFrames = 240; // Updated to 240 frames

    // Track scroll progress of the 300vh container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Map scroll (0-1) to frame index (0-239)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

    // Text Animations - Three distinct words appearing at different stages
    // Stage 1: "AWAKEN" (Start of pour)
    // Shifted earlier: 2% -> 20%
    const opacityText1 = useTransform(scrollYProgress, [0.02, 0.1, 0.15, 0.2], [0, 1, 1, 0]);
    const scaleText1 = useTransform(scrollYProgress, [0.02, 0.2], [0.9, 1.1]);

    // Stage 2: "ELEVATE" (The splash/middle)
    // Shifted earlier: 20% -> 35%
    const opacityText2 = useTransform(scrollYProgress, [0.2, 0.25, 0.3, 0.35], [0, 1, 1, 0]);
    const scaleText2 = useTransform(scrollYProgress, [0.2, 0.35], [0.9, 1.1]);

    // Stage 3: "ZEUS" (Final product)
    // Fades in MUCH earlier (35%) and STAYS visible for the majority of the scroll
    const opacityText3 = useTransform(scrollYProgress, [0.35, 0.5, 1], [0, 1, 1]);
    const scaleText3 = useTransform(scrollYProgress, [0.35, 1], [0.9, 1.05]);

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
                <motion.div
                    style={{ opacity: opacityText3, scale: scaleText3 }}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
                >
                    <h1 className="text-[15vw] sm:text-[12rem] font-bold tracking-tighter-custom leading-none text-white mix-blend-overlay">
                        ZEUS.
                    </h1>
                    <p className="mt-4 text-sm sm:text-lg tracking-[0.2em] text-white/50 uppercase font-medium">
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
