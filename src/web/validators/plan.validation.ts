import { z } from 'zod';
import {
  descriptionSchema,
  emptyObjectSchema,
  incomingRequestSchema,
  nameSchema,
  numberSchema,
  objectIdSchema,
  priceSchema,
  urlSchema,
} from './lib/common-schema-validation';

//Create Plan Body
const createPlanBodySchema = z.object({
  applicationId: objectIdSchema,
  planIcon: urlSchema,
  planName: nameSchema,
  instructions: descriptionSchema,
  price: priceSchema,
  accountSlots: numberSchema,
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
  planName: nameSchema.optional(),
  price: priceSchema.optional(),
});

export const findPlanSchema = incomingRequestSchema(
  emptyObjectSchema,
  emptyObjectSchema,
  findPlanQuerySchema,
);
export type TFindPlanQuery = z.infer<typeof findPlanQuerySchema>;

//Update Plan via params
const updatePlanBodySchema = z.object({
  planIcon: urlSchema.optional(),
  planName: nameSchema.optional(),
  price: priceSchema.optional(),
  accountSlots: numberSchema.optional(),
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
