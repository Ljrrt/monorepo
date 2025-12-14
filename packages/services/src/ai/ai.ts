import { GenerateImageBody, ImagePayload, GenerateTextBody, GenerateTextResponse, ROUTES } from '@monorepo/common';

import { backendRequest } from '../api/api';

export class Ai {
  public async generateText(body: GenerateTextBody): Promise<GenerateTextResponse> {
    const response = await backendRequest<GenerateTextResponse>('POST', ROUTES.generateText, body);

    return response;
  }

  public async generateImage(body: GenerateImageBody, signal?: AbortSignal): Promise<ImagePayload> {
    const response = await backendRequest<ImagePayload>('POST', ROUTES.generateImage, body, signal);

    return response;
  }

  public async generateImageMultimodal(body: GenerateTextBody, signal?: AbortSignal): Promise<ImagePayload | undefined> {
    const response = await backendRequest<ImagePayload | undefined>('POST', ROUTES.generateImageMultimodal, body, signal);

    return response;
  }
}
