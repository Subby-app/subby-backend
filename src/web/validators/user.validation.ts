import Joi from 'joi';
import { z } from 'zod';
import {
  emailSchema,
  emailSchemaZ,
  emptyObject,
  nameSchema,
  nameSchemaZ,
  passwordSchemaZ,
  phoneNumberZ,
  usernameZ,
  objectIdSchema,
  phoneNumberSchema,
  usernameSchema,
} from './lib/common-schema-validation';

const createUserBody = z.object({
  email: emailSchemaZ,
  firstName: nameSchemaZ,
  lastName: nameSchemaZ,
  password: passwordSchemaZ,
  username: usernameZ,
  phoneNumber: phoneNumberZ,
});

export const createUser = z.object({
  body: createUserBody,
  params: emptyObject,
  query: emptyObject,
});

// move to a dto module
export type TCreateUserBody = z.infer<typeof createUserBody>;

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
    username: usernameSchema.label('Username'),
    verified: Joi.boolean().label('Verified'),
    phoneNumber: phoneNumberSchema.label('Phone Number'),
    accountNumber: Joi.string().label('Account Number'),
  }),
  params: Joi.object({
    id: objectIdSchema.required(),
  }),
});
