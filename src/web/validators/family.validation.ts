import { z } from 'zod';
import {
  nameSchema,
  objectIdSchema,
  incomingRequestSchema,
  emptyObjectSchema,
} from './lib/common-schema-validation';

const createFamilyBody = z.object({
  owner: objectIdSchema,
  name: nameSchema,
  label: nameSchema,
  // subscribeLinks: z.array(z.string()),
});

export const createFamily = incomingRequestSchema(
  createFamilyBody,
  emptyObjectSchema,
  emptyObjectSchema,
);

export const updateFamilyBody = z.object({
  name: nameSchema,
  // subscribeLinks: z.array(z.string()),
});

export const updateFamilyParams = z.object({
  id: objectIdSchema,
});

export const updateFamily = incomingRequestSchema(
  updateFamilyBody,
  updateFamilyParams,
  emptyObjectSchema,
);
