'use client';

export default function SocialProof() {
    return (
        <div className="bg-espresso py-12 border-y border-white/5 overflow-hidden relative z-10">
            <div className="flex animate-marquee whitespace-nowrap">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex items-center mx-8 space-x-4">
                        <span className="text-white/40 text-sm font-mono">★★★★★</span>
                        <span className="text-xl font-medium tracking-tight text-white/80">&quot;THE TESLA OF CANNED COFFEE.&quot;</span>
                        <span className="text-condensation text-xs uppercase">— GQ</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
