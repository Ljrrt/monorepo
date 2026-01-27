import { useEffect, useState } from 'react';

export function useFocusSize(isFocused: boolean, duration: number = 1000) {
  const [size, setSize] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed  = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const newSize  = isFocused ? progress * 100 : (1 - progress) * 100;
      setSize(newSize);
      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isFocused, duration]);

  return size;
};
