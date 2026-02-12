'use client';

export default function NoiseOverlay() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay">
            <svg
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.8" // High frequency for fine grain
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
            <style jsx>{`
        div {
          animation: noise 0.2s infinite;
        }
        @keyframes noise {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-1%, -1%); }
          20% { transform: translate(-2%, 1%); }
          30% { transform: translate(1%, -2%); }
          40% { transform: translate(-1%, 3%); }
          50% { transform: translate(-2%, 1%); }
          60% { transform: translate(3%, 0); }
          70% { transform: translate(0, 2%); }
          80% { transform: translate(-3%, 0); }
          90% { transform: translate(2%, 1%); }
          100% { transform: translate(1%, 0); }
        }
      `}</style>
        </div>
    );
}
