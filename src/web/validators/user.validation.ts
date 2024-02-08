import { z } from 'zod';
import {
  emailSchema,
  emptyObjectSchema,
  nameSchema,
  passwordSchema,
  phoneNumberSchema,
  usernameSchema,
  objectIdSchema,
  incomingRequestSchema,
} from './lib/common-schema-validation';

const createUserBody = z.object({
  email: emailSchema,
  firstName: nameSchema,
  lastName: nameSchema,
  password: passwordSchema,
  username: usernameSchema,
  phoneNumber: phoneNumberSchema,
});

export const createUser = incomingRequestSchema(
  createUserBody,
  emptyObjectSchema,
  emptyObjectSchema,
);

export type TCreateUserBody = z.infer<typeof createUserBody>;

const updateUserBody = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  username: usernameSchema,
});
const updateUserParams = z.object({
  id: objectIdSchema,
});

export const updateUser = z.object({
  body: updateUserBody,
  params: updateUserParams,
  query: emptyObjectSchema,
});

export type TUpdateUserBody = z.infer<typeof updateUserBody>;

export type TUpdateUserParams = z.infer<typeof updateUserParams>;
