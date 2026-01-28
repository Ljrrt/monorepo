import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@monorepo/ui';

export default function AccordionDemo() {
  return (
    <Accordion defaultValue={['item-1']}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. Built on Base UI primitives.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>Yes. With Tailwind CSS.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>Yes. Smooth open/close animations.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
