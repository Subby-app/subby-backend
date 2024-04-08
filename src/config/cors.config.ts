import 'dotenv/config';
import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: [
    'https://subby-frontend-alpha.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
};
