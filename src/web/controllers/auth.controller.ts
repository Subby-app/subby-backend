/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Request, Response } from 'express';
import { AuthService } from '../../logic/services/auth.service';
import { HttpStatus } from '@/utils/exceptions';
import { BaseHttpResponse } from '@/utils/base-Http-response.utils';

export class AuthController {
  static signup = async (req: Request, res: Response) => {
    const { message, data } = await AuthService.signup(req.body);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  };

  static verify = async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    const { message } = await AuthService.verify(email, otp);
    const result = BaseHttpResponse.success(message);

    res.status(HttpStatus.OK).json(result);
  };

  static sendOTP = async (req: Request, res: Response) => {
    const { email } = req.body;
    const { message } = await AuthService.sendOTP(email);
    const result = BaseHttpResponse.success(message);

    res.status(HttpStatus.OK).json(result);
  };

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { message, data } = await AuthService.login(email, password);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  };

  static changePassword = async (req: Request, res: Response) => {
    const { email, currentPassword, newPassword } = req.body;
    const { message } = await AuthService.changePassword(email, currentPassword, newPassword);
    const result = BaseHttpResponse.success(message);

    res.status(HttpStatus.OK).json(result);
  };

  static forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    const { message } = await AuthService.forgotPassword(email);
    const result = BaseHttpResponse.success(message);

    res.status(HttpStatus.OK).json(result);
  };

}
