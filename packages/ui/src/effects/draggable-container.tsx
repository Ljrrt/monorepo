import { CSSProperties, ReactNode } from 'react';

import { motion } from 'motion/react';

import { cn } from '@monorepo/common';

interface Properties {
  children:        ReactNode;
  className?:      string;
  contentClasses?: string;
  cursor?:         boolean;
  style?:          CSSProperties;
}

export function DraggableContainer(properties: Properties) {
  const {
    children,
    className,
    contentClasses,
    style,
    cursor = false,
  } = properties;

  return (

    <motion.div
      className={cn('relative grid outline-none', cursor && 'cursor-grab active:cursor-grabbing', className)}
      whileDrag={{ scale: 1.0 }}
      whileHover={{ scale: 1.0 }}
      whileTap={{ scale: 1.0 }}
      drag={true}
      dragTransition={{
        bounceStiffness: 300,
        bounceDamping:   10,
        power:           0.3,
      }}
      dragElastic={0.3}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
    >

      <div className={cn('relative z-30 grid', contentClasses)} style={style}>
        {children}
      </div>
    </motion.div>

  );
};
