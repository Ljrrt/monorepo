import { CSSProperties, type JSX, useEffect, useState } from 'react';
import { motion, MotionProps }                          from 'motion/react';

export interface TextScrambleProperties extends MotionProps {
  children:            string;
  duration?:           number;
  speed?:              number;
  as?:                 React.ElementType;
  className?:          string;
  style?:              CSSProperties;
  trigger?:            boolean;
  triggerOnMouse?:     boolean;
  onScrambleComplete?: () => void;
}

const DEFAULT_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const BINARY_CHARACTERS  = '01';

export function TextScramble(properties: TextScrambleProperties) {
  const {
    children,
    duration = 0.8,
    speed = 0.04,
    className,
    as: Component = 'p',
    trigger = true,
    onScrambleComplete,
    triggerOnMouse = false,
    style,
    ...props
  } = properties;

  const MotionComponent               = motion.create(
    Component as keyof JSX.IntrinsicElements,
  );
  const [displayText, setDisplayText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTrigger, setIsTrigger]     = useState(trigger);

  useEffect(() => {
    setIsTrigger(trigger);
  }, [trigger]);

  useEffect(() => {
    setDisplayText(children);
    if (!isAnimating) {
      setIsTrigger(true);
    }
  }, [children]);

  useEffect(() => {
    if (!isTrigger) return;
    setIsTrigger(false);

    scramble();
  }, [isTrigger]);

  async function scramble() {
    if (isAnimating) return;
    setIsAnimating(true);

    const steps = duration / speed;
    let step    = 0;

    const characterSet = Math.random() > 0.5 ? BINARY_CHARACTERS : DEFAULT_CHARACTERS;

    const interval = setInterval(() => {
      let scrambled  = '';
      const progress = step / steps;

      for (let i = 0; i < children.length; i++) {
        if (children[i] === ' ') {
          scrambled += ' ';
          continue;
        }

        if (progress * children.length > i) {
          scrambled += children[i];
        } else {
          scrambled += characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }

      setDisplayText(scrambled);
      step++;

      if (step > steps) {
        clearInterval(interval);
        setDisplayText(children);
        setIsAnimating(false);
        setIsTrigger(false);
        onScrambleComplete?.();
      }
    }, speed * 1000);
  };

  return (
    <div onMouseEnter={() => !isAnimating && triggerOnMouse && setIsTrigger(true)}>
      <MotionComponent className={className} style={style} {...props}>
        {displayText}
      </MotionComponent>
    </div>
  );
}
