import { z } from 'zod';
import {
  nameSchema,
  objectIdSchema,
  incomingRequestSchema,
  emptyObjectSchema,
  emailSchema,
  booleanSchema,
  paginationSchema,
  positiveIntSchema,
} from './lib/common-schema-validation';
import { Encryption } from '@/utils/encryption.utils';
import { ApplicationOnBoardingTypes } from '@/utils/helpers/application.helper';

// family/:id
const id = objectIdSchema;

const onboarding = z.discriminatedUnion('type', [
  z.object({ type: z.literal(ApplicationOnBoardingTypes[0]), url: z.string().url() }),
  z.object({
    type: z.literal(ApplicationOnBoardingTypes[1]),
    email: emailSchema,
    password: z
      .string()
      .min(1)
      .transform(async (value) => await Encryption.encryptText(value, 10)),
  }),
  z.object({ type: z.literal(ApplicationOnBoardingTypes[2]) }),
]);

export type TOnboarding = z.infer<typeof onboarding>;

const tenure = z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'biannually', 'annually']);

export type TTenure = z.infer<typeof tenure>;

const createFamilyBody = z.object({
  name: nameSchema,
  appId: objectIdSchema,
  planId: objectIdSchema,
  activeSubscribers: positiveIntSchema,
  availableSlots: positiveIntSchema,
  subscriptionStart: z.coerce.date(),
  tenure,
  onboarding,
});

export const createFamily = incomingRequestSchema(
  createFamilyBody,
  emptyObjectSchema,
  emptyObjectSchema,
);

export type TCreateFamilyBody = z.infer<typeof createFamilyBody>;

const findFamiliesQuery = z
  .object({
    name: nameSchema.optional(),
    appId: objectIdSchema.optional(),
    planId: objectIdSchema.optional(),
    // owner: objectIdSchema.optional(),
    // isFull: booleanSchema.optional(),
    tenure: tenure.optional(),
  })
  .merge(paginationSchema);

const findSubFamiliesQuery = z
  .object({
    // familyId: objectIdSchema.optional(), //TODO query based on family.planId or .appId?
    joinMethod: z.enum(['join', 'invite']).optional(), // TODO no duplication
  })
  .merge(paginationSchema);

export type TFindFamiliesQuery = z.infer<typeof findFamiliesQuery>;
export type TFindSubFamiliesQuery = z.infer<typeof findSubFamiliesQuery>;

export const findFamilies = incomingRequestSchema(
  emptyObjectSchema,
  emptyObjectSchema,
  findFamiliesQuery,
);

export const findSubFamilies = incomingRequestSchema(
  emptyObjectSchema,
  emptyObjectSchema,
  findSubFamiliesQuery,
);

const findFamilyParams = z.object({
  id,
});

const findFamilyQuery = z.object({
  subscriptions: booleanSchema.optional(),
});

export type TFindFamilyQuery = z.infer<typeof findFamilyQuery>;

export const findFamily = incomingRequestSchema(
  emptyObjectSchema,
  findFamilyParams,
  findFamilyQuery,
);

const updateFamilyBody = z.object({
  name: nameSchema.optional(),
  newOnboarding: onboarding.optional(),
  availableSlots: positiveIntSchema.optional(),
});

const updateFamilyParams = z.object({
  id,
});

export const updateFamily = incomingRequestSchema(
  updateFamilyBody,
  updateFamilyParams,
  emptyObjectSchema,
);

export type TUpdateFamilyBody = z.infer<typeof updateFamilyBody>;

export type TUpdateFamilyParams = z.infer<typeof updateFamilyParams>;

const deleteFamilyParams = z.object({
  id,
});

export const deleteFamily = incomingRequestSchema(
  emptyObjectSchema,
  deleteFamilyParams,
  emptyObjectSchema,
);

export type TDeleteFamilyParams = z.infer<typeof deleteFamilyParams>;

const joinMethod = z.union([z.literal('join'), z.literal('invite')]);

export type TJoinMethod = z.infer<typeof joinMethod>;

const joinFamilyParam = z.object({
  id,
});

// const joinFamilyQuery = z.object({
//   joinMethod,
// });

export const joinFamily = incomingRequestSchema(
  emptyObjectSchema,
  joinFamilyParam,
  emptyObjectSchema,
);

const updateFamilySubscribersParam = z.object({
  id,
  userId: id,
});

const updateFamilySubscribersQuery = z.object({
  revokeAccess: booleanSchema.optional(),
});

export const updateFamilySubscriber = incomingRequestSchema(
  emptyObjectSchema,
  updateFamilySubscribersParam,
  updateFamilySubscribersQuery,
);
