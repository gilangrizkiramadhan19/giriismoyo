const fs = require('fs');
const path = require('path');

// 1. Gather all files in folders
const editorialFiles = fs.readdirSync('public/editorial').map(f => 'public/editorial/' + f);
const productFolderFiles = fs.existsSync('public/products') ? fs.readdirSync('public/products').map(f => 'public/products/' + f) : [];
const shopFiles = fs.readdirSync('src/assets/SHOP').map(f => 'src/assets/SHOP/' + f);
const publicRootFiles = fs.readdirSync('public').filter(f => !fs.statSync('public/' + f).isDirectory()).map(f => 'public/' + f);

console.log('Editorial count:', editorialFiles.length);
console.log('Public/products count:', productFolderFiles.length);
console.log('SHOP count:', shopFiles.length);
console.log('Public root count:', publicRootFiles.length);

// Read codebase files
const homeCode = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');
const galleryCode = fs.readFileSync('src/pages/GalleryPage.tsx', 'utf8');
const shopCode = fs.readFileSync('src/pages/ShopPage.tsx', 'utf8');
const aboutCode = fs.readFileSync('src/pages/AboutPage.tsx', 'utf8');
const exhibitionsCode = fs.readFileSync('src/pages/ExhibitionsPage.tsx', 'utf8');
const blogCode = fs.readFileSync('src/pages/BlogPage.tsx', 'utf8');
const contactCode = fs.readFileSync('src/pages/ContactPage.tsx', 'utf8');
const productsCode = fs.readFileSync('src/data/products.ts', 'utf8');
const galleryImagesCode = fs.readFileSync('src/data/galleryImages.ts', 'utf8');
const matCode = fs.readFileSync('src/components/MaterialSection.tsx', 'utf8');
const artisanCode = fs.readFileSync('src/components/ArtisanCraft.tsx', 'utf8');
const logoCode = fs.readFileSync('src/components/Logo.tsx', 'utf8');

// Check products.ts image references
const prodRegex = /image:\s*['"]([^'"]+)['"]/g;
let match;
const productsImages = {};
while ((match = prodRegex.exec(productsCode)) !== null) {
  const img = match[1];
  productsImages[img] = (productsImages[img] || 0) + 1;
}
console.log('\n--- products.ts images ---');
console.log(productsImages);

// Check AboutPage.tsx direct references
const srcRegex = /src=['"]([^'"]+)['"]/g;
const aboutDirectImages = {};
while ((match = srcRegex.exec(aboutCode)) !== null) {
  const img = match[1];
  aboutDirectImages[img] = (aboutDirectImages[img] || 0) + 1;
}
console.log('\n--- AboutPage direct images ---');
console.log(aboutDirectImages);

// Check MaterialSection & ArtisanCraft
const matDirectImages = {};
while ((match = srcRegex.exec(matCode)) !== null) {
  matDirectImages[match[1]] = (matDirectImages[match[1]] || 0) + 1;
}
const matArrRegex = /['"](\/(?:products|editorial)\/[^'"]+)['"]/g;
while ((match = matArrRegex.exec(matCode)) !== null) {
  matDirectImages[match[1]] = (matDirectImages[match[1]] || 0) + 1;
}
console.log('\n--- MaterialSection images ---');
console.log(matDirectImages);

const artDirectImages = {};
while ((match = srcRegex.exec(artisanCode)) !== null) {
  artDirectImages[match[1]] = (artDirectImages[match[1]] || 0) + 1;
}
console.log('\n--- ArtisanCraft images ---');
console.log(artDirectImages);

// Check HomePage shopImg calls & direct images
console.log('\n--- HomePage shopImg calls ---');
const shopImgRegex = /shopImg\(([^)]+)\)/g;
const homeShopImgs = [];
while ((match = shopImgRegex.exec(homeCode)) !== null) {
  homeShopImgs.push(match[1]);
}
console.log(homeShopImgs);

// Check GalleryPage SHOP_IMAGES indices used
console.log('\n--- GalleryPage imgIdx / img() calls ---');
const imgIdxRegex = /imgIdx:\s*(\d+)/g;
const galleryImgIdxs = [];
while ((match = imgIdxRegex.exec(galleryCode)) !== null) {
  galleryImgIdxs.push(parseInt(match[1], 10));
}
console.log('imgIdx values:', galleryImgIdxs);

const imgCallRegex = /img\((\d+)\)/g;
const galleryImgCalls = [];
while ((match = imgCallRegex.exec(galleryCode)) !== null) {
  galleryImgCalls.push(parseInt(match[1], 10));
}
console.log('img() calls:', galleryImgCalls);

// Check ShopPage getAsset calls
console.log('\n--- ShopPage getAsset calls ---');
const getAssetRegex = /getAsset\(['"]([^'"]+)['"]\)/g;
const shopGetAssets = [];
while ((match = getAssetRegex.exec(shopCode)) !== null) {
  shopGetAssets.push(match[1]);
}
console.log(shopGetAssets);
