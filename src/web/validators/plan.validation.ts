import { z } from 'zod';
import {
  emptyObjectSchema,
  incomingRequestSchema,
  nameSchema,
  numberSchema,
  objectIdSchema,
  priceSchema,
} from './lib/common-schema-validation';
import { PlanOnBoardingTypes } from '@/utils/helpers/plan.helper';

const onBoardingTypeSchema = z.enum(PlanOnBoardingTypes);

//Create Plan Body
const createPlanBodySchema = z.object({
  applicationId: objectIdSchema,
  name: nameSchema,
  price: priceSchema,
  accountSlots: numberSchema,
  onBoardingType: onBoardingTypeSchema,
});
export const createPlanSchema = incomingRequestSchema(
  createPlanBodySchema,
  emptyObjectSchema,
  emptyObjectSchema,
);
export type TcreatePlanBody = z.infer<typeof createPlanBodySchema>;

//Find Application by query
const findPlanQuerySchema = z.object({
  applicationId: objectIdSchema.optional(),
  name: nameSchema.optional(),
  price: priceSchema.optional(),
  onBoardingType: onBoardingTypeSchema.optional(),
});

export const findPlanSchema = incomingRequestSchema(
  emptyObjectSchema,
  emptyObjectSchema,
  findPlanQuerySchema,
);
export type TFindPlanQuery = z.infer<typeof findPlanQuerySchema>;

//Update Plan via params
const updatePlanBodySchema = z.object({
  name: nameSchema.optional(),
  price: priceSchema.optional(),
  accountSlots: numberSchema.optional(),
  onBoarding: nameSchema.optional(),
});

const updatePlanParamsSchema = z.object({
  id: objectIdSchema,
});

export const updatePlanSchema = z.object({
  body: updatePlanBodySchema,
  params: updatePlanParamsSchema,
  query: emptyObjectSchema,
});

export type TupdatePlanBodySchema = z.infer<typeof updatePlanBodySchema>;
export type TupdatePlanParamsSchema = z.infer<typeof updatePlanParamsSchema>;

const deletePlanParamsSchema = z.object({
  id: objectIdSchema,
});

export const deletePlanSchema = incomingRequestSchema(
  emptyObjectSchema,
  deletePlanParamsSchema,
  emptyObjectSchema,
);

export type TDeletePlanParams = z.infer<typeof deletePlanParamsSchema>;
