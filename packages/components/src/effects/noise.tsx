import { cn } from '@monorepo/common';

import  { useRef, useEffect } from 'react';

interface NoiseProperties {
  patternSize?:            number;
  patternScaleX?:          number;
  patternScaleY?:          number;
  patternRefreshInterval?: number;
  patternAlpha?:           number;
  className?:              string;
}

export function Noise(properties: NoiseProperties) {
  const {
    patternSize = 250,
    patternScaleX = 1,
    patternScaleY = 1,
    patternRefreshInterval = 2,
    patternAlpha = 15,
    className,
  } = properties;

  const grainRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let frame = 0;
    let animationId: number;

    const canvasSize = 1024;

    const resize = () => {
      if (!canvas) return;
      canvas.width  = canvasSize;
      canvas.height = canvasSize;

      canvas.style.width  = '100vw';
      canvas.style.height = '100vh';
    };

    const drawGrain = () => {
      const imageData = ctx.createImageData(canvasSize, canvasSize);
      const data      = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i]     = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = patternAlpha;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
      if (frame % patternRefreshInterval === 0) {
        drawGrain();
      }
      frame++;
      animationId = window.requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    resize();
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationId);
    };
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]);

  return (
    <div className={cn('absolute grid inset-0 pointer-events-none', className)}>
      <canvas
        className="size-full"
        ref={grainRef}
        style={{
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
};
