import { Router } from 'express';
import { authenticated, validateRequest } from '../middlewares/index';
import { AuthController } from '../controllers/auth.controller';
import { loginUser, signupUser, verifyEmail } from '../../web/validators/auth.validation';

export const authRouter = Router();

// authRouter.get('/otp', authenticated, authController.sendOtp);

// authRouter.get('/reset/password', authenticated, authController.resetPasswordRequest);

authRouter.post('/signup', validateRequest(signupUser), AuthController.signup);

authRouter.post('/verify', authenticated, AuthController.verify);

authRouter.post('/login', validateRequest(loginUser), AuthController.login);

// authRouter.post(
//   '/verify/otp',
//   authenticated,
//   validateRequest(verifyEmail),
//   authController.verifyOtp,
// );

// authRouter.post(
//   '/verify/account',
//   validateRequest(verifyEmail),
//   authenticated,
//   authController.verifyEmail,
// );

// authRouter.post(
//   '/reset/password',
//   validateRequest(verifyEmail)
//   authenticated,
//   authController.resetPassword,
// );
