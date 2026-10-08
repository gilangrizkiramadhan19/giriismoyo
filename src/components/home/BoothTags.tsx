import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS, type Product } from "../../data/products";
import { HOME_IMAGES } from "../../config/homeImages";

const TAGS = [
  { id: "gi-wm-034", x: 22, y: 38 },
  { id: "gi-wm-001", x: 41, y: 32 },
  { id: "gi-bl-001", x: 57, y: 62 },
  { id: "gi-ls-001", x: 72, y: 22 },
  { id: "gi-pm-001", x: 83, y: 68 },
];
const BY_ID = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

const PopCard: React.FC<{
  product: Product; tagX: number; tagY: number;
  onClose: () => void; onAddToInquiry: (p: Product) => void; inInquiry: boolean;
}> = ({ product, tagX, tagY, onClose, onAddToInquiry, inInquiry }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const flipLeft = tagX > 55;

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [onClose]);

  return (
    <div
      ref={cardRef} role="dialog" aria-label={product.name}
      className="absolute z-30 w-64 max-w-64 bg-[#f3e6d8] border border-[#2b1d14]/20 p-4 shadow-md text-sm"
      style={{
        top: `${tagY}%`,
        ...(flipLeft
          ? { right: `${100 - tagX}%`, transform: "translateY(-50%)" }
          : { left: `${tagX}%`, transform: "translateY(-50%) translateX(24px)" }),
      }}
    >
      <button type="button" onClick={onClose} aria-label="Close" className="absolute top-2 right-2 text-[#6b5a47] hover:text-[#2b1d14] p-1 text-base leading-none">×</button>
      <p className="text-[10px] font-mono text-[#6b5a47] mb-0.5">{product.sku}</p>
      <h3 className="font-serif text-sm font-bold text-[#2b1d14] leading-snug mb-1 pr-4" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>{product.name}</h3>
      <p className="text-xs text-[#6b5a47] mb-2">{product.material}</p>
      <dl className="text-xs border-t border-[#2b1d14]/10 pt-2 mb-3 space-y-1">
        <div className="flex justify-between"><dt className="text-[#6b5a47]">Size</dt><dd className="font-medium text-[#2b1d14]">{product.dimensions}</dd></div>
        <div className="flex justify-between"><dt className="text-[#6b5a47]">Min. order</dt><dd className="font-medium text-[#2b1d14]">{product.moq} pcs</dd></div>
      </dl>
      <button
        type="button"
        onClick={() => { onAddToInquiry(product); onClose(); }}
        className="w-full py-2 bg-[#2b1d14] text-[#f3e6d8] text-xs font-semibold hover:bg-[#4a3b32] transition-colors mb-2 rounded-none"
      >
        {inInquiry ? "In inquiry list" : "Add to inquiry"}
      </button>
      <Link to="/shop" onClick={onClose} className="block text-center text-xs text-[#6b5a47] underline underline-offset-4 decoration-[#b8935f] hover:text-[#2b1d14] transition-colors">
        View details
      </Link>
    </div>
  );
};

export const BoothTags: React.FC<{
  onAddToInquiry: (product: Product) => void;
  inquiryItems: Product[];
}> = ({ onAddToInquiry, inquiryItems }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [imgErr, setImgErr] = useState(false);

  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveId(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeId]);

  const handleTag = useCallback((id: string) => setActiveId((prev) => (prev === id ? null : id)), []);
  const activeTag = TAGS.find((t) => t.id === activeId);
  const activeProduct = activeId ? BY_ID[activeId] : null;

  return (
    <section aria-label="From our booth" className="bg-[#f3e6d8] text-[#2b1d14] py-12 md:py-16">
      <div className="max-w-[1120px] mx-auto px-6 md:px-10">
        <div className="mb-6">
          <p className="text-xs font-sans font-semibold uppercase tracking-[0.15em] text-[#b8935f] mb-3">From the showroom</p>
          <h2
            className="font-sans font-bold text-3xl md:text-5xl uppercase tracking-wider text-[#2b1d14]"
          >
            From our booth
          </h2>
          <p className="text-base md:text-lg text-[#2b1d14]/70 mt-2">Tap a tag to see the piece.</p>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {["Mirrors", "Baskets", "Lampshades", "Walldecor", "Placemats", "Furniture"].map((cat) => (
              <a
                key={cat}
                href={`/shop?category=${cat.toLowerCase()}`}
                className="px-3 py-1 bg-[#b8935f]/15 hover:bg-[#b8935f]/30 text-xs font-sans text-[#2b1d14] rounded-full transition-colors"
              >
                {cat}
              </a>
            ))}
          </div>
        </div>
        <div className="relative w-full overflow-hidden rounded-bl-[64px] bg-[#b8935f]/25 aspect-[16/9] max-h-[480px]">
          {imgErr || !HOME_IMAGES.booth.src ? (
            <div className="w-full h-full flex items-end p-4"><span className="text-xs font-mono text-[#6b5a47]">booth.jpg</span></div>
          ) : (
            <img src={HOME_IMAGES.booth.src} alt={HOME_IMAGES.booth.alt} onError={() => setImgErr(true)} loading="lazy" className="w-full h-full object-cover" />
          )}
          {activeId && <div className="absolute inset-0 bg-[#2b1d14]/30 z-10 transition-opacity" onClick={() => setActiveId(null)} />}
          {TAGS.map((tag) => {
            const product = BY_ID[tag.id];
            if (!product) return null;
            return (
              <button
                key={tag.id} type="button" aria-label={`Tag: ${product.name}`} aria-pressed={activeId === tag.id}
                onClick={() => handleTag(tag.id)}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 min-w-[40px] min-h-[40px] flex items-center justify-center group"
                style={{ left: `${tag.x}%`, top: `${tag.y}%` }}
              >
                <span className={`flex items-center justify-center w-7 h-7 rounded-full border-2 transition-transform duration-150 ${activeId === tag.id ? "bg-[#e6c229] border-[#2b1d14] scale-110" : "bg-[#e6c229] border-[#2b1d14]/60 group-hover:scale-110"}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2b1d14]" />
                </span>
              </button>
            );
          })}
          {activeProduct && activeTag && (
            <PopCard
              product={activeProduct} tagX={activeTag.x} tagY={activeTag.y}
              onClose={() => setActiveId(null)} onAddToInquiry={onAddToInquiry}
              inInquiry={inquiryItems.some((p) => p.id === activeProduct.id)}
            />
          )}
        </div>
      </div>
    </section>
  );
};
