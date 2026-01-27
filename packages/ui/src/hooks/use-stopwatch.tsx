import { useEffect, useRef, useState } from 'react';

export interface Stopwatch {
  start: () => void;
  stop:  () => void;
}

interface StopwatchOutput extends Stopwatch {
  seconds: number;
}

export function useStopwatch(): StopwatchOutput {
  const intervalRef = useRef<NodeJS.Timeout>(undefined);

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    return () => stop();
  }, []);

  function start() {
    if (intervalRef.current) return;

    setSeconds(0);

    intervalRef.current = setInterval(() => {
      setSeconds(prev => parseFloat((prev + 0.1).toFixed(1)));
    }, 100);
  };

  function stop() {
    if (!intervalRef.current) return;

    clearInterval(intervalRef.current);

    intervalRef.current = undefined;
  };

  return { start, stop, seconds };
}
