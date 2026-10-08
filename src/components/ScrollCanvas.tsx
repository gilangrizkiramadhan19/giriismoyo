import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   CONSTANTS
   ============================================================ */
const TOTAL_FRAMES = 1140;
const FRAME_PAD = 5;         // zero-pad width  → "00001"
const FRAME_EXT = 'png';     // file extension
const SEQUENCE_DIR = '/sequence';  // path relative to /public

/**
 * Generates the URL for a given frame index (1-based).
 */
function frameUrl(index: number): string {
  const padded = String(index).padStart(FRAME_PAD, '0');
  return `${SEQUENCE_DIR}/${padded}.${FRAME_EXT}`;
}

/* ============================================================
   IMAGE PRELOADER
   Loads ALL frames into an HTMLImageElement[], reporting
   progress (0..1) via a callback.
   ============================================================ */
function preloadFrames(
  total: number,
  onProgress: (loaded: number, total: number) => void
): Promise<HTMLImageElement[]> {
  return new Promise((resolve) => {
    const images: HTMLImageElement[] = new Array(total);
    let loaded = 0;

    const onLoad = () => {
      loaded++;
      onProgress(loaded, total);
      if (loaded >= total) {
        resolve(images);
      }
    };

    for (let i = 0; i < total; i++) {
      const img = new Image();
      img.src = frameUrl(i + 1);  // 1-based filename
      img.onload = onLoad;
      img.onerror = onLoad;       // count errors as loaded to prevent stall
      images[i] = img;
    }
  });
}

/* ============================================================
   GOLDEN DUST PARTICLE OVERLAY
   Floating organic particles rendered on top of each frame
   ============================================================ */
interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
}

function createParticles(count: number, w: number, h: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    radius: Math.random() * 2.2 + 0.6,
    speedY: Math.random() * -0.5 - 0.15,
    speedX: Math.random() * 0.35 - 0.175,
    opacity: Math.random() * 0.4 + 0.15
  }));
}

/* ============================================================
   <ScrollCanvas /> COMPONENT
   ============================================================ */
export const ScrollCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Stable progress callback — avoids re-render storms during loading
  const handleProgress = useCallback((loaded: number, total: number) => {
    setLoadProgress(Math.round((loaded / total) * 100));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let particles: Particle[] = [];
    const progress = { frame: 0 };      // float index scrubbed by GSAP
    let images: HTMLImageElement[] = [];
    let trigger: ScrollTrigger | null = null;

    /* ----- CANVAS SIZING ----- */
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      particles = createParticles(50, window.innerWidth, window.innerHeight);
    };
    resize();
    window.addEventListener('resize', resize);

    /* ----- RENDER LOOP ----- */
    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const dpr = window.devicePixelRatio || 1;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // ---- Draw current image frame ----
      const idx = Math.min(
        Math.max(Math.round(progress.frame), 0),
        images.length - 1
      );
      const img = images[idx];

      if (img && img.complete && img.naturalWidth > 0) {
        // Cover-fit the image into the canvas
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = w / h;
        let drawW: number, drawH: number, dx: number, dy: number;

        if (imgRatio > canvasRatio) {
          // Image wider than canvas → crop left/right
          drawH = h;
          drawW = h * imgRatio;
          dx = (w - drawW) / 2;
          dy = 0;
        } else {
          // Image taller → crop top/bottom
          drawW = w;
          drawH = w / imgRatio;
          dx = 0;
          dy = (h - drawH) / 2;
        }
        ctx.drawImage(img, dx, dy, drawW, drawH);
      } else {
        // Fallback: deep mahogany brown if frame unavailable
        ctx.fillStyle = '#132c19';
        ctx.fillRect(0, 0, w, h);
      }

      // ---- Floating Golden Dust Particles ----
      ctx.save();
      ctx.scale(dpr, dpr);

      particles.forEach((pt) => {
        pt.y += pt.speedY;
        pt.x += pt.speedX;
        if (pt.y < 0) pt.y = vh;
        if (pt.x < 0) pt.x = vw;
        if (pt.x > vw) pt.x = 0;

        ctx.fillStyle = `rgba(212, 175, 55, ${pt.opacity})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // ---- Subtle Vignette ----
      const vig = ctx.createRadialGradient(
        vw / 2, vh / 2, vw * 0.25,
        vw / 2, vh / 2, vw * 0.85
      );
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, vw, vh);

      ctx.restore();

      animFrameId = requestAnimationFrame(render);
    };

    /* ----- LOAD & BOOT ----- */
    preloadFrames(TOTAL_FRAMES, handleProgress).then((loaded) => {
      images = loaded;
      setIsLoaded(true);

      // Draw the first frame immediately
      progress.frame = 0;

      // GSAP ScrollTrigger — scrub frame index over entire story wrapper
      trigger = ScrollTrigger.create({
        trigger: '#scroll-story-wrapper',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          // Map scroll progress (0–1) to frame index (0–TOTAL_FRAMES-1)
          progress.frame = self.progress * (TOTAL_FRAMES - 1);
        }
      });

      render();
    });

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameId);
      trigger?.kill();
    };
  }, [handleProgress]);

  return (
    <>
      {/* Progress Loader Overlay — shown until all frames loaded */}
      {!isLoaded && (
        <div
          id="sequence-loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#132c19]"
        >
          {/* Official Logo */}
          <div className="mb-8 flex flex-col items-center">
            <img
              src="/Girinobackgroun.png"
              alt="Giri Ismoyo"
              className="w-28 h-28 sm:w-36 sm:h-36 object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] animate-pulse mb-4"
              draggable={false}
            />
            <p className="text-xs font-mono tracking-[0.3em] text-[#d4af37]/70 uppercase">
              Loading Experience...
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-64 sm:w-80 h-1 rounded-full bg-[#0f2314] overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#d4af37] via-[#e6c670] to-[#b89343] transition-all duration-200 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>

          {/* Percentage label */}
          <p className="mt-3 text-xs font-mono text-[#d4af37]/80 tracking-widest">
            {loadProgress}%
          </p>
        </div>
      )}

      {/* Main scroll-driven canvas */}
      <canvas
        ref={canvasRef}
        id="hero-canvas"
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.6s ease-in' }}
      />
    </>
  );
};
