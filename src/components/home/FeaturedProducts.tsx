import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { PRODUCTS } from "../../data/products";

// Real image imports from src/assets/SHOP
import mirror6 from "../../assets/SHOP/WOVEN MIRROR (6).png";
import mirror5 from "../../assets/SHOP/WOVEN MIRROR (5).png";
import basket10 from "../../assets/SHOP/WOVEN BASKET (10).png";
import basket11 from "../../assets/SHOP/WOVEN BASKET (11).png";
import basket12 from "../../assets/SHOP/WOVEN BASKET (12).png";
import miniBasket14 from "../../assets/SHOP/WOVEN BASKET (14).png";
import walldecorStar from "../../assets/SHOP/WALLDECOR PRODUCT BANANA STAR 2.png";
import walldecorFiber from "../../assets/SHOP/WALLDECOR NATURAL FIBER (2).png";
import lampshade5 from "../../assets/SHOP/LAMPSHADE (5).png";
import lampshade10 from "../../assets/SHOP/LAMPSHADE (10).png";
import placemat5 from "../../assets/SHOP/PLACEMATE (5).png";
import placemat13 from "../../assets/SHOP/PLACEMATE (13).png";

// 13 tiles: tile 0 = 2×2 hero (4 cells) + 12 singles = 16 cells = 4 full rows of 4 — no gaps
const MOSAIC_ITEMS = [
  { id: "gi-wm-034", img: mirror6 },
  { id: "gi-bl-001", img: basket10 },
  { id: "gi-wd-001", img: walldecorStar },
  { id: "gi-ls-001", img: lampshade5 },
  { id: "gi-pm-001", img: placemat5 },
  { id: "gi-fs-005", img: "/editorial/sculptural-object.jpg" },
  { id: "gi-mb-001", img: miniBasket14 },
  { id: "gi-wm-001", img: mirror5 },
  { id: "gi-bl-002", img: basket11 },
  { id: "gi-wd-002", img: walldecorFiber },
  { id: "gi-lmp-044", img: lampshade10 },
  { id: "gi-pm-037", img: placemat13 },
  { id: "gi-bl-003", img: basket12 },
].map((item) => {
  const prod = PRODUCTS.find((p) => p.id === item.id);
  return {
    id: item.id,
    name: prod ? prod.name : "Handwoven Craft",
    img: item.img,
  };
});

export const FeaturedProducts: React.FC = () => {
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
    <section className="bg-[#f3e6d8] text-[#2b1d14] py-12 md:py-16" aria-label="Featured Products">
      <div className="max-w-[1120px] mx-auto px-6 md:px-10 space-y-8">
        <motion.div {...anim} className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-sans font-semibold uppercase tracking-[0.15em] text-[#b8935f] mb-3">Our collection</p>
            <h2
              className="font-sans font-bold text-3xl md:text-5xl uppercase tracking-wider text-[#2b1d14]"
            >
              Featured products
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-sm font-medium text-[#2b1d14] underline decoration-[#b8935f] underline-offset-4 hover:text-[#6b5a47] transition-colors"
          >
            View all products
          </Link>
        </motion.div>

        {/* 12-item mosaic: tile 0 spans 2 cols × 2 rows, all others are 1×1. auto-rows gives every cell a fixed height so no gaps appear. */}
        <motion.div
          {...anim}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px] md:auto-rows-[220px]"
        >
          {MOSAIC_ITEMS.map((item, idx) => (
            <Link
              key={item.id}
              to="/shop"
              aria-label={item.name}
              className={`block overflow-hidden bg-[#b8935f]/20${
                idx === 0 ? " col-span-2 row-span-2 rounded-tl-[64px]" :
                idx === MOSAIC_ITEMS.length - 1 ? " rounded-br-[64px]" : ""
              }`}
            >
              <img
                src={item.img}
                alt={item.name}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500 motion-reduce:transition-none"
              />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
