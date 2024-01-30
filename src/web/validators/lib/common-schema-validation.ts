import Joi from 'joi';
// import * as joiPassword from 'joi-password';

export const emailSchema = Joi.string().label('Email').trim().lowercase().email().max(255);

export const makeConfirmPasswordSchema = (reference: string) =>
  Joi.string()
    .label('Confirm password')
    .trim()
    .equal(Joi.ref(reference))
    .messages({ 'any.only': 'Passwords do not match' });

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

export const objectIdSchema = Joi.alternatives(
  Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({ 'string.pattern.base': 'Invalid object id' }),
  Joi.object().keys({
    id: Joi.any(),
    bsontype: Joi.allow('ObjectId'),
  }),
);

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

export const phoneNumberSchema = Joi.string()
  .trim()
  .label('Phone number')
  .pattern(/^(\+?234|0)(70|[89][01])\d{8}$/)
  .messages({
    'string.pattern.base': '{#label} is not valid',
    'any.required': '{#label} is required',
  });

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
