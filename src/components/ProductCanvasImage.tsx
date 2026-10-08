import React from 'react';
import type { Product } from '../data/products';

interface ProductCanvasImageProps {
  product: Product;
  className?: string;
}

export const ProductCanvasImage: React.FC<ProductCanvasImageProps> = ({ product, className = "w-full h-full" }) => {
  const { sku, name, category } = product;

  // Render authentic vector illustration tailored to SKU
  const renderVisual = () => {
    switch (sku) {
      case 'GI-BL/001': // Banana Macrame Basket
        return (
          <g>
            {/* Basket Frame Shadow */}
            <ellipse cx="100" cy="150" rx="45" ry="12" fill="rgba(0,0,0,0.3)" />
            {/* Main Woven Basket Body */}
            <path d="M60 80 L65 140 C65 148, 135 148, 135 140 L140 80 Z" fill="#7a5535" stroke="#4a311a" strokeWidth="2" />
            {/* Weave Lines */}
            <path d="M60 90 Q100 100 140 90 M61 102 Q100 112 139 102 M63 115 Q100 125 137 115 M64 128 Q100 138 136 128" stroke="#a47851" strokeWidth="1.5" strokeDasharray="4 2" fill="none" />
            {/* Vertical Weave Ribs */}
            <path d="M72 80 L74 142 M88 80 L89 144 M100 80 L100 145 M112 80 L111 144 M128 80 L126 142" stroke="#5c3c21" strokeWidth="1" />
            {/* Macrame Cream Fringe */}
            <path d="M60 80 Q100 88 140 80" stroke="#f4eae1" strokeWidth="4" fill="none" />
            {[...Array(15)].map((_, i) => (
              <path key={i} d={`M${63 + i * 5.2} 82 L${61 + i * 5.2} ${100 + (i % 3) * 6}`} stroke="#f4eae1" strokeWidth="1.8" strokeLinecap="round" />
            ))}
            {/* Handles */}
            <path d="M56 80 Q45 65 65 72" stroke="#d4af37" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M144 80 Q155 65 135 72" stroke="#d4af37" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        );

      case 'GI-BL/002': // Basket Raffia Rumbai
        return (
          <g>
            <ellipse cx="100" cy="152" rx="42" ry="10" fill="rgba(0,0,0,0.3)" />
            {/* Coiled Seagrass Body */}
            <path d="M62 70 L66 145 C66 150 134 150 134 145 L138 70 Z" fill="#8c7853" stroke="#574930" strokeWidth="2" />
            {/* Coiled Stripes */}
            {[...Array(6)].map((_, i) => (
              <path key={i} d={`M63 ${75 + i * 11} Q100 ${82 + i * 11} 137 ${75 + i * 11}`} stroke={i % 2 === 0 ? "#bca67b" : "#4a3c22"} strokeWidth="4" fill="none" />
            ))}
            {/* Cascading Raffia Rumbai (Fringe) */}
            {[...Array(24)].map((_, i) => (
              <path key={i} d={`M${63 + i * 3.2} 95 Q${60 + i * 3.2} 120 ${62 + i * 3.2 + (i % 2 ? 3 : -3)} 145`} stroke="#dfc588" strokeWidth="1.6" fill="none" opacity="0.9" />
            ))}
          </g>
        );

      case 'GI-BL/006': // Basket Waterhyacinth
        return (
          <g>
            <ellipse cx="100" cy="155" rx="48" ry="12" fill="rgba(0,0,0,0.35)" />
            {/* Thick Coiled Hyacinth */}
            <rect x="55" y="65" width="90" height="80" rx="8" fill="#b08a5b" stroke="#694d29" strokeWidth="2" />
            {/* Braid Textures */}
            {[...Array(7)].map((_, i) => (
              <path key={i} d={`M55 ${72 + i * 10} Q100 ${80 + i * 10} 145 ${72 + i * 10}`} stroke="#d8b282" strokeWidth="5" strokeDasharray="8 4" fill="none" />
            ))}
            {/* Organic Cotton Liner */}
            <path d="M57 65 Q100 70 143 65 L143 55 Q100 58 57 55 Z" fill="#f8f4ec" stroke="#cfc7b9" strokeWidth="1" />
            {/* Inset Side Handles */}
            <rect x="52" y="85" width="8" height="18" rx="4" fill="#3a2512" />
            <rect x="140" y="85" width="8" height="18" rx="4" fill="#3a2512" />
          </g>
        );

      case 'GI-WD/001': // Banana Star Motif Wall Decor
        return (
          <g>
            {/* Outer Ring */}
            <circle cx="100" cy="100" r="65" fill="none" stroke="#d4af37" strokeWidth="2" opacity="0.8" />
            <circle cx="100" cy="100" r="60" fill="#543e2b" stroke="#332417" strokeWidth="2" />
            {/* Star Motif Rays */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const x1 = 100 + Math.cos(angle) * 15;
              const y1 = 100 + Math.sin(angle) * 15;
              const x2 = 100 + Math.cos(angle) * 58;
              const y2 = 100 + Math.sin(angle) * 58;
              return (
                <polygon
                  key={i}
                  points={`${x1},${y1} ${100 + Math.cos(angle - 0.25) * 40},${100 + Math.sin(angle - 0.25) * 40} ${x2},${y2} ${100 + Math.cos(angle + 0.25) * 40},${100 + Math.sin(angle + 0.25) * 40}`}
                  fill={i % 2 === 0 ? "#d6a86c" : "#946a3a"}
                  stroke="#3b2716"
                  strokeWidth="1"
                />
              );
            })}
            <circle cx="100" cy="100" r="18" fill="#1b3b2b" stroke="#d4af37" strokeWidth="2" />
            <circle cx="100" cy="100" r="6" fill="#d4af37" />
          </g>
        );

      case 'GI-WD/003': // Banana Shark Tooth Wall Decor
        return (
          <g>
            {/* Hanging Bar */}
            <line x1="40" y1="40" x2="160" y2="40" stroke="#d4af37" strokeWidth="4" strokeLinecap="round" />
            <path d="M40 40 L100 20 L160 40" stroke="#d4af37" strokeWidth="1.5" fill="none" />
            {/* Chevron Woven Tapestry */}
            <path d="M50 42 L150 42 L150 110 L100 145 L50 110 Z" fill="#694d34" stroke="#422f1d" strokeWidth="2" />
            {/* Chevrons (Shark teeth) */}
            <path d="M50 60 L100 90 L150 60" stroke="#d1a46e" strokeWidth="4" fill="none" />
            <path d="M50 78 L100 108 L150 78" stroke="#1b3b2b" strokeWidth="5" fill="none" />
            <path d="M50 96 L100 126 L150 96" stroke="#d4af37" strokeWidth="4" fill="none" />
            {/* Hanging Fringe */}
            {[...Array(18)].map((_, i) => (
              <line key={i} x1={53 + i * 5.4} y1={112 + Math.abs(i - 9) * -2} x2={53 + i * 5.4} y2={165} stroke="#c9b58d" strokeWidth="1.8" />
            ))}
          </g>
        );

      case 'GI-WM/001': // Mirror Mendong Triangle Pattern
        return (
          <g>
            <circle cx="100" cy="100" r="64" fill="none" stroke="rgba(0,0,0,0.3)" />
            {/* Woven Outer Mendong Frame */}
            <circle cx="100" cy="100" r="60" fill="#755a3f" stroke="#423120" strokeWidth="2" />
            {/* Triangular Border Patterns */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x1 = 100 + Math.cos(angle) * 40;
              const y1 = 100 + Math.sin(angle) * 40;
              const x2 = 100 + Math.cos(angle + 0.15) * 58;
              const y2 = 100 + Math.sin(angle + 0.15) * 58;
              const x3 = 100 + Math.cos(angle - 0.15) * 58;
              const y3 = 100 + Math.sin(angle - 0.15) * 58;
              return <polygon key={i} points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} fill={i % 2 === 0 ? "#1b3b2b" : "#d4af37"} opacity="0.9" />;
            })}
            {/* Glass Mirror Center */}
            <circle cx="100" cy="100" r="38" fill="url(#mirrorGrad)" stroke="#d4af37" strokeWidth="2" />
            <circle cx="100" cy="100" r="38" fill="rgba(255,255,255,0.15)" />
            <path d="M78 80 Q100 65 115 88" stroke="#ffffff" strokeWidth="3" opacity="0.6" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'GI-WM/034': // Mirror Mendong Mandalika
        return (
          <g>
            {/* Sunburst Ray Wisps */}
            {[...Array(24)].map((_, i) => {
              const angle = (i * 15 * Math.PI) / 180;
              const rOut = 68 + (i % 2 === 0 ? 12 : 4);
              const x2 = 100 + Math.cos(angle) * rOut;
              const y2 = 100 + Math.sin(angle) * rOut;
              return <line key={i} x1="100" y1="100" x2={x2} y2={y2} stroke={i % 3 === 0 ? "#d4af37" : "#cbb084"} strokeWidth={i % 2 === 0 ? "3" : "1.8"} strokeLinecap="round" />;
            })}
            {/* Inner Woven Mandalika Ring */}
            <circle cx="100" cy="100" r="48" fill="#59422d" stroke="#362618" strokeWidth="2" />
            <circle cx="100" cy="100" r="44" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Glass Mirror */}
            <circle cx="100" cy="100" r="34" fill="url(#mirrorGrad)" stroke="#f0e2b8" strokeWidth="2" />
            <path d="M82 82 Q100 70 112 90" stroke="#ffffff" strokeWidth="3" opacity="0.7" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'GI-LS/001': // Lampshade Mendong Knith
        return (
          <g>
            {/* Glow Aura */}
            <circle cx="100" cy="115" r="45" fill="url(#lampGlow)" opacity="0.6" />
            {/* Cord */}
            <line x1="100" y1="20" x2="100" y2="60" stroke="#222" strokeWidth="3" />
            {/* Bell-shaped Lampshade */}
            <path d="M85 60 C80 60, 60 110, 55 125 C75 132, 125 132, 145 125 C140 110, 120 60, 115 60 Z" fill="#7a6045" stroke="#453423" strokeWidth="2" />
            {/* Knit Net Texture */}
            {[...Array(6)].map((_, i) => (
              <path key={i} d={`M${82 - i * 5} ${65 + i * 10} Q100 ${72 + i * 10} ${118 + i * 5} ${65 + i * 10}`} stroke="#d6b88d" strokeWidth="1.8" fill="none" strokeDasharray="4 2" />
            ))}
            {/* Bottom Glow Beam */}
            <polygon points="55,125 145,125 165,180 35,180" fill="url(#beamGrad)" opacity="0.3" />
          </g>
        );

      case 'GI-LMP/044': // Bamboo Lamp Natural
        return (
          <g>
            <circle cx="100" cy="115" r="50" fill="url(#lampGlow)" opacity="0.7" />
            <line x1="100" y1="15" x2="100" y2="55" stroke="#b89343" strokeWidth="2" />
            {/* Bamboo Lantern Slats */}
            <ellipse cx="100" cy="110" rx="35" ry="42" fill="#523e27" stroke="#362717" strokeWidth="2" />
            {[...Array(10)].map((_, i) => {
              const rx = 35 - i * 3.2;
              return <ellipse key={i} cx="100" cy="110" rx={Math.max(4, rx)} ry="42" fill="none" stroke={i % 2 === 0 ? "#e0b76c" : "#805c33"} strokeWidth="2" />;
            })}
            <rect x="88" y="52" width="24" height="8" rx="2" fill="#d4af37" />
            <rect x="88" y="156" width="24" height="6" rx="2" fill="#d4af37" />
          </g>
        );

      default: // Generic Natural Fiber Craft
        return (
          <g>
            <ellipse cx="100" cy="148" rx="45" ry="12" fill="rgba(0,0,0,0.3)" />
            <circle cx="100" cy="100" r="45" fill="#6b5238" stroke="#40301f" strokeWidth="2" />
            <path d="M60 100 Q100 120 140 100 M60 80 Q100 100 140 80 M60 120 Q100 140 140 120" stroke="#d4af37" strokeWidth="2" fill="none" />
          </g>
        );
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-[#5c2a0b] to-[#0a170d] ${className} flex items-center justify-center p-4 group`}>
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] opacity-10 group-hover:opacity-20 transition-opacity" />

      <svg viewBox="0 0 200 200" className="w-full h-full max-h-[220px] drop-shadow-2xl transition-transform duration-500 group-hover:scale-105">
        <defs>
          <radialGradient id="mirrorGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#e8f4f8" />
            <stop offset="50%" stopColor="#9bb4c4" />
            <stop offset="100%" stopColor="#4a6575" />
          </radialGradient>
          <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe699" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="beamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffe699" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffe699" stopOpacity="0" />
          </linearGradient>
        </defs>

        {renderVisual()}
      </svg>

      {/* SKU & Category Tag */}
      <div className="absolute bottom-3 left-3 bg-[#132c19]/80 backdrop-blur-sm border border-[#d4af37]/30 px-2.5 py-1 rounded text-[10px] font-mono tracking-wider text-[#e6c670]">
        {product.sku}
      </div>

      {/* Natural Fiber Ratio Badge */}
      <div className="absolute top-3 right-3 bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f0e2b8] text-[9px] font-sans px-2 py-0.5 rounded-full backdrop-blur-md">
        {product.naturalFiberRatio.split(',')[0]}
      </div>
    </div>
  );
};
