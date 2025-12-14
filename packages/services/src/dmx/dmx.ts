import { DmxSendBody, DmxSendResponse, ROUTES } from '@monorepo/common';
import { backendRequest }                       from '../api/api';

export class Dmx {
  public async send(channel: number, value: number) {
    const body: DmxSendBody = { channel, value };

    return backendRequest<DmxSendResponse>('POST', ROUTES.dmxSend, body);
  }
}
