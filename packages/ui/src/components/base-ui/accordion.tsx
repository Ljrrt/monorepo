import { cn, ICONS } from '@monorepo/common';
import { Icon }      from '@monorepo/ui/src/components/icon';

import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';

/* Accordion */

const accordionClasses = 'max-w-[calc(100vw-8rem)] flex flex-col justify-center border border-neutral-6';

export function Accordion(properties: AccordionPrimitive.Root.Props) {
  const { className, ...props } = properties;

  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(accordionClasses, className)}
      {...props}
    />
  );
}

/* Accordion Item */

const itemClasses = 'border-b last:border-none typo-2 border-neutral-6 text-left';

export function AccordionItem(properties: AccordionPrimitive.Item.Props) {
  const { className, ...props } = properties;

  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(itemClasses, className)}
      {...props}
    />
  );
}

/* Trigger */

const triggerClasses = cn([
  'group bg-neutral-4 relative flex w-full items-center justify-between gap-4 px-3 py-2 text-left',
  'hover:bg-neutral-5',
  'cs-focus cs-transition cs-disabled',
]);

export function AccordionTrigger(properties: AccordionPrimitive.Trigger.Props) {
  const { className, children, ...props } = properties;

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(triggerClasses, className)}
        {...props}
      >
        {children}
        <Icon icon={ICONS.add} className="cs-transition group-data-panel-open:rotate-45" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/* Content */

const contentClasses = cn(['text-neutral-11 border-neutral-6 border-t p-3 ']);

export function AccordionContent(properties: AccordionPrimitive.Panel.Props) {
  const { className, children, ...props } = properties;

  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0"
      {...props}
    >
      <div className={cn(contentClasses, className)}>
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}
