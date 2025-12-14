import { ImagePayload, GenerateTextBody, ROUTES } from '@monorepo/common';

import { generateText, ModelMessage } from 'ai';
import { Hono }                       from 'hono';

export const multimodalRouter = new Hono();

multimodalRouter.post(ROUTES.generateImageMultimodal, async (c) => {
  const body                            = await c.req.json() as GenerateTextBody;
  const { prompt, files, systemPrompt } = body;

  const uploadedFiles = files ? files : [];

  const result = await generateText({
    model:  'google/gemini-3-pro-image',
    system: systemPrompt,

    messages: [
      {
        role:    'user',
        content: [{ type: 'text', text: prompt }],
      },
      ...uploadedFiles.map(file => ({
        role:    'user',
        content: [{ type: 'image', image: file.base64, mediaType: file.mediaType }],
      } as ModelMessage)),
    ],
  });

  const imageFile = result.files?.find(file =>
    file.mediaType?.startsWith('image/') &&
    file.base64 &&
    file.uint8Array);

  if (!imageFile) return undefined;

  const response: ImagePayload = {
    base64:     imageFile.base64,
    uint8Array: imageFile.uint8Array,
    mediaType:  imageFile.mediaType,
  };

  return c.json(response);
});
