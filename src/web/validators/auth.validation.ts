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

export type TSignupUserBody = z.infer<typeof signupUserBody>;

const loginUserBody = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const loginUser = incomingRequestSchema(loginUserBody, emptyObjectSchema, emptyObjectSchema);

export type TLoginUserBody = z.infer<typeof loginUserBody>;

const validateOtpBody = z.object({
  otp: otpSchema,
});

export const validateOtp = incomingRequestSchema(
  validateOtpBody,
  emptyObjectSchema,
  emptyObjectSchema,
);

export type TValidateOtpBody = z.infer<typeof validateOtpBody>;

// email should come from req.user
const verifyEmailBody = z.object({
  email: emailSchema,
  otp: otpSchema,
});

export const verifyEmail = incomingRequestSchema(
  verifyEmailBody,
  emptyObjectSchema,
  emptyObjectSchema,
);

export type TVerifyEmailBody = z.infer<typeof verifyEmailBody>;

const sendOTPBody = z.object({
  email: emailSchema,
});

export const sendOTP = incomingRequestSchema(sendOTPBody, emptyObjectSchema, emptyObjectSchema);

export type TsendOTPBody = z.infer<typeof sendOTPBody>;

const changePasswordBody = z.object({
  email: emailSchema,
  currentPassword: passwordSchema,
  newPassword: passwordSchema,
});

export const changePassword = incomingRequestSchema(
  changePasswordBody,
  emptyObjectSchema,
  emptyObjectSchema,
);

export type TchangePasswordBody = z.infer<typeof changePasswordBody>;

const forgotPasswordBody = z.object({
  email: emailSchema,
});

export const forgotPassword = incomingRequestSchema(
  forgotPasswordBody,
  emptyObjectSchema,
  emptyObjectSchema,
);

export type TforgotPasswordBody = z.infer<typeof forgotPasswordBody>;

const resetPasswordBody = z.object({
  email: emailSchema,
  newPassword: passwordSchema,
  otp: otpSchema,
});

export const resetPassword = incomingRequestSchema(
  resetPasswordBody,
  emptyObjectSchema,
  emptyObjectSchema,
);

export type TresetPasswordBody = z.infer<typeof resetPasswordBody>;
