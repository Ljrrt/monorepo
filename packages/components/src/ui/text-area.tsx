import { cn }         from '@monorepo/common';
import { forwardRef } from 'react';

import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';

const variants = {
  default: [
    'relative flex w-full appearance-none outline-hidden',
    'typo-1 typo-weight-600 border px-3 py-2 rounded-lg',
    'border-neutral-6 bg-neutral-2 text-neutral-11 placeholder-neutral-8',
    'cs-focus-input cs-disabled cs-transition',
  ],
  empty: [
    'relative flex w-full appearance-none outline-hidden',
    'typo-1 typo-body',
    'text-neutral-11 placeholder-neutral-8',
    'cs-transition',
    'z-auto',
  ],
};

export interface TextAreaProperties extends TextareaAutosizeProps {
  variant?: keyof typeof variants;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProperties>((properties, ref) => {
  const {
    className,
    variant = 'default',
    ...props
  } = properties;

  return (
    <TextareaAutosize
      ref={ref}
      className={cn(variants[variant], className)}
      tremor-id="tremor-raw"
      minRows={3}
      {...props}
    />
  );
});
