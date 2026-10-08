import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Local Shop Assets Discovery ────────────────────────────────────────────
const shopImages = import.meta.glob(
  '../assets/SHOP/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
);

// Helper to reliably find an asset URL by filename substring
const getAsset = (pattern) => {
  const match = Object.entries(shopImages).find(([path]) =>
    path.toLowerCase().includes(pattern.toLowerCase())
  );
  return match ? match[1] : '';
};

// ─── Featured Products Collection ───────────────────────────────────────────
const featuredProducts = [
  {
    id: 1,
    number: '01',
    category: 'WOVEN MIRROR',
    name: 'Handwoven Seagrass Mirror',
    description:
      'A sculptural mirror handcrafted from natural seagrass, bringing organic texture and quiet warmth into contemporary interiors.',
    material: 'Premium Seagrass',
    crafting: 'Hand-braided',
    dimensions: 'Ø 75 cm',
    image: getAsset('woven mirror.png') || getAsset('woven mirror'),
    bgColor: '#FAF8F5',
    accentColor: '#1C2C22',
    mutedColor: '#6F756F',
    borderCol: 'rgba(28, 44, 34, 0.12)',
    shadowStyle: 'drop-shadow(0 25px 35px rgba(0, 0, 0, 0.10))',
    materialSwatches: ['#C8B89B', '#A48C68', '#E5DED2'],
  },
  {
    id: 2,
    number: '02',
    category: 'WOVEN BASKET',
    name: 'Sculptural Banana Bark Basket',
    description:
      'A handwoven vessel shaped from renewable natural fibers, balancing everyday storage utility with organic artisanal character.',
    material: 'Banana Bark & Raffia',
    crafting: 'Hand-woven',
    dimensions: '45 × 45 × 40 cm',
    image: getAsset('woven basket.png') || getAsset('woven basket (2)'),
    bgColor: '#1B241E',
    accentColor: '#FAF8F5',
    mutedColor: '#B7C0B8',
    borderCol: 'rgba(250, 248, 245, 0.14)',
    shadowStyle: 'drop-shadow(0 25px 35px rgba(0, 0, 0, 0.45))',
    materialSwatches: ['#8C7658', '#B59A72', '#D4C3A5'],
  },
  {
    id: 3,
    number: '03',
    category: 'WALL DECOR',
    name: 'Artisan Radial Wall Medallion',
    description:
      'Concentric starburst wall art hand-braided from sun-cured agricultural fibers and cotton yarn to enrich architectural living spaces.',
    material: 'Mendong & Banana Bark',
    crafting: 'Hand-braided',
    dimensions: 'Ø 60 cm',
    image:
      getAsset('banana star 2') ||
      getAsset('walldecor product banana star 2') ||
      getAsset('walldecor natural fiber'),
    bgColor: '#EFECE6',
    accentColor: '#2B2520',
    mutedColor: '#756D65',
    borderCol: 'rgba(43, 37, 32, 0.12)',
    shadowStyle: 'drop-shadow(0 25px 35px rgba(0, 0, 0, 0.12))',
    materialSwatches: ['#B9A88E', '#D6C9B6', '#8D7B65'],
  },
  {
    id: 4,
    number: '04',
    category: 'PLACEMATE',
    name: 'Organic Coiled Dining Placemat',
    description:
      'A tactile dining piece woven with tight concentric coils from dried water hyacinth, introducing quiet refinement to banquet surfaces.',
    material: 'Water Hyacinth',
    crafting: 'Coil-stitched',
    dimensions: '38 × 38 cm',
    image: getAsset('placemate.png') || getAsset('placemate (3)'),
    bgColor: '#F5EDE3',
    accentColor: '#30231B',
    mutedColor: '#7D6E64',
    borderCol: 'rgba(48, 35, 27, 0.12)',
    shadowStyle: 'drop-shadow(0 25px 35px rgba(0, 0, 0, 0.10))',
    materialSwatches: ['#D2B48C', '#AA8865', '#EDE2D2'],
  },
  {
    id: 5,
    number: '05',
    category: 'WOVEN BASKET',
    name: 'Layered Raffia Storage Vessel',
    description:
      'An expansive cylindrical hamper crafted from coastal sea grass and finished with cascading hand-knotted natural fringe trim.',
    material: 'Seagrass & Raffia Fringe',
    crafting: 'Loom-braided',
    dimensions: '50 × 50 × 45 cm',
    image: getAsset('woven basket (10)') || getAsset('woven basket (16)'),
    bgColor: '#232523',
    accentColor: '#F3EFE8',
    mutedColor: '#9FA6A0',
    borderCol: 'rgba(243, 239, 232, 0.14)',
    shadowStyle: 'drop-shadow(0 25px 35px rgba(0, 0, 0, 0.50))',
    materialSwatches: ['#C7B299', '#8E7961', '#DCD1C0'],
  },
];

export const FeaturedShowcase = ({ onAddToInquiry }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(null);

  const currentProduct = featuredProducts[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length
    );
  };

  // Subtle Autoplay (7 seconds), pauses on hover
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(timer);
  }, [currentIndex, isHovered]);

  // Touch Swipe for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 45) {
      handlePrevious();
    } else if (deltaX < -45) {
      handleNext();
    }
    touchStartX.current = null;
  };

  return (
    <motion.section
      id="featured-showcase"
      className="relative w-full overflow-hidden transition-colors duration-700 min-h-[720px] lg:min-h-[760px] flex flex-col justify-between py-12 md:py-16 px-6 sm:px-10 lg:px-16"
      animate={{ backgroundColor: currentProduct.bgColor }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Featured handcrafted natural fiber products"
    >
      {/* ─── Top Category / Edition Bar ──────────────────────────────────── */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between border-b pb-4 transition-colors duration-500"
        style={{ borderColor: currentProduct.borderCol }}
      >
        <div className="flex items-center gap-2">
          <span
            className="text-[11px] font-mono tracking-[0.28em] uppercase font-semibold transition-colors duration-500"
            style={{ color: currentProduct.accentColor }}
          >
            {currentProduct.number} / FEATURED COLLECTION
          </span>
        </div>

        <div
          className="text-[11px] font-mono tracking-[0.25em] uppercase hidden sm:block transition-colors duration-500"
          style={{ color: currentProduct.mutedColor }}
        >
          GIRI ISMOYO · KONTINUM ALAM
        </div>
      </div>

      {/* ─── Main 3-Column Editorial Composition ─────────────────────────── */}
      <div className="max-w-7xl w-full mx-auto my-auto py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* ─── LEFT: Product Narrative & CTA (4 cols) ────────────────────── */}
        <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              {/* Category pill */}
              <div
                className="text-[11px] font-mono uppercase tracking-[0.22em] font-medium transition-colors duration-500"
                style={{ color: currentProduct.mutedColor }}
              >
                {currentProduct.category}
              </div>

              {/* Editorial Title */}
              <h2
                className="font-editorial text-4xl sm:text-5xl lg:text-[3.25rem] font-light leading-[1.08] tracking-tight transition-colors duration-500"
                style={{
                  color: currentProduct.accentColor,
                  fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
                }}
              >
                {currentProduct.name}
              </h2>

              {/* Concise 2-3 line description */}
              <p
                className="font-sans text-xs sm:text-sm font-light leading-relaxed max-w-sm transition-colors duration-500"
                style={{ color: currentProduct.mutedColor }}
              >
                {currentProduct.description}
              </p>

              {/* Dynamic CTAs */}
              <div className="pt-2 flex items-center gap-3">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 shadow-sm cursor-pointer"
                  style={{
                    backgroundColor: currentProduct.accentColor,
                    color: currentProduct.bgColor,
                  }}
                >
                  <motion.span
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </motion.span>
                </Link>

                {onAddToInquiry && (
                  <button
                    type="button"
                    onClick={() => onAddToInquiry(currentProduct)}
                    className="px-5 py-3 rounded-full text-xs font-mono uppercase tracking-widest border transition-colors duration-300 cursor-pointer"
                    style={{
                      borderColor: currentProduct.borderCol,
                      color: currentProduct.accentColor,
                    }}
                  >
                    Inquire
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── CENTER: Dominant Hero Image (5 cols) ──────────────────────── */}
        <div className="lg:col-span-5 order-1 lg:order-2 relative flex items-center justify-center min-h-[300px] sm:min-h-[380px] lg:min-h-[460px]">
          {/* Circular Backdrop Aura */}
          <div
            className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-3xl pointer-events-none opacity-25 transition-colors duration-700"
            style={{ backgroundColor: currentProduct.accentColor }}
          />

          {/* Central Image with AnimatePresence */}
          <div className="relative z-10 w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] aspect-square flex items-center justify-center p-4">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentProduct.id}
                src={currentProduct.image}
                alt={currentProduct.name}
                initial={{ opacity: 0, scale: 0.88, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.04, x: -40 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full object-contain select-none"
                style={{ filter: currentProduct.shadowStyle }}
                loading="eager"
              />
            </AnimatePresence>
          </div>

          {/* Floating Carousel Navigation Arrows */}
          <div className="absolute inset-y-0 -left-2 sm:left-0 flex items-center z-20">
            <motion.button
              type="button"
              onClick={handlePrevious}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="p-3 rounded-full border backdrop-blur-xs transition-colors cursor-pointer"
              style={{
                borderColor: currentProduct.borderCol,
                color: currentProduct.accentColor,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              }}
              aria-label="Previous featured product"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>

          <div className="absolute inset-y-0 -right-2 sm:right-0 flex items-center z-20">
            <motion.button
              type="button"
              onClick={handleNext}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="p-3 rounded-full border backdrop-blur-xs transition-colors cursor-pointer"
              style={{
                borderColor: currentProduct.borderCol,
                color: currentProduct.accentColor,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              }}
              aria-label="Next featured product"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        </div>

        {/* ─── RIGHT: Material & Crafting Specifications (3 cols) ─────────── */}
        <div className="lg:col-span-3 order-3 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="space-y-6 lg:pl-6 border-t lg:border-t-0 lg:border-l pt-6 lg:pt-0 transition-colors duration-500"
              style={{ borderColor: currentProduct.borderCol }}
            >
              {/* Material */}
              <div>
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.2em] block mb-1 transition-colors duration-500"
                  style={{ color: currentProduct.mutedColor }}
                >
                  MATERIAL
                </span>
                <span
                  className="text-sm font-sans font-medium transition-colors duration-500"
                  style={{ color: currentProduct.accentColor }}
                >
                  {currentProduct.material}
                </span>
              </div>

              {/* Crafting */}
              <div>
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.2em] block mb-1 transition-colors duration-500"
                  style={{ color: currentProduct.mutedColor }}
                >
                  CRAFTING
                </span>
                <span
                  className="text-sm font-sans font-medium transition-colors duration-500"
                  style={{ color: currentProduct.accentColor }}
                >
                  {currentProduct.crafting}
                </span>
              </div>

              {/* Dimensions */}
              <div>
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.2em] block mb-1 transition-colors duration-500"
                  style={{ color: currentProduct.mutedColor }}
                >
                  DIMENSIONS
                </span>
                <span
                  className="text-sm font-sans font-medium transition-colors duration-500"
                  style={{ color: currentProduct.accentColor }}
                >
                  {currentProduct.dimensions}
                </span>
              </div>

              {/* Material / Variant Swatches */}
              <div className="pt-2">
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.2em] block mb-2 transition-colors duration-500"
                  style={{ color: currentProduct.mutedColor }}
                >
                  MATERIAL TONES
                </span>
                <div className="flex items-center gap-2.5">
                  {currentProduct.materialSwatches.map((swatch, idx) => (
                    <span
                      key={idx}
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full shadow-xs transition-transform hover:scale-110"
                      style={{
                        backgroundColor: swatch,
                        border: `1.5px solid ${currentProduct.accentColor}`,
                      }}
                      title={`Tone reference ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* ─── Bottom Line Pagination & Index Bar ──────────────────────────── */}
      <div
        className="max-w-7xl w-full mx-auto pt-6 border-t flex items-center justify-between transition-colors duration-500 text-xs font-mono"
        style={{ borderColor: currentProduct.borderCol }}
      >
        <span
          className="tracking-widest font-semibold transition-colors duration-500"
          style={{ color: currentProduct.accentColor }}
        >
          {currentProduct.number}
        </span>

        {/* Animated Progress Line */}
        <div className="flex-1 max-w-xs sm:max-w-md mx-6 h-[2px] bg-black/10 relative overflow-hidden rounded-full">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: currentProduct.accentColor }}
            initial={false}
            animate={{
              width: `${((currentIndex + 1) / featuredProducts.length) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>

        <span
          className="tracking-widest transition-colors duration-500"
          style={{ color: currentProduct.mutedColor }}
        >
          0{featuredProducts.length}
        </span>
      </div>
    </motion.section>
  );
};

export default FeaturedShowcase;
