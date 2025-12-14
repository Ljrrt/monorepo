import { GenerateTextBody, GenerateTextResponse, ROUTES } from '@monorepo/common';

import { generateText } from 'ai';
import { Hono }         from 'hono';

export const textRouter = new Hono();

textRouter.post(ROUTES.generateText, async (c) => {
  const body = await c.req.json() as GenerateTextBody;

  const result = await generateText({
    model:  'google/gemini-2.5-flash-lite',
    prompt: body.prompt ? body.prompt : '',
  });

  const response: GenerateTextResponse = {
    text: result.text,
  };

  return c.json(response);
});
