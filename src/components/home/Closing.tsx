import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { CONTACT } from "../../config/contact";
import { HOME_IMAGES } from "../../config/homeImages";

export const Closing: React.FC<{ onRequestCatalog?: () => void }> = ({ onRequestCatalog }) => {
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
    <section className="bg-[#f3e6d8] text-[#2b1d14] py-12 md:py-16" aria-label="Closing">
      <div className="max-w-[1120px] mx-auto px-6 md:px-10">
        <motion.div {...anim} className="relative">
          {/* Photo loadingContainer, aspect-[21/9], max-h-[400px], rounded corner */}
          <div className="overflow-hidden bg-[#b8935f]/25 rounded-tr-[64px] aspect-[21/9] max-h-[400px] w-full">
            {imgErr || !HOME_IMAGES.loadingContainer.src ? (
              <div className="w-full h-full flex items-end p-4">
                <span className="text-xs font-mono text-[#6b5a47]">loading-container.jpg</span>
              </div>
            ) : (
              <img
                src={HOME_IMAGES.loadingContainer.src}
                alt={HOME_IMAGES.loadingContainer.alt}
                onError={() => setImgErr(true)}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500 motion-reduce:transition-none"
              />
            )}
          </div>

          {/* Brown block overlapping bottom-left */}
          <div className="bg-[#6b5a47] text-[#f3e6d8] p-6 sm:p-8 md:p-10 rounded-[4px] max-w-lg mt-6 md:mt-0 md:absolute md:bottom-0 md:left-6 md:-mb-8 lg:left-8 lg:-mb-10 shadow-sm space-y-5">
            <h2
              className="text-3xl font-normal tracking-tight text-[#f3e6d8] leading-tight"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Bring Nature to Your Home
            </h2>
            <div className="flex flex-wrap items-center gap-5 pt-1">
              <Link
                to="/contact"
                onClick={onRequestCatalog ? (e) => { e.preventDefault(); onRequestCatalog(); } : undefined}
                className="bg-[#2b1d14] text-[#f3e6d8] px-6 py-3 text-sm font-medium hover:bg-[#3d2b1f] transition-colors rounded-none inline-block text-center"
              >
                Request wholesale catalog
              </Link>
              <a
                href={CONTACT.WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#f3e6d8] underline decoration-[#b8935f] underline-offset-4 hover:text-[#e6c229] transition-colors"
              >
                Message us on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

        {/* Address and email in text-sm from src/config/contact.ts */}
        <motion.div
          {...anim}
          className="pt-10 md:pt-16 flex flex-col sm:flex-row md:justify-end gap-6 sm:gap-10 text-sm text-[#2b1d14]/80"
        >
          <div>
            <span className="block text-xs uppercase tracking-wider font-medium text-[#6b5a47] mb-1">
              Workshop & Office
            </span>
            <p className="leading-relaxed max-w-xs">{CONTACT.ADDRESS}</p>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wider font-medium text-[#6b5a47] mb-1">
              Direct Email
            </span>
            <a
              href={`mailto:${CONTACT.EMAIL}`}
              className="underline decoration-[#b8935f] hover:text-[#2b1d14] transition-colors"
            >
              {CONTACT.EMAIL}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
