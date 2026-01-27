import { Size } from '@monorepo/common';

import { useLayoutEffect, useRef, useState } from 'react';

export function useElementSize<T extends HTMLElement>() {
  const ref             = useRef<T | null>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const element = ref.current;

    if (!element) return;

    update(element);

    const resizeObserver = new ResizeObserver(() => update(element));

    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, []);

  function update(element: T) {
    setSize({ width: element.clientWidth, height: element.clientHeight });
  };

  return { ref, ...size };
}
