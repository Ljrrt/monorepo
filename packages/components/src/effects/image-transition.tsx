import { useEffect, useRef, useState, CSSProperties } from 'react';

import gsap from 'gsap';

import { animationEffects } from '@monorepo/components/src/other/image-transition-effects';
import { cn }               from '@monorepo/common';

export enum ImageTransitionType {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  H = 'H',
  I = 'I',
  J = 'J',
  K = 'K',
  M = 'M',
  N = 'N',
}

interface Properties {
  src:        string;
  effect?:    ImageTransitionType;
  style?:     CSSProperties;
  className?: string;
}

export function ImageTransition(properties: Properties) {
  const {
    src,
    effect = ImageTransitionType.A,
    style = {},
    className = '',
  } = properties;

  const containerRef    = useRef<HTMLDivElement>(null);
  const currentImageRef = useRef<HTMLDivElement>(null);
  const nextImageRef    = useRef<HTMLDivElement>(null);
  const currentInnerRef = useRef<HTMLDivElement>(null);
  const nextInnerRef    = useRef<HTMLDivElement>(null);
  const isAnimatingRef  = useRef<boolean>(false);

  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [nextSrc, setNextSrc]       = useState<string | null>(null);

  useEffect(() => {
    if (src === currentSrc || isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    setNextSrc(src);
  }, [src, currentSrc]);

  useEffect(() => {
    if (!nextSrc || !currentImageRef.current || !nextImageRef.current) return;

    const current      = currentImageRef.current;
    const currentInner = currentInnerRef.current;
    const next         = nextImageRef.current;
    const nextInner    = nextInnerRef.current;

    if (!currentInner || !nextInner) return;

    const animation = animationEffects[effect] || animationEffects[ImageTransitionType.A];

    const timeline = animation(current, currentInner, next, nextInner);

    timeline.eventCallback('onComplete', () => {
      setCurrentSrc(nextSrc);

      gsap.set([current, currentInner], { clearProps: 'all' });

      setNextSrc(null);

      isAnimatingRef.current = false;
    });
  }, [nextSrc, effect]);

  return (
    <div
      ref={containerRef}
      className={cn('relative size-full overflow-hidden', className)}
      style={style}
    >

      <div ref={currentImageRef} className="absolute inset-0 overflow-hidden">

        <div
          ref={currentInnerRef}
          className="size-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${currentSrc})`,
          }}
          role="img"
        />

      </div>

      {nextSrc && (
        <div ref={nextImageRef} className="pointer-events-none absolute inset-0 overflow-hidden">

          <div
            ref={nextInnerRef}
            className="flex-col-center size-full bg-cover bg-center text-6xl text-black"
            style={{
              backgroundImage: `url(${nextSrc})`,
            }}
            role="img"
          />

        </div>
      )}
    </div>
  );
};
