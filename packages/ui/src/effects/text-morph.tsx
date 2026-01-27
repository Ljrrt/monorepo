import { cn } from '@monorepo/common';

import { AnimatePresence, motion, Transition, Variants } from 'motion/react';

import { useMemo, useId, CSSProperties } from 'react';

export interface TextMorphProperties {
  children:    string;
  className?:  string;
  style?:      CSSProperties;
  variants?:   Variants;
  transition?: Transition;
  damping?:    number;
  stiffness?:  number;
  mass?:       number;
  onFinish?:   () => void;
};

export function TextMorph(properties: TextMorphProperties) {
  const {
    children,
    className,
    style,
    variants,
    transition,
    damping = 10,
    stiffness = 150,
    mass = 0.5,
    onFinish,
  } = properties;

  const uniqueId = useId();

  const characters = useMemo(() => {
    const charCounts: Record<string, number> = {};

    return children.split('').map((char) => {
      const lowerChar       = char.toLowerCase();
      charCounts[lowerChar] = (charCounts[lowerChar] || 0) + 1;

      return {
        id:    `${uniqueId}-${lowerChar}${charCounts[lowerChar]}`,
        label: char === ' ' ? '\u00A0' : char,
      };
    });
  }, [children, uniqueId]);

  const defaultVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit:    { opacity: 0 },
  };

  const defaultTransition: Transition = {
    type:      'spring',
    stiffness: stiffness,
    damping:   damping,
    mass:      mass,
  };

  return (
    <p className={cn(className)} aria-label={children} style={style}>
      <AnimatePresence mode="popLayout" initial={false} onExitComplete={onFinish}>
        {characters.map(character => (
          <motion.span
            key={character.id}
            layoutId={character.id}
            className="inline-block transform-gpu"
            aria-hidden="true"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants || defaultVariants}
            transition={transition || defaultTransition}
          >
            {character.label}
          </motion.span>
        ))}
      </AnimatePresence>
    </p>
  );
}
