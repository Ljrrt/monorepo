import { cn, ICONS } from '@monorepo/common';

import { Icon, Marquee, TextScramble } from '@monorepo/components';

interface MarqueeBarProperties {
  direction?: 'left' | 'right' | 'up' | 'down';
  className?: string;
}

export function MarqueeBar(properties: MarqueeBarProperties) {
  const { className, direction = 'right' } = properties;

  function renderType(content: MarqueeBarContent, key: string | number) {
    switch (content.type) {
      case 'text':
        return (
          <TextScramble
            key={key}
            duration={1.5}
          >
            {content.content}
          </TextScramble>
        );
      case 'icon':
        return (
          <Icon key={key} icon={content.content} className="size-5" />
        );
    }
  }

  return (
    <Marquee
      baseVelocity={-8}
      repeat={6}
      draggable={true}
      scrollSpringConfig={{ damping: 50, stiffness: 400 }}
      slowDownFactor={0.1}
      slowdownOnHover
      slowDownSpringConfig={{ damping: 60, stiffness: 300 }}
      scrollAwareDirection={true}
      useScrollVelocity={true}
      direction={direction}
      className={cn('w-full pointer-events-auto overflow-hidden items-center p-2 gap-4 typo-code typo-xs text-neutral bg-accent border-neutral', className)}
    >
      <div className="flex flex-row items-center gap-4 ">
        {CONTENT.map((content, index) => renderType(content, index))}
      </div>
    </Marquee>
  );
}

interface MarqueeBarContent {
  type:    'icon' | 'text';
  content: string;
}

const CONTENT: MarqueeBarContent[] = [
  { type: 'text', content: 'Charity is overrated. Try us.' },
  { type: 'icon', content: ICONS.code },
  { type: 'text', content: 'Turn cash into pure nothingness' },
  { type: 'text', content: '///////////////' },
];
