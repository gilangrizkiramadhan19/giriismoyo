import React from "react";
import { MaterialSection } from "../components/MaterialSection";
import { ArtisanCraft } from "../components/ArtisanCraft";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import badgeLampshade from "../assets/SHOP/LAMPSHADE (2).png";

// Gambar latar untuk banner "Bring Nature to Your Home".
// Ganti path ini dengan foto produk lain di /public jika perlu.
const CTA_IMAGE = "/editorial/sculptural-object.jpg";

const PRODUCTION_STEPS = [
  { step: "01", title: "Material", desc: "Raw materials must pass Quality Control before they enter the production warehouse and are distributed to craftsmen." },
  { step: "02", title: "Production", desc: "External craftsmen work from home in regional groups. The internal team makes samples, finishes products, and handles quality control." },
  { step: "03", title: "Quality Control 1", desc: "Products collected from craftsmen are checked for durability, color, size, and weaving results." },
  { step: "04", title: "Finishing", desc: "Anti-fungal spray and color fluid are applied to produce natural colors." },
  { step: "05", title: "Quality Control 2", desc: "After finishing, products are checked for quality, dryness, and strength before packaging." },
  { step: "06", title: "Packaging", desc: "Products are packed in cardboard cartons with silica gel to maintain humidity." },
];

const FLOW_STAGES = ["Material", "Production", "QC 1", "Finishing", "QC 2", "Packaging"];

const SERVICES = [
  { title: "Custom Design and Crafting", desc: "Customers choose designs, sizes, colors, and patterns. Craftsmen work directly with customers to create products that reflect their vision." },
  { title: "Wholesale and Bulk Orders", desc: "We produce handcrafted products in larger quantities for businesses and retailers." },
  { title: "After-Sales Service and Product Maintenance", desc: "We provide a care guide to keep products in good condition, and offer repair or replacement for certain products." },
];

const WAREHOUSE_ZONES = [
  "Loading Dock",
  "Working Area",
  "Finishing Area",
  "Dry Area",
  "Packing Area",
  "Storage Area",
  "Distribution / Loading Out",
];

const MISSION = [
  { title: "Preserve Culture", desc: "Promote and preserve Indonesia's traditional arts and crafts by empowering local artisans." },
  { title: "Sustainable Production", desc: "Prioritize eco-friendly materials and processes that support the environment." },
  { title: "Global Reach", desc: "Expand the international presence of Indonesian handicrafts through unique, high-quality products." },
  { title: "Customer Satisfaction", desc: "Provide exceptional products and services that exceed customer expectations." },
];

const SECTION = "py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#aa9d92]/25 relative";

const SectionHeader: React.FC<{
  label: string;
  title: string;
  desc?: string;
  labelClass?: string;
}> = ({ label, title, desc, labelClass = "bg-[#aa9d92]" }) => (
  <div className="mb-10 max-w-3xl">
    <div className={`inline-block ${labelClass} text-white text-xs font-semibold px-3 py-1 uppercase tracking-wider mb-3`}>
      {label}
    </div>
    <h2 className="text-3xl sm:text-5xl font-condensed font-bold tracking-tight text-[#2f1a12] uppercase leading-[1.05]">
      {title}
    </h2>
    {desc && (
      <p className="mt-3 text-[15px] sm:text-base text-[#4a3b32] font-sans leading-relaxed max-w-[70ch]">
        {desc}
      </p>
    )}
  </div>
);

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 bg-[#132c19] text-[#f9f7f2]">
      {/* 1. Page header (video background) */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex flex-col justify-center items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#d4af37]/20 bg-black">
        <div className="absolute inset-0 z-0">
          <video
            src="/Foto toko.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center filter brightness-90"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#d4af37]/40 shadow-lg">
            <img src="/logopolos.png" alt="Giri Ismoyo Icon" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#f7e7a9] font-semibold">
              ESTABLISHED IN SANDEN · YOGYAKARTA
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-editorial font-normal text-white tracking-tight leading-[1.1] drop-shadow-md">
            About Giri Ismoyo Craft
          </h1>

          <p className="text-base sm:text-xl text-[#ebdcd0] font-sans font-light leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
            Founded in 2018 by <strong>Sunu Agung</strong> in Sanden, Bantul, Yogyakarta, Giri Ismoyo Craft produces
            handwoven home décor and furniture from natural plant fibers.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4 text-xs font-mono text-[#f7e7a9]">
            <span className="px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-[#d4af37]/30">
              Handcrafted by Local Artisans
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#d4af37]/30">
              Natural Plant Fibers
            </span>
          </div>
        </div>
      </section>

      <div className="bg-[#f1e3d6] text-[#2f1a12] relative overflow-hidden">
        {/* 2. Corporate introduction */}
        <section className={`${SECTION} overflow-hidden`}>
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <img
              src="/editorial/architectural-space.jpg"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-center filter grayscale"
            />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="bg-[#f7efe8]/95 sm:bg-[#f7efe8]/90 backdrop-blur-md border border-[#aa9d92]/30 p-8 sm:p-12 lg:p-14 rounded-[6px] rounded-tl-[48px] sm:rounded-tl-[64px] shadow-sm max-w-4xl">
              <div className="inline-block bg-[#aa9d92] text-white text-xs font-semibold px-3 py-1 uppercase tracking-wider mb-4">
                Corporate Introduction
              </div>
              <h2 className="text-3xl sm:text-5xl font-condensed font-bold tracking-tight text-[#2f1a12] uppercase leading-[1.05] mb-6">
                Founded in Sanden, Bantul, Yogyakarta
              </h2>
              <div className="space-y-4 text-[15px] sm:text-base text-[#4a3b32] font-sans leading-relaxed max-w-[70ch]">
                <p>
                  Giri Ismoyo is a natural fiber woven craft company located in Yogyakarta, Indonesia. Sunu Agung
                  founded the company in 2018 because of plastic waste problems in his area. He hopes his products
                  can be one solution to reducing waste.
                </p>
                <p>
                  Many craftsmen in the area had not been able to market their products, so they now work together
                  to sell them to Indonesian and foreign buyers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Vision & Mission */}
        <section className={SECTION}>
          <div className="max-w-6xl mx-auto">
            <SectionHeader label="Foundation & Purpose" title="Our Vision & Core Mission" />

            <div className="flex flex-col lg:flex-row lg:items-stretch gap-6 lg:gap-8">
              {/* Vision: same height as Mission, content centered */}
              <div className="w-full lg:flex-1 bg-[#f7efe8] border border-[#aa9d92]/30 p-8 sm:p-10 rounded-[6px] rounded-tr-[48px] sm:rounded-tr-[64px] shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-block bg-[#2f1a12] text-white text-xs font-semibold px-3 py-1 uppercase tracking-wider">
                    Vision
                  </div>
                  <div className="bg-[#b8926a] text-white px-2.5 py-0.5 text-xs font-semibold uppercase rounded-[2px]">
                    Est. 2018
                  </div>
                </div>
                <div className="flex-1 flex items-center">
                  <p className="text-2xl sm:text-3xl font-editorial text-[#2f1a12] leading-snug">
                    To become a globally recognized brand that celebrates Indonesia's craftsmanship, promoting
                    sustainable and ethical handmade products.
                  </p>
                </div>
              </div>

              <div
                className="text-6xl sm:text-8xl lg:text-9xl font-condensed font-bold text-[#b8926a] select-none flex items-center justify-center self-center leading-none px-2"
                aria-hidden="true"
              >
                &amp;
              </div>

              <div className="w-full lg:flex-1 bg-[#6a5c4d] text-[#f7efe8] p-8 sm:p-10 rounded-[6px] rounded-bl-[48px] sm:rounded-bl-[64px] shadow-sm">
                <div className="inline-block bg-[#aa9d92] text-white text-xs font-semibold px-3 py-1 uppercase tracking-wider mb-5">
                  Mission
                </div>
                <ol className="space-y-4 text-[15px] sm:text-base font-sans leading-relaxed list-none pl-0">
                  {MISSION.map((m, i) => (
                    <li key={m.title} className="flex items-start gap-3">
                      <span className="text-[#b8926a] font-bold w-5 shrink-0">{i + 1}.</span>
                      <span className="text-[#f7efe8]/90">
                        <strong className="text-white">{m.title}:</strong> {m.desc}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Services */}
        <section className={`${SECTION} bg-[#f7efe8]`}>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              label="Our Service"
              labelClass="bg-[#b8926a]"
              title="Custom Design & Wholesale Services"
              desc="We provide custom design and crafting, wholesale orders, and after-sales support for businesses, retailers, and customers."
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-7 bg-[#b8926a] text-[#f7efe8] p-8 sm:p-12 rounded-[6px] rounded-br-[48px] sm:rounded-br-[64px] shadow-sm flex flex-col justify-between gap-8">
                {SERVICES.map((srv, idx) => (
                  <div key={srv.title} className={idx !== 0 ? "pt-6 border-t border-[#f7efe8]/25" : ""}>
                    <h3 className="text-xl sm:text-2xl font-condensed font-bold text-white uppercase tracking-tight mb-2">
                      {srv.title}
                    </h3>
                    <p className="text-[15px] sm:text-base text-[#f7efe8]/90 font-sans leading-relaxed">{srv.desc}</p>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-5 relative min-h-[320px]">
                <div className="absolute inset-0 rounded-[6px] rounded-tl-[48px] sm:rounded-tl-[64px] overflow-hidden border border-[#aa9d92]/30 shadow-sm bg-[#ebdcd0]">
                  <img
                    src="/editorial/artisan-hands.jpg"
                    alt="Artisan weaving handcrafted home decor in a Yogyakarta workshop"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
                <div className="absolute bottom-4 left-4 bg-[#2f1a12]/90 text-white text-[10px] font-semibold px-2.5 py-1 uppercase tracking-wider">
                  Handcrafted
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Production flow (6 stages, shown once) */}
        <section className={SECTION}>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              label="Production Flow"
              title="6-Stage Production Flow"
              desc="Products are checked at every stage, from raw materials to final packaging."
            />

            <div className="bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 shadow-sm border border-[#aa9d92]/20 mb-10">
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                {FLOW_STAGES.map((stage, idx) => (
                  <div key={stage} className="relative bg-[#f7efe8] p-3 sm:p-4 rounded-[6px] border border-[#aa9d92]/25 text-center">
                    <div className="text-[10px] font-condensed font-bold text-[#6a5c4d] uppercase mb-0.5">
                      Step 0{idx + 1}
                    </div>
                    <div className="text-xs sm:text-sm font-condensed font-bold text-[#2f1a12] uppercase tracking-wide">
                      {stage}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PRODUCTION_STEPS.map((s) => (
                <div
                  key={s.step}
                  className="bg-[#f7efe8] border border-[#aa9d92]/30 p-6 rounded-[6px] rounded-bl-[36px] sm:rounded-bl-[44px] shadow-sm"
                >
                  <div className="inline-block bg-[#aa9d92] text-white text-[11px] font-semibold px-2 py-0.5 uppercase tracking-wider mb-3">
                    Stage {s.step}
                  </div>
                  <h3 className="text-xl font-condensed font-bold text-[#2f1a12] uppercase tracking-tight mb-2">
                    {s.title}
                  </h3>
                  <p className="text-[15px] text-[#4a3b32] font-sans leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Warehouse & sustainability */}
        <section className={`${SECTION} overflow-hidden`}>
          <div className="max-w-6xl mx-auto relative z-10">
            <SectionHeader label="Our Sustainability" title="Sanden Warehouse" />

            <div className="w-full h-64 sm:h-80 lg:h-96 rounded-[6px] rounded-br-[48px] sm:rounded-br-[64px] overflow-hidden border border-[#aa9d92]/30 shadow-sm mb-10 bg-[#ebdcd0]">
              <img
                src="/toko.jpg"
                alt="Giri Ismoyo warehouse in Sanden, Bantul"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-14">
              <div className="lg:col-span-6">
                <p className="text-[15px] sm:text-base text-[#4a3b32] font-sans leading-relaxed max-w-[70ch] mb-5">
                  Our warehouse in Sanden, Bantul has seven areas, from the loading dock to distribution.
                </p>
                <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none pl-0">
                  {WAREHOUSE_ZONES.map((zone, i) => (
                    <li
                      key={zone}
                      className="flex items-center gap-3 p-3 rounded-[4px] bg-[#f7efe8] border border-[#aa9d92]/25"
                    >
                      <span className="w-7 h-7 shrink-0 rounded-full bg-[#6a5c4d] text-white text-xs font-semibold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-sm font-condensed font-bold text-[#2f1a12] uppercase">{zone}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="lg:col-span-6 bg-[#6a5c4d] text-[#f7efe8] p-8 sm:p-10 rounded-[6px] rounded-tl-[48px] sm:rounded-tl-[64px] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="inline-block bg-[#aa9d92] text-white text-xs font-semibold px-3 py-1 uppercase tracking-wider mb-4">
                    Our Practice
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-condensed font-bold text-white uppercase tracking-tight mb-4">
                    Sustainability &amp; Artisan Welfare
                  </h3>
                  <div className="space-y-3 text-[15px] text-[#f7efe8]/90 font-sans leading-relaxed">
                    <p>
                      <strong>Natural Plant Fibers:</strong> We use banana stems, water hyacinth, seagrass, mendong,
                      raffia, rattan, and natural dyes.
                    </p>
                    <p>
                      <strong>Artisan Welfare:</strong> We provide fair wages, ongoing training, safe working
                      conditions, and opportunities for growth.
                    </p>
                  </div>
                </div>
                <div className="pt-6 mt-6 border-t border-[#f7efe8]/20 font-editorial italic text-lg text-[#f1e3d6]">
                  "Skilled Hands, Timeless Creations."
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#aa9d92]/20 text-center">
              <div className="text-xs font-semibold text-[#6a5c4d] uppercase tracking-wider mb-6">
                Handwoven Natural Fiber Products
              </div>
              <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
                {[
                  { src: badgeLampshade, alt: "Handwoven lampshade" },
                  { src: "/editorial/macro-fiber.jpg", alt: "Close-up of natural plant fiber" },
                  { src: "/editorial/sculptural-object.jpg", alt: "Finished woven home decor" },
                ].map((img) => (
                  <div key={img.alt} className="flex justify-center">
                    <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-sm bg-[#ebdcd0]">
                      <img src={img.src} alt={img.alt} className="w-full h-full object-cover object-center" loading="lazy" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. Material details & artisan components (edit their text separately) */}
        <MaterialSection />
        <ArtisanCraft />

        {/* 8. CTA banner with background image */}
        <section className="relative overflow-hidden min-h-[300px] sm:min-h-[380px] flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-20">
          <img
            src={CTA_IMAGE}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#2f1a12]/60" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl sm:text-5xl font-condensed font-bold tracking-tight text-white uppercase drop-shadow">
              Bring Nature to Your Home
            </h2>
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-[4px] bg-[#f7efe8] text-[#2f1a12] hover:bg-[#b8926a] hover:text-white transition-colors duration-200 font-sans font-semibold text-sm tracking-wide shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Explore the Shop</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
