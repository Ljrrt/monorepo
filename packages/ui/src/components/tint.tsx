import { cn } from '@monorepo/common';

interface Properties {
  color:      string;
  className?: string;
}

export function Tint(properties: Properties) {
  const {
    color,
    className,
  } = properties;

  return (
    <div
      className={cn('pointer-events-none absolute inset-0 mix-blend-darken', className)}
      style={{ backgroundColor: color }}
    />
  );
};
