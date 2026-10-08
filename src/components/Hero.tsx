import React, { useState } from 'react';
import { TempleNightScene } from '@designcodeio/threeui';
import '@designcodeio/threeui/style.css';
import { ArrowDown, Leaf, ShieldCheck, Globe, FileText, Play } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onRequestCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onRequestCatalog }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section id="hero-section" className="relative min-h-screen pt-24 pb-16 flex items-center justify-center overflow-hidden bg-[#132c19]">
      {/* 3D WebGL Shader Frame Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="shader-frame relative w-full h-full overflow-hidden">
          <TempleNightScene variant="temple-night" />
        </div>
      </div>

      {/* Atmospheric Ambient Gradients & Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2d1405] via-[#2d1405]/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#2d1405]/80 via-transparent to-[#2d1405]/80 pointer-events-none" />

      {/* Main Glassmorphic Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#132c19]/70 border border-[#d4af37]/40 backdrop-blur-md shadow-lg mb-6">
          <span className="text-xs font-mono tracking-widest text-[#e6c670] uppercase">
            Sustainably Handcrafted Natural Fibers
          </span>
        </div>



        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fff9e6] via-[#f7e7a9] to-[#d4af37] tracking-tight leading-tight mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          Handcrafted Elegance Born From Nature
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#d0bbae] font-sans font-light tracking-wide mb-10 drop-shadow-md">
          Sustainably crafted home decor & accent art from raw banana bark, mendong grass, water hyacinth, seagrass, and bamboo — handwoven by master Javanese artisans.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e6c670] to-[#b89343] text-[#0a170d] font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
          >
            <span>Explore Collections</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>

          <button
            onClick={onRequestCatalog}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#132c19]/80 hover:bg-[#1d4226] text-[#f9f7f2] border border-[#d4af37]/40 hover:border-[#d4af37] font-semibold text-sm tracking-wider uppercase backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-[#d4af37]" />
            <span>Download Catalog Specs</span>
          </button>

          <button
            onClick={() => setVideoModalOpen(true)}
            className="w-full sm:w-auto px-5 py-4 rounded-full bg-black/40 hover:bg-black/60 text-[#d0bbae] border border-white/10 hover:border-white/30 text-xs backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-3.5 h-3.5 text-[#d4af37] fill-[#d4af37]" />
            <span>Watch Artisan Process</span>
          </button>
        </div>

        {/* Feature Badges Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-[#132c19]/60 border border-[#d4af37]/20 backdrop-blur-md">
            <Leaf className="w-5 h-5 text-[#d4af37] shrink-0" />
            <div className="text-left">
              <h3 className="text-xs font-bold text-[#f7e7a9]">95% Natural Fibers</h3>
              <p className="text-[11px] text-[#d9c3b3]">Eco-sustainable agricultural upcycling</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-[#132c19]/60 border border-[#d4af37]/20 backdrop-blur-md">
            <ShieldCheck className="w-5 h-5 text-[#d4af37] shrink-0" />
            <div className="text-left">
              <h3 className="text-xs font-bold text-[#f7e7a9]">Handwoven Heritage</h3>
              <p className="text-[11px] text-[#d9c3b3]">Centuries-old Javanese weaving art</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-[#132c19]/60 border border-[#d4af37]/20 backdrop-blur-md">
            <Globe className="w-5 h-5 text-[#d4af37] shrink-0" />
            <div className="text-left">
              <h3 className="text-xs font-bold text-[#f7e7a9]">Worldwide Export</h3>
              <p className="text-[11px] text-[#d9c3b3]">Global shipping & wholesale fulfillment</p>
            </div>
          </div>
        </div>

      </div>

      {/* Video Modal Simulation */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-[#132c19] border border-[#d4af37]/40 rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 text-[#d9c3b3] hover:text-white text-xl font-bold p-2"
            >
              ✕
            </button>
            <h3 className="text-xl font-serif text-[#d4af37] mb-2">Artisan Weaving in Central Java</h3>
            <p className="text-xs text-[#d9c3b3] mb-4">Discover how our banana bark and mendong grass are sun-cured and hand-woven into luxury home decor.</p>
            <div className="aspect-video bg-black/60 rounded-xl flex items-center justify-center border border-[#d4af37]/20">
              <div className="text-center p-6">
                <Play className="w-16 h-16 text-[#d4af37] mx-auto mb-3 opacity-80" />
                <p className="text-sm text-[#f7e7a9] font-mono">Artisan Documentary Feature</p>
                <p className="text-xs text-[#d9c3b3] mt-1">Giri Ismoyo — Crafting Natural Fibers into Timeless Design</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
