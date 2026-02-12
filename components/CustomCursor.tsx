'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16); // Center the 32px cursor
            cursorY.set(e.clientY - 16);
        };

        const handleHoverStart = () => setIsHovering(true);
        const handleHoverEnd = () => setIsHovering(false);

        window.addEventListener('mousemove', moveCursor);

        // Add listeners to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleHoverStart);
            el.addEventListener('mouseleave', handleHoverEnd);
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleHoverStart);
                el.removeEventListener('mouseleave', handleHoverEnd);
            });
        };
    }, [cursorX, cursorY]);

    // Hide default cursor globally via CSS (handled in globals.css)

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/50 pointer-events-none z-[100] mix-blend-difference"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
            animate={{
                scale: isHovering ? 2.5 : 1, // Expand when hovering
                backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
            <div className="absolute inset-0 bg-white/20 rounded-full blur-[2px] opacity-0 hover:opacity-100 transition-opacity" />
        </motion.div>
    );
}
