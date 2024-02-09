import { z } from 'zod';
import { Types } from 'mongoose';

export const incomingRequestSchema = (
  body: z.AnyZodObject,
  params: z.AnyZodObject,
  query: z.AnyZodObject,
) => z.object({ body, params, query });

export const emailSchema = z.string().email().trim().toLowerCase().max(255);

export const nameSchema = z
  .string()
  .trim()
  .toLowerCase() //?lowercase?
  .min(1)
  .max(255)
  .refine((value) => value !== 'null', { message: "name cannot be 'null'" });

export const objectIdSchema = z
  .string()
  .trim()
  .refine((value) => Types.ObjectId.isValid(value), { message: 'invalid objectId' });

export const passwordSchema = z
  .string()
  .min(8)
  .max(35)
  .trim()
  .refine((value) => /\d/.test(value), { message: 'password must contain at least one digit' })
  .refine((value) => /\W+/.test(value), {
    message: 'password must contain at least one non-word character',
  })
  .refine((value) => !/[.\n]/.test(value), {
    message: 'password cannot contain periods or newline characters ',
  })
  .refine((value) => /[A-Z]/.test(value), {
    message: 'password must contain at least one uppercase letter',
  })
  .refine((value) => /[a-z]/.test(value), {
    message: 'password must contain at least one uppercase letter',
  });

export const phoneNumberSchema = z
  .string()
  .trim()
  .regex(/^(\+?234|0)(70|[89][01])\d{8}$/);

export const usernameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(3)
  .max(20)
  .regex(/^[a-z]\w{2,19}$/);

export const emptyObjectSchema = z.object({}).strict();

export const otpSchema = z.string().min(+process.env.OTP_SIZE!);
