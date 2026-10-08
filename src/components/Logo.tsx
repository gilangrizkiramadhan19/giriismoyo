import React from 'react';

interface LogoProps {
  className?: string;
  /** 'sm' = navbar scrolled, 'md' = navbar default, 'lg' = hero center, 'xl' = large display */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  /** Show only the circular emblem icon, no text beside it */
  iconOnly?: boolean;
}

/**
 * Official Giri Ismoyo brand logo component.
 * Uses Girinobackgroun.png — transparent PNG with emblem + 'GIRI ISMOYO' typography.
 */
export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const heightMap: Record<string, string> = {
    sm: 'h-10 max-h-10',   // 40px — scrolled navbar
    md: 'h-12 max-h-12',   // 48px — default navbar (matches user requirement max-height: 48px)
    lg: 'h-20 max-h-20',   // 80px — story/overlays
    xl: 'h-28 max-h-28',   // 112px — splash
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/Girinobackgroun.png"
        alt="Giri Ismoyo — A Continuum of Nature"
        className={`${heightMap[size]} w-auto object-contain drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]`}
        draggable={false}
        loading="eager"
      />
    </div>
  );
};
