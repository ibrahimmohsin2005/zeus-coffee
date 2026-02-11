'use client';

import dynamic from 'next/dynamic';
import Features from '@/components/Features';
import CTA from '@/components/CTA';
import SocialProof from '@/components/SocialProof';

// Dynamically import HeroCanvas to avoid SSR issues with Canvas/Windows
const HeroCanvas = dynamic(() => import('@/components/HeroCanvas'), { ssr: false });

export default function Home() {
  return (
    <main className="bg-espresso text-white selection:bg-condensation selection:text-espresso">
      {/* 
        SECTION 1: Sticky Helper 
        The HeroCanvas component handles its own 300vh height and sticky logic.
      */}
      <HeroCanvas />

      {/* 
        SECTION 2: Standard Scroll Content
        These components just stack naturally below the Hero's 300vh container.
      */}
      <div className="relative z-10 bg-espresso-light">
        <Features />
        <SocialProof />
        <CTA />
      </div>

      <footer className="bg-espresso py-6 text-center text-white/20 text-xs tracking-widest uppercase">
        © {new Date().getFullYear()} ZEUS COFFEE. All Rights Reserved.
      </footer>
    </main>
  );
}
