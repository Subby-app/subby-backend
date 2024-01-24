import Joi from 'joi';

const email = Joi.string().email().lowercase();
const password = Joi.string().min(6);
const otp = Joi.string().min(6);

export const signup = Joi.object({
  email: email.required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: password.required(),
  username: Joi.string().required(),
  phoneNumber: Joi.string().regex(/^\d+$/).length(13).required(),
});

export const login = Joi.object({
  email: email.required(),
  password: password.required(),
});

export const verifyOtp = Joi.object({
  otp: otp.required(),
});

export const resetPassword = Joi.object({
  newPassword: password.required(),
  otp: otp.required(),
});