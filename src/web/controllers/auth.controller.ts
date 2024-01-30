/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../logic/services/auth.service';
import { HttpStatus } from '@/utils/exceptions';
import { BaseHttpResponse } from '@/utils/base-Http-response.utils';

export class AuthController {
  static signup = async (req: Request, res: Response) => {
    const { message, data } = await AuthService.register(req.body);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  };

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { message, data } = await AuthService.login(email, password);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  };

  // export async function sendOtp(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const data = await authService.sendOtp(req.user?.email!);

  //     res.status(HttpStatus.OK).json({
  //       message: 'otp has been sent',
  //       data,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // export async function verifyOtp(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const data = await authService.verifyOtp(req.user?.email!, req.body.otp);

  //     res.status(HttpStatus.OK).json({
  //       message: 'otp is valid',
  //       data,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // export async function verifyAccount(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const data = await authService.verifyAccount(req.user?.email!);

  //     res.status(HttpStatus.OK).json({
  //       message: 'an otp has been to your email',
  //       data,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // export async function verifyEmail(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const data = await authService.verifyEmail(req.user?.email!, req.body.otp);

  //     res.status(HttpStatus.OK).json({
  //       message: 'your account is verified',
  //       data,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // export async function resetPasswordRequest(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const data = await authService.resetPasswordRequest(req.user?.email!);

  //     res.status(HttpStatus.OK).json({
  //       message: 'an otp has been sent to your email',
  //       data,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // export async function resetPassword(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { newPassword, otp } = req.body;
  //     const data = await authService.resetPassword(req.user?.email!, newPassword, otp);

  //     res.status(HttpStatus.OK).json({
  //       message: 'password reset successful',
  //       data,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
