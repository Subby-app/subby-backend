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

  static verify = async (req: Request, res: Response) => {
    const { email } = req.body;
    const { message, data } = await AuthService.verify(email);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  };

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { message, data } = await AuthService.login(email, password);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  };
}
