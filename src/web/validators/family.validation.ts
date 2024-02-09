import { z } from 'zod';
import {
  nameSchema,
  objectIdSchema,
  incomingRequestSchema,
  emptyObjectSchema,
  emailSchema,
} from './lib/common-schema-validation';

const onboarding = z.discriminatedUnion('label', [
  z.object({ label: z.literal('link'), url: z.string().url() }),
  z.object({ label: z.literal('credentials'), email: emailSchema, password: z.string().min(1) }),
  z.object({ label: z.literal('email') }),
]);

export type TOnboarding = z.infer<typeof onboarding>;

const renewal = z.union([z.literal('monthly'), z.literal('quarterly'), z.literal('yearly')]);

export type TRenewal = z.infer<typeof renewal>;

const createFamilyBody = z.object({
  name: nameSchema,
  appId: objectIdSchema,
  planId: objectIdSchema,
  slotsAvailable: z.number(),
  subscriptionStart: z.coerce.date(), // test when undefined
  renewal,
  onboarding,
});

export const createFamily = incomingRequestSchema(
  createFamilyBody,
  emptyObjectSchema,
  emptyObjectSchema,
);

export type TCreateFamilyBody = z.infer<typeof createFamilyBody>;

const findFamiliesQuery = z.object({
  name: nameSchema.optional(),
  appId: objectIdSchema.optional(),
  planId: objectIdSchema.optional(),
  owner: objectIdSchema.optional(),
  isFull: z.coerce.boolean().optional(),
  renewal: renewal.optional(),
});

export const findFamilies = incomingRequestSchema(
  emptyObjectSchema,
  emptyObjectSchema,
  findFamiliesQuery,
);

export type TFindFamiliesQuery = z.infer<typeof findFamiliesQuery>;

const updateFamilyBody = z.object({
  name: nameSchema,
  newOnboarding: onboarding.optional(),
});

const updateFamilyParams = z.object({
  id: objectIdSchema,
});

export const updateFamily = incomingRequestSchema(
  updateFamilyBody,
  updateFamilyParams,
  emptyObjectSchema,
);

export type TUpdateFamilyBody = z.infer<typeof updateFamilyBody>;

export type TUpdateFamilyParams = z.infer<typeof updateFamilyParams>;

const deleteFamilyParams = z.object({
  id: objectIdSchema,
});

export const deleteFamily = incomingRequestSchema(
  emptyObjectSchema,
  deleteFamilyParams,
  emptyObjectSchema,
);

export type TDeleteFamilyParams = z.infer<typeof deleteFamilyParams>;
