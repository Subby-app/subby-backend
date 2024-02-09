import { z } from 'zod';
import {
  emptyObjectSchema,
  incomingRequestSchema,
  nameSchema,
  objectIdSchema,
} from './lib/common-schema-validation';

const createApplicationBody = z.object({
  appName: nameSchema,
  planId: objectIdSchema,
});

export const createApplication = incomingRequestSchema(
  createApplicationBody,
  emptyObjectSchema,
  emptyObjectSchema,
);

export type TCreateApplicationBody = z.infer<typeof createApplicationBody>;

const updateApplicationBody = z.object({
  appName: nameSchema,
  planId: objectIdSchema,
});

const updateApplicationParams = z.object({
  id: objectIdSchema,
});

export const updateApplication = z.object({
  body: updateApplicationBody,
  params: updateApplicationParams,
  query: emptyObjectSchema,
});

export type TUpdateApplicationBody = z.infer<typeof updateApplicationBody>;

export type TUpdateApplicationParams = z.infer<typeof updateApplicationParams>;
