import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { HOME_IMAGES } from "../../config/homeImages";

const ImageBox: React.FC<{
  src: string;
  alt: string;
  aspect: string;
  maxH?: string;
  corner?: string;
  className?: string;
}> = ({ src, alt, aspect, maxH = "", corner = "rounded-none", className = "" }) => {
  const [err, setErr] = useState(false);
  const filename = src.split("/").pop() || src;

  return (
    <div className={`overflow-hidden bg-[#b8935f]/25 ${aspect} ${maxH} ${corner} ${className}`}>
      {err || !src ? (
        <div className="w-full h-full flex items-end p-3">
          <span className="text-xs font-mono text-[#6b5a47] break-all">{filename}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setErr(true)}
          loading="lazy"
          className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500 motion-reduce:transition-none"
        />
      )}
    </div>
  );
};

const STEPS = [
  { num: "01", label: "Material check" },
  { num: "02", label: "Weaving by artisan groups" },
  { num: "03", label: "Quality control 1" },
  { num: "04", label: "Anti-fungal finishing" },
  { num: "05", label: "Quality control 2" },
  { num: "06", label: "Packed with silica gel" },
];

export const WorkshopStory: React.FC = () => {
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
    <section className="bg-[#f3e6d8] text-[#2b1d14] py-12 md:py-16" aria-label="Workshop Story">
      <div className="max-w-[1120px] mx-auto px-6 md:px-10 space-y-16 md:space-y-24">
        {/* Block A: Why we started */}
        <motion.div {...anim} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-5">
            <ImageBox
              src={HOME_IMAGES.artisanLampshade.src}
              alt={HOME_IMAGES.artisanLampshade.alt}
              aspect="aspect-[4/5]"
              maxH="max-h-[420px]"
              corner="rounded-tr-[64px]"
              className="w-full"
            />
          </div>
          <div className="md:col-span-6 md:col-start-7 space-y-4">
            <p className="text-xs font-sans font-semibold uppercase tracking-[0.15em] text-[#b8935f] mb-3">Our story</p>
            <h2 className="font-sans font-bold text-3xl md:text-5xl uppercase tracking-wider text-[#2b1d14]">
              Why we started
            </h2>
            <p className="text-base text-[#2b1d14]/85 leading-relaxed max-w-prose">
              Sunu Agung founded Giri Ismoyo Craft in 2018 because of the plastic waste around him. He hoped woven natural fiber products could be one small answer.
            </p>
            <p className="text-base text-[#2b1d14]/85 leading-relaxed max-w-prose">
              Many craftspeople nearby could not reach buyers. Today they work together and sell to Indonesian and international customers.
            </p>
          </div>
        </motion.div>

        {/* Block B: Made by hand, checked twice */}
        <motion.div {...anim} className="space-y-8">
          <div>
            <p className="text-xs font-sans font-semibold uppercase tracking-[0.15em] text-[#b8935f] mb-3">Our process</p>
            <h2 className="font-sans font-bold text-3xl md:text-5xl uppercase tracking-wider text-[#2b1d14] mb-8">
              Made by hand,<br className="hidden sm:block" /> checked twice
            </h2>
            {/* 6-step polished timeline */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
              {STEPS.map((s) => (
                <div key={s.num} className="border-t border-[#2b1d14]/20 pt-3">
                  <span
                    className="block text-3xl font-semibold text-[#b8935f] mb-1"
                    style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  >
                    {s.num}
                  </span>
                  <span className="text-xs md:text-sm text-[#2b1d14] font-medium leading-snug">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Photos 5/4/3 spans, 4/3, 1/1, 3/4 aspect, max-h-[260px], only first rounded */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-end">
            <div className="md:col-span-5">
              <ImageBox
                src={HOME_IMAGES.artisanSpray.src}
                alt={HOME_IMAGES.artisanSpray.alt}
                aspect="aspect-[4/3]"
                maxH="max-h-[260px]"
                corner="rounded-bl-[64px]"
                className="w-full"
              />
            </div>
            <div className="md:col-span-4">
              <ImageBox
                src={HOME_IMAGES.dryArea.src}
                alt={HOME_IMAGES.dryArea.alt}
                aspect="aspect-square"
                maxH="max-h-[260px]"
                className="w-full"
              />
            </div>
            <div className="md:col-span-3">
              <ImageBox
                src={HOME_IMAGES.packing.src}
                alt={HOME_IMAGES.packing.alt}
                aspect="aspect-[3/4]"
                maxH="max-h-[260px]"
                className="w-full"
              />
            </div>
          </div>

          <div>
            <Link to="/about" className="inline-block text-sm font-medium text-[#2b1d14] underline decoration-[#b8935f] underline-offset-4 hover:text-[#6b5a47] transition-colors">
              See the full production flow
            </Link>
          </div>
        </motion.div>

        {/* Block C: Brown block */}
        <motion.div {...anim} className="bg-[#6b5a47] text-[#f3e6d8] p-8 md:p-12 rounded-[4px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <p className="text-2xl font-normal leading-snug max-w-xl text-[#f3e6d8]" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
                Fair wages, ongoing training, safe working conditions, and room to grow.
              </p>
            </div>
            <div className="md:col-span-5">
              <ImageBox
                src={HOME_IMAGES.artisanBench.src}
                alt={HOME_IMAGES.artisanBench.alt}
                aspect="aspect-[4/3]"
                maxH="max-h-[320px]"
                className="w-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
