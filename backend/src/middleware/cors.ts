import { cors } from 'hono/cors';

const allowedOrigins = ['https://ljrrt-monorepo-design-system.vercel.app'];

export const corsMiddleware = cors({
  origin: (origin) => {
    if (
      origin?.startsWith('http://localhost:') ||
      origin?.startsWith('http://127.0.0.1:') ||
      origin?.startsWith('http://169.254.')   ||
      origin?.startsWith('http://192.168.')
    ) {
      return origin;
    }

    if (origin && allowedOrigins.includes(origin)) {
      return origin;
    }

    return allowedOrigins[0];
  },
  credentials: true,
});
