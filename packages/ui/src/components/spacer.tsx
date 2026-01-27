import { cn } from '@monorepo/common';

import { ComponentPropsWithoutRef } from 'react';
import { tv, VariantProps }         from 'tailwind-variants';

const spacerVariants = tv({
  base: 'grid size-full flex-1',

});
interface SpacerProperties extends ComponentPropsWithoutRef<'div'>, VariantProps<typeof spacerVariants> {}

export function Spacer(properties: SpacerProperties) {
  const { className, ...props } = properties;
  return (
    <div className={cn(spacerVariants(), className)} {...props} />
  );
}
