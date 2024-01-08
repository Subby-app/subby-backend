import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { HttpStatus } from '@/utils/exceptions';

const authService = new AuthService();

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, firstName, lastName, password, username, phoneNumber } = req.body;
    const data = await authService.register(email, firstName, lastName, password, username, phoneNumber);

    res.status(HttpStatus.OK).json({
      message: 'successful signup',
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const {email, password} = req.body;
    const data = await authService.login(email, password);

    res.status(HttpStatus.OK).json({
      message: 'successful login',
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function sendOtp(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await authService.sendOtp(req.user?.email!);

    res.status(HttpStatus.OK).json({
      message: 'otp has been sent',
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyOtp(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await authService.verifyOtp(req.user?.email!, req.body.otp);

    res.status(HttpStatus.OK).json({
      message: 'otp is valid',
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await authService.verifyAccount(req.user?.email!);

    res.status(HttpStatus.OK).json({
      message: 'an otp has been to your email',
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await authService.verifyEmail(req.user?.email!, req.body.otp);

    res.status(HttpStatus.OK).json({
      message: 'your account is verified',
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function resetPasswordRequest(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await authService.resetPasswordRequest(req.user?.email!);

    res.status(HttpStatus.OK).json({
      message: 'an otp has been sent to your email',
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function resetPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await authService.resetPassword(req.user?.email!, req.body.newPassword);

    res.status(HttpStatus.OK).json({
      message: 'password reset successful',
      data,
    });
  } catch (error) {
    next(error);
  }
}