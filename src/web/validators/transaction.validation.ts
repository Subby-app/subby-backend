import Joi from 'joi';

import {
  TransanctionCurrencies,
  TransanctionStatuses,
  TransanctionTypes,
} from '../../utils/helpers/transaction.helpers';

export const createTransactionValidation = Joi.object({
  userId: Joi.string().required(),
  type: Joi.string()
    .valid(...TransanctionTypes)
    .required(),
  status: Joi.string()
    .valid(...TransanctionStatuses)
    .required(),
  amount: Joi.number().required(),
  method: Joi.object({
    channel: Joi.string().allow(null).default(null),
    bank: Joi.string().allow(null).default(null),
    cardType: Joi.string().allow(null).default(null),
  }),
  tax: Joi.number().default(0),
  currency: Joi.string()
    .valid(...TransanctionCurrencies)
    .default('NGN'),
  recipent: Joi.string().allow(null).default(null),
});
