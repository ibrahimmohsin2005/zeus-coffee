'use client';

import { motion } from 'framer-motion';

export default function TheRitual() {
    const steps = [
        {
            num: '01',
            title: 'THE CRACK',
            desc: 'Sound on. Listen for the snap of nitrogen-sealed freshness. That’s the sound of oxygen leaving the chat.',
        },
        {
            num: '02',
            title: 'THE POUR',
            desc: 'Hard pour into a glass with ice. Watch the cascade effect as the nitrogen bubbles dance their way to the surface.',
        },
        {
            num: '03',
            title: 'THE ASCENSION',
            desc: 'First sip. The velvet texture hits your palate. The caffeine hits your bloodstream. You are now online.',
        },
    ];

    return (
        <section className="bg-espresso-light py-32 px-6 relative z-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold tracking-tighter-custom text-white mb-24 text-center"
                >
                    THE RITUAL
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-white/10 -z-10" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center space-y-6 bg-espresso-light"
                        >
                            <div className="w-24 h-24 rounded-full border border-white/10 bg-espresso flex items-center justify-center text-2xl font-mono text-condensation relative z-10 group hover:border-condensation/50 transition-colors duration-500">
                                {step.num}
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight text-white uppercase">
                                {step.title}
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
