import { cn } from '@monorepo/common';

import { LetterSwap } from '@monorepo/components';

interface TextSwapLetterProperties {
  word:       string;
  className?: string;
}

export function TextSwapLetter(properties: TextSwapLetterProperties) {
  const { word, className } = properties;

  return (
    <div className={cn('typo-header gap-4 overflow-hidden ', className)}>
      <div className="mb-[-2vw] flex items-center text-[20vw] leading-[16vw]">
        {word.split('').map((letter, index) => (
          <LetterSwap
            key={index}
            letter={letter}
          />
        ))}
      </div>
    </div>
  );
}
