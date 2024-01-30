import Joi from 'joi';

const objectIdSchema = Joi.alternatives(
  Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({ 'string.pattern.base': 'Invalid object id' }),
  Joi.object().keys({
    id: Joi.any(),
    bsontype: Joi.allow('ObjectId'),
  }),
);

export const CreateWalletValidation = Joi.object({
  body: Joi.object({
    userId: objectIdSchema.required(),
    balance: Joi.number().default(0).label('Balance'),
    availableBalance: Joi.number().default(0).label('Available Balance'),
    status: Joi.string().label('Status'),
  }),
});

export const UpdateWalletValidation = Joi.object({
  body: Joi.object({
    balance: Joi.number().label('Balance'),
    availableBalance: Joi.number().label('Available Balance'),
    status: Joi.string().label('Status'),
  }),
  params: Joi.object({
    id: objectIdSchema.required(),
  }),
});
