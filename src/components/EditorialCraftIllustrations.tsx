import React from 'react';

/**
 * Hand-drawn editorial ink illustrations for Giri Ismoyo.
 * Follows strict ANTI-AI guidelines:
 * - Hand-inked character with natural stroke variations and paper texture
 * - Real tangible objects only: banana stem/fiber, solar drying rack, artisan hands, woven craft
 * - Zero sparkles, zero digital arrows, zero abstract tech blobs
 */

// 1. Raw Banana Bark / Stem (Pelepah Pisang Mentah)
export const BananaStemIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Natural stalk layers - organic hand-drawn ink strokes */}
    <path
      d="M38 108C36 82 37 54 44 26C45 22 47 16 50 12C52 14 55 18 56 24C62 52 64 80 62 108"
      stroke="#3D2E24"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Inner fiber striations */}
    <path
      d="M45 106C43 85 44 60 48 35C49 27 51 20 52 16"
      stroke="#8A7258"
      strokeWidth="1"
      strokeDasharray="2 3"
      strokeLinecap="round"
    />
    <path
      d="M54 107C55 88 56 65 54 42C53 34 52 25 51 18"
      stroke="#8A7258"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
    {/* Peeling bark layers showing tensile fibers */}
    <path
      d="M42 68C32 62 25 58 18 57C22 66 31 72 39 76"
      stroke="#3D2E24"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M60 55C70 48 78 44 86 42C81 52 72 58 63 62"
      stroke="#3D2E24"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Fiber threads pulling away from stem */}
    <path
      d="M20 58C14 62 10 70 8 78"
      stroke="#964C3B"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <path
      d="M84 43C92 48 98 56 104 66"
      stroke="#964C3B"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

// 2. Solar Curing on Bamboo Rack (Penjemuran Alami)
export const SolarRackIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Gentle equatorial sun sketch */}
    <circle
      cx="60"
      cy="28"
      r="14"
      stroke="#964C3B"
      strokeWidth="1.4"
      strokeDasharray="4 3"
    />
    <path
      d="M60 8V12M60 44V48M40 28H44M76 28H80M46 14L49 17M71 39L74 42M46 42L49 39M71 17L74 14"
      stroke="#964C3B"
      strokeWidth="1"
      strokeLinecap="round"
    />

    {/* Raised bamboo drying horizontal beam */}
    <path
      d="M12 72H108"
      stroke="#3D2E24"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M14 78H106"
      stroke="#3D2E24"
      strokeWidth="1.2"
      strokeLinecap="round"
    />

    {/* Bamboo legs */}
    <path
      d="M22 72L16 112M32 72L36 112M88 72L84 112M98 72L104 112"
      stroke="#3D2E24"
      strokeWidth="1.6"
      strokeLinecap="round"
    />

    {/* Hanging fiber ribbons draped over bamboo rack */}
    <path
      d="M26 73C26 84 28 94 27 106M34 73C33 86 35 98 34 108M42 73C44 85 43 97 44 110M52 73C51 86 53 96 52 107M60 73C59 87 61 99 60 109M68 73C70 85 69 95 70 108M78 73C77 86 79 97 78 107M86 73C85 84 87 96 86 106"
      stroke="#8A7258"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

// 3. Artisan Hands Weaving (Tangan Pengrajin Menganyam)
export const ArtisanHandsIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Left hand contour */}
    <path
      d="M12 90C22 84 32 76 40 68C43 65 47 60 48 54C47 50 43 50 40 54C35 60 28 67 22 72"
      stroke="#3D2E24"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M40 54C43 48 48 42 52 44C55 46 53 52 48 58"
      stroke="#3D2E24"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M48 58C53 52 58 48 62 50C65 52 63 58 57 63"
      stroke="#3D2E24"
      strokeWidth="1.4"
      strokeLinecap="round"
    />

    {/* Right hand guiding the cordage */}
    <path
      d="M108 90C98 84 88 76 80 68C77 65 73 60 72 54C73 50 77 50 80 54C85 60 92 67 98 72"
      stroke="#3D2E24"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M80 54C77 48 72 42 68 44C65 46 67 52 72 58"
      stroke="#3D2E24"
      strokeWidth="1.4"
      strokeLinecap="round"
    />

    {/* Woven fiber cordage being braided in tension */}
    <path
      d="M20 32C36 40 50 56 60 56C70 56 84 40 100 32"
      stroke="#964C3B"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M20 38C34 46 48 60 60 60C72 60 86 46 100 38"
      stroke="#8A7258"
      strokeWidth="1.6"
      strokeDasharray="4 3"
      strokeLinecap="round"
    />
    <path
      d="M60 60V106"
      stroke="#3D2E24"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M56 66C58 72 62 72 64 78C62 84 58 84 60 90C62 96 58 98 60 104"
      stroke="#8A7258"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

// 4. Woven Craft Object / Architectural Vessel (Karya Ruang)
export const WovenObjectIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Rim of woven basket/pendant */}
    <ellipse
      cx="60"
      cy="34"
      rx="38"
      ry="12"
      stroke="#3D2E24"
      strokeWidth="1.8"
    />
    {/* Body contour */}
    <path
      d="M22 34C24 64 34 94 60 104C86 94 96 64 98 34"
      stroke="#3D2E24"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    {/* Coiled horizontal weave rings */}
    <path
      d="M26 48C34 56 86 56 94 48"
      stroke="#8A7258"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M30 62C40 70 80 70 90 62"
      stroke="#8A7258"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M36 76C44 83 76 83 84 76"
      stroke="#8A7258"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M44 90C50 94 70 94 76 90"
      stroke="#8A7258"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    {/* Fine tactile vertical ribbing */}
    <path
      d="M40 38C42 58 46 76 52 94M60 40V98M80 38C78 58 74 76 68 94"
      stroke="#964C3B"
      strokeWidth="0.9"
      strokeDasharray="2 3"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Natural continuous banana fiber thread that connects cards horizontally or vertically.
 * Organic, slight hand-drawn curvature, variable stroke weight, authentic natural filament.
 */
export const NaturalFiberConnector: React.FC<{ className?: string }> = ({ className = 'w-full h-12' }) => (
  <div className={`relative overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
    <svg
      viewBox="0 0 1000 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full preserve-3d"
      preserveAspectRatio="none"
    >
      {/* Primary continuous natural fiber strand */}
      <path
        d="M0 32C120 18 240 44 360 28C480 12 600 46 720 30C840 14 920 38 1000 26"
        stroke="#964C3B"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />
      {/* Secondary thinner accompanying fiber filament with natural organic separation */}
      <path
        d="M0 35C140 24 220 38 380 34C520 30 640 40 760 26C860 16 940 34 1000 30"
        stroke="#8A7258"
        strokeWidth="0.8"
        strokeDasharray="6 8"
        strokeLinecap="round"
        strokeOpacity="0.35"
      />
    </svg>
  </div>
);
