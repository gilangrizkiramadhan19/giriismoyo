/**
 * RevealImage.tsx
 * Reusable scroll-reveal image wrapper for GalleryPage.
 *
 * Features:
 * - Clip-path reveal from below (inset 100% -> 0%)
 * - Inner image descends from scale 1.08 -> 1 simultaneously
 * - Optional parallax (useScroll + useTransform, ±6%) for landscape banners
 * - Stagger delay via `delay` prop
 * - Caption slot: fades in 0.2s after photo
 * - Reduced motion: all animations disabled, images appear instantly
 */

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

interface RevealImageProps {
  src: string;
  alt: string;
  /** aspect ratio class, e.g. "aspect-[4/5]" */
  aspectClass?: string;
  /** object-position for focal point */
  focal?: string;
  /** stagger delay in seconds */
  delay?: number;
  /** enable gentle parallax (landscape/banner images only) */
  parallax?: boolean;
  /** CSS border-radius override */
  borderRadius?: string;
  className?: string;
  /** wrapper className */
  wrapperClassName?: string;
  /** layoutId for Framer Motion shared layout transitions (lightbox) */
  layoutId?: string;
  /** children rendered below (caption) */
  children?: React.ReactNode;
  onClick?: () => void;
  loading?: 'lazy' | 'eager';
  sizes?: string;
}

export const RevealImage: React.FC<RevealImageProps> = ({
  src,
  alt,
  aspectClass = 'aspect-[3/2]',
  focal = 'center',
  delay = 0,
  parallax = false,
  borderRadius = '4px',
  className = '',
  wrapperClassName = '',
  layoutId,
  children,
  onClick,
  loading = 'lazy',
  sizes,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  // Parallax: only when enabled and reduced-motion is off
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const duration = 1.0;

  // Container (clip-path reveal)
  const containerVariants = {
    hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
    visible: {
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: { duration, ease, delay },
    },
  };

  // Inner image (scale down + pan)
  const imageVariants = {
    hidden: { scale: 1.08 },
    visible: {
      scale: 1,
      transition: { duration, ease, delay },
    },
  };

  // Caption
  const captionVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease, delay: delay + 0.2 },
    },
  };

  // Reduced motion — no clip, just fade
  const reducedContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2, delay } },
  };
  const reducedCaption = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2, delay: delay + 0.2 } },
  };

  return (
    <div ref={ref} className={`flex flex-col ${wrapperClassName}`}>
      <motion.div
        layoutId={layoutId}
        className={`relative overflow-hidden ${aspectClass} ${className}`}
        style={{ borderRadius, backgroundColor: 'var(--clr-photo-placeholder)' }}
        variants={shouldReduce ? reducedContainer : containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        onClick={onClick}
      >
        <motion.img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          sizes={sizes}
          className="w-full h-full object-cover"
          style={{
            objectPosition: focal,
            ...(parallax && !shouldReduce ? { y: yParallax } : {}),
          }}
          variants={shouldReduce ? undefined : imageVariants}
        />
      </motion.div>

      {children && (
        <motion.div
          variants={shouldReduce ? reducedCaption : captionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

export default RevealImage;

