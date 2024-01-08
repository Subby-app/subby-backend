import { Router } from 'express';
import { authenticated, validation } from '../../middlewares';
import * as authController from './auth.controller';
import * as validate from './auth.validation';

export const authRouter = Router();
const basePath = '/auth';

authRouter.get(`${basePath}/otp`, authenticated, authController.sendOtp);

authRouter.get(`${basePath}/verify/account`, authenticated, authController.verifyAccount);

authRouter.get(`${basePath}/reset/password`, authenticated, authController.resetPasswordRequest);

authRouter.post(`${basePath}/signup`, validation(validate.signup, 'body'), authController.signup);

authRouter.post(`${basePath}/login`, validation(validate.login, 'body'), authController.login);

authRouter.post(`${basePath}/verify/otp`, validation(validate.verifyOtp, 'body'), authenticated, authController.verifyOtp);

authRouter.post(`${basePath}/verify/account`, validation(validate.verifyOtp, 'body'), authenticated, authController.verifyEmail);

authRouter.post(`${basePath}/reset/password`, validation(validate.resetPassword, 'body'), authenticated, authController.resetPassword);