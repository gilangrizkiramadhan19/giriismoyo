import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  author: string;
  content: string[];
}

export const BlogPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const ARTICLES: Article[] = [
    {
      id: 'art-01',
      title: 'The Art of Upcycling Banana Bark: From Agricultural Waste to Luxury Decor',
      category: 'Sustainability',
      date: 'February 18, 2026',
      readTime: '5 min read',
      author: 'Sunu Agung, Founder',
      excerpt: 'How post-harvest banana stems (pelepah pisang) are transformed into high-tensile, mold-resistant interior art with zero chemical footprint.',
      content: [
        'Across rural Central Java and Yogyakarta, millions of tons of banana stems are left in fields after harvesting fruit. Traditionally burned or discarded, these natural pseudo-stems possess incredible fibrous resilience, natural mottled brown textures, and high tensile flexibility.',
        'At Giri Ismoyo, we collect these stems directly from local farming families, providing supplementary agrarian income. The stems are carefully peeled into uniform ribbon strands, then cured under the natural Indonesian tropical sun for 5 to 7 days.',
        'Without the use of chemical drying ovens, the sun activates the plant\'s innate water-repellent qualities. When woven over our rust-proof iron armatures, banana bark achieves an organic warmth and tactile luxury that synthetic plastics can never replicate.'
      ]
    },
    {
      id: 'art-02',
      title: 'Why Natural Fibers Are Dominating Modern Sustainable Interior Architecture',
      category: 'Design Trends',
      date: 'January 25, 2026',
      readTime: '6 min read',
      author: 'Giri Ismoyo Editorial Team',
      excerpt: 'From Scandinavian minimalist villas to Bali eco-resorts, designers are prioritizing biophilic fiber decor that breathes with its environment.',
      content: [
        'Biophilic design—the innate human desire to connect with the natural world—has shifted from a niche aesthetic trend into a core architectural requirement for modern residential and luxury hospitality spaces.',
        'Unlike petroleum-derived plastics or harsh lacquered metals, natural fibers like mendong grass, water hyacinth, and bamboo actively regulate acoustic reverberations, soften architectural concrete angles, and emit a subtle organic botanical aroma.',
        'International interior architects are increasingly specifying Giri Ismoyo’s woven mirrors and oversized lampshades because each piece tells a transparent story of provenance, fair trade, and ecological stewardship.'
      ]
    },
    {
      id: 'art-03',
      title: 'Sanden Bantul: The Village Heart of Javanese Handweaving Heritage',
      category: 'Artisan Stories',
      date: 'December 12, 2025',
      readTime: '4 min read',
      author: 'Community Outreach Desk',
      excerpt: 'Meet the master craftswomen preserving centuries-old macrame knotting and coiled braiding techniques in our Sanden workshop.',
      content: [
        'Sanden, situated in the fertile southern coastal plains of Bantul, Yogyakarta, has long been a sanctuary of traditional Javanese handicrafts. For generations, women here have practiced intricate finger-weaving techniques passed down from mothers to daughters.',
        'Giri Ismoyo Craft was founded to formalize this artisan ecosystem without disrupting village life. By allowing mothers to weave flexible batches at home between family responsibilities, we foster true economic empowerment.',
        'Today, over 80 rural families in Sanden earn dependable living wages, ensuring that this ancestral craftsmanship continues to thrive in an era of automated mass production.'
      ]
    },
    {
      id: 'art-04',
      title: 'Care & Maintenance Guide for Handwoven Natural Fiber Decor',
      category: 'Guides',
      date: 'November 04, 2025',
      readTime: '4 min read',
      author: 'QC & Finishing Department',
      excerpt: 'Simple maintenance tips to keep your banana bark baskets, mendong mirrors, and lampshades pristine for decades.',
      content: [
        'Because Giri Ismoyo products are treated with proprietary eco-friendly anti-fungal organic seals, they are naturally resilient against ambient humidity. However, basic maintenance will preserve their golden luster for generations.',
        '1. Dusting: Use a soft dry microfiber cloth or a gentle horsehair brush to remove surface dust every fortnight.',
        '2. Vacuuming: For textured macrame fringes and dense seagrass rugs, use a low-suction handheld vacuum with a brush attachment.',
        '3. Humidity Management: In very damp climates, ensure rooms have proper air circulation. Never soak fiber products in standing water.',
        '4. Sunlight: While our fibers are sun-cured, prolonged direct harsh UV exposure over multiple years may gently lighten colors—a natural, beautiful patina celebrated by vintage collectors.'
      ]
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-[#faf9f6] text-[#1c1c1c]">
      
      {/* Header Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#8a7258] font-semibold block mb-2">
          Knowledge & Perspectives
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#132c19] tracking-tight mb-3">
          Artisan Chronicles & Sustainability
        </h1>
        <div className="w-12 h-[2px] bg-[#d4af37] mx-auto mb-4" />
        <p className="text-sm text-[#666] max-w-xl mx-auto font-light leading-relaxed">
          Essays and guides on botanical materials, traditional Javanese artisan empowerment, and sustainable interior design philosophies.
        </p>
      </section>

      {/* Articles Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ARTICLES.map((art) => (
            <article
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="group bg-white p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] border border-[#ede8de] hover:border-[#132c19]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#8a7258] font-mono mb-3">
                  <span className="bg-[#132c19]/5 border border-[#132c19]/15 px-2.5 py-0.5 uppercase tracking-wider text-[10px] text-[#132c19] font-medium">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{art.date}</span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-editorial font-normal text-[#132c19] group-hover:text-[#8a7258] transition-colors mb-3 leading-snug">
                  {art.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#666] leading-relaxed mb-6 font-light">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#f0ece4] flex items-center justify-between">
                <span className="text-xs text-[#777] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#8a7258]" />
                  <span>{art.readTime}</span>
                </span>

                <span className="text-xs font-mono uppercase tracking-widest text-[#132c19] border-b border-[#132c19] pb-0.5">
                  Read Essay
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#faf9f6] text-[#1c1c1c] border border-[#1A1A1A]/20 max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative">
            <button
              onClick={() => setSelectedArticle(null)}
              className="sticky top-0 float-right p-2 border border-[#1A1A1A]/10 bg-white/90 shadow text-[#555] hover:text-[#132c19] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="clear-both pt-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8a7258] bg-[#132c19]/5 border border-[#132c19]/20 px-2.5 py-1">
                {selectedArticle.category}
              </span>

              <h1 className="text-2xl sm:text-3xl font-editorial font-normal text-[#132c19] mt-3 mb-3">
                {selectedArticle.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#777] pb-6 mb-6 border-b border-[#e8e4dc]">
                <div className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#8a7258]" />
                  <span>{selectedArticle.author}</span>
                </div>
                <div>·</div>
                <div>{selectedArticle.date}</div>
                <div>·</div>
                <div>{selectedArticle.readTime}</div>
              </div>

              <div className="space-y-4 text-sm text-[#444] leading-relaxed font-light">
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#e8e4dc] flex justify-between items-center">
                <span className="text-xs text-[#8a7258] font-mono">
                  Giri Ismoyo Craft · Sanden, Bantul
                </span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2 bg-[#132c19] text-[#f7e7a9] text-xs font-mono tracking-wider uppercase hover:bg-[#1f482a] transition-colors cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="text-center pt-16">
        <Link
          to="/shop"
          className="inline-flex items-center px-8 py-3.5 bg-[#132c19] text-[#f9f7f2] font-mono text-xs uppercase tracking-widest hover:bg-[#1f482a] transition-colors"
        >
          <span>Discover Handcrafted Products in Shop</span>
        </Link>
      </div>

    </div>
  );
};
