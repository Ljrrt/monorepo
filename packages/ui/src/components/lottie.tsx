import { cn }   from '@monorepo/common';
import { Tint } from '@monorepo/ui';

import { ComponentPropsWithoutRef } from 'react';
import LottieUI                     from 'lottie-react';

interface LottieProperties extends ComponentPropsWithoutRef<typeof LottieUI> {
  tint?:             string;
  containerClasses?: string;
}

export function Lottie(properties: LottieProperties) {
  const {
    className,
    tint,
    containerClasses,
    ...props
  } = properties;

  return (
    <div className={cn('relative', containerClasses)}>
      <LottieUI
        className={cn('', className)}
        {...props}
      />

      <Tint color={tint ? tint : 'transparent'} />
    </div>
  );
}
