import { ReactNode } from 'react';

import { cn } from '@monorepo/common';

interface Properties {
  borderRadiusPx?:  number;
  blurIntensity?:   'sm' | 'md' | 'lg' | 'xl';
  glowIntensity?:   'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shadowIntensity?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  contentClasses?:  string;
  className?:       string;
  children:         ReactNode;
  onClick?:         () => void;
}

export function GlassContainer(properties: Properties) {
  const {
    children,
    className,
    contentClasses,
    borderRadiusPx = 32,
    blurIntensity = 'xl',
    glowIntensity = 'sm',
    shadowIntensity = 'md',
    onClick,
  } = properties;

  const borderRadius = `${borderRadiusPx}px`;

  return (
    <>
      {/* Hidden SVG Filter */}
      <svg className="hidden">
        <defs>
          <filter
            id="glass-blur"
            x="0"
            y="0"
            width="100%"
            height="100%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.003 0.007"
              numOctaves="1"
              result="turbulence"
            />

            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="200"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className={cn('relative size-full grid outline-none', className)} style={{ borderRadius }}>

        {/* Bend Layer (Backdrop blur with distortion) */}
        <div className={cn('absolute inset-0  z-0', blurClasses[blurIntensity])} style={{ borderRadius, filter: 'url(#glass-blur)' }} />

        {/* Face Layer (Main shadow and glow) */}
        <div className="absolute inset-0 z-10" style={{ borderRadius, boxShadow: glowStyles[glowIntensity] }} />

        {/* Edge Layer (Inner highlights) */}
        <div className="absolute inset-0 z-20" style={{ borderRadius, boxShadow: shadowStyles[shadowIntensity] }} />

        <div className={cn('relative z-30 grid', contentClasses)}onClick={onClick}>
          {children}
        </div>

      </div>
    </>
  );
};

const blurClasses = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
};

const shadowStyles = {
  'none': 'inset 0 0 0 0 rgba(255, 255, 255, 0)',
  'xs':   'inset 1px 1px 1px 0 rgba(255, 255, 255, 0.3), inset -1px -1px 1px 0 rgba(255, 255, 255, 0.3)',
  'sm':   'inset 2px 2px 2px 0 rgba(255, 255, 255, 0.35), inset -2px -2px 2px 0 rgba(255, 255, 255, 0.35)',
  'md':   'inset 3px 3px 3px 0 rgba(255, 255, 255, 0.45), inset -3px -3px 3px 0 rgba(255, 255, 255, 0.45)',
  'lg':   'inset 4px 4px 4px 0 rgba(255, 255, 255, 0.5), inset -4px -4px 4px 0 rgba(255, 255, 255, 0.5)',
  'xl':   'inset 6px 6px 6px 0 rgba(255, 255, 255, 0.55), inset -6px -6px 6px 0 rgba(255, 255, 255, 0.55)',
  '2xl':  'inset 8px 8px 8px 0 rgba(255, 255, 255, 0.6), inset -8px -8px 8px 0 rgba(255, 255, 255, 0.6)',
};

const glowStyles = {
  'none': '0 4px 4px rgba(0, 0, 0, 0.05), 0 0 12px rgba(0, 0, 0, 0.05)',
  'xs':   '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 16px rgba(255, 255, 255, 0.05)',
  'sm':   '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 24px rgba(255, 255, 255, 0.1)',
  'md':   '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 32px rgba(255, 255, 255, 0.15)',
  'lg':   '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 40px rgba(255, 255, 255, 0.2)',
  'xl':   '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 48px rgba(255, 255, 255, 0.25)',
  '2xl':  '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 60px rgba(255, 255, 255, 0.3)',
};
