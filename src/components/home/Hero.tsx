import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { HOME_IMAGES } from "../../config/homeImages";


const PhotoBox: React.FC<{
  src: string;
  alt: string;
  aspect: string;
  maxH?: string;
  corner?: string;
  className?: string;
  priority?: boolean;
}> = ({
  src,
  alt,
  aspect,
  maxH = "",
  corner = "rounded-none",
  className = "",
  priority = false,
}) => {
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
          loading={priority ? "eager" : "lazy"}
          className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500 motion-reduce:transition-none"
        />
      )}
    </div>
  );
};

export const Hero: React.FC<{ onRequestCatalog?: () => void }> = ({ onRequestCatalog }) => {
  const reduced = useReducedMotion();
  const anim = (delayS = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.28,
            delay: delayS,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          },
        };

  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-[#f3e6d8] text-[#2b1d14]" aria-label="Hero">
      <div className="max-w-[1120px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Text: col-span-5 */}
          <div className="md:col-span-5 space-y-6">
            <motion.h1
              {...anim(0)}
              className="text-4xl md:text-5xl font-normal leading-[1.06] tracking-tight text-[#2b1d14]"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Skilled Hands,<br className="hidden sm:block" /> Timeless Creations.
            </motion.h1>

            <motion.p {...anim(0.06)} className="text-base text-[#2b1d14]/85 leading-relaxed max-w-md">
              Handwoven home décor and furniture from banana stem, water hyacinth and seagrass. Made by artisan groups in Sanden, Bantul, Yogyakarta.
            </motion.p>

            <motion.div {...anim(0.12)} className="flex flex-wrap items-center gap-5 pt-1">
              <Link
                to="/contact"
                onClick={onRequestCatalog ? (e) => { e.preventDefault(); onRequestCatalog(); } : undefined}
                className="px-6 py-3 bg-[#2b1d14] text-[#f3e6d8] text-sm font-medium hover:bg-[#6b5a47] transition-colors rounded-none inline-block text-center"
              >
                Request wholesale catalog
              </Link>
              <Link
                to="/shop"
                className="text-sm font-medium text-[#2b1d14] underline underline-offset-4 decoration-[#b8935f] hover:text-[#6b5a47] transition-colors"
              >
                Browse the shop
              </Link>
            </motion.div>

            <motion.p {...anim(0.16)} className="text-sm text-[#6b5a47]">
              Custom designs and bulk orders. Since 2018.
            </motion.p>
          </div>

          {/* Photo: col-span-7 */}
          <motion.div {...anim(0.08)} className="md:col-span-7 relative pt-4 pl-4 sm:pt-0 sm:pl-0">
            <PhotoBox
              src={HOME_IMAGES.booth.src}
              alt={HOME_IMAGES.booth.alt}
              aspect="aspect-[4/3]"
              maxH="max-h-[460px]"
              corner="rounded-tr-[64px]"
              priority
              className="w-full"
            />
            <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 w-[32%] z-10 border-4 border-[#f3e6d8]">
              <PhotoBox
                src={HOME_IMAGES.mirrorDetail.src}
                alt={HOME_IMAGES.mirrorDetail.alt}
                aspect="aspect-square"
                priority
                className="w-full"
              />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
