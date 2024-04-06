import { Router } from 'express';
import { authenticated, validateRequest } from '../middlewares/index';
import { AuthController } from '../controllers/auth.controller';
import {
  changePassword,
  forgotPassword,
  loginUser,
  resetPassword,
  sendOTP,
  signupUser,
  verifyEmail,
} from '../../web/validators/auth.validation';

export const authRouter = Router();

// authRouter.get('/otp', authenticated, authController.sendOtp);

// authRouter.get('/reset/password', authenticated, authController.resetPasswordRequest);

authRouter.post('/signup', validateRequest(signupUser), AuthController.signup);

// authRouter.get('/verify', AuthController.verify);

authRouter.post('/login', validateRequest(loginUser), AuthController.login);

authRouter.post('/verify/otp', validateRequest(verifyEmail), AuthController.verify);

authRouter.post('/send-otp', validateRequest(sendOTP), AuthController.sendOTP);

authRouter.post('/change/password', validateRequest(changePassword), AuthController.changePassword);

authRouter.post('/forgot/password', validateRequest(forgotPassword), AuthController.forgotPassword);

authRouter.post('/reset/password', validateRequest(resetPassword), AuthController.resetPassword);
