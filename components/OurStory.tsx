'use client';

import { motion } from 'framer-motion';

export default function OurStory() {
    return (
        <section className="bg-espresso py-32 px-6 relative z-10 border-t border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-8 relative z-10"
                >
                    <div className="space-y-2">
                        <h2 className="text-sm font-mono tracking-widest text-condensation uppercase mb-4">
                            100% Single-Origin. 0% Compromise.
                        </h2>
                        <h3 className="text-4xl md:text-6xl font-bold tracking-tighter-custom text-white leading-[0.9]">
                            THE ORIGIN OF<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">THUNDER.</span>
                        </h3>
                    </div>

                    <div className="space-y-6 text-lg text-white/70 font-light leading-relaxed">
                        <p>
                            We didn&apos;t set out to make coffee. We set out to end the era of weak, watery bean water.
                        </p>
                        <p>
                            Sourced from the hyper-elevation slopes of the Ethiopian highlands, our beans are grown in volcanic soil where the air is thin and the UV is intense. This stress forces the cherry to concentrate flavor into a dense, hard bean—the diamond of the coffee world.
                        </p>
                        <p>
                            Most roasters burn away the nuance. We roast to the edge of combustion, then cold-extract for 24 hours in near-freezing temperatures. The result is a brew with zero bitterness, double the caffeine, and a chocolate-heavy finish that hits like a lightning bolt.
                        </p>
                    </div>


                </motion.div>

                {/* Abstract Visual / Image Placeholder */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative aspect-square md:aspect-[4/5] bg-zinc-900 rounded-lg overflow-hidden border border-white/10"
                >
                    {/* Animated Gradient Background expecting an image later */}
                    <div className="absolute inset-0 bg-gradient-to-br from-espresso-light via-zinc-800 to-black animate-pulse-slow" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <h1 className="text-[20rem] font-bold text-white leading-none rotate-90 select-none">
                            ZEUS
                        </h1>
                    </div>

                    {/* Overlay Texture */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                </motion.div>
            </div>
        </section>
    );
}
