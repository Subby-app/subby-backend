import Joi from 'joi';

const emailSchema = Joi.string().email().label('Email');
const passwordSchema = Joi.string().label('Password');
const firstNameSchema = Joi.string().label('First Name');
const lastNameSchema = Joi.string().label('Last Name');
const usernameSchema = Joi.string().label('Username');
const phoneNumberSchema = Joi.string().regex(/^\d+$/).length(11);
const otpSchema = Joi.string().min(6).label('OTP');
const newPasswordSchema = Joi.string().label('New Password');

export const SignupValidation = Joi.object({
  body: Joi.object({
    email: emailSchema.required(),
    firstName: firstNameSchema.required(),
    lastName: lastNameSchema.required(),
    username: usernameSchema.required(),
    password: passwordSchema.required(),
    phoneNumber: phoneNumberSchema.required(),
  }),
});

export const LoginValidation = Joi.object({
  body: Joi.object({
    email: emailSchema.required(),
    password: passwordSchema.required(),
  }),
});

export const VerifyOtpValidation = Joi.object({
  body: Joi.object({
    otp: otpSchema.required(),
  }),
});

export const ResetPasswordValidation = Joi.object({
  body: Joi.object({
    newPassword: newPasswordSchema,
    otp: otpSchema.required(),
  }),
});
