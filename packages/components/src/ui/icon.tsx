import { cn, ICONS } from '@monorepo/common';

import { ComponentPropsWithoutRef } from 'react';

interface IconProperties extends ComponentPropsWithoutRef<'div'> {
  icon?: string;
}

export function Icon(properties: IconProperties) {
  const {
    icon = ICONS.default,
    className = '',
  } = properties;

  return (
    <span className={cn(icon, className)} />
  );
}
