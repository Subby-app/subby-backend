import Joi from 'joi';
import {
  emailSchema,
  nameSchema,
  objectIdSchema,
  phoneNumberSchema,
  usernameSchema,
} from './lib/common-schema-validation';

export const CreateUserValidation = Joi.object({
  body: Joi.object({
    email: emailSchema,
    firstName: nameSchema.label('First Name').required(),
    lastName: nameSchema.label('Last Name').required(),
    password: Joi.string().label('Password').required(),
    username: usernameSchema.label('Username').required(),
    phoneNumber: phoneNumberSchema.label('Phone Number').required(),
    verified: Joi.boolean().default(false).label('Verified'),
    families: Joi.array().items(objectIdSchema).label('Families'),
    maxFamilies: Joi.number().default(0).label('Max Families'),
    subscriptions: Joi.array().items(objectIdSchema).label('Subscriptions'),
    accountNumber: Joi.string().label('Account Number'),
    wallet: Joi.string().label('Wallet'),
    earnings: Joi.number().default(0).label('Earnings'),
  }),
});

export const UpdateUserValidation = Joi.object({
  body: Joi.object({
    firstName: nameSchema.label('First Name'),
    lastName: nameSchema.label('Last Name'),
    verified: Joi.boolean().label('Verified'),
    phoneNumber: phoneNumberSchema.label('Phone Number'),
    accountNumber: Joi.string().label('Account Number'),
  }),
  params: Joi.object({
    id: objectIdSchema.required(),
  }),
});
