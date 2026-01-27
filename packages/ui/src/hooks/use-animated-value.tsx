import { useEffect, useRef, useState } from 'react';

export function useAnimatedValue(duration: number): [number, () => void] {
  const [value, setValue]   = useState(0);
  const startTimeRef        = useRef(Date.now());
  const previousProgressRef = useRef(0);

  useEffect(() => {
    const animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [duration]);

  function reset() {
    startTimeRef.current        = Date.now();
    previousProgressRef.current = 0;
    setValue(0);
  };

  function animate() {
    const elapsed  = Date.now() - startTimeRef.current;
    const progress = (elapsed % duration) / duration;

    setValue(progress * 100);

    previousProgressRef.current = progress;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  return [value, reset];
};
