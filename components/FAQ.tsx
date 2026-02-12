'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    {
        question: "Is this stronger than regular coffee?",
        answer: "Yes. Our cold brew concentrate has roughly 2x the caffeine of a standard cup due to the 24-hour steep time and bean density. Handle with care."
    },
    {
        question: "Do I need to refrigerate it?",
        answer: "Our cans are shelf-stable until opened, thanks to nitrogen sealing. However, we recommend chilling them 12 hours before serving for the optimal 'snap'."
    },
    {
        question: "Where do you ship?",
        answer: "Currently shipping to all 50 US states. International shipping is coming soon to select countries."
    },
    {
        question: "What's inside? Just coffee?",
        answer: "Just filtered water and 100% Arabica coffee beans from Ethiopia. No sugar, no dairy, no preservatives. Pure fuel."
    }
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="bg-espresso py-32 px-6 relative z-10 border-b border-white/5">
            <div className="max-w-3xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold tracking-tighter-custom text-white mb-16 text-center"
                >
                    QUESTIONS?
                </motion.h2>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="border border-white/10 rounded-lg overflow-hidden"
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors duration-300"
                            >
                                <span className="text-lg font-medium text-white">{faq.question}</span>
                                <span className={`text-condensation font-mono transition-transform duration-300 ${activeIndex === i ? 'rotate-45' : 'rotate-0'}`}>
                                    +
                                </span>
                            </button>
                            <AnimatePresence>
                                {activeIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-white/60 text-sm leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
