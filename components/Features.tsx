'use client';

import { motion } from 'framer-motion';

export default function Features() {
    return (
        <section className="relative z-10 bg-espresso-light py-32 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
                {[
                    {
                        title: "24-Hour Micro-Steep",
                        desc: "Extracted slowly at 3°C for zero bitterness and maximum depth.",
                        icon: "I."
                    },
                    {
                        title: "Zero-Oxidation Canning",
                        desc: "Sealed within seconds of brewing. Freshness guaranteed.",
                        icon: "II."
                    },
                    {
                        title: "Single-Origin Ethiopian",
                        desc: "Sourced directly from Yirgacheffe. Floral, bright, and bold.",
                        icon: "III."
                    }
                ].map((feature, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-start space-y-6 group"
                    >
                        <span className="text-condensation text-sm font-mono">{feature.icon}</span>
                        <h3 className="text-3xl font-bold tracking-tight text-white group-hover:text-condensation transition-colors duration-300">
                            {feature.title}
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                            {feature.desc}
                        </p>
                        <div className="h-px w-full bg-white/10 group-hover:bg-condensation/50 transition-colors duration-500 mt-8" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
