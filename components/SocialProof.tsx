'use client';

export default function SocialProof() {
    return (
        <div className="bg-espresso py-12 border-y border-white/5 overflow-hidden relative z-10">
            <div className="flex animate-marquee whitespace-nowrap">
                {/* Repeat the testimonials list twice to ensure seamless looping */}
                {[...Array(2)].map((_, listIndex) => (
                    <div key={listIndex} className="flex">
                        {[
                            { text: "I don't drink coffee to wake up anymore. I drink this to feel alive.", author: "VOGUE" },
                            { text: "The cleanest energy high I've ever experienced. Zero crash.", author: "WIRED" },
                            { text: "It's not just coffee. It's rocket fuel for the soul.", author: "GQ" },
                            { text: "Liquid gold. The flavor profile is simply unmatched.", author: "EATER" },
                            { text: "A masterclass in cold brew. Rich, bold, and incredibly smooth.", author: "COFFEE REVIEW" }
                        ].map((t, i) => (
                            <div key={i} className="flex items-center mx-12 space-x-4 opacity-70 hover:opacity-100 transition-opacity duration-300">
                                <span className="text-condensation text-sm font-mono">★★★★★</span>
                                <span className="text-xl md:text-3xl font-light tracking-tighter text-white italic">
                                    &quot;{t.text}&quot;
                                </span>
                                <span className="text-white/40 text-xs font-bold tracking-widest uppercase">— {t.author}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
