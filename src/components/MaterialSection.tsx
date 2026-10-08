import React, { useState } from 'react';
import { Leaf, Sun, Recycle, Award, ChevronRight } from 'lucide-react';

import matBanana from '../assets/SHOP/WOVEN BASKET (17).png';
import matMendong from '../assets/SHOP/WOVEN MIRROR (8).png';
import matHyacinth from '../assets/SHOP/PLACEMATE (5).png';
import matSeagrass from '../assets/SHOP/WOVEN BASKET (18).png';
import matRaffia from '../assets/SHOP/WALLDECOR NATURAL FIBER (4).png';

const LOCAL_MATERIALS = [
  {
    name: 'Banana Bark (Pelepah Pisang)',
    characteristics: 'Flexible fibers with naturally mottled brown tones, suitable for structured weaving.',
    sustainability: 'Renewable agricultural plant fiber dried naturally in the sun.',
    usage: 'Storage baskets, walldecor, and decorative mirrors.',
  },
  {
    name: 'Mendong Grass',
    characteristics: 'Pliable straw-like strands with smooth texture and light golden color.',
    sustainability: 'Natural plant fiber harvested and sun-dried before weaving.',
    usage: 'Woven mirrors, lampshades, and dining placemats.',
  },
  {
    name: 'Water Hyacinth (Eceng Gondok)',
    characteristics: 'Thick, cushioned golden-tan fibrous cords with substantial body.',
    sustainability: 'Renewable freshwater plant stems dried under the sun.',
    usage: 'Storage baskets, furniture accents, and placemats.',
  },
  {
    name: 'Seagrass',
    characteristics: 'Smooth, durable natural fiber strands with earthy greenish-tan hue.',
    sustainability: 'Renewable plant fibers dried in open air before crafting.',
    usage: 'Baskets, woven placemats, and decorative trims.',
  },
  {
    name: 'Raffia',
    characteristics: 'Lightweight, flexible palm fiber strands ideal for soft fringes and detailed knotting.',
    sustainability: 'Natural plant fiber used for decorative weaving and accents.',
    usage: 'Walldecor fringes, lampshade details, and basket accents.',
  },
];

export const MaterialSection: React.FC = () => {
  const [selectedMaterialIndex, setSelectedMaterialIndex] = useState(0);

  // Mapping material index to corresponding existing preview images
  const materialImages = [
    matBanana,
    matMendong,
    matHyacinth,
    matSeagrass,
    matRaffia,
  ];

  return (
    <section id="materials-section" className="py-20 sm:py-24 bg-[#f7efe8] text-[#2f1a12] relative overflow-hidden border-t border-[#aa9d92]/25">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Warm Grey Label & Condensed Title */}
        <div className="max-w-3xl mb-12">
          <div className="inline-block bg-[#aa9d92] text-white text-xs font-semibold px-3 py-1 uppercase tracking-wider mb-3">
            Natural Materials
          </div>
          <h2 className="text-3xl sm:text-5xl font-condensed font-bold tracking-tight text-[#2f1a12] uppercase leading-[1.05] mb-4">
            Natural Fiber Craft
          </h2>
          <p className="text-[15px] sm:text-base text-[#4a3b32] font-sans leading-relaxed max-w-[70ch]">
            Giri Ismoyo uses natural plant fibers in making handcrafted products. These renewable materials highlight an organic impression in any room.
          </p>
        </div>

        {/* Composition & Quote Grid with One Large Rounded Corner Rule */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 items-stretch">
          
          {/* Main Composition Panel (Taupe with Signature One Rounded Corner) */}
          <div className="lg:col-span-8 bg-[#6a5c4d] text-[#f7efe8] p-8 sm:p-10 rounded-[6px] rounded-tl-[48px] sm:rounded-tl-[64px] shadow-sm flex flex-col justify-between">
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-8 border-b border-[#f7efe8]/20">
                {/* Natural Plant Fibers */}
                <div>
                  <div className="text-3xl sm:text-4xl font-condensed font-bold text-white tracking-tight leading-none">
                    Natural Plant Fibers
                  </div>
                  <div className="text-base font-semibold text-[#f7efe8] mt-2 mb-1">
                    Primary Materials
                  </div>
                  <p className="text-xs sm:text-sm text-[#f7efe8]/80 leading-relaxed">
                    Banana Bark • Mendong Grass • Water Hyacinth • Seagrass • Raffia • Rattan
                  </p>
                </div>

                {/* Handcrafted Construction */}
                <div>
                  <div className="text-3xl sm:text-4xl font-condensed font-bold text-[#f7efe8]/80 tracking-tight leading-none">
                    Handcrafted Weaving
                  </div>
                  <div className="text-base font-semibold text-[#f7efe8] mt-2 mb-1">
                    Careful Construction
                  </div>
                  <p className="text-xs sm:text-sm text-[#f7efe8]/80 leading-relaxed">
                    Woven by skilled craftsmen with structured forms for daily functional use.
                  </p>
                </div>
              </div>
            </div>

            {/* Sustainability Guarantee Row */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2.5">
                <Recycle className="w-4 h-4 text-[#f1e3d6] shrink-0" aria-hidden="true" />
                <span className="text-xs font-medium text-[#f7efe8] leading-snug">
                  Renewable Plant Fibers
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sun className="w-4 h-4 text-[#f1e3d6] shrink-0" aria-hidden="true" />
                <span className="text-xs font-medium text-[#f7efe8] leading-snug">
                  Sun-Dried Materials
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#f1e3d6] shrink-0" aria-hidden="true" />
                <span className="text-xs font-medium text-[#f7efe8] leading-snug">
                  Anti-Fungal Protection
                </span>
              </div>
            </div>
          </div>

          {/* Slogan Box (Caramel Panel with Signature One Rounded Corner) */}
          <div className="lg:col-span-4 bg-[#b8926a] text-[#f7efe8] p-8 sm:p-10 rounded-[6px] rounded-br-[48px] sm:rounded-br-[64px] shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="inline-block bg-[#2f1a12] text-white text-[11px] font-semibold px-2.5 py-0.5 uppercase tracking-wider">
                Tagline
              </div>
              <div className="text-2xl sm:text-3xl font-editorial italic text-white leading-tight">
                "Bring Nature to Your Home"
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#f7efe8]/90 leading-relaxed mt-6">
              Natural fibers creating an organic impression in modern living spaces.
            </p>
          </div>

        </div>

        {/* Interactive Material Explorer: Shaped Photo & Deep-Dive Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Material Selector List */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="inline-block bg-[#aa9d92] text-white text-[11px] font-semibold px-2.5 py-0.5 uppercase tracking-wider mb-2">
              Select Fiber:
            </div>
            <div className="space-y-2">
              {LOCAL_MATERIALS.map((mat, index) => {
                const isSelected = selectedMaterialIndex === index;
                return (
                  <button
                    key={mat.name}
                    type="button"
                    onClick={() => setSelectedMaterialIndex(index)}
                    className={`w-full text-left p-4 rounded-[6px] transition-colors duration-200 flex items-center justify-between border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f1a12] ${
                      isSelected
                        ? 'bg-[#2f1a12] text-white border-[#2f1a12] shadow-sm'
                        : 'bg-[#f1e3d6] border-[#aa9d92]/30 text-[#2f1a12] hover:bg-[#ebdcd0]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Leaf className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#b8926a]' : 'text-[#6a5c4d]'}`} aria-hidden="true" />
                      <span className="font-sans font-medium text-sm">{mat.name}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform motion-reduce:transition-none ${isSelected ? 'rotate-90 text-[#b8926a]' : 'text-[#aa9d92]'}`} aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Material Detail Card with Shaped Photo Frame */}
          <div className="lg:col-span-8 bg-white border border-[#aa9d92]/30 rounded-[6px] rounded-br-[48px] sm:rounded-br-[64px] p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Shaped Photo Frame */}
              <div className="md:col-span-5">
                <div className="relative overflow-hidden rounded-[6px] rounded-tl-[40px] sm:rounded-tl-[48px] border border-[#aa9d92]/20 shadow-sm aspect-[4/5] bg-[#ebdcd0]">
                  <img
                    src={materialImages[selectedMaterialIndex] || '/editorial/macro-fiber.jpg'}
                    alt={LOCAL_MATERIALS[selectedMaterialIndex].name}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#2f1a12]/85 text-[#f7efe8] text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wider">
                    Raw Specimen
                  </div>
                </div>
              </div>

              {/* Textual Deep-Dive */}
              <div className="md:col-span-7 space-y-5">
                <div>
                  <div className="inline-block bg-[#aa9d92] text-white text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wider mb-2">
                    Material Overview
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-condensed font-bold tracking-tight text-[#2f1a12] uppercase leading-tight">
                    {LOCAL_MATERIALS[selectedMaterialIndex].name}
                  </h3>
                </div>

                {/* Characteristics */}
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-[#6a5c4d] uppercase tracking-wide">
                    Textural Characteristics
                  </div>
                  <p className="text-[15px] text-[#2f1a12] font-sans leading-relaxed bg-[#f7efe8] p-3.5 rounded-[4px] border border-[#aa9d92]/20">
                    {LOCAL_MATERIALS[selectedMaterialIndex].characteristics}
                  </p>
                </div>

                {/* Sustainability */}
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-[#6a5c4d] uppercase tracking-wide">
                    Natural Sourcing
                  </div>
                  <p className="text-[15px] text-[#2f1a12] font-sans leading-relaxed bg-[#f7efe8] p-3.5 rounded-[4px] border border-[#aa9d92]/20">
                    {LOCAL_MATERIALS[selectedMaterialIndex].sustainability}
                  </p>
                </div>

                {/* Usage */}
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-[#6a5c4d] uppercase tracking-wide">
                    Handicraft Applications
                  </div>
                  <p className="text-[15px] text-[#2f1a12] font-sans font-medium leading-relaxed bg-[#f1e3d6] p-3.5 rounded-[4px] border border-[#aa9d92]/25">
                    {LOCAL_MATERIALS[selectedMaterialIndex].usage}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
