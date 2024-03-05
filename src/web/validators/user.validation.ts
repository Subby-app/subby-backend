import { z } from 'zod';
import {
  emailSchema,
  emptyObjectSchema,
  nameSchema,
  passwordSchema,
  phoneNumberSchema,
  usernameSchema,
  incomingRequestSchema,
  accountNumberSchema,
} from './lib/common-schema-validation';
import { UserRepository } from '@/data/repositories';

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
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  username: usernameSchema.optional().refine(
    async (value) => {
      if (await UserRepository.findOne({ username: value })) return false;
      return true;
    },
    { message: 'this username is taken' },
  ),
  phoneNumber: phoneNumberSchema.optional().refine(
    async (value) => {
      if (await UserRepository.findOne({ phoneNumber: value })) return false;
      return true;
    },
    { message: 'this phone number is taken' },
  ),
  dob: z.coerce.date().optional(),
  accountNumber: accountNumberSchema.optional(),
});

export const updateUser = z.object({
  body: updateUserBody,
  params: emptyObjectSchema,
  query: emptyObjectSchema,
});

export type TUpdateUserBody = z.infer<typeof updateUserBody>;
