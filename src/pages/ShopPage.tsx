import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  Eye,
  ShoppingBag,
  Check,
  X,
} from "lucide-react";
import type { Product } from "../data/products";

// ─── 1. DISCOVER REAL ASSETS FROM src/assets/SHOP ───────────────────────────
const shopImageModules = import.meta.glob<string>(
  "../assets/SHOP/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, query: "?url", import: "default" },
);

const getAsset = (pattern: string): string => {
  const match = Object.entries(shopImageModules).find(([path]) =>
    path.toLowerCase().includes(pattern.toLowerCase()),
  );
  return match ? match[1] : "";
};

// ─── 2. HERO FEATURED SHOWCASE DATA (STRICT 4 PRODUCTS, NO CARPET) ─────────
interface FeaturedProduct {
  id: number;
  number: string;
  category: string;
  name: string;
  description: string;
  material: string;
  crafting: string;
  dimensions: string;
  image: string;
  bgColor: string;
  accentColor: string;
  mutedColor: string;
  borderCol: string;
  shadowStyle: string;
  materialSwatches: string[];
}

const HERO_FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: 1,
    number: "01",
    category: "WOVEN MIRROR",
    name: "Handwoven Seagrass Mirror",
    description:
      "A sculptural mirror handcrafted from natural seagrass, bringing organic texture and quiet warmth into contemporary interiors.",
    material: "Premium Seagrass",
    crafting: "Hand-braided",
    dimensions: "Ø 75 cm",
    image: getAsset("WOVEN MIRROR (11).png"),
    bgColor: "#FAF8F5",
    accentColor: "#1C2C22",
    mutedColor: "#6F756F",
    borderCol: "rgba(28, 44, 34, 0.12)",
    shadowStyle: "drop-shadow(0 25px 35px rgba(0, 0, 0, 0.10))",
    materialSwatches: ["#C8B89B", "#A48C68", "#E5DED2"],
  },
  {
    id: 2,
    number: "02",
    category: "WOVEN BASKET",
    name: "Sculptural Banana Bark Basket",
    description:
      "A handwoven vessel shaped from renewable natural fibers, balancing everyday storage utility with organic artisanal character.",
    material: "Banana Bark & Raffia",
    crafting: "Hand-woven",
    dimensions: "45 × 45 × 40 cm",
    image: getAsset("WOVEN BASKET (19).png"),
    bgColor: "#1B241E",
    accentColor: "#FAF8F5",
    mutedColor: "#B7C0B8",
    borderCol: "rgba(250, 248, 245, 0.14)",
    shadowStyle: "drop-shadow(0 25px 35px rgba(0, 0, 0, 0.45))",
    materialSwatches: ["#8C7658", "#B59A72", "#D4C3A5"],
  },
  {
    id: 3,
    number: "03",
    category: "WALLDECOR",
    name: "Artisan Radial Wall Medallion",
    description:
      "Concentric starburst wall art hand-braided from sun-cured agricultural fibers and cotton yarn to enrich architectural living spaces.",
    material: "Mendong & Banana Bark",
    crafting: "Hand-braided",
    dimensions: "Ø 60 cm",
    image: getAsset("WALLDECOR NATURAL FIBER (9).png"),
    bgColor: "#EFECE6",
    accentColor: "#2B2520",
    mutedColor: "#756D65",
    borderCol: "rgba(43, 37, 32, 0.12)",
    shadowStyle: "drop-shadow(0 25px 35px rgba(0, 0, 0, 0.12))",
    materialSwatches: ["#B9A88E", "#D6C9B6", "#8D7B65"],
  },
  {
    id: 4,
    number: "04",
    category: "PLACEMATE",
    name: "Organic Coiled Dining Placemat",
    description:
      "A tactile dining piece woven with tight concentric coils from dried water hyacinth, introducing quiet refinement to banquet surfaces.",
    material: "Water Hyacinth",
    crafting: "Coil-stitched",
    dimensions: "38 × 38 cm",
    image: getAsset("PLACEMATE (13).png"),
    bgColor: "#F5EDE3",
    accentColor: "#30231B",
    mutedColor: "#7D6E64",
    borderCol: "rgba(48, 35, 27, 0.12)",
    shadowStyle: "drop-shadow(0 25px 35px rgba(0, 0, 0, 0.10))",
    materialSwatches: ["#D2B48C", "#AA8865", "#EDE2D2"],
  },
];

// ─── 3. CATALOG ITEM PARSING & EXCLUSION ────────────────────────────────────
export type AllowedCategory =
  | "All Products"
  | "Woven Basket"
  | "Walldecor"
  | "Woven Mirror"
  | "Placemate"
  | "Carpet";

export type CategorySlug =
  | "all"
  | "woven-basket"
  | "walldecor"
  | "woven-mirror"
  | "placemate"
  | "carpet";

export interface CatalogItem {
  id: string;
  sku: string;
  name: string;
  category: AllowedCategory;
  categorySlug: CategorySlug;
  image: string;
  material: string;
}

function detectCategory(
  filename: string,
): { category: AllowedCategory; slug: CategorySlug } | null {
  const lower = filename.toLowerCase();

  // EXCLUDE all Lampshades
  if (lower.includes("lampshade")) {
    return null;
  }

  if (lower.includes("carpet")) {
    return { category: "Carpet", slug: "carpet" };
  }

  if (
    lower.includes("woven mirror") ||
    lower.includes("wallmirror") ||
    lower.includes("mirror")
  ) {
    return { category: "Woven Mirror", slug: "woven-mirror" };
  }

  if (
    lower.includes("walldecor") ||
    lower.includes("wall decor") ||
    lower.includes("wall-decor")
  ) {
    return { category: "Walldecor", slug: "walldecor" };
  }

  if (lower.includes("placemate") || lower.includes("placemat")) {
    return { category: "Placemate", slug: "placemate" };
  }

  if (lower.includes("woven basket") || lower.includes("basket")) {
    return { category: "Woven Basket", slug: "woven-basket" };
  }

  return null;
}

function formatProductName(
  rawFilename: string,
  category: AllowedCategory,
): string {
  let clean = rawFilename.split(/Material\s*[_:]/i)[0];
  clean = clean.split(/Available\s*Color/i)[0];
  clean = clean.split(/Availabel\s*Color/i)[0];

  clean = clean.replace(/PRODUCT\s*BANANA/gi, "Banana");
  clean = clean.replace(/PRODUCT\s*/gi, "");

  clean = clean.replace(/\((\d+)\)/g, (_, num) => {
    const n = parseInt(num, 10);
    return n < 10 ? `0${n}` : `${n}`;
  });

  clean = clean
    .replace(/[_\-–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  clean = clean
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return clean || category;
}

const EXCLUDED_FROM_SHOP = new Set([
  // Home allocation
  "homedecor.jpeg",
  "WALLDECOR PRODUCT BANANA KNITH.png",
  "WOVEN BASKET (5).png",
  "WOVEN MIRROR (3).png",
  "PLACEMATE (4).png",
  "WOVEN BASKET (7).png",
  "WALLDECOR NATURAL FIBER (2).png",
  "LAMPSHADE (5).png",
  "WOVEN BASKET (10).png",
  "WOVEN BASKET (11).png",
  "WOVEN BASKET (12).png",
  "WOVEN BASKET (13).png",
  "WOVEN BASKET (14).png",
  "WOVEN BASKET (15).png",
  "WALLDECOR PRODUCT BANANA STAR 2.png",
  "WALLDECOR PRODUCT BANANA MIX PATTERN.png",
  "WALLDECOR PRODUCT BANANA STAR 3.png",
  "WOVEN MIRROR (5).png",
  "WOVEN MIRROR (6).png",
  "WOVEN MIRROR (7).png",
  "WOVEN BASKET (2).png",
  "PLACEMATE (2).png",
  "WOVEN MIRROR (2).png",
  "WALLDECOR NATURAL FIBER (3).png",
  // About allocation
  "LAMPSHADE (2).png",
  "WOVEN BASKET (17).png",
  "WOVEN MIRROR (8).png",
  "PLACEMATE (5).png",
  "WOVEN BASKET (18).png",
  "WALLDECOR NATURAL FIBER (4).png",
  "WALLDECOR PRODUCT BANANA SUN BLACK.png",
  // Gallery allocation
  "LAMPSHADE (3).png",
  "LAMPSHADE (4).png",
  "PLACEMATE (6).png",
  "PLACEMATE (7).png",
  "PLACEMATE (8).png",
  "WALLDECOR NATURAL FIBER (5).png",
  "WOVEN MIRROR (4).png",
  "WOVEN BASKET (3).png",
  "LAMPSHADE (6).png",
  "PLACEMATE (3).png",
  "WALLDECOR PRODUCT BANANA STAR MOTIF Material _ Banana Bark, Yarn Availabel Color _ Natural Black.png",
  "WALLDECOR NATURAL FIBER (6).png",
  "WOVEN BASKET (4).png",
  "WALLDECOR PRODUCT BANANA SYNTHETIC.png",
  "WOVEN MIRROR (9).png",
  "LAMPSHADE (7).png",
  "PLACEMATE (9).png",
  "WOVEN BASKET (6).png",
  "LAMPSHADE (11).png",
  "LAMPSHADE (12).png",
  "LAMPSHADE (13).png",
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
]);

const ALL_CATALOG_PRODUCTS: CatalogItem[] = (() => {
  const items: CatalogItem[] = [];
  const counters: Record<string, number> = {
    "Woven Basket": 0,
    Walldecor: 0,
    "Woven Mirror": 0,
    Placemate: 0,
    Carpet: 0,
  };

  const skuPrefixes: Record<AllowedCategory, string> = {
    "All Products": "GI",
    "Woven Basket": "GI-WB",
    Walldecor: "GI-WD",
    "Woven Mirror": "GI-WM",
    Placemate: "GI-PM",
    Carpet: "GI-CP",
  };

  const sorted = Object.entries(shopImageModules).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  sorted.forEach(([path, url]) => {
    const filenameWithExt = path.split("/").pop() || "";
    if (EXCLUDED_FROM_SHOP.has(filenameWithExt)) return;
    const base = filenameWithExt.replace(/\.[^/.]+$/, "");

    const detected = detectCategory(base);
    if (!detected) return;

    counters[detected.category] = (counters[detected.category] || 0) + 1;
    const idx = counters[detected.category];
    const prefix = skuPrefixes[detected.category];

    items.push({
      id: `shop-${detected.slug}-${idx}`,
      sku: `${prefix}/${String(idx).padStart(3, "0")}`,
      name: formatProductName(base, detected.category),
      category: detected.category,
      categorySlug: detected.slug,
      image: url as string,
      material: "Natural Fiber",
    });
  });

  return items;
})();

const CATEGORY_TABS: { id: CategorySlug; label: AllowedCategory }[] = [
  { id: "all", label: "All Products" },
  { id: "woven-basket", label: "Woven Basket" },
  { id: "walldecor", label: "Walldecor" },
  { id: "woven-mirror", label: "Woven Mirror" },
  { id: "placemate", label: "Placemate" },
  { id: "carpet", label: "Carpet" },
];

const ITEMS_PER_PAGE = 16;

// Vertical Y-Axis Slide Animation Variants for Hero Product
const verticalSlideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? -90 : 90, // Next: masuk dari ATAS (-90). Prev: masuk dari BAWAH (90)
    opacity: 0,
    scale: 0.92,
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: (direction: number) => ({
    y: direction > 0 ? 90 : -90, // Next: keluar ke BAWAH (90). Prev: keluar ke ATAS (-90)
    opacity: 0,
    scale: 1.05,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

interface ShopPageProps {
  onAddToInquiry: (product: Product) => void;
  inquiryItems: Product[];
  onRequestCatalog: () => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onAddToInquiry,
  inquiryItems,
  onRequestCatalog,
}) => {
  // ─── HERO CAROUSEL STATE ──────────────────────────────────────────────────
  const [[heroIndex, heroDirection], setHeroState] = useState<[number, number]>(
    [0, 0],
  );
  const [isHeroHovered, setIsHeroHovered] = useState<boolean>(false);

  const currentHeroProduct = HERO_FEATURED_PRODUCTS[heroIndex];

  const paginateHero = (newDirection: number) => {
    setHeroState(([prev]) => {
      const next =
        (prev + newDirection + HERO_FEATURED_PRODUCTS.length) %
        HERO_FEATURED_PRODUCTS.length;
      return [next, newDirection];
    });
  };

  // Autoplay (7 seconds) with pause on hover
  useEffect(() => {
    if (isHeroHovered) return;
    const timer = setInterval(() => {
      paginateHero(1);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroIndex, isHeroHovered]);

  // ─── CATALOG SECTION STATE ────────────────────────────────────────────────
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug>("all");
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);
  const [activeModalProduct, setActiveModalProduct] =
    useState<CatalogItem | null>(null);

  // Reset pagination when category changes
  const handleCategoryChange = (slug: CategorySlug) => {
    setSelectedCategory(slug);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  // Close Quick View on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveModalProduct(null);
    };
    if (activeModalProduct) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeModalProduct]);

  // Dynamic Category Counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: ALL_CATALOG_PRODUCTS.length,
      "woven-basket": 0,
      walldecor: 0,
      "woven-mirror": 0,
      placemate: 0,
      carpet: 0,
    };
    ALL_CATALOG_PRODUCTS.forEach((item) => {
      counts[item.categorySlug] = (counts[item.categorySlug] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered Catalog Products
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return ALL_CATALOG_PRODUCTS;
    return ALL_CATALOG_PRODUCTS.filter(
      (item) => item.categorySlug === selectedCategory,
    );
  }, [selectedCategory]);

  // Sliced Visible Products for Pagination
  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const isInInquiry = (id: string) => inquiryItems.some((i) => i.id === id);

  const handleInquiryClick = (
    item:
      | CatalogItem
      | {
          id: string;
          sku: string;
          name: string;
          category: string;
          material: string;
          image: string;
        },
  ) => {
    const compatible: Product = {
      id: item.id,
      sku: item.sku,
      name: item.name,
      category: item.category.toLowerCase().replace(/\s+/g, "-") as any,
      material: item.material,
      dimensions: "Handcrafted Standard Specification",
      naturalFiberRatio: "100% Handcrafted Natural Fiber",
      description: `Authentic ${item.category} woven by Indonesian craft masters in Bantul, Yogyakarta using renewable natural fiber.`,
      moq: 10,
      image: item.image,
    };
    onAddToInquiry(compatible);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById("catalog-collection");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#F7F4EF] text-[#1C1B18] font-sans selection:bg-[#C59D4C] selection:text-[#1E3A2B] min-h-screen">
      {/* =========================================================================
          BAGIAN 1: HERO FEATURED SHOWCASE (DYNAMIC THEME & Y-AXIS SLIDE)
          ========================================================================= */}
      <motion.section
        id="hero-featured-showcase"
        className="relative w-full overflow-hidden transition-colors duration-700 min-h-[720px] lg:min-h-[780px] flex flex-col justify-between pt-24 pb-12 md:pt-32 md:pb-14 px-6 sm:px-10 lg:px-16"
        animate={{ backgroundColor: currentHeroProduct.bgColor }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
        aria-roledescription="carousel"
        aria-label="Hero Featured Product Showcase"
      >
        {/* Top Header / Sub-bar */}
        <div
          className="max-w-7xl w-full mx-auto flex items-center justify-between border-b pb-4 transition-colors duration-500"
          style={{ borderColor: currentHeroProduct.borderCol }}
        >
          <div className="flex items-center gap-2">
            {/* <span
              className="text-[11px] font-mono tracking-[0.28em] uppercase font-semibold transition-colors duration-500"
              style={{ color: currentHeroProduct.accentColor }}
            >
              {currentHeroProduct.number} / 04 · FEATURED SHOWCASE
            </span> */}
          </div>

          {/* <div
            className="text-[11px] font-mono tracking-[0.25em] uppercase hidden sm:block transition-colors duration-500"
            style={{ color: currentHeroProduct.mutedColor }}
          >
            GIRI ISMOYO · KONTINUM ALAM
          </div> */}
        </div>

        {/* Main 3-Column Editorial Grid */}
        <div className="max-w-7xl w-full mx-auto my-auto py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT: Product Title, Description, and CTAs (4 cols) */}
          <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHeroProduct.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                <div
                  className="text-[11px] font-mono uppercase tracking-[0.22em] font-medium transition-colors duration-500"
                  style={{ color: currentHeroProduct.mutedColor }}
                >
                  {currentHeroProduct.category}
                </div>

                <h2
                  className="font-editorial text-4xl sm:text-5xl lg:text-[3.25rem] font-light leading-[1.08] tracking-tight transition-colors duration-500"
                  style={{
                    color: currentHeroProduct.accentColor,
                    fontFamily:
                      '"Cormorant Garamond", "Playfair Display", Georgia, serif',
                  }}
                >
                  {currentHeroProduct.name}
                </h2>

                <p
                  className="font-sans text-xs sm:text-sm font-light leading-relaxed max-w-sm transition-colors duration-500"
                  style={{ color: currentHeroProduct.mutedColor }}
                >
                  {currentHeroProduct.description}
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={scrollToCatalog}
                    className="px-6 py-3 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 shadow-sm cursor-pointer"
                    style={{
                      backgroundColor: currentHeroProduct.accentColor,
                      color: currentHeroProduct.bgColor,
                    }}
                  >
                    View Details
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleInquiryClick({
                        id: `hero-${currentHeroProduct.id}`,
                        sku: `GI-HERO/00${currentHeroProduct.id}`,
                        name: currentHeroProduct.name,
                        category: currentHeroProduct.category,
                        material: currentHeroProduct.material,
                        image: currentHeroProduct.image,
                      })
                    }
                    className="px-5 py-3 rounded-full text-xs font-mono uppercase tracking-widest border transition-colors duration-300 cursor-pointer"
                    style={{
                      borderColor: currentHeroProduct.borderCol,
                      color: currentHeroProduct.accentColor,
                    }}
                  >
                    Inquire
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CENTER: Hero Image with Vertical Y-Axis Slide Animation (5 cols) */}
          <div className="lg:col-span-5 order-1 lg:order-2 relative flex items-center justify-center min-h-[320px] sm:min-h-[400px] lg:min-h-[480px]">
            {/* Subtle Atmosphere Glow */}
            <div
              className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-3xl pointer-events-none opacity-20 transition-colors duration-700"
              style={{ backgroundColor: currentHeroProduct.accentColor }}
            />

            {/* Central Vertical Slide Animation Container */}
            <div className="relative z-10 w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] aspect-square flex items-center justify-center overflow-hidden p-4">
              <AnimatePresence mode="wait" custom={heroDirection}>
                <motion.img
                  key={currentHeroProduct.id}
                  src={currentHeroProduct.image}
                  alt={currentHeroProduct.name}
                  custom={heroDirection}
                  variants={verticalSlideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full object-contain select-none"
                  style={{ filter: currentHeroProduct.shadowStyle }}
                  loading="eager"
                />
              </AnimatePresence>
            </div>

            {/* Left / Right Carousel Controls */}
            <div className="absolute inset-y-0 -left-2 sm:left-0 flex items-center z-20">
              <motion.button
                type="button"
                onClick={() => paginateHero(-1)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="p-3 rounded-full border backdrop-blur-xs transition-colors cursor-pointer"
                style={{
                  borderColor: currentHeroProduct.borderCol,
                  color: currentHeroProduct.accentColor,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                }}
                aria-label="Previous featured product"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </div>

            <div className="absolute inset-y-0 -right-2 sm:right-0 flex items-center z-20">
              <motion.button
                type="button"
                onClick={() => paginateHero(1)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="p-3 rounded-full border backdrop-blur-xs transition-colors cursor-pointer"
                style={{
                  borderColor: currentHeroProduct.borderCol,
                  color: currentHeroProduct.accentColor,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                }}
                aria-label="Next featured product"
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </div>
          </div>

          {/* RIGHT: Craft & Material Specifications (3 cols) */}
          <div className="lg:col-span-3 order-3 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHeroProduct.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.05,
                }}
                className="space-y-5 lg:pl-6 border-t lg:border-t-0 lg:border-l pt-6 lg:pt-0 transition-colors duration-500"
                style={{ borderColor: currentHeroProduct.borderCol }}
              >
                <div>
                  <span
                    className="text-[10px] font-mono uppercase tracking-[0.2em] block mb-1 transition-colors duration-500"
                    style={{ color: currentHeroProduct.mutedColor }}
                  >
                    MATERIAL
                  </span>
                  <span
                    className="text-sm font-sans font-medium transition-colors duration-500"
                    style={{ color: currentHeroProduct.accentColor }}
                  >
                    {currentHeroProduct.material}
                  </span>
                </div>

                <div>
                  <span
                    className="text-[10px] font-mono uppercase tracking-[0.2em] block mb-1 transition-colors duration-500"
                    style={{ color: currentHeroProduct.mutedColor }}
                  >
                    CRAFTING
                  </span>
                  <span
                    className="text-sm font-sans font-medium transition-colors duration-500"
                    style={{ color: currentHeroProduct.accentColor }}
                  >
                    {currentHeroProduct.crafting}
                  </span>
                </div>

                <div>
                  <span
                    className="text-[10px] font-mono uppercase tracking-[0.2em] block mb-1 transition-colors duration-500"
                    style={{ color: currentHeroProduct.mutedColor }}
                  >
                    DIMENSIONS
                  </span>
                  <span
                    className="text-sm font-sans font-medium transition-colors duration-500"
                    style={{ color: currentHeroProduct.accentColor }}
                  >
                    {currentHeroProduct.dimensions}
                  </span>
                </div>

                {/* 3 Material Swatches */}
                <div className="pt-2">
                  <span
                    className="text-[10px] font-mono uppercase tracking-[0.2em] block mb-2 transition-colors duration-500"
                    style={{ color: currentHeroProduct.mutedColor }}
                  >
                    MATERIAL TONES
                  </span>
                  <div className="flex items-center gap-2.5">
                    {currentHeroProduct.materialSwatches.map((swatch, idx) => (
                      <span
                        key={idx}
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full shadow-xs transition-transform hover:scale-110"
                        style={{
                          backgroundColor: swatch,
                          border: `1.5px solid ${currentHeroProduct.accentColor}`,
                        }}
                        title={`Material tone ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Progress Line & Pagination Indicator */}
        <div
          className="max-w-7xl w-full mx-auto pt-6 border-t flex items-center justify-between transition-colors duration-500 text-xs font-mono"
          style={{ borderColor: currentHeroProduct.borderCol }}
        >
          <span
            className="tracking-widest font-semibold transition-colors duration-500"
            style={{ color: currentHeroProduct.accentColor }}
          >
            {currentHeroProduct.number}
          </span>

          <div className="flex-1 max-w-xs sm:max-w-md mx-6 h-[2px] bg-black/10 relative overflow-hidden rounded-full">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: currentHeroProduct.accentColor }}
              initial={false}
              animate={{
                width: `${((heroIndex + 1) / HERO_FEATURED_PRODUCTS.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          <span
            className="tracking-widest transition-colors duration-500"
            style={{ color: currentHeroProduct.mutedColor }}
          >
            04
          </span>
        </div>
      </motion.section>

      {/* =========================================================================
          BAGIAN 2: CATALOG & FILTER GRID (KOLEKSI LENGKAP)
          ========================================================================= */}
      <div
        id="catalog-collection"
        className="pt-16 pb-20 border-t border-[#1C1B18]/10 bg-[#F7F4EF]"
      >
        {/* Section Editorial Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <div className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#8A7258] mb-2 font-medium">
            AUTHENTIC HANDMADE ARCHIVE
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl font-light text-[#1C1B18] tracking-tight mb-2 uppercase">
            PRODUCT COLLECTION
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#1C1B18]/60 font-light tracking-wide max-w-lg mx-auto">
            Discover our complete archive of sustainable natural-fiber home
            decor, individually shaped by master Indonesian artisans.
          </p>
        </div>

        {/* Category Tabs (Strict 6 Categories with dynamic count badge) */}
        <nav
          aria-label="Catalog Categories"
          className="sticky top-[58px] z-30 bg-[#F7F4EF]/95 backdrop-blur-md border-y border-[#1C1B18]/10 py-3.5 px-4 sm:px-6 lg:px-8 mb-10 shadow-2xs"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {CATEGORY_TABS.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count = categoryCounts[cat.id] ?? 0;

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all rounded-full flex items-center gap-2 shrink-0 cursor-pointer ${
                      isActive
                        ? "bg-[#1E3A2B] text-[#F7F4EF] font-medium shadow-xs"
                        : "bg-[#ECE6DC]/60 text-[#1C1B18]/70 hover:bg-[#ECE6DC] hover:text-[#1C1B18]"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive
                          ? "bg-[#C59D4C] text-[#1E3A2B] font-bold"
                          : "bg-[#1C1B18]/10 text-[#1C1B18]/60"
                      }`}
                    >
                      [{count}]
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Catalog Grid Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Status Counter Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-[#1C1B18]/10 mb-8 text-xs font-mono text-[#1C1B18]/60">
            <span className="uppercase tracking-wider">
              SHOWING {visibleProducts.length} OF {filteredProducts.length}{" "}
              PRODUCTS
            </span>
            <button
              onClick={onRequestCatalog}
              className="hover:text-[#1E3A2B] uppercase tracking-wider text-[11px] underline cursor-pointer"
            >
              REQUEST WHOLESALE CATALOG
            </button>
          </div>

          {/* Empty State */}
          {visibleProducts.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <p className="font-editorial text-xl text-[#1C1B18]/70">
                No products available in this category
              </p>
              <button
                type="button"
                onClick={() => handleCategoryChange("all")}
                className="text-xs font-mono uppercase tracking-widest text-[#1E3A2B] underline cursor-pointer"
              >
                Reset to All Products
              </button>
            </div>
          ) : (
            /* Strict 4-Column Uniform Grid */
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {visibleProducts.map((item) => {
                  const added = isInInquiry(item.id);

                  return (
                    <motion.article
                      layout
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="group bg-[#FBF9F5] border border-[#1C1B18]/10 hover:border-[#1E3A2B]/40 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-md cursor-pointer"
                      onClick={() => setActiveModalProduct(item)}
                    >
                      {/* Uniform 1:1 Aspect-Square Container */}
                      <div className="relative aspect-square w-full bg-[#ECE6DC]/50 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />

                        {/* Hover Quick View Overlay */}
                        <div className="absolute inset-0 bg-[#1C1B18]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                          <span className="px-3.5 py-1.5 bg-[#F7F4EF] text-[#1C1B18] font-mono text-[10px] uppercase tracking-widest shadow-sm flex items-center gap-1.5">
                            <Eye className="w-3 h-3" />
                            <span>QUICK VIEW</span>
                          </span>
                        </div>
                      </div>

                      {/* Card Information: Minimalist Editorial */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-[10px] font-mono uppercase tracking-wider text-[#8A7258] mb-1">
                            {item.category}
                          </p>
                          <h3 className="font-editorial text-base text-[#1C1B18] group-hover:text-[#1E3A2B] transition-colors leading-snug line-clamp-1">
                            {item.name}
                          </h3>
                        </div>

                        <div className="pt-3 mt-3 border-t border-[#1C1B18]/8 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-[#8A7258]">
                            {item.sku}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleInquiryClick(item);
                            }}
                            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                              added
                                ? "bg-[#1E3A2B] text-[#F7F4EF]"
                                : "bg-[#ECE6DC] text-[#1C1B18] hover:bg-[#1E3A2B] hover:text-[#F7F4EF]"
                            }`}
                            title={
                              added
                                ? "Added to Inquiry"
                                : "Add to Trade Inquiry"
                            }
                          >
                            {added ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : (
                              <ShoppingBag className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Load More Pagination Button */}
          {hasMore && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#1E3A2B] hover:bg-[#14281E] text-[#F7F4EF] font-mono text-xs uppercase tracking-widest rounded-full transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>LOAD MORE PRODUCTS</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <p className="text-[11px] font-mono text-[#1C1B18]/50 mt-2">
                Showing {visibleProducts.length} of {filteredProducts.length}{" "}
                items
              </p>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          QUICK VIEW MODAL (FRAMER MOTION)
          ========================================================================= */}
      <AnimatePresence>
        {activeModalProduct && (
          <motion.div
            key="quick-view-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1B18]/70 backdrop-blur-xs"
            onClick={() => setActiveModalProduct(null)}
          >
            <motion.div
              key="quick-view-card"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F7F4EF] text-[#1C1B18] max-w-xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 border border-[#1C1B18]/15 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#ECE6DC] text-[#1C1B18]/70 hover:text-[#1C1B18] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="aspect-square w-full bg-[#ECE6DC]/60 rounded-xl overflow-hidden">
                  <img
                    src={activeModalProduct.image}
                    alt={activeModalProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#8A7258] block mb-1">
                      {activeModalProduct.sku} · {activeModalProduct.category}
                    </span>
                    <h3 className="font-editorial text-2xl text-[#1C1B18] leading-snug">
                      {activeModalProduct.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#1C1B18]/70 font-sans leading-relaxed">
                    Sustainably handcrafted by master weavers in Sanden, Bantul,
                    Yogyakarta using renewable Indonesian natural fibers.
                  </p>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        handleInquiryClick(activeModalProduct);
                        setActiveModalProduct(null);
                      }}
                      className="w-full py-2.5 bg-[#1E3A2B] hover:bg-[#14281E] text-[#F7F4EF] font-mono text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>
                        {isInInquiry(activeModalProduct.id)
                          ? "Added to Inquiry"
                          : "Add to Trade Inquiry"}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveModalProduct(null);
                        onRequestCatalog();
                      }}
                      className="w-full py-2.5 border border-[#1C1B18]/25 hover:border-[#1E3A2B] text-[#1C1B18] font-mono text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                    >
                      Request Specs
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopPage;
