'use client';

import { motion } from 'framer-motion';

export default function CTA() {
    return (
        <section className="relative z-10 bg-white py-32 px-6 border-t border-white/10">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-9xl font-bold tracking-tighter text-espresso mb-12"
                >
                    READY TO <br className="hidden md:block" /> WAKE UP?
                </motion.h2>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-espresso text-white px-12 py-6 text-xl md:text-2xl font-bold tracking-wider uppercase hover:bg-condensation hover:text-espresso transition-colors duration-300 w-full md:w-auto"
                >
                    Order Trial Pack - $29
                </motion.button>

                <div className="mt-16 flex space-x-8 text-espresso/60 text-xs font-mono uppercase">
                    <a href="#" className="hover:text-espresso underline decoration-dotted">FAQ</a>
                    <a href="#" className="hover:text-espresso underline decoration-dotted">Shipping</a>
                    <a href="#" className="hover:text-espresso underline decoration-dotted">Contact</a>
                </div>
            </div>
        </section>
    );
}
