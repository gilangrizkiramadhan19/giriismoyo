import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { Link } from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/* ============================================================
   SHOP IMAGES — import.meta.glob
   ============================================================ */
const shopModules = import.meta.glob(
  "../assets/SHOP/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

const getGalleryAsset = (filename: string): string => {
  const match = Object.entries(shopModules).find(([k]) => k.endsWith("/" + filename));
  return match ? match[1] : "";
};

const GALLERY_ARCHIVE_NAMES = [
  "LAMPSHADE (8).png",
  "LAMPSHADE (9).png",
  "LAMPSHADE (10).png",
  "LAMPSHADE (14).png",
  "LAMPSHADE (15).png",
  "LAMPSHADE (16).png",
  "LAMPSHADE (17).png",
  "LAMPSHADE (18).png",
  "LAMPSHADE (19).png",
  "LAMPSHADE.png",
  "PLACEMATE (10).png",
  "PLACEMATE (11).png",
  "PLACEMATE (12).png",
  "WALLDECOR NATURAL FIBER (7).png",
  "WALLDECOR NATURAL FIBER (8).png",
  "WALLDECOR PRODUCTBANANA LURIK.png",
];

const GALLERY_IMAGE_TITLES: Record<string, string> = {
  "LAMPSHADE (8).png": "Woven Hanging Lampshade",
  "LAMPSHADE (9).png": "Natural Fiber Pendant Lamp",
  "LAMPSHADE (10).png": "Tiered Woven Lampshade",
  "LAMPSHADE (14).png": "Bell Shape Pendant Lamp",
  "LAMPSHADE (15).png": "Tapered Weave Lampshade",
  "LAMPSHADE (16).png": "Flared Pendant Lampshade",
  "LAMPSHADE (17).png": "Conical Woven Lampshade",
  "LAMPSHADE (18).png": "Dome Woven Lampshade",
  "LAMPSHADE (19).png": "Textured Fiber Lampshade",
  "LAMPSHADE.png": "Classic Woven Lampshade",
  "PLACEMATE (10).png": "Round Woven Placemat",
  "PLACEMATE (11).png": "Braided Fiber Placemat",
  "PLACEMATE (12).png": "Natural Texture Placemat",
  "WALLDECOR NATURAL FIBER (7).png": "Natural Fiber Wall Decor",
  "WALLDECOR NATURAL FIBER (8).png": "Woven Wall Hanging",
  "WALLDECOR PRODUCTBANANA LURIK.png": "Banana Bark Lurik Wall Decor",
};

const SHOP_IMAGES = GALLERY_ARCHIVE_NAMES.map((name) => ({
  src: getGalleryAsset(name),
  name: GALLERY_IMAGE_TITLES[name] || name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim(),
  key: name,
}));


/* ============================================================
   CONSTANTS
   ============================================================ */
const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f1a12]";

const PAGE_SIZE = 16;

const MARQUEE_ITEMS = [
  "Banana Bark",
  "Mendong",
  "Water Hyacinth",
  "Seagrass",
  "Raffia",
  "Rattan",
  "Natural Fiber",
];

const CATEGORIES = [
  {
    id: "mirror",
    label: "Woven Mirror",
    material: "Banana bark · Mendong",
    src: getGalleryAsset("WOVEN MIRROR (4).png"),
  },
  {
    id: "basket",
    label: "Woven Basket",
    material: "Water hyacinth · Seagrass",
    src: getGalleryAsset("WOVEN BASKET (3).png"),
  },
  {
    id: "lampshade",
    label: "Lampshade",
    material: "Mendong · Raffia",
    src: getGalleryAsset("LAMPSHADE (6).png"),
  },
  {
    id: "placemat",
    label: "Placemat",
    material: "Mendong · Seagrass",
    src: getGalleryAsset("PLACEMATE (3).png"),
  },
  {
    id: "walldecor",
    label: "Walldecor",
    material: "Banana bark · Raffia",
    src: getGalleryAsset(
      "WALLDECOR PRODUCT BANANA STAR MOTIF Material _ Banana Bark, Yarn Availabel Color _ Natural Black.png",
    ),
  },
  {
    id: "furniture",
    label: "Furniture & Decor",
    material: "Natural fiber · Stool & accents",
    src: getGalleryAsset("WALLDECOR NATURAL FIBER (6).png"),
  },
];

const STEPS = [
  {
    num: "01",
    title: "Material",
    desc: "Incoming raw fibers are checked for quality before production.",
    src: getGalleryAsset("WOVEN BASKET (4).png"),
  },
  {
    num: "02",
    title: "Production",
    desc: "External artisan groups work from home; internal team handles samples and finishing.",
    src: getGalleryAsset("WALLDECOR PRODUCT BANANA SYNTHETIC.png"),
  },
  {
    num: "03",
    title: "Quality Control I",
    desc: "Each piece is checked for durability, color, dimensions, and weave quality.",
    src: getGalleryAsset("WOVEN MIRROR (9).png"),
  },
  {
    num: "04",
    title: "Finishing",
    desc: "Anti-fungal spray and color liquid are applied to the finished surface.",
    src: getGalleryAsset("LAMPSHADE (7).png"),
  },
  {
    num: "05",
    title: "Quality Control II",
    desc: "Final inspection covers quality, dryness, and structural strength.",
    src: getGalleryAsset("PLACEMATE (9).png"),
  },
  {
    num: "06",
    title: "Packaging",
    desc: "Products are packed in corrugated cartons with silica gel for export.",
    src: getGalleryAsset("WOVEN BASKET (6).png"),
  },
];

const WAREHOUSE = [
  { label: "Working Area", src: getGalleryAsset("LAMPSHADE (4).png") },
  { label: "Finishing Area", src: getGalleryAsset("PLACEMATE (6).png") },
  { label: "Dry Area", src: getGalleryAsset("PLACEMATE (7).png") },
  { label: "Packing Area", src: getGalleryAsset("PLACEMATE (8).png") },
  { label: "Storage Area", src: getGalleryAsset("WALLDECOR NATURAL FIBER (5).png") },
];

const ATELIER_DETAILS = [
  getGalleryAsset("LAMPSHADE (11).png"),
  getGalleryAsset("LAMPSHADE (12).png"),
  getGalleryAsset("LAMPSHADE (13).png"),
];

const PALETTE = [
  { label: "Warm Ivory", hex: "#f1e3d6" },
  { label: "Soft Cream", hex: "#f7efe8" },
  { label: "Taupe", hex: "#6a5c4d" },
  { label: "Caramel", hex: "#b8926a" },
  { label: "Espresso", hex: "#2f1a12" },
];

/* ============================================================
   GLOBAL CSS — injected once
   ============================================================ */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

.gi-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
.gi-sans  { font-family: 'DM Sans', system-ui, sans-serif; }
.gi-mono  { font-family: 'DM Mono', 'Courier New', monospace; }

/* Scroll progress bar */
#gi-progress {
  position: fixed; top: 0; left: 0; right: 0; height: 2px;
  background: #b8926a; transform-origin: left;
  transform: scaleX(0); z-index: 200;
  transition: transform 0.08s linear;
  pointer-events: none;
}

/* Marquee */
@keyframes gi-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.gi-marquee { animation: gi-marquee 32s linear infinite; }
@media (prefers-reduced-motion: reduce) { .gi-marquee { animation: none; } }

/* Fade-up reveal (IntersectionObserver) */
.gi-reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.72s cubic-bezier(0.22,1,0.36,1),
              transform 0.72s cubic-bezier(0.22,1,0.36,1);
}
.gi-reveal.is-visible { opacity: 1; transform: translateY(0); }
@media (prefers-reduced-motion: reduce) {
  .gi-reveal { opacity: 1; transform: none; transition: none; }
}

/* Stagger delays */
.gi-stagger .gi-reveal:nth-child(1) { transition-delay: 0s; }
.gi-stagger .gi-reveal:nth-child(2) { transition-delay: 0.1s; }
.gi-stagger .gi-reveal:nth-child(3) { transition-delay: 0.2s; }
.gi-stagger .gi-reveal:nth-child(4) { transition-delay: 0.3s; }
.gi-stagger .gi-reveal:nth-child(5) { transition-delay: 0.4s; }
.gi-stagger .gi-reveal:nth-child(6) { transition-delay: 0.5s; }

/* Card hover zoom */
.gi-card img {
  transition: transform 0.65s cubic-bezier(0.22,1,0.36,1);
}
.gi-card:hover img { transform: scale(1.05); }

/* Modal */
@keyframes gi-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes gi-slide-up {
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
.gi-modal-bg    { animation: gi-fade-in 0.22s ease forwards; }
.gi-modal-inner { animation: gi-slide-up 0.32s cubic-bezier(0.22,1,0.36,1) forwards; }
@media (prefers-reduced-motion: reduce) {
  .gi-modal-bg, .gi-modal-inner { animation: none; }
}

/* Process badge */
.gi-badge {
  position: absolute; top: 12px; left: 12px;
  background: #2f1a12; color: #b8926a;
  font-family: 'DM Mono', monospace;
  font-size: 11px; font-weight: 500; letter-spacing: 0.12em;
  padding: 3px 10px; border-radius: 999px; z-index: 2;
}
`;

/* ============================================================
   HOOKS
   ============================================================ */
function useScrollProgress() {
  useEffect(() => {
    const el = document.getElementById("gi-progress");
    if (!el) return;
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
}

function useRevealObserver() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".gi-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}

function useModal(
  open: boolean,
  onClose: () => void,
  onPrev: () => void,
  onNext: () => void,
) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      dialogRef.current
        ?.querySelector<HTMLElement>("[data-autofocus]")
        ?.focus();
    }, 30);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      triggerRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
      else if (e.key === "Tab" && dialogRef.current) {
        const nodes = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])',
        );
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose, onPrev, onNext]);

  return dialogRef;
}

const pressable = (fn: () => void) => ({
  role: "button" as const,
  tabIndex: 0,
  onClick: fn,
  onKeyDown: (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fn();
    }
  },
});

/* ============================================================
   HERO — preserved exactly
   ============================================================ */
const HeroSection: React.FC = () => (
  <section className="relative min-h-[90vh] flex flex-col justify-between pt-28 pb-12 px-4 sm:px-8 lg:px-16 overflow-hidden border-b border-[#e5ded4]">
    <div className="absolute inset-0 z-0">
      <video
        src="/Room.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover object-center filter brightness-[0.50]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50" />
    </div>
    <div className="relative z-10 max-w-4xl mx-auto text-center my-auto space-y-6 text-[#faf8f5]">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1]">
        Gallery &amp; Workshop Moments
      </h1>
      <p className="text-base sm:text-xl text-[#e8decb] font-serif italic max-w-2xl mx-auto font-light leading-relaxed">
        "Glimpses into our Sanden artisan community, drying area, and handcrafted natural fiber collections."
      </p>
    </div>
    <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono tracking-[0.25em] text-[#d7c8b8] uppercase">
      <div>SANDEN · BANTUL · YOGYAKARTA · EST. 2018</div>
      <a
        href="#marquee"
        className="inline-flex items-center gap-2 text-[#d4af37] hover:text-white transition-colors py-1"
      >
        <span>SCROLL TO EXPLORE</span>
      </a>
    </div>
  </section>
);

/* ============================================================
   MARQUEE
   ============================================================ */
const MarqueeSection: React.FC = () => {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <section
      id="marquee"
      className="bg-[#2f1a12] py-5 overflow-hidden"
      aria-label="Natural materials"
    >
      <div className="relative overflow-hidden">
        <div className="gi-marquee flex whitespace-nowrap w-max">
          {items.map((item, i) => (
            <span
              key={i}
              className="gi-mono text-xs font-medium text-[#d4af37]/70 uppercase tracking-[0.22em] shrink-0 px-8"
            >
              {item}
              <span className="ml-8 text-[#b8926a]/40">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   FEATURED COLLECTION — 3-col grid
   ============================================================ */
const FeaturedCollection: React.FC = () => (
  <section
    id="collection"
    className="bg-[#faf7f2] py-20 sm:py-28 px-5 sm:px-10 lg:px-16"
    aria-label="Featured collection"
  >
    <div className="mx-auto max-w-7xl">
      <div className="gi-reveal flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
        <div>
          <p className="gi-mono text-[10px] tracking-[0.25em] text-[#b8926a] uppercase mb-3">
            Product Collections
          </p>
          <h2 className="gi-serif text-4xl sm:text-5xl font-semibold text-[#2f1a12] leading-tight">
            Natural Fiber Works
          </h2>
        </div>
        <p className="gi-sans text-sm text-[#6a5c4d] max-w-xs leading-relaxed">
          Signature product lines handcrafted from renewable natural fibers.
        </p>
      </div>

      <div className="gi-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {CATEGORIES.map((cat, i) => (
          <article
            key={cat.id}
            className="gi-reveal gi-card group cursor-pointer"
          >
            <div className="relative overflow-hidden bg-[#e8ddd4] aspect-[4/5] rounded-[4px]">
              <img
                src={cat.src}
                alt={cat.label}
                loading={i < 3 ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#2f1a12]/0 group-hover:bg-[#2f1a12]/18 transition-colors duration-500" />
            </div>
            <div className="mt-3.5 px-0.5 flex items-start justify-between">
              <div>
                <p className="gi-sans text-base font-medium text-[#2f1a12] leading-snug">
                  {cat.label}
                </p>
                <p className="gi-mono text-[11px] text-[#6a5c4d] tracking-wide mt-0.5">
                  {cat.material}
                </p>
              </div>
              <span className="gi-mono text-[10px] text-[#b8926a]/60 pt-0.5">
                0{i + 1}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

/* ============================================================
   CINEMATIC FULL-BLEED DIVIDER
   ============================================================ */
const CinematicDivider: React.FC<{ src: string; caption: string }> = ({
  src,
  caption,
}) => (
  <div className="relative h-[55vw] max-h-[640px] min-h-[300px] overflow-hidden bg-[#2f1a12]">
    <img
      src={src}
      alt={caption}
      loading="lazy"
      className="h-full w-full object-cover opacity-80"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#2f1a12]/70 via-transparent to-transparent" />
    <p className="gi-mono absolute bottom-6 right-8 text-[10px] tracking-[0.2em] text-[#d4af37]/60 uppercase">
      {caption}
    </p>
  </div>
);

/* ============================================================
   PRODUCTION PROCESS — 2×3 grid
   ============================================================ */
const ProductionProcess: React.FC = () => (
  <section
    id="process"
    className="bg-[#2f1a12] py-20 sm:py-28 px-5 sm:px-10 lg:px-16"
    aria-label="Production process"
  >
    <div className="mx-auto max-w-7xl">
      <div className="gi-reveal mb-12">
        <p className="gi-mono text-[10px] tracking-[0.25em] text-[#b8926a] uppercase mb-3">
          From Material to Shipment
        </p>
        <h2 className="gi-serif text-4xl sm:text-5xl font-semibold text-[#f1e3d6] leading-tight">
          The Craft Process
        </h2>
      </div>

      <div className="gi-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {STEPS.map((step) => (
          <article key={step.num} className="gi-reveal gi-card group">
            <div className="relative overflow-hidden bg-[#4a382c] aspect-[4/3] rounded-[4px]">
              <img
                src={step.src}
                alt={step.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
              <span className="gi-badge">{step.num}</span>
              <div className="absolute inset-0 bg-gradient-to-t from-[#2f1a12]/60 via-transparent to-transparent" />
            </div>
            <div className="mt-4 pr-2">
              <h3 className="gi-serif text-xl text-[#f1e3d6] font-semibold leading-snug">
                {step.title}
              </h3>
              <p className="gi-sans text-sm text-[#aa9d92] leading-relaxed mt-2">
                {step.desc}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

/* ============================================================
   WORKSHOP & WAREHOUSE — asymmetric grid
   ============================================================ */
const WorkshopSection: React.FC = () => (
  <section
    id="workshop"
    className="bg-[#f7efe8] py-20 sm:py-28 px-5 sm:px-10 lg:px-16"
    aria-label="Workshop and warehouse"
  >
    <div className="mx-auto max-w-7xl">
      <div className="gi-reveal mb-12">
        <p className="gi-mono text-[10px] tracking-[0.25em] text-[#b8926a] uppercase mb-3">
          Sanden, Bantul
        </p>
        <h2 className="gi-serif text-4xl sm:text-5xl font-semibold text-[#2f1a12] leading-tight">
          Workshop &amp; Space
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {/* Row 1 — hero, full width */}
          <div className="gi-reveal sm:col-span-3">
            {/* GAMBAR Halaman Gallery - Bagian Workshop & Space - Working Area */}
            <div className="gi-card relative overflow-hidden bg-[#d9c8b8] aspect-[16/9] rounded-[4px] group">
              <img
                src={WAREHOUSE[0].src}
                alt={WAREHOUSE[0].label}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2f1a12]/40 via-transparent to-transparent" />
              <p className="gi-mono absolute bottom-4 left-4 text-[10px] tracking-[0.18em] text-[#f1e3d6]/80 uppercase">
                {WAREHOUSE[0].label}
              </p>
            </div>
          </div>

          {/* Row 2 — three equal tiles */}
          {WAREHOUSE.slice(1, 4).map((w) => (
            <div key={w.label} className="gi-reveal">
              {/* GAMBAR Halaman Gallery - Bagian Workshop & Space - warehouse area (dinamis, dari array WAREHOUSE) */}
              <div className="gi-card relative overflow-hidden bg-[#d9c8b8] aspect-[4/3] rounded-[4px] group">
                <img
                  src={w.src}
                  alt={w.label}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2f1a12]/40 via-transparent to-transparent" />
                <p className="gi-mono absolute bottom-3 left-3 text-[10px] tracking-[0.18em] text-[#f1e3d6]/80 uppercase">
                  {w.label}
                </p>
              </div>
            </div>
          ))}

          {/* Row 3 — last image full width */}
          <div className="gi-reveal sm:col-span-3">
            {/* GAMBAR Halaman Gallery - Bagian Workshop & Space - Storage Area */}
            <div className="gi-card relative overflow-hidden bg-[#d9c8b8] aspect-[16/9] rounded-[4px] group">
              <img
                src={WAREHOUSE[4].src}
                alt={WAREHOUSE[4].label}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2f1a12]/40 via-transparent to-transparent" />
              <p className="gi-mono absolute bottom-4 left-4 text-[10px] tracking-[0.18em] text-[#f1e3d6]/80 uppercase">
                {WAREHOUSE[4].label}
              </p>
            </div>
          </div>
        </div>
    </div>
  </section>
);

/* ============================================================
   BRAND IDENTITY & PALETTE
   ============================================================ */
const BrandIdentity: React.FC = () => (
  <section
    id="identity"
    className="bg-[#f1e3d6] py-20 sm:py-28 px-5 sm:px-10 lg:px-16 border-t border-[#e5ded4]"
    aria-label="Brand identity"
  >
    <div className="mx-auto max-w-7xl">
      {/* Header + Palette */}
      <div className="gi-reveal flex flex-col lg:flex-row lg:items-end gap-10 mb-14">
        {/* Logo */}
        <div className="flex items-center gap-4 shrink-0">
          <svg
            width="56"
            height="56"
            viewBox="0 0 64 64"
            fill="none"
            aria-label="Giri Ismoyo logo"
            role="img"
          >
            <circle cx="32" cy="32" r="32" fill="#2f1a12" />
            <text
              x="12"
              y="47"
              fontFamily="Cormorant Garamond, Georgia, serif"
              fontSize="38"
              fontWeight="600"
              fill="#f1e3d6"
            >
              G
            </text>
            <path
              d="M47 11 C49 7,55 9,53 15 C51 21,43 19,47 11Z"
              fill="#b8926a"
            />
          </svg>
          <div>
            <p className="gi-serif text-2xl font-semibold text-[#2f1a12]">
              Giri Ismoyo
            </p>
            <p className="gi-mono text-xs text-[#6a5c4d] tracking-widest">
              SANDEN · BANTUL · EST. 2018
            </p>
          </div>
        </div>

        {/* Palette */}
        <div className="lg:ml-auto">
          <p className="gi-mono text-[10px] tracking-[0.25em] text-[#b8926a] uppercase mb-4">
            Brand Palette
          </p>
          <div className="flex flex-wrap gap-5">
            {PALETTE.map((c) => (
              <div key={c.hex} className="flex flex-col items-center gap-2">
                <div
                  className="w-11 h-11 rounded-full border-2 border-[#2f1a12]/10 shadow-sm"
                  style={{ background: c.hex }}
                />
                <div className="text-center">
                  <p className="gi-mono text-[9px] text-[#6a5c4d]">{c.hex}</p>
                  <p className="gi-mono text-[9px] text-[#4a382c]">{c.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3 detail photos */}
      <div className="gi-stagger grid grid-cols-3 gap-4 sm:gap-5">
        {ATELIER_DETAILS.map((detailSrc, i) => (
          <div key={i} className="gi-reveal">
            <div className="gi-card relative overflow-hidden bg-[#d9c8b8] aspect-square rounded-[4px] group">
              <img
                src={detailSrc}
                alt={`Giri Ismoyo craft detail ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ============================================================
   PHOTO ARCHIVE + LIGHTBOX MODAL
   ============================================================ */
const PhotoArchive: React.FC = () => {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [modal, setModal] = useState<number | null>(null);

  const closeModal = useCallback(() => setModal(null), []);
  const prevPhoto = useCallback(
    () =>
      setModal((p) =>
        p === null ? p : p > 0 ? p - 1 : SHOP_IMAGES.length - 1,
      ),
    [],
  );
  const nextPhoto = useCallback(
    () =>
      setModal((p) =>
        p === null ? p : p < SHOP_IMAGES.length - 1 ? p + 1 : 0,
      ),
    [],
  );

  const dialogRef = useModal(modal !== null, closeModal, prevPhoto, nextPhoto);
  const shown = useMemo(() => SHOP_IMAGES.slice(0, visible), [visible]);

  return (
    <section
      id="archive"
      className="bg-[#faf7f2] py-20 sm:py-28 px-5 sm:px-10 lg:px-16 border-t border-[#e5ded4]"
      aria-label="Photo archive"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="gi-reveal flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="gi-mono text-[10px] tracking-[0.25em] text-[#b8926a] uppercase mb-3">
              Complete Archive
            </p>
            <h2 className="gi-serif text-4xl sm:text-5xl font-semibold text-[#2f1a12]">
              All Works
            </h2>
          </div>
          <p className="gi-mono text-sm text-[#6a5c4d] tabular-nums">
            {SHOP_IMAGES.length} photographs
          </p>
        </div>

        {/* Masonry */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 sm:gap-5">
          {shown.map((image, i) => (
            <div
              key={image.key}
              className={`gi-card break-inside-avoid mb-4 sm:mb-5 cursor-pointer group ${FOCUS_RING}`}
              {...pressable(() => setModal(i))}
              aria-label={`View: ${image.name || `photo ${i + 1}`}`}
            >
              <div className="relative overflow-hidden bg-[#d9c8b8] rounded-[4px]">
                <img
                  src={image.src}
                  alt={image.name || `Giri Ismoyo product ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover block"
                />
                <div className="absolute inset-0 bg-[#2f1a12]/0 group-hover:bg-[#2f1a12]/22 transition-colors duration-400 flex items-end">
                  <p className="gi-mono p-3 text-[10px] tracking-wide text-transparent group-hover:text-[#f1e3d6]/80 transition-colors duration-300 truncate">
                    {image.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {visible < SHOP_IMAGES.length && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className={`gi-sans px-10 py-3.5 border border-[#6a5c4d]/30 text-[#4a382c] text-xs tracking-[0.2em] uppercase
                hover:bg-[#2f1a12] hover:text-[#f1e3d6] hover:border-[#2f1a12]
                transition-all duration-300 rounded-[3px] ${FOCUS_RING}`}
            >
              Load More&nbsp;
              <span className="text-[#b8926a]">
                ({SHOP_IMAGES.length - visible} remaining)
              </span>
            </button>
          </div>
        )}
      </div>

      {/* ── Lightbox Modal ── */}
      {modal !== null && SHOP_IMAGES[modal] && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={SHOP_IMAGES[modal].name || `Photo ${modal + 1}`}
          className="gi-modal-bg fixed inset-0 z-50 flex items-center justify-center bg-[#2f1a12]/93 p-4 sm:p-8 backdrop-blur-sm"
          onClick={closeModal}
        >
          {/* Close */}
          <button
            data-autofocus
            onClick={closeModal}
            className={`absolute right-4 top-4 z-10 rounded-full p-2.5 text-[#f7efe8] hover:bg-white/15 transition-colors ${FOCUS_RING} focus-visible:outline-[#f7efe8]`}
            aria-label="Close (Esc)"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full p-2.5 text-[#f7efe8] hover:bg-white/15 transition-colors ${FOCUS_RING} focus-visible:outline-[#f7efe8]`}
            aria-label="Previous (Arrow Left)"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            className={`absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full p-2.5 text-[#f7efe8] hover:bg-white/15 transition-colors ${FOCUS_RING} focus-visible:outline-[#f7efe8]`}
            aria-label="Next (Arrow Right)"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          {/* Image */}
          <figure
            className="gi-modal-inner flex max-h-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={modal}
              src={SHOP_IMAGES[modal].src}
              alt={
                SHOP_IMAGES[modal].name || `Giri Ismoyo photograph ${modal + 1}`
              }
              className="max-h-[80vh] w-auto max-w-full rounded-[4px] object-contain"
            />
            <figcaption className="mt-4 flex gap-3 items-center">
              <span className="gi-mono text-xs text-[#aa9d92] tabular-nums">
                {modal + 1} / {SHOP_IMAGES.length}
              </span>
              {SHOP_IMAGES[modal].name && (
                <>
                  <span className="text-[#b8926a]">·</span>
                  <span className="gi-mono text-xs text-[#d9c8b8]">
                    {SHOP_IMAGES[modal].name}
                  </span>
                </>
              )}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
};

/* ============================================================
   CTA — preserved exactly
   ============================================================ */
const CtaSection: React.FC = () => (
  <section className="relative min-h-[60vh] flex items-center justify-center py-20 px-4 sm:px-8 overflow-hidden bg-[#1c1b18]">
    <div className="absolute inset-0 z-0">
      <video
        src="/Room.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover object-center filter brightness-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60" />
    </div>
    <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6 text-[#faf8f5]">
      <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight uppercase">
        Seen Something You Like?
      </h2>
      <p className="text-sm sm:text-base text-[#d7c8b8] font-sans font-light leading-relaxed max-w-xl mx-auto">
        Explore the complete collection of natural-fiber home décor and
        handcrafted pieces available for wholesale for Indonesian and international buyers.
      </p>
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/shop"
          className="w-full sm:w-auto px-8 py-3.5 bg-[#FAF9F6] text-[#1A1A1A] hover:bg-[#ECE6DC] font-mono text-xs uppercase tracking-widest transition-colors flex items-center justify-center cursor-pointer"
        >
          <span>VIEW THE SHOP</span>
        </Link>
        <Link
          to="/contact"
          className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-mono text-xs uppercase tracking-widest transition-all flex items-center justify-center cursor-pointer"
        >
          <span>START A B2B INQUIRY</span>
        </Link>
      </div>
    </div>
  </section>
);

/* ============================================================
   PAGE ROOT
   ============================================================ */
export const GalleryPage: React.FC = () => {
  useScrollProgress();
  useRevealObserver();

  return (
    <div className="bg-[#faf7f2] text-[#2f1a12] selection:bg-[#b8926a]/30 selection:text-[#2f1a12]">
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <div id="gi-progress" aria-hidden="true" />

      <HeroSection />
      <MarqueeSection />
      <FeaturedCollection />
      <CinematicDivider src={getGalleryAsset("toko.jpg")} caption="Giri Ismoyo · Sanden Workshop" />
      <ProductionProcess />
      <WorkshopSection />
      <BrandIdentity />
      <PhotoArchive />
      <CtaSection />
    </div>
  );
};

export default GalleryPage;
