import 'dotenv/config';
import { CorsOptions } from 'cors';

const stagingOrigin = [
  'https://subby-frontend-alpha-vercel.app',
  `http://localhost:${process.env.PORT}`,
];
const prodOrigin = ['https://subby-frontend-alpha-vercel.app'];

export const corsOptions: CorsOptions = {
  origin: process.env.NODE_ENV === 'production' ? prodOrigin : stagingOrigin,
};
