import 'dotenv/config';
import { CorsOptions } from 'cors';

const whitelist = [
  'https://subby-frontend-alpha.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173',
];

export const corsOptions: CorsOptions = {
  origin: whitelist,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
};
