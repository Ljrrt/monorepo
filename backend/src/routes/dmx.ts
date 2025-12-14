import { DmxSendBody, DmxSendResponse, ROUTES } from '@monorepo/common';

import { Hono } from 'hono';
import DMX      from 'dmx';

export const dmxRouter = new Hono();

const dmx = new DMX();

const UNIVERSE_NAME = '0';
const DEVICE_ID     = '10.8.99.81';

const universe = dmx.addUniverse(UNIVERSE_NAME, 'artnet', DEVICE_ID);

dmxRouter.post(ROUTES.dmxSend, async (c) => {
  const body = await c.req.json() as DmxSendBody;

  universe.update({ [body.channel]: body.value });

  const response: DmxSendResponse = {
    success: true,
  };

  return c.json(response);
});
