'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 240; // The user provided 240 frames

export default function CoffeeCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { scrollYProgress } = useScroll();

    // Map scroll progress (0 to 1) to frame index (0 to FRAME_COUNT - 1)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !isLoaded || images.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Ensure index is within bounds
        const safeIndex = Math.max(0, Math.min(index, images.length - 1));
        const img = images[safeIndex];

        if (!img) return;

        // Canvas dimensions
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Image dimensions (intrinsic)
        const imgWidth = img.width;
        const imgHeight = img.height;

        // "Contain" logic: Scale to fit within canvas while maintaining aspect ratio
        const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);
        const drawWidth = imgWidth * scale;
        const drawHeight = imgHeight * scale;
        const offsetX = (canvasWidth - drawWidth) / 2;
        const offsetY = (canvasHeight - drawHeight) / 2;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }, [images, isLoaded]);

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];

            for (let i = 1; i <= FRAME_COUNT; i++) {
                const img = new Image();
                // Construct filename: ezgif-frame-001.jpg, etc.
                const filename = `/sequence/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;

                const promise = new Promise<void>((resolve) => {
                    img.onload = () => resolve();
                    img.onerror = (e) => {
                        console.error(`Failed to load image: ${filename}`, e);
                        // Resolve anyway to avoid blocking everything (missing frames will just be skipped)
                        resolve();
                    };
                });

                img.src = filename;
                loadedImages.push(img);
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    // Update canvas on scroll
    useMotionValueEvent(frameIndex, "change", (latest) => {
        renderFrame(Math.round(latest));
    });



    // Resize handler
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                // Set canvas resolution to match display size for sharpness
                // But for performance, maybe limit it or use devicePixelRatio carefully
                // Here we just set it to window size or parent container size
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                // Re-render current frame after resize
                const currentProgress = scrollYProgress.get();
                const currentFrame = Math.round(currentProgress * (FRAME_COUNT - 1));
                renderFrame(currentFrame);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size

        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded, images, scrollYProgress, renderFrame]); // Re-bind if dependencies change

    // Initial render when loaded
    useEffect(() => {
        if (isLoaded) {
            renderFrame(0);
        }
    }, [isLoaded, renderFrame]);

    return (
        <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
            <canvas
                ref={canvasRef}
                className="w-full h-full object-contain"
            />
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#050505] z-50">
                    <span className="text-white/50 text-sm tracking-widest animate-pulse">BREWING...</span>
                </div>
            )}
        </div>
    );
}
