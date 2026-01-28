import { cn, ICONS } from '@monorepo/common';
import { Icon }      from '@monorepo/ui/src/components/icon';

import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';

/* Accordion */

const accordionClasses = 'text-neutral-11 border border-neutral-6 bg-neutral-2';

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

const itemClasses = cn([
  'border-b last:border-none typo-1',
  'text-neutral-11 border-neutral-6 text-left',
]);

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
  'group/accordion-trigger flex flex-1 p-3 items-center border border-transparent justify-between gap-2 outline-none [&[data-state=open]>*:last-child]:rotate-180 text-neutral-11',
  'hover:bg-neutral-3',
  'cs-transition cs-disabled',
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
        <Icon icon={ICONS.chevronDown} className="cs-transition" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/* Content */

const contentClasses = cn([
  'p-3 border-t typo-body',
  'border-neutral-6 text-neutral-10 bg-neutral-3/50',
]);

export function AccordionContent(properties: AccordionPrimitive.Panel.Props) {
  const { className, children, ...props } = properties;

  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="data-open:animate-accordion-down data-closed:animate-accordion-up overflow-hidden"
      {...props}
    >
      <div className={cn(contentClasses, className)}>
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}
