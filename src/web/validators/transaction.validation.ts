import { z } from 'zod';
import {
  TransactionCurrencies,
  TransactionStatuses,
  TransactionTypes,
} from '../../utils/helpers/transaction.helpers';
import {
  emptyObjectSchema,
  incomingRequestSchema,
  objectIdSchema,
} from './lib/common-schema-validation';

const transactionTypes = z
  .string()
  .toLowerCase()
  .refine((value) => TransactionTypes.includes(value));

const transactionStatus = z
  .string()
  .toLowerCase()
  .refine((value) => TransactionStatuses.includes(value));

const methodObjects = z.string().toLowerCase().nullable().default(null);

const transactionCurrencies = z
  .string()
  .toLowerCase()
  .refine((value) => TransactionCurrencies.includes(value));

const transactionMethod = z.object({
  bank: methodObjects,
  channel: methodObjects,
  cardType: methodObjects,
});

const createTransactionBody = z.object({
  userId: objectIdSchema,
  type: transactionTypes,
  status: transactionStatus,
  amount: z.number(),
  method: transactionMethod,
  tax: z.number().default(0),
  currency: transactionCurrencies.default('NGN'),
  recipient: z.string().nullish().default(null),
});

export const createTransaction = incomingRequestSchema(
  createTransactionBody,
  emptyObjectSchema,
  emptyObjectSchema,
);

// has nested z.object 'transactionMethod'
export type TCreateTransactionBody = z.infer<typeof createTransactionBody>;
