import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDown, LogIn, ChevronRight, Compass, ShieldCheck, Users, Leaf } from 'lucide-react';

interface StoryOverlaysProps {
  onExploreClick: () => void;
  onRequestCatalog: () => void;
  onOpenInquiry: () => void;
}

/**
 * StoryOverlays — 4 scroll-synced overlay scenes layered over <ScrollCanvas />.
 *
 * Visual narrative:
 *   Scene 1 (0% - 25%): Raw Fiber (Banana bark, mendong grass, water hyacinth)
 *   Scene 2 (25% - 50%): Artisans at Work (Local artisans in Sanden, Bantul handweaving)
 *   Scene 3 (50% - 75%): Quality Control & Stand Alone Craft (Finished lampshades/mirrors)
 *   Scene 4 (75% - 100%): Gallery Door & More Collection (Interactive door breakthrough to /shop)
 */
export const StoryOverlays: React.FC<StoryOverlaysProps> = ({
  onExploreClick,
  onRequestCatalog,
}) => {
  const navigate = useNavigate();
  const [isEnteringDoor, setIsEnteringDoor] = useState(false);

  // Door breakthrough zoom-in transition
  const handleEnterGallery = () => {
    setIsEnteringDoor(true);
    setTimeout(() => {
      navigate('/shop');
    }, 850);
  };

  return (
    <div id="scroll-story-wrapper" className="relative z-10 w-full overflow-hidden">
      
      {/* Door Breakthrough Transition Overlay */}
      {isEnteringDoor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#faf9f6] transition-all duration-700 animate-in fade-in zoom-in-150">
          <div className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-[#d4af37] border-t-transparent animate-spin" />
            <h2 className="text-2xl font-serif font-bold text-[#132c19] tracking-wider">
              ENTERING GIRI ISMOYO GALLERY
            </h2>
            <p className="text-xs font-mono text-[#8a7258] mt-2 uppercase tracking-widest">
              Opening Curated Collection...
            </p>
          </div>
        </div>
      )}

      {/* ==================================================
          SCENE 1 (0% - 25% Scroll) | RAW FIBER
         ================================================== */}
      <section
        id="scene-1"
        className="flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-12"
        style={{ height: '100vh', minHeight: '620px' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Natural Fiber Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#132c19]/80 border border-[#d4af37]/40 backdrop-blur-md shadow-lg mb-6">
            <Leaf className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-xs font-mono tracking-widest text-[#e6c670] uppercase">
              Scene 01 · Raw Fiber & Natural Essence
            </span>
          </div>

          {/* Compact Transparent Logo */}
          <div className="flex justify-center mb-4">
            <div className="relative group">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#d4af37]/25 via-[#e6c670]/10 to-[#d4af37]/25 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="/Girinobackgroun.png"
                alt="Giri Ismoyo — A Continuum of Nature"
                className="relative w-28 h-28 sm:w-32 sm:h-32 object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                draggable={false}
              />
            </div>
          </div>

          {/* Brand Name */}
          <h2
            className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#d4af37] mb-2 tracking-widest uppercase drop-shadow-[0_6px_8px_rgba(0,0,0,0.8)]"
          >
            Giri Ismoyo
          </h2>

          {/* Slogan */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fff9e6] via-[#f7e7a9] to-[#d4af37] tracking-tight leading-tight mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            A Continuum of Nature
          </h1>

          {/* Clean Description */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#e0cdbf] font-sans font-light tracking-wide mb-8 drop-shadow-md">
            Sustainably harvested raw banana bark, riverbed mendong grass, water hyacinth, and bamboo — sun-cured naturally under open tropical skies without chemical ovens.
          </p>

          {/* Scroll Down Prompt */}
          <div className="flex flex-col items-center justify-center gap-2 text-xs font-mono text-[#d4af37]/80 tracking-widest uppercase animate-bounce">
            <span>Scroll To Experience</span>
            <ArrowDown className="w-4 h-4 text-[#d4af37]" />
          </div>
        </div>
      </section>

      {/* ==================================================
          SCENE 2 (25% - 50% Scroll) | ARTISANS AT WORK
         ================================================== */}
      <section
        id="scene-2"
        className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
        style={{ height: '100vh' }}
      >
        <div className="max-w-4xl mx-auto text-center w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#132c19]/80 border border-[#d4af37]/40 backdrop-blur-md shadow-lg mb-6">
            <Users className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#e6c670]">
              Scene 02 · Artisans at Work
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fff] via-[#f7e7a9] to-[#d4af37] mb-4">
            Master Hands of Sanden, Bantul
          </h2>

          <p className="text-sm sm:text-base text-[#e0cdbf] max-w-2xl mx-auto leading-relaxed mb-8">
            Centuries-old Javanese knotting, braiding, and macrame techniques brought to life by local village craftswomen and master artisans. Fair living wages and timeless cultural preservation.
          </p>

          <div className="inline-flex flex-wrap justify-center gap-4 text-xs font-mono text-[#f7e7a9]">
            <span className="px-4 py-1.5 bg-[#132c19]/80 border border-[#d4af37]/30 backdrop-blur-md">
              Handwoven Macrame
            </span>
            <span className="px-4 py-1.5 bg-[#132c19]/80 border border-[#d4af37]/30 backdrop-blur-md">
              Coiled Seagrass Braid
            </span>
            <span className="px-4 py-1.5 bg-[#132c19]/80 border border-[#d4af37]/30 backdrop-blur-md">
              Traditional Chevron Weave
            </span>
          </div>
        </div>
      </section>

      {/* ==================================================
          SCENE 3 (50% - 75% Scroll) | QUALITY CONTROL & STAND ALONE CRAFT
         ================================================== */}
      <section
        id="scene-3"
        className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
        style={{ height: '100vh' }}
      >
        <div className="max-w-4xl mx-auto text-center w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#132c19]/80 border border-[#d4af37]/40 backdrop-blur-md shadow-lg mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#e6c670]">
              Scene 03 · Quality Control & Stand Alone Craft
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fff] via-[#f7e7a9] to-[#d4af37] mb-4">
            Finished to International Standard
          </h2>

          <p className="text-sm sm:text-base text-[#e0cdbf] max-w-2xl mx-auto leading-relaxed mb-8">
            Every sculptural lampshade, woven mirror, and artisan vessel undergoes rigid dimensional checks, anti-fungal organic oil treatment, and moisture testing for worldwide container shipping.
          </p>

          <div className="inline-flex flex-wrap justify-center gap-3 text-xs text-[#ebdcd0]">
            <span className="px-4 py-2 rounded-xl bg-[#0f2314]/90 border border-[#d4af37]/30">
              Zero Chemical Residue
            </span>
            <span className="px-4 py-2 rounded-xl bg-[#0f2314]/90 border border-[#d4af37]/30">
              Anti-Mold Natural Seal
            </span>
            <span className="px-4 py-2 rounded-xl bg-[#0f2314]/90 border border-[#d4af37]/30">
              Rust-Proof Reinforced Frame
            </span>
          </div>
        </div>
      </section>

      {/* ==================================================
          SCENE 4 (75% - 100% Scroll) | PINTU GALERI & MORE COLLECTION
         ================================================== */}
      <section
        id="scene-4"
        className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
        style={{ height: '100vh' }}
      >
        <div className="max-w-3xl mx-auto text-center w-full">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#132c19]/90 border border-[#d4af37]/40 backdrop-blur-md shadow-lg mb-6">
            <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#e6c670]">
              Scene 04 · Grand Gallery Portal
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fff] via-[#f7e7a9] to-[#d4af37] mb-4">
            Enter The Gallery
          </h2>

          <p className="text-sm sm:text-base text-[#e0cdbf] max-w-xl mx-auto mb-10 leading-relaxed">
            Step through our doors to explore curated wholesale collections, bespoke interior installations, and export craft catalogs.
          </p>

          {/* Interactive Floating Golden Button — Door Breakthrough */}
          <div className="flex flex-col items-center justify-center gap-4">
            <button
              onClick={handleEnterGallery}
              className="group relative px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f7e7a9] to-[#b89343] text-[#0a170d] font-serif font-bold text-sm sm:text-base tracking-widest uppercase shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:shadow-[0_0_50px_rgba(212,175,55,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 cursor-pointer"
            >
              <LogIn className="w-5 h-5 text-[#0a170d] group-hover:translate-x-1 transition-transform" />
              <span>ENTER GALLERY / MORE COLLECTION</span>
              <ChevronRight className="w-5 h-5 text-[#0a170d] group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary Option: Scroll down to 8 featured products on this landing page */}
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#d4af37] hover:text-[#fff] transition-colors py-2"
            >
              <span>Or Scroll To Featured Showcase Below</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
