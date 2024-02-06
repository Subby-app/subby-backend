import Joi from 'joi';
import { z } from 'zod';
import { Types } from 'mongoose';
// import * as joiPassword from 'joi-password';

export const emailSchema = Joi.string().label('Email').trim().lowercase().email().max(255);

export const emailSchemaZ = z.string().email().trim().toLowerCase().max(255);

export const nameSchema = Joi.string()
  .label('Name')
  .trim()
  .lowercase()
  .min(1)
  .max(255)
  .invalid('null')
  .messages({
    'string.min': '{#label} is too short',
    'string.max': `{#label} is too long`,
  });

export const nameSchemaZ = z
  .string()
  .trim()
  .toLowerCase()
  .min(1)
  .max(255)
  .refine((value) => value !== 'null', { message: "name cannot be 'null'" });

export const objectIdSchema = Joi.alternatives(
  Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({ 'string.pattern.base': 'Invalid object id' }),
  Joi.object().keys({
    id: Joi.any(),
    bsontype: Joi.allow('ObjectId'),
  }),
);

export const objectIdZ = z
  .string()
  .trim()
  .refine((value) => Types.ObjectId.isValid(value), { message: 'invalid objectId' });

// export const passwordSchema = joiPassword
//   .string()
//   .label('Password')
//   .minOfUppercase(1)
//   .minOfSpecialCharacters(1)
//   .minOfNumeric(1)
//   .noWhiteSpaces()
//   .min(6)
//   .max(128)
//   .messages({
//     'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
//     'password.minOfSpecialCharacters': '{#label} should contain at least {#min} special characters',
//     'password.minOfNumeric': '{#label} should contain at least {#min} numbers',
//     'password.noWhiteSpaces': '{#label} cannot contain white spaces',
//   });

export const passwordSchemaZ = z
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

export const phoneNumberSchema = Joi.string()
  .trim()
  .label('Phone number')
  .pattern(/^(\+?234|0)(70|[89][01])\d{8}$/)
  .messages({
    'string.pattern.base': '{#label} is not valid',
    'any.required': '{#label} is required',
  });

export const phoneNumberZ = z
  .string()
  .trim()
  .regex(/^(\+?234|0)(70|[89][01])\d{8}$/);

export const usernameSchema = Joi.string()
  .lowercase()
  .trim()
  .label('Username')
  .min(3)
  .max(20)
  .pattern(/^[a-z]\w{2,19}$/)
  .messages({
    'string.pattern.base':
      '{#label} can only contain letters, numbers, and underscore and must begin with a letter',
  });

export const usernameZ = z
  .string()
  .trim()
  .toLowerCase()
  .min(3)
  .max(20)
  .regex(/^[a-z]\w{2,19}$/);

export const emptyObject = z.object({}).strict();
