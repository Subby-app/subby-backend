import { z } from 'zod';
import { nameSchema, priceSchema } from './lib/common-schema-validation';

const createPlanBodySchema = z.object({
  name: nameSchema,
  price: priceSchema,
  accountSlots: 
});
