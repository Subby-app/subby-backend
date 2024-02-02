import Joi from 'joi';
import { emailSchema, nameSchema, phoneNumberSchema } from './lib/common-schema-validation';

const passwordSchema = Joi.string().label('Password');
const otpSchema = Joi.string().min(6).label('OTP');
const newPasswordSchema = Joi.string().label('New Password');

export const SignupValidation = Joi.object({
  body: Joi.object({
    email: emailSchema.required().label('email'),
    firstName: nameSchema.required().label('firstName'),
    lastName: nameSchema.required().label('LastName'),
    username: nameSchema.required().label('UserName'),
    password: passwordSchema.required().label('Password'),
    phoneNumber: phoneNumberSchema.required().label('Phone nUmber'),
  }),
});

export const LoginValidation = Joi.object({
  body: Joi.object({
    email: emailSchema.required().label('email'),
    password: passwordSchema.required().label('Password'),
  }),
});

export const VerifyOtpValidation = Joi.object({
  body: Joi.object({
    otp: otpSchema.required().label('otp'),
  }),
});

export const ResetPasswordValidation = Joi.object({
  body: Joi.object({
    newPassword: newPasswordSchema.label('Password'),
    otp: otpSchema.required().label('otp'),
  }),
});
