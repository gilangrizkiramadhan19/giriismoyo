import React from 'react';
import { Calendar, MapPin, Globe, Award, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ExhibitionsPage: React.FC = () => {
  const EXHIBITIONS = [
    {
      id: 'tei-2026',
      title: 'Trade Expo Indonesia (TEI) 2026',
      location: 'ICE BSD City, Tangerang, Indonesia',
      date: 'October 14 – 18, 2026',
      booth: 'Hall 3 · Booth B-42 (Craft & Home Decor Pavillion)',
      status: 'Upcoming',
      description: 'Indonesia’s largest export trade show. Giri Ismoyo will unveil its new banana bark sculptural lighting collection and certified carbon-neutral living accessories.'
    },
    {
      id: 'ifex-2026',
      title: 'IFEX (Indonesia International Furniture Expo)',
      location: 'JIExpo Kemayoran, Jakarta',
      date: 'March 05 – 08, 2026',
      booth: 'Hall A · Booth A-18',
      status: 'Current Focus',
      description: 'Premier showcase for international buyers, interior procurement leads, and hotel resort designers seeking bespoke natural fiber furniture and decorative fixtures.'
    },
    {
      id: 'mo-paris',
      title: 'Maison & Objet Paris',
      location: 'Paris Nord Villepinte, France',
      date: 'September 04 – 08, 2025',
      booth: 'Hall 7 · Signature & Craft',
      status: 'Past Highlight',
      description: 'Represented Indonesian artisanal heritage in Europe. Our Mendong Mandalika Mirror received critical acclaim from Parisian architectural magazines.'
    },
    {
      id: 'ambiente-frankfurt',
      title: 'Ambiente Frankfurt',
      location: 'Messe Frankfurt, Germany',
      date: 'February 06 – 10, 2025',
      booth: 'Hall 10.1 · Global Sourcing Dining & Living',
      status: 'Past Highlight',
      description: 'Connected with eco-conscious European retailers and luxury department stores seeking verified zero-chemical sustainable home decor.'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-[#132c19] text-[#f9f7f2]">
      
      {/* Header Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto border-b border-[#d4af37]/20">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0f2314] border border-[#d4af37]/40 text-xs font-mono text-[#d4af37] uppercase tracking-widest mb-4">
          <Globe className="w-3.5 h-3.5" />
          <span>Global Presence & International Trade Fairs</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-editorial font-normal text-[#f7e7a9] mb-3">
          Trade Fairs & Exhibitions
        </h1>

        <p className="text-sm text-[#d0bbae] max-w-2xl mx-auto font-light leading-relaxed">
          Giri Ismoyo regularly participates in major international furniture and handicraft trade exhibitions. Meet our leadership team, inspect tactile fiber samples, and discuss container wholesale orders.
        </p>
      </section>

      {/* Exhibitions Timeline Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
        {EXHIBITIONS.map((expo) => (
          <div
            key={expo.id}
            className="bg-[#0f2314] border border-[#d4af37]/30 p-6 sm:p-8 hover:border-[#d4af37] transition-all shadow-xl flex flex-col md:flex-row gap-6 items-start justify-between"
          >
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 border ${
                  expo.status === 'Upcoming'
                    ? 'bg-[#d4af37] text-[#0a170d] font-bold border-[#d4af37]'
                    : expo.status === 'Current Focus'
                    ? 'bg-[#25522e] text-[#f7e7a9] font-semibold border-[#d4af37]/40'
                    : 'bg-[#1f3a24] text-[#b09685] border-transparent'
                }`}>
                  {expo.status}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-[#d4af37] font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{expo.date}</span>
                </div>
              </div>

              <h2 className="text-2xl font-serif font-bold text-[#f7e7a9]">
                {expo.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#ebdcd0]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{expo.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span className="font-mono text-[#f7e7a9]">{expo.booth}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#d0bbae] leading-relaxed pt-1">
                {expo.description}
              </p>
            </div>

            <div className="w-full md:w-auto shrink-0 self-center md:self-start">
              <a
                href="https://wa.me/6281234567890?text=Hello%20Giri%20Ismoyo,%20I%20would%20like%20to%20schedule%20a%20B2B%20meeting%20at%20your%20exhibition%20booth."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 bg-[#FAF9F6] text-[#1A1A1A] hover:bg-[#ECE6DC] font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <span>Book B2B Meeting</span>
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* Invitation Box */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="bg-[#0f2314] border border-[#d4af37]/30 p-8 sm:p-10">
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#d4af37] mb-2">
            ATELIER ACCREDITATION
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#f7e7a9] mb-2">
            Request an Exclusive VIP Trade Pass
          </h3>
          <p className="text-xs sm:text-sm text-[#d0bbae] max-w-xl mx-auto mb-6">
            Are you visiting Indonesia for upcoming trade expos? Contact our export relations desk to receive complimentary visitor passes and reserved showroom transport from Yogyakarta airport.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#132c19] border border-[#d4af37] text-[#f7e7a9] font-mono text-xs uppercase tracking-widest hover:bg-[#1a3d23] transition-colors"
          >
            <Mail className="w-4 h-4 text-[#d4af37]" />
            <span>Contact Export Relations</span>
          </Link>
        </div>
      </section>

    </div>
  );
};
