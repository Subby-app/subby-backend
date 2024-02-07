import { z } from 'zod';
import {
  emailSchema,
  nameSchema,
  phoneNumberSchema,
  passwordSchema,
  usernameSchema,
  otpSchema,
  emptyObjectSchema,
  incomingRequestSchema,
} from './lib/common-schema-validation';

const signupUserBody = z.object({
  email: emailSchema,
  firstName: nameSchema,
  lastName: nameSchema,
  password: passwordSchema,
  username: usernameSchema,
  phoneNumber: phoneNumberSchema,
});

export const signupUser = incomingRequestSchema(
  signupUserBody,
  emptyObjectSchema,
  emptyObjectSchema,
);

const loginUserBody = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const loginUser = incomingRequestSchema(loginUserBody, emptyObjectSchema, emptyObjectSchema);

const validateOtpBody = z.object({
  otp: otpSchema,
});

export const validateOtp = incomingRequestSchema(
  validateOtpBody,
  emptyObjectSchema,
  emptyObjectSchema,
);

const verifyEmailBody = z.object({
  email: emailSchema,
  otp: otpSchema,
});

export const verifyEmail = incomingRequestSchema(
  verifyEmailBody,
  emptyObjectSchema,
  emptyObjectSchema,
);

const resetPasswordBody = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const resetPassword = incomingRequestSchema(
  resetPasswordBody,
  emptyObjectSchema,
  emptyObjectSchema,
);
