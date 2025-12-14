import { useEffect, useRef, useState } from 'react';

export interface Timer {
  start:  (seconds: number) => void;
  pause:  () => void;
  resume: (currentSecons?: number) => void;
  reset:  () => void;
}

interface UseTimerProperties {
  initialSeconds: number;
  onComplete?:    () => void;
}
interface TimerOutput extends Timer {
  seconds: number;
}

export function useTimer(properties: UseTimerProperties): TimerOutput {
  const {
    initialSeconds,
    onComplete,
  } = properties;

  const [seconds, setSeconds]     = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  const timerRef      = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() =>  {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  function startInterval() {
    if (timerRef.current) return;

    setIsRunning(true);

    timerRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(timerRef.current!);

          timerRef.current = null;

          setIsRunning(false);

          if (onCompleteRef.current) onCompleteRef.current();

          return 0;
        }

        return prevSeconds - 1;
      });
    }, 1000);
  }

  function start(seconds: number) {
    stop();

    setSeconds(seconds);

    setTimeout(() => startInterval(), 0);
  }

  function stop() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
  }

  function pause() {
    if (!timerRef.current) return;

    clearInterval(timerRef.current);

    timerRef.current = null;

    setIsRunning(false);
  }

  function resume(currentSeconds?: number) {
    if (isRunning) return;

    if (currentSeconds !== undefined) {
      setSeconds(currentSeconds);
    }

    if (currentSeconds === undefined && seconds <= 0) return;

    startInterval();
  }

  function reset() {
    stop();
    setSeconds(initialSeconds);
  }

  return { seconds, start, pause, resume, reset };
}
