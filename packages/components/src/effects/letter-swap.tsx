import { cn } from '@monorepo/common';

import { useEffect, useState }                  from 'react';
import { AnimationOptions, motion, useAnimate } from 'motion/react';

const TRANSITION: AnimationOptions = {
  duration: 2,
  ease:     'backInOut',
};

const DELAY = 60;

type AnimationDirection = 'topToBottom' | 'bottomToTop' | 'rightToLeft' | 'leftToRight';

const DIRECTIONS: AnimationDirection[] = ['topToBottom', 'bottomToTop', 'rightToLeft', 'leftToRight'];

interface LetterSwapProperties {
  letter:     string;
  className?: string;
  direction?: AnimationDirection;
}

export function LetterSwap(properties: LetterSwapProperties) {
  const { letter, className, direction = 'leftToRight' } = properties;

  const [scope, animate]      = useAnimate();
  const [blocked, setBlocked] = useState(false);
  const [config]              = useState(() => ANIMATION_CONFIGS[getRandomDirection()]);

  useEffect(() => {
    if (blocked) return;

    const timer = window.setTimeout(animationStart, getRandomDelay());

    return () => clearTimeout(timer);
  }, [blocked, animationStart]);

  useEffect(() => {
    if (blocked) return;

    const timer = window.setTimeout(animationStart, getRandomDelay());

    return () => clearTimeout(timer);
  }, [blocked, animationStart]);

  function animationStart() {
    if (blocked) return;

    setBlocked(true);

    animate('.letter', config.primary.animate, TRANSITION).then(() => {
      animate('.letter', config.primary.reset, { duration: 0 }).then(() => {
        setBlocked(false);
      });
    });

    animate('.letter-secondary', config.secondary.animate, TRANSITION).then(() => {
      animate('.letter-secondary', config.secondary.reset, { duration: 0 });
    });
  }

  function getRandomDelay() {
    return Math.floor(Math.random() * DELAY * 1000);
  }

  function getRandomDirection() {
    const index = Math.floor(Math.random() * DIRECTIONS.length);
    return DIRECTIONS[index];
  }

  const containerClass = direction.includes('Left') || direction.includes('Right')
    ? 'flex-row'
    : 'flex-col';

  return (
    <span className={cn('flex justify-center items-center relative overflow-hidden', containerClass, className)} ref={scope}>
      <span className="relative flex whitespace-pre" aria-hidden={true}>
        <motion.span
          className="letter relative"
          style={config.primary.style}
        >
          {letter}
        </motion.span>
        <motion.span
          className="letter-secondary absolute"
          style={config.secondary.initial}
        >
          {letter}
        </motion.span>
      </span>
    </span>
  );
}

const ANIMATION_CONFIGS = {
  topToBottom: {
    primary: {
      initial: { y: 0 },
      animate: { y: '100%' },
      reset:   { y: 0 },
      style:   { top: 0 },
    },
    secondary: {
      initial: { top: '-100%' },
      animate: { top: '0%' },
      reset:   { top: '-100%' },
    },
  },
  bottomToTop: {
    primary: {
      initial: { y: 0 },
      animate: { y: '-100%' },
      reset:   { y: 0 },
      style:   { top: 0 },
    },
    secondary: {
      initial: { top: '100%' },
      animate: { top: '0%' },
      reset:   { top: '100%' },
    },
  },
  rightToLeft: {
    primary: {
      initial: { x: 0 },
      animate: { x: '-100%' },
      reset:   { x: 0 },
      style:   { left: 0 },
    },
    secondary: {
      initial: { left: '100%' },
      animate: { left: '0%' },
      reset:   { left: '100%' },
    },
  },
  leftToRight: {
    primary: {
      initial: { x: 0 },
      animate: { x: '100%' },
      reset:   { x: 0 },
      style:   { left: 0 },
    },
    secondary: {
      initial: { left: '-100%' },
      animate: { left: '0%' },
      reset:   { left: '-100%' },
    },
  },
};
