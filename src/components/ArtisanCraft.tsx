import React, { useState } from 'react';
import { Waves, Heart, ShieldCheck, Sun, CheckCircle2, Package } from 'lucide-react';
import artisanPhoto from '../assets/SHOP/WALLDECOR PRODUCT BANANA SUN BLACK.png';

export const ArtisanCraft: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const STEPS = [
    {
      number: '01',
      title: 'Material',
      icon: Waves,
      desc: 'Raw materials must pass Quality Control before entering the production warehouse and distribution to craftsmen.'
    },
    {
      number: '02',
      title: 'Production',
      icon: Heart,
      desc: 'External craftsmen weave from home in organized regional groups, while the internal team handles sample making and finishing.'
    },
    {
      number: '03',
      title: 'Quality Control 1',
      icon: ShieldCheck,
      desc: 'Products received from craftsmen are inspected for durability, color, size, and weaving results.'
    },
    {
      number: '04',
      title: 'Finishing',
      icon: Sun,
      desc: 'Anti-fungal spray and color liquid are applied to achieve durable finishes and natural colors.'
    },
    {
      number: '05',
      title: 'Quality Control 2',
      icon: CheckCircle2,
      desc: 'Final inspection verifies overall quality, dryness, and structural strength before packaging.'
    },
    {
      number: '06',
      title: 'Packaging',
      icon: Package,
      desc: 'Products are packed into cardboard cartons with silica gel to maintain proper humidity during delivery.'
    }
  ];

  return (
    <section id="artisan-section" className="py-20 sm:py-24 bg-[#f1e3d6] text-[#2f1a12] relative overflow-hidden border-t border-[#aa9d92]/25">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-block bg-[#aa9d92] text-white text-xs font-semibold px-3 py-1 uppercase tracking-wider mb-3">
            Production Flow
          </div>
          <h2 className="text-3xl sm:text-5xl font-condensed font-bold tracking-tight text-[#2f1a12] uppercase leading-[1.05] mb-4">
            The Craft Process
          </h2>
          <p className="text-[15px] sm:text-base text-[#4a3b32] font-sans leading-relaxed max-w-[70ch]">
            From raw material quality control to final carton packaging, explore the six verified production stages of Giri Ismoyo.
          </p>
        </div>

        {/* Step Selector Tabs (Sequential Process) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mb-10">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`text-left p-3.5 sm:p-4 rounded-[4px] border transition-colors duration-200 flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f1a12] ${
                  isActive
                    ? 'bg-[#2f1a12] text-white border-[#2f1a12] shadow-sm'
                    : 'bg-[#f7efe8] border-[#aa9d92]/30 text-[#2f1a12] hover:bg-[#ebdcd0]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-base font-condensed font-bold ${isActive ? 'text-[#b8926a]' : 'text-[#6a5c4d]'}`}>
                    STAGE {step.number}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#f7efe8]' : 'text-[#aa9d92]'}`} aria-hidden="true" />
                </div>
                <div className="font-sans font-medium text-xs sm:text-sm leading-snug line-clamp-2">
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Spotlight on Active Stage: Photo with Shaped Frame + Taupe Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Artisan Photo Frame with One Large Rounded Corner */}
          <div className="lg:col-span-5 relative">
            <div className="w-full h-full min-h-[320px] rounded-[6px] rounded-tl-[48px] sm:rounded-tl-[64px] overflow-hidden border border-[#aa9d92]/30 shadow-sm bg-[#ebdcd0]">
              <img
                src={artisanPhoto}
                alt="Artisan hands weaving natural fibers in Bantul workshop"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-4 left-4 bg-[#2f1a12]/90 text-white text-[10px] font-semibold px-2.5 py-1 uppercase tracking-wider">
              Sanden Artisan Workshop
            </div>
          </div>

          {/* Detailed Stage Content (Taupe Panel with Opposite One Rounded Corner) */}
          <div className="lg:col-span-7 bg-[#6a5c4d] text-[#f7efe8] p-8 sm:p-10 rounded-[6px] rounded-br-[48px] sm:rounded-br-[64px] shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-block bg-[#b8926a] text-white text-xs font-semibold px-3 py-1 uppercase tracking-wider">
                Stage {STEPS[activeStep].number} Spotlight
              </div>
              <h3 className="text-2xl sm:text-4xl font-condensed font-bold tracking-tight text-white uppercase leading-tight">
                {STEPS[activeStep].title}
              </h3>
              <p className="text-[15px] sm:text-base text-[#f7efe8]/90 font-sans leading-relaxed max-w-[65ch]">
                {STEPS[activeStep].desc} Our skilled artisans come from various regions of Indonesia, bringing unique expertise to every piece. We provide fair wages, ongoing training, safe working conditions, and opportunities for growth.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#f7efe8]/20 flex items-center justify-between">
              <div className="text-xs text-[#f7efe8]/75 uppercase tracking-wide">
                Quality Controlled Handcrafting
              </div>
              <div className="font-editorial italic text-base text-[#f1e3d6]">
                "Skilled Hands, Timeless Creations."
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
