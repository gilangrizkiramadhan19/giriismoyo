import mirrorDetailSrc from "../assets/SHOP/WOVEN MIRROR (6).png";
import artisanLampshadeSrc from "../assets/SHOP/LAMPSHADE (5).png";
import artisanSpraySrc from "../assets/SHOP/WALLDECOR PRODUCT BANANA SUN BLACK.png";
import artisanBenchSrc from "../assets/SHOP/WALLDECOR PRODUCT BANANA KNITH.png";
import packingSrc from "../assets/SHOP/WOVEN BASKET (6).png";

export interface HomeImage {
  src: string;
  alt: string;
}

export const HOME_IMAGES = {
  booth: {
    src: "/toko.jpg",
    alt: "Giri Ismoyo showroom booth with handwoven natural fiber décor",
  },
  mirrorDetail: {
    src: mirrorDetailSrc,
    alt: "Detail of artisan handwoven mirror edge",
  },
  artisanLampshade: {
    src: artisanLampshadeSrc,
    alt: "Handwoven natural fiber lampshade by local artisans",
  },
  artisanSpray: {
    src: artisanSpraySrc,
    alt: "Artisan applying finishing treatment to handwoven craft piece",
  },
  dryArea: {
    src: "/editorial/macro-fiber.jpg",
    alt: "Sun-dried natural fibers prepared for weaving",
  },
  packing: {
    src: packingSrc,
    alt: "Handwoven basket set inspected and prepared for packaging",
  },
  artisanBench: {
    src: artisanBenchSrc,
    alt: "Artisans hand-braiding banana bark ribbon at workshop bench",
  },
  loadingContainer: {
    src: "/editorial/architectural-space.jpg",
    alt: "Giri Ismoyo production and export showroom space",
  },
  workWithUs: {
    src: "/editorial/artisan-hands.jpg",
    alt: "Artisan hands weaving natural fibers in Sanden workshop",
  },
} as const;
