import { z } from 'zod';
import { Types } from 'mongoose';

export const incomingRequestSchema = (
  body: z.AnyZodObject,
  params: z.AnyZodObject,
  query: z.AnyZodObject,
) => z.object({ body, params, query });

export const priceSchema = z
  .number()
  .positive({ message: 'Price must be a positive number' })
  .transform((value) => Math.round(value * 100) / 100)
  .refine((value) => !isNaN(value), { message: 'Price must be a valid number' });

export const emailSchema = z.string().email().trim().toLowerCase().max(255);

export const descriptionSchema = z
  .string()
  .trim()
  .toLowerCase()
  .refine((value) => value !== 'null', { message: "description cannot be 'null'" });

export const nameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1)
  .max(255)
  .refine((value) => value !== 'null', { message: "name cannot be 'null'" });

export const numberSchema = z.number().int().positive().min(0);

export const positiveIntSchema = z.number().int().positive();

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

export const accountNumberSchema = z
  .string()
  .trim()
  .regex(/^\d{10}$/);

export const usernameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(3)
  .max(20)
  .regex(/^[a-z]\w{2,19}$/);

export const emptyObjectSchema = z.object({}).strict();

export const otpSchema = z.string().min(+process.env.OTP_SIZE!);

export const urlSchema = z.string().url();

export const booleanSchema = z.enum(['true', 'false']).transform((value) => value === 'true');

export const paginationSchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(5),
  sort: z.enum(['asc', 'desc']).default('asc'),
  sortField: z.enum(['name', 'createdAt']).default('createdAt'),
});
