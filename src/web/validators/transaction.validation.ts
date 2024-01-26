import Joi from 'joi';

import {
  TransanctionCurrencies,
  TransanctionStatuses,
  TransanctionTypes,
} from '../../utils/helpers/transaction.helpers';

const transactionTypes = Joi.string()
  .valid(...TransanctionTypes)
  .lowercase()
  .label('Transaction type');

const transactionStatus = Joi.string()
  .valid(...TransanctionStatuses)
  .lowercase()
  .label('Transaction status');

const methodObjects = Joi.string().allow(null).default(null).lowercase().label('Method');

const transanctionCurrencies = Joi.string()
  .valid(...TransanctionCurrencies)
  .label('Transaction currency');

const transactionMethod = Joi.object({
  bank: methodObjects.label('Bank'),
  channel: methodObjects.label('Channel'),
  cardType: methodObjects.label('Card type'),
}).label('Method');

export const createTransactionValidation = Joi.object({
  userId: Joi.string().required().label('User ID'),
  type: transactionTypes.required(),
  status: transactionStatus.required(),
  amount: Joi.number().required().label('Amount'),
  method: transactionMethod.label('Transaction method'),
  tax: Joi.number().default(0).label('Tax'),
  currency: transanctionCurrencies.default('NGN'),
  recipent: Joi.string().allow(null).default(null).label('Recipient'),
});
