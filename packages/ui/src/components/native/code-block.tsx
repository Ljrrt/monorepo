import { cn }        from '@monorepo/common';
import { ReactNode } from 'react';

interface Properties {
  children:   ReactNode;
  className?: string;
}

export function CodeBlock(properties: Properties) {
  const { children, className } = properties;
  return (
    <pre className={cn('bg-neutral-1 border-neutral-6 my-4 overflow-x-auto rounded-lg border p-4', className)}>
      <code className="typo-1 text-neutral-11">
        {children}
      </code>
    </pre>
  );
}
