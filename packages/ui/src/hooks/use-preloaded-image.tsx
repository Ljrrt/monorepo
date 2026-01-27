import { useEffect, useState } from 'react';

export function usePreloadedImage(src: string): string {
  const [loadedSrc, setLoadedSrc] = useState(src);

  useEffect(() => {
    const image = new Image();
    image.src   = src;

    image.onload = () => {
      setLoadedSrc(src);
    };
  }, [src]);

  return loadedSrc;
}
