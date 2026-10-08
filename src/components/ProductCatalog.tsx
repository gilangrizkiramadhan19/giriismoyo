import React, { useState, useMemo } from 'react';
import type { Product } from '../data/products';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCanvasImage } from './ProductCanvasImage';
import { Eye, Plus, Check, Filter, ArrowUpDown, Tag, Layers, Maximize2, X, MessageSquare, Info } from 'lucide-react';

interface ProductCatalogProps {
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  onAddToInquiry: (product: Product) => void;
  inquiryItems: Product[];
  searchQuery: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  selectedCategory,
  onSelectCategory,
  onAddToInquiry,
  inquiryItems,
  searchQuery
}) => {
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'sku'>('featured');

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.material.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.sku.localeCompare(b.sku);
      if (sortBy === 'price-high') return b.sku.localeCompare(a.sku);
      if (sortBy === 'sku') return a.sku.localeCompare(b.sku);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const isInInquiry = (productId: string) => {
    return inquiryItems.some((item) => item.id === productId);
  };

  return (
    <section id="catalog-section" className="py-24 bg-[#132c19] text-[#f9f7f2] relative">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#d4af37] font-semibold">
            Handcrafted Collections
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fff] via-[#f7e7a9] to-[#d4af37] mt-2 mb-4">
            Artisan Fiber Showcase
          </h2>
          <p className="text-sm text-[#d9c3b3] font-sans leading-relaxed">
            Explore our sustainably sourced home decor created from banana bark, mendong grass, seagrass, and bamboo. Each item is hand-braided and built over reinforced frames.
          </p>
        </div>

        {/* Filter Tabs & Sort Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#d4af37]/20">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`px-4 py-2 rounded-full text-xs font-sans whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#b89343] text-[#0a170d] font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                    : 'bg-[#1d4226] text-[#e0cdbf] hover:bg-[#132c19] hover:text-[#d4af37] border border-[#d4af37]/15'
                }`}
              >
                <span>{category.label}</span>
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <span className="text-xs text-[#d9c3b3] flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Sort by:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#1d4226] border border-[#d4af37]/30 text-xs text-[#f9f7f2] rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
            >
              <option value="featured">Featured / Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="sku">SKU Code</option>
            </select>
          </div>
        </div>

        {/* Active Search / Filter Status */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between bg-[#1d4226] border border-[#d4af37]/30 px-4 py-2.5 rounded-xl text-xs text-[#e6c670]">
            <span>Showing results for search: "<strong>{searchQuery}</strong>" ({filteredProducts.length} items)</span>
            <button onClick={() => onSelectCategory('all')} className="underline hover:text-white">Clear Search</button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#132c19]/40 rounded-2xl border border-[#d4af37]/20">
            <Filter className="w-12 h-12 text-[#d4af37] mx-auto mb-3 opacity-50" />
            <h3 className="text-lg font-serif text-[#f7e7a9]">No Products Found</h3>
            <p className="text-xs text-[#d9c3b3] mt-1">Try selecting another category or clearing your search filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const added = isInInquiry(product.id);
              return (
                <div
                  key={product.id}
                  className="group bg-[#102612] border border-[#d4af37]/20 hover:border-[#d4af37]/60 rounded-2xl p-4 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Render */}
                    <div className="relative mb-4">
                      <ProductCanvasImage product={product} className="h-56" />

                      {/* Quick View Floating Button */}
                      <button
                        onClick={() => setActiveModalProduct(product)}
                        className="absolute bottom-3 right-3 p-2 bg-[#132c19]/90 hover:bg-[#d4af37] text-[#d4af37] hover:text-[#0a170d] rounded-full border border-[#d4af37]/40 shadow-lg backdrop-blur-md opacity-90 group-hover:opacity-100 transition-all transform group-hover:scale-105"
                        title="Quick View Specs"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase bg-[#d4af37]/10 px-2 py-0.5 rounded">
                        {product.sku}
                      </span>
                      <span className="text-[11px] text-[#d9c3b3] font-medium truncate">
                        {product.material.split(',')[0]}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-base font-serif font-bold text-[#f9f7f2] group-hover:text-[#f7e7a9] transition-colors mb-2 line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Fiber Specs Pill */}
                    <div className="flex items-center gap-1 text-[11px] text-[#cbb5a5] mb-4">
                      <Layers className="w-3 h-3 text-[#d4af37] shrink-0" />
                      <span className="truncate">{product.naturalFiberRatio}</span>
                    </div>
                  </div>

                  {/* Price & Add to Inquiry Button */}
                  <div className="pt-3 border-t border-[#d4af37]/15 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-[#d9c3b3] block">Material</span>
                      <span className="text-sm font-serif font-bold text-[#d4af37]">
                        {product.material}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setActiveModalProduct(product)}
                        className="p-2.5 rounded-xl bg-[#0f2314] hover:bg-[#1c4024] text-[#e2e8f0] hover:text-[#d4af37] transition-colors border border-[#d4af37]/20"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onAddToInquiry(product)}
                        className={`px-3 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-1.5 ${
                          added
                            ? 'bg-[#204728] text-[#f7e7a9] border border-[#d4af37]'
                            : 'bg-gradient-to-r from-[#d4af37] to-[#b89343] text-[#0a170d] hover:brightness-110 shadow-md'
                        }`}
                      >
                        {added ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>In Inquiry</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Inquiry</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick View Product Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#132c19] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 p-2 text-[#d9c3b3] hover:text-white bg-[#17341e] rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Product Visual */}
              <div className="h-64 sm:h-72">
                <ProductCanvasImage product={activeModalProduct} className="h-full" />
              </div>

              {/* Details */}
              <div>
                <div className="inline-block bg-[#d4af37]/20 border border-[#d4af37]/40 px-2.5 py-1 rounded text-xs font-mono text-[#f7e7a9] mb-2">
                  SKU: {activeModalProduct.sku}
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-[#f9f7f2] mb-2">
                  {activeModalProduct.name}
                </h3>

                <div className="text-lg font-serif font-bold text-[#d4af37] mb-4">
                  {activeModalProduct.material}
                </div>

                <p className="text-xs text-[#e0cdbf] leading-relaxed mb-6">
                  {activeModalProduct.description}
                </p>

                {/* Specs Table */}
                <div className="space-y-2 text-xs bg-[#1d4226] p-4 rounded-xl border border-[#d4af37]/20 mb-6">
                  <div className="flex justify-between pb-2 border-b border-[#d4af37]/10">
                    <span className="text-[#d9c3b3]">Materials:</span>
                    <span className="font-semibold text-[#f7e7a9]">{activeModalProduct.material}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#d4af37]/10">
                    <span className="text-[#d9c3b3]">Composition:</span>
                    <span className="font-semibold text-[#f7e7a9]">{activeModalProduct.naturalFiberRatio}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#d4af37]/10">
                    <span className="text-[#d9c3b3]">Dimensions:</span>
                    <span className="font-semibold text-[#f7e7a9]">{activeModalProduct.dimensions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#d9c3b3]">Min. Order (MOQ):</span>
                    <span className="font-semibold text-[#f7e7a9]">{activeModalProduct.moq} pcs</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      onAddToInquiry(activeModalProduct);
                      setActiveModalProduct(null);
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-[#d4af37] to-[#b89343] text-[#0a170d] font-bold text-xs rounded-xl shadow-lg hover:brightness-110 flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Inquiry List</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
