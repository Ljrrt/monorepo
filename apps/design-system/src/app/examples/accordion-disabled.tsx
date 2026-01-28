import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@monorepo/ui';

export default function AccordionDisabled() {
  return (
    <Accordion defaultValue={['item-1']}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Enabled item</AccordionTrigger>
        <AccordionContent>This one works.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled item</AccordionTrigger>
        <AccordionContent>Cannot open this.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
