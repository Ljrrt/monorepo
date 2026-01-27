import { useEffect } from 'react';

export function useFullscreen(active: boolean = true) {
  useEffect(() => {
    if (!active) return;
    requestFullscreen();

    document.addEventListener('click', handleClick, { once: true });

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  function requestFullscreen() {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.error('Fullscreen request failed:', err);
      });
    } else if ((elem as any).webkitRequestFullscreen) {
      (elem as any).webkitRequestFullscreen();
    }
  };

  function handleClick() {
    if (!document.fullscreenElement) {
      requestFullscreen();
    }
  };
}
