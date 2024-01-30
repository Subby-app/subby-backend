import { Router } from 'express';
import { authenticated, ValidateRequest } from '../middlewares/index';
import {AuthController} from '../controllers/auth.controller';
// import { CreateUserRequestDto } from '../../logic/dtos/auth/create-user-request.dto';
import {
  LoginValidation,
  ResetPasswordValidation,
  SignupValidation,
  VerifyOtpValidation,
} from '../../web/validators/auth.validation';
import { LoginRequestDto } from '../../logic/dtos/auth/login-request.dto';
import { VerifyOtpRequestDto } from '../../logic/dtos/auth/verify-otp-request.dto';
import { ResetPasswordRequestDto } from '../../logic/dtos/auth/reset-passwrod-request.dto';

export const authRouter = Router();

// authRouter.get('/otp', authenticated, authController.sendOtp);

// authRouter.get('/verify/account', authenticated, authController.verifyAccount);

// authRouter.get('/reset/password', authenticated, authController.resetPasswordRequest);

authRouter.post(
  '/signup',
  //   ValidateRequest.with(SignupValidation, CreateUserRequestDto),
  AuthController.signup,
);

authRouter.post(
  '/login',
  //   ValidateRequest.with(LoginValidation, LoginRequestDto),
  AuthController.login,
);

// authRouter.post(
//   '/verify/otp',
//   authenticated,
//   ValidateRequest.with(VerifyOtpValidation, VerifyOtpRequestDto),
//   authController.verifyOtp,
// );

// authRouter.post(
//   '/verify/account',
//   ValidateRequest.with(VerifyOtpValidation, VerifyOtpRequestDto),
//   authenticated,
//   authController.verifyEmail,
// );

// authRouter.post(
//   '/reset/password',
//   ValidateRequest.with(ResetPasswordValidation, ResetPasswordRequestDto),
//   authenticated,
//   authController.resetPassword,
// );
