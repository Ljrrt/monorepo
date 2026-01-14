import 'dotenv/config';

import { Hono } from 'hono';

import { corsMiddleware }   from './middleware/cors.js';
import { textRouter }       from './routes/text.js';
import { imageRouter }      from './routes/image.js';
import { multimodalRouter } from './routes/multimodal.js';
import { dmxRouter }        from './routes/dmx.js';

const app = new Hono();

app.use('*', corsMiddleware);

app.route('/', textRouter);
app.route('/', imageRouter);
app.route('/', multimodalRouter);
app.route('/', dmxRouter);

export default app;
