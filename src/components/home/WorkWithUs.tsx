import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HOME_IMAGES } from "../../config/homeImages";

const SERVICES = [
  {
    num: "01",
    title: "Custom design",
    desc: "Customers choose designs, sizes, colors, and patterns.",
  },
  {
    num: "02",
    title: "Wholesale and bulk orders",
    desc: "We produce handcrafted products in larger quantities for businesses and retailers.",
  },
  {
    num: "03",
    title: "After-sales care",
    desc: "We provide a care guide to keep products in good condition, and offer repair or replacement for certain products.",
  },
];

const CAPACITY = [
  { num: "400 sets", label: "Basket sets of 3" },
  { num: "250 sets", label: "Walldecor sets of 3" },
  { num: "150 pieces", label: "Medium lampshades" },
  { num: "1,500 pieces", label: "Placemats D 30 cm" },
];

export const WorkWithUs: React.FC = () => {
  const [imgErr, setImgErr] = useState(false);
  const reduced = useReducedMotion();
  const anim = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
      };

  return (
    <section className="bg-[#f3e6d8] text-[#2b1d14] py-12 md:py-16" aria-label="Work With Us">
      <div className="max-w-[1120px] mx-auto px-6 md:px-10">
        <motion.div {...anim} className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
          {/* Left: col-span-7 */}
          <div className="md:col-span-7 space-y-8">
            <p className="text-xs font-sans font-semibold uppercase tracking-[0.15em] text-[#b8935f] mb-3">Our services</p>
            <h2
              className="font-sans font-bold text-3xl md:text-5xl uppercase tracking-wider text-[#2b1d14]"
            >
              Work with us
            </h2>

            <div className="divide-y divide-[#2b1d14]/15 border-t border-b border-[#2b1d14]/15">
              {SERVICES.map((s) => (
                <div key={s.num} className="py-6 flex items-start gap-6">
                  <span
                    className="text-4xl font-normal text-[#b8935f] shrink-0 leading-none pt-0.5"
                    style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  >
                    {s.num}
                  </span>
                  <div className="space-y-1.5">
                    <h3
                      className="text-xl font-normal text-[#2b1d14]"
                      style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                    >
                      {s.title}
                    </h3>
                    <p className="text-base text-[#2b1d14]/85 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: col-span-5 — photo + capacity card below */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <div className="overflow-hidden bg-[#b8935f]/25 rounded-tr-[64px] aspect-[4/5] max-h-[440px] w-full">
              {imgErr || !HOME_IMAGES.workWithUs.src ? (
                <div className="w-full h-full flex items-end p-4">
                  <span className="text-xs font-mono text-[#6b5a47]">workWithUs.jpg</span>
                </div>
              ) : (
                <img
                  src={HOME_IMAGES.workWithUs.src}
                  alt={HOME_IMAGES.workWithUs.alt}
                  onError={() => setImgErr(true)}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500 motion-reduce:transition-none"
                />
              )}
            </div>

            {/* Capacity card — below photo, never covers the image */}
            <div className="bg-[#6b5a47] text-[#f3e6d8] p-6 rounded-[4px]">
              <p className="text-xs font-sans font-semibold uppercase tracking-[0.15em] text-[#f3e6d8]/60 mb-2">Capacity per invoice</p>
              <p className="text-sm text-[#f3e6d8]/70 mb-4">About 2 months lead time</p>
              <div className="divide-y divide-[#f3e6d8]/15">
                {CAPACITY.map((cap) => (
                  <div key={cap.label} className="py-2.5 flex items-baseline justify-between gap-4">
                    <span
                      className="text-2xl font-normal leading-none text-[#f3e6d8]"
                      style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                    >
                      {cap.num}
                    </span>
                    <span className="text-xs text-[#f3e6d8]/75 text-right">{cap.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#f3e6d8]/55 mt-4 border-t border-[#f3e6d8]/15 pt-3">
                Other products discussed on request.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
