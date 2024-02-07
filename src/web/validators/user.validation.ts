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

// export const createUser = z.object({
//   body: createUserBody,
//   params: emptyObjectSchema,
//   query: emptyObjectSchema,
// });

// move to a dto module
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
