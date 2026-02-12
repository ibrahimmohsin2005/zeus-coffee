'use client';

import dynamic from 'next/dynamic';
import Features from '@/components/Features';
import CTA from '@/components/CTA';
import SocialProof from '@/components/SocialProof';
import Header from '@/components/Header';
import TheRitual from '@/components/TheRitual';
import FAQ from '@/components/FAQ';
import PricingSection from '@/components/PricingSection';

// Dynamically import HeroCanvas to avoid SSR issues with Canvas/Windows
const HeroCanvas = dynamic(() => import('@/components/HeroCanvas'), { ssr: false });

export default function Home() {
  return (
    <main className="bg-espresso text-white selection:bg-condensation selection:text-espresso">
      <Header />

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
        <TheRitual />
        <SocialProof />
        <PricingSection />
        <CTA />
        <FAQ />
      </div>

      <footer className="bg-espresso py-6 text-center text-white/20 text-xs tracking-widest uppercase relative z-10 border-t border-white/5">
        © {new Date().getFullYear()} ZEUS COFFEE. All Rights Reserved.
      </footer>
    </main>
  );
}
