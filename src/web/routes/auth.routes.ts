import { Router } from 'express';
import { authenticated, validation } from '../middlewares';
import * as authController from '../controllers/auth.controller';
import * as validate from '../validators/auth.validation';

export const authRouter = Router();

authRouter.get('/otp', authenticated, authController.sendOtp);

authRouter.get('/verify/account', authenticated, authController.verifyAccount);

authRouter.get('/reset/password', authenticated, authController.resetPasswordRequest);

authRouter.post('/signup', validation(validate.signup, 'body'), authController.signup);

authRouter.post('/login', validation(validate.login, 'body'), authController.login);

authRouter.post('/verify/otp', validation(validate.verifyOtp, 'body'), authenticated, authController.verifyOtp,
);

authRouter.post('/verify/account',
  validation(validate.verifyOtp, 'body'),
  authenticated,
  authController.verifyEmail,
);

authRouter.post(
  '/reset/password',
  validation(validate.resetPassword, 'body'),
  authenticated,
  authController.resetPassword,
);
