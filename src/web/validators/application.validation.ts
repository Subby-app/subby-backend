import { z } from 'zod';
import {
  emptyObjectSchema,
  incomingRequestSchema,
  nameSchema,
  objectIdSchema,
} from './lib/common-schema-validation';
import { ApplicationOnBoardingTypes } from '@/utils/helpers/application.helper';

const onBoardingTypeSchema = z.enum(ApplicationOnBoardingTypes);

//Create Application Body
const createApplicationBodySchema = z.object({
  appName: nameSchema,
  onBoardingType: onBoardingTypeSchema,
});
export const createApplicationSchema = incomingRequestSchema(
  createApplicationBodySchema,
  emptyObjectSchema,
  emptyObjectSchema,
);
export type TCreateApplicationBody = z.infer<typeof createApplicationBodySchema>;

//Find Application by Query
const findapplicationsQuerySchema = z.object({
  appName: nameSchema.optional(),
  onBoardingType: onBoardingTypeSchema.optional(),
});
export const findApplicationsSchema = incomingRequestSchema(
  emptyObjectSchema,
  emptyObjectSchema,
  findapplicationsQuerySchema,
);
export type TFindApplicationQuery = z.infer<typeof findapplicationsQuerySchema>;

//Update Application via Params
const updateApplicationBodySchema = z.object({
  appName: nameSchema.optional(),
  onBoardingType: onBoardingTypeSchema.optional(),
});
const updateApplicationParamsSchema = z.object({
  id: objectIdSchema,
});
export const updateApplicationSchema = z.object({
  body: updateApplicationBodySchema,
  params: updateApplicationParamsSchema,
  query: emptyObjectSchema,
});
export type TUpdateApplicationBodySchema = z.infer<typeof updateApplicationBodySchema>;
export type TUpdateApplicationParamsSchema = z.infer<typeof updateApplicationParamsSchema>;

//Delete Application via Params
const deleteApplicationParamsSchema = z.object({
  id: objectIdSchema,
});
export const deleteApplicationSchema = incomingRequestSchema(
  emptyObjectSchema,
  deleteApplicationParamsSchema,
  emptyObjectSchema,
);
export type TDeleteApplicationParams = z.infer<typeof deleteApplicationParamsSchema>;
