import { z } from 'zod';
import {
  emptyObjectSchema,
  incomingRequestSchema,
  objectIdSchema,
} from './lib/common-schema-validation';

const createWalletBody = z.object({
  userId: objectIdSchema,
  balance: z.number().default(0),
  availableBalance: z.number().default(0),
  status: z.string(),
});

export const createWallet = incomingRequestSchema(
  createWalletBody,
  emptyObjectSchema,
  emptyObjectSchema,
);

export type TCreateWalletBody = z.infer<typeof createWalletBody>;

const updateWalletBody = z.object({
  balance: z.number().default(0),
  availableBalance: z.number().default(0),
  status: z.string(),
});

const updateWalletParams = z.object({
  id: objectIdSchema,
});

export const updateWallet = incomingRequestSchema(
  updateWalletBody,
  updateWalletParams,
  emptyObjectSchema,
);

export type TUpdateWalletBody = z.infer<typeof createWalletBody>;

export type TUpdateWalletParams = z.infer<typeof createWalletBody>;
