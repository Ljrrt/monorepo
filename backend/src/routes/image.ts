import { GenerateImageBody, ImageGeneratorModel, ImagePayload, ROUTES, tryCatch } from '@monorepo/common';

import { experimental_generateImage } from 'ai';
import { vertex }                     from '@ai-sdk/google-vertex';
import { createAmazonBedrock }        from '@ai-sdk/amazon-bedrock';

import { Hono } from 'hono';

export const imageRouter = new Hono();

const bedrock = createAmazonBedrock({
  region: process.env.AWS_REGION,
  apiKey: process.env.BEDROCK_API_KEY,
});

imageRouter.post(ROUTES.generateImage, async (c) => {
  const { model, ...body } = await c.req.json() as GenerateImageBody;

  const imageModel = getModel(model);

  const [data, error] = await tryCatch(experimental_generateImage({
    model: imageModel,
    ...body,
  }));

  if (error) {
    const errorMessage = error.message || error.toString() || 'Unknown error';
    return c.json({ error: errorMessage }, 500);
  };

  const image = data.image;

  const response: ImagePayload = {
    base64:     image.base64,
    mediaType:  image.mediaType,
    uint8Array: image.uint8Array,
  };

  return c.json(response);
});

function getModel(type: ImageGeneratorModel) {
  switch (type) {
    case ImageGeneratorModel.NANO_BANANA:
      return vertex.image('imagen-3.0-generate-002');
    case ImageGeneratorModel.NOVA_CANVAS:
      return bedrock.image('amazon.nova-canvas-v1:0');
  }
}
