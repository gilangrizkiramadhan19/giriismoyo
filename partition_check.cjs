const fs = require('fs');

const allShopFiles = fs.readdirSync('src/assets/SHOP').sort();
const allEditorialFiles = fs.readdirSync('public/editorial').sort();

// HOME ALLOCATION (24 images)
const HOME_IMAGES = {
  hero: 'homedecor.jpeg',
  process: 'WALLDECOR PRODUCT BANANA KNITH.png',
  materials: [
    'WOVEN BASKET (5).png',          // Banana Bark
    'WOVEN MIRROR (3).png',          // Mendong Grass
    'PLACEMATE (4).png',             // Water Hyacinth
    'WOVEN BASKET (7).png',          // Seagrass
    'WALLDECOR NATURAL FIBER (2).png' // Raffia & Cotton
  ],
  interior: 'LAMPSHADE (5).png',
  featuredProducts: [
    'WOVEN BASKET (10).png',
    'WOVEN BASKET (11).png',
    'WOVEN BASKET (12).png',
    'WOVEN BASKET (13).png',
    'WOVEN BASKET (14).png',
    'WOVEN BASKET (15).png',
    'WALLDECOR PRODUCT BANANA STAR 2.png',
    'WALLDECOR PRODUCT BANANA MIX PATTERN.png',
    'WALLDECOR PRODUCT BANANA STAR 3.png',
    'WOVEN MIRROR (5).png',
    'WOVEN MIRROR (6).png',
    'WOVEN MIRROR (7).png'
  ],
  weavingStages: [
    'WOVEN BASKET (2).png',
    'PLACEMATE (2).png',
    'WOVEN MIRROR (2).png',
    'WALLDECOR NATURAL FIBER (3).png'
  ]
};

const homeFlat = [
  HOME_IMAGES.hero,
  HOME_IMAGES.process,
  ...HOME_IMAGES.materials,
  HOME_IMAGES.interior,
  ...HOME_IMAGES.featuredProducts,
  ...HOME_IMAGES.weavingStages
];

// ABOUT ALLOCATION (10 images: 4 editorial + 1 toko + 5 shop)
const ABOUT_IMAGES = {
  hero: 'public/editorial/architectural-space.jpg',
  values: 'public/editorial/artisan-hands.jpg',
  toko: 'public/toko.jpg',
  badgeMacro: 'public/editorial/macro-fiber.jpg',
  badgeSculptural: 'public/editorial/sculptural-object.jpg',
  badgeCraft: 'LAMPSHADE (2).png',
  materialSection: [
    'WOVEN BASKET (17).png',
    'WOVEN MIRROR (8).png',
    'PLACEMATE (5).png',
    'WOVEN BASKET (18).png',
    'WALLDECOR NATURAL FIBER (4).png'
  ],
  artisanCraft: 'WALLDECOR PRODUCT BANANA SUN BLACK.png'
};

const aboutFlat = [
  ...ABOUT_IMAGES.materialSection,
  ABOUT_IMAGES.badgeCraft,
  ABOUT_IMAGES.artisanCraft
];

// GALLERY ALLOCATION (30 images)
const GALLERY_IMAGES = {
  hero: 'LAMPSHADE (3).png',
  warehouse: [
    'LAMPSHADE (4).png',
    'PLACEMATE (6).png',
    'PLACEMATE (7).png',
    'PLACEMATE (8).png',
    'WALLDECOR NATURAL FIBER (5).png'
  ],
  categories: [
    'WOVEN MIRROR (4).png',
    'WOVEN BASKET (3).png',
    'LAMPSHADE (6).png',
    'PLACEMATE (3).png',
    'WALLDECOR PRODUCT BANANA STAR MOTIF Material _ Banana Bark, Yarn Availabel Color _ Natural Black.png',
    'WALLDECOR NATURAL FIBER (6).png'
  ],
  steps: [
    'WOVEN BASKET (4).png',
    'WALLDECOR PRODUCT BANANA SYNTHETIC.png',
    'WOVEN MIRROR (9).png',
    'LAMPSHADE (7).png',
    'PLACEMATE (9).png',
    'WOVEN BASKET (6).png'
  ],
  archive: [
    'LAMPSHADE (8).png',
    'LAMPSHADE (9).png',
    'LAMPSHADE (10).png',
    'PLACEMATE (10).png',
    'PLACEMATE (11).png',
    'PLACEMATE (12).png',
    'WALLDECOR NATURAL FIBER (7).png',
    'WALLDECOR NATURAL FIBER (8).png',
    'WALLDECOR PRODUCTBANANA LURIK.png',
    'WOVEN BASKET (8).png',
    'WOVEN BASKET (9).png',
    'WOVEN MIRROR (10).png'
  ]
};

const galleryFlat = [
  GALLERY_IMAGES.hero,
  ...GALLERY_IMAGES.warehouse,
  ...GALLERY_IMAGES.categories,
  ...GALLERY_IMAGES.steps,
  ...GALLERY_IMAGES.archive
];

// SHOP ALLOCATION (remaining 47 files)
const usedShopFiles = new Set([...homeFlat, ...aboutFlat, ...galleryFlat]);
const shopFlat = allShopFiles.filter(f => !usedShopFiles.has(f));

// HERO FEATURED PRODUCTS IN SHOP:
const shopHero = [
  'WOVEN MIRROR (11).png',          // Mirror
  'WOVEN BASKET (19).png',          // Basket
  'WALLDECOR NATURAL FIBER (9).png',// Walldecor
  'PLACEMATE (13).png'             // Placemat
];

console.log('--- VERIFICATION COUNTS ---');
console.log('Home images:', homeFlat.length, 'Unique:', new Set(homeFlat).size);
console.log('About shop images:', aboutFlat.length, 'Unique:', new Set(aboutFlat).size);
console.log('Gallery images:', galleryFlat.length, 'Unique:', new Set(galleryFlat).size);
console.log('Shop images:', shopFlat.length, 'Unique:', new Set(shopFlat).size);

const totalAssignedShop = homeFlat.length + aboutFlat.length + galleryFlat.length + shopFlat.length;
console.log('Total SHOP files assigned:', totalAssignedShop, 'Expected:', allShopFiles.length);

// Check overlaps:
const homeSet = new Set(homeFlat);
const aboutSet = new Set(aboutFlat);
const gallerySet = new Set(galleryFlat);
const shopSet = new Set(shopFlat);

function intersect(a, b) {
  return [...a].filter(x => b.has(x));
}

console.log('Home & About overlap:', intersect(homeSet, aboutSet));
console.log('Home & Gallery overlap:', intersect(homeSet, gallerySet));
console.log('Home & Shop overlap:', intersect(homeSet, shopSet));
console.log('About & Gallery overlap:', intersect(aboutSet, gallerySet));
console.log('About & Shop overlap:', intersect(aboutSet, shopSet));
console.log('Gallery & Shop overlap:', intersect(gallerySet, shopSet));

// Check existence on disk:
let missingDisk = [];
allShopFiles.forEach(f => {
  if (!fs.existsSync('src/assets/SHOP/' + f)) missingDisk.push(f);
});
console.log('Missing on disk from SHOP:', missingDisk);
