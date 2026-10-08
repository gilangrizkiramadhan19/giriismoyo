/**
 * galleryImages.ts — Single source of truth for all photo slots in GalleryPage.
 * All images come from src/assets/SHOP via Vite's import.meta.glob.
 * ratio: "4/5" (portrait) | "3/2" (landscape) | "1/1" (square)
 * focal: CSS object-position value
 */

const shopGlob = import.meta.glob<string>(
  '../assets/SHOP/*.png',
  { eager: true, query: '?url', import: 'default' }
);

function exact(name: string): string {
  const key = `../assets/SHOP/${name}`;
  const val = shopGlob[key];
  if (!val) {
    // eslint-disable-next-line no-console
    console.warn(`[galleryImages] Not found: "${key}"`);
    return '';
  }
  return val as string;
}

// ─── HERO (Fig. 01) ──────────────────────────────────────────────────────
export const heroImage = {
  src: exact('WALLDECOR PRODUCT BANANA KNITH.png'),
  alt: 'Braiding raw banana bark ribbon — artisan handweaving at Sanden workshop',
  ratio: '3/2' as const,
  focal: 'center',
};

// ─── GALLERY PHOTO TYPE ──────────────────────────────────────────────────
export interface GalleryPhoto {
  id: string;
  category: 'interior' | 'workshop' | 'products' | 'fibers';
  categoryLabel: string;
  material: string;
  title: string;
  description: string;
  src: string;
  ratio: '4/5' | '3/2' | '1/1';
  focal: string;
  dimensions?: string;
  location?: string;
  featuredStory?: boolean;
}

// ─── CURATED ARCHIVE (8 editorial photos) ────────────────────────────────
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-01',
    category: 'interior',
    categoryLabel: 'INTERIOR STYLING',
    material: 'Mendong Grass & Glass',
    title: 'Nordic Minimalist Living Room with Mendong Mirror',
    description:
      'Halo sunburst mendong woven mirror centerpiece above a solid teak Scandinavian console.',
    src: exact('WOVEN MIRROR (2).png'),
    ratio: '4/5',
    focal: 'center',
    dimensions: '80 cm Total Diameter',
    location: 'Curated Living Concept',
    featuredStory: true,
  },
  {
    id: 'photo-02',
    category: 'workshop',
    categoryLabel: 'ARTISAN WORKSHOP',
    material: 'Natural Banana Bark Braid',
    title: 'Master Artisan Handweaving at Sanden Workshop',
    description:
      'Intricate macramé braiding performed by village artisans in Sanden, Bantul.',
    src: exact('WALLDECOR PRODUCT BANANA KNITH.png'),
    ratio: '3/2',
    focal: 'center',
    dimensions: 'Handcrafted Technique',
    location: 'Sanden Central Workshop',
  },
  {
    id: 'photo-03',
    category: 'interior',
    categoryLabel: 'INTERIOR STYLING',
    material: 'Organic Split Bamboo',
    title: 'Architectural Bamboo Lanterns in Tropical Villa',
    description:
      'Suspended bamboo pendant lamps creating soothing patterned ambient shadow casts.',
    src: exact('LAMPSHADE (2).png'),
    ratio: '1/1',
    focal: 'center',
    dimensions: '40 x 40 x 45 cm',
    location: 'Boutique Villa Suite',
  },
  {
    id: 'photo-04',
    category: 'fibers',
    categoryLabel: 'RAW FIBERS',
    material: 'Water Hyacinth & Seagrass',
    title: 'Raw Fiber Solar Sun-Drying Yard',
    description:
      'Botanical fibers curing under the natural tropical sun with zero chemical fuel emissions.',
    src: exact('WALLDECOR NATURAL FIBER.png'),
    ratio: '3/2',
    focal: 'center',
    dimensions: '100% Sun-Bleached',
    location: 'Sanden Solar Yard',
  },
  {
    id: 'photo-05',
    category: 'products',
    categoryLabel: 'PRODUCT DETAILS',
    material: 'Banana Bark & Mendong',
    title: 'Geometric Banana Star Wall Medallions',
    description:
      'Trio of handcrafted starburst wall plaques styled across an eco-lime textured wall.',
    src: exact('WALLDECOR PRODUCT BANANA STAR 2.png'),
    ratio: '4/5',
    focal: 'center',
    dimensions: '60 cm Diameter',
    location: 'Architectural Wall Art',
  },
  {
    id: 'photo-06',
    category: 'products',
    categoryLabel: 'PRODUCT DETAILS',
    material: 'Water Hyacinth & Cotton',
    title: 'Coiled Storage Baskets Export Stacking',
    description:
      'Nesting sets of three storage bins ready for final export inspection and packaging.',
    src: exact('WOVEN BASKET (2).png'),
    ratio: '1/1',
    focal: 'center',
    dimensions: 'Nesting Set of 3',
    location: 'Pre-Shipment Staging',
  },
  {
    id: 'photo-07',
    category: 'workshop',
    categoryLabel: 'ARTISAN WORKSHOP',
    material: 'Seagrass & Organic Raffia',
    title: 'Artisan Hands Knotting Raffia Fringe',
    description:
      'Detail shot of hand-knotting raw raffia fringes onto curved iron basket skeletons.',
    src: exact('PLACEMATE.png'),
    ratio: '4/5',
    focal: 'center',
    dimensions: 'Craftsmanship Detail',
    location: 'Artisan Handcraft Zone',
  },
  {
    id: 'photo-08',
    category: 'interior',
    categoryLabel: 'INTERIOR STYLING',
    material: 'Mendong Grass Fiber',
    title: 'Bohemian Dining Table Setting with Mendong Placemats',
    description:
      'Heat-resistant woven placemats and coasters paired with artisanal ceramic tableware.',
    src: exact('PLACEMATE (2).png'),
    ratio: '3/2',
    focal: 'center',
    dimensions: '38 cm Diameter Set of 4',
    location: 'Dining & Hospitality',
  },
];

// ─── MATERIAL PURITY banner ───────────────────────────────────────────────
export const materialPurityImage = {
  src: exact('WALLDECOR NATURAL FIBER (5).png'),
  alt: 'Extreme close-up of raw sun-cured natural fiber texture',
};

// ─── THE HANDS BEHIND THE CRAFT ───────────────────────────────────────────
export const craftHands = [
  {
    title: 'Hand Braiding & Coiling',
    desc: 'Intricate finger coordination weaving banana bark ribbons around circular steel armatures.',
    caption: 'ARTISAN · SANDEN, BANTUL · HAND WEAVING',
    src: exact('WALLDECOR PRODUCT BANANA MIX PATTERN.png'),
    ratio: '1/1' as const,
    focal: 'center',
    shape: 'circle' as const,
  },
  {
    title: 'Framework Shaping & Macramé',
    desc: 'Precision knot tension ensuring symmetry and structural export tolerance.',
    caption: 'ARTISAN · SANDEN, BANTUL · FRAMEWORK',
    src: exact('WOVEN MIRROR (3).png'),
    ratio: '4/5' as const,
    focal: 'center',
    shape: 'corner-tl' as const,
  },
  {
    title: 'Pre-Shipment Quality Inspection',
    desc: 'Master weaver auditing surface smoothness, trimming excess fringes, and validating dimensions.',
    caption: 'ARTISAN · SANDEN, BANTUL · FINISHING',
    src: exact('WOVEN BASKET (7).png'),
    ratio: '4/5' as const,
    focal: 'center',
    shape: 'corner-br' as const,
  },
];

// ─── MADE FOR LIVING ──────────────────────────────────────────────────────
export const madeForLiving = [
  {
    title: 'Scandinavian Living Space',
    desc: 'Halo woven mendong mirrors paired with warm oak, neutral lime plaster, and soft linen drapery.',
    src: exact('WOVEN MIRROR (4).png'),
    ratio: '3/2' as const,
    focal: 'center',
  },
  {
    title: 'Tropical Boutique Villa',
    desc: 'Suspended organic bamboo lantern pendants casting mesmerizing shadow geometry over dining areas.',
    src: exact('LAMPSHADE (3).png'),
    ratio: '4/5' as const,
    focal: 'center',
  },
  {
    title: 'Modern Organic Bedroom',
    desc: 'Textured water hyacinth storage bins and coiled floor rugs grounding tranquil minimalist sanctuaries.',
    src: exact('WOVEN BASKET (3).png'),
    ratio: '4/5' as const,
    focal: 'center',
  },
];

// ─── TEXT-ONLY DATA ───────────────────────────────────────────────────────
export const FIBER_LIBRARY = [
  {
    name: 'BANANA BARK',
    local: 'Pelepah Pisang',
    desc: 'Upcycled agrarian stem fibers rich in brown mottling and tensile strength.',
  },
  {
    name: 'MENDONG',
    local: 'Mendong Grass',
    desc: 'Fine riverbed grass harvested naturally along Central Javanese waterways.',
  },
  {
    name: 'WATER HYACINTH',
    local: 'Eceng Gondok',
    desc: 'Thick acoustic sponge coils clearing invasive river growth.',
  },
  {
    name: 'SEAGRASS',
    local: 'Natural Seagrass',
    desc: 'Renewable coastal marine grass naturally water-resistant and pliable.',
  },
  {
    name: 'BAMBOO',
    local: 'Organic Bamboo',
    desc: 'Rapidly self-regenerating split canes providing lightweight structural skeletal strength.',
  },
  {
    name: 'RATTAN',
    local: 'Traditional Rattan',
    desc: 'Rigid curved stems for internal frame reinforcement and perimeter hoops.',
  },
];

export const CRAFT_STEPS = [
  { num: '01', title: 'HARVEST',      desc: 'Harvesting raw banana stems & mendong in Bantul riverbeds.' },
  { num: '02', title: 'SOLAR DRYING', desc: '5–7 days open-air sunlight curing with zero fuel ovens.' },
  { num: '03', title: 'FRAMEWORK',    desc: 'Recycled steel wire skeleton welded for structural rigidity.' },
  { num: '04', title: 'WEAVING',      desc: 'Handcrafted macramé & coiled knots taking up to 24 hours.' },
  { num: '05', title: 'FINISHING',    desc: 'Non-toxic anti-fungal organic coat & surface trimming.' },
  { num: '06', title: 'EXPORT',       desc: '5-ply corrugated carton packing & container loading bay.' },
];

