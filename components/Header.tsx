'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show header after scrolling past the hero (approx window height)
            if (window.scrollY > window.innerHeight * 0.8) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.header
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-espresso/80 backdrop-blur-md border-b border-white/5"
                >
                    <div className="text-xl font-bold tracking-tighter-custom text-white">
                        ZEUS.
                    </div>
                    <button className="bg-white text-espresso px-6 py-2 text-xs font-bold tracking-widest uppercase hover:bg-condensation transition-colors duration-300">
                        Order Now
                    </button>
                </motion.header>
            )}
        </AnimatePresence>
    );
}
