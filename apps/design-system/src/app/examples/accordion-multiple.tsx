import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@monorepo/ui';

export default function AccordionMultiple() {
  return (
    <Accordion multiple defaultValue={['item-1', 'item-2']}>
      <AccordionItem value="item-1">
        <AccordionTrigger>First item</AccordionTrigger>
        <AccordionContent>Can be open with others.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second item</AccordionTrigger>
        <AccordionContent>Also open at the same time.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
