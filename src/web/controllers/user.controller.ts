/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Request, Response } from 'express';
import { UserService } from '../../logic/services/index';
import { BaseHttpResponse } from '../../utils/base-Http-response.utils';
import { HttpStatus } from '../../utils/exceptions/http-status.enum';

export class UserController {
  static async getAll(req: Request, res: Response) {
    const { message, data } = await UserService.getAll();
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }

  static async create(req: Request, res: Response) {
    const { message, data } = await UserService.create(req.body);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.CREATED).json(result);
  }

  static async getById(req: Request, res: Response) {
    const userId = req.params.id;

    const { message, data } = await UserService.getById(userId);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }

  static async update(req: Request, res: Response) {
    const userId = req.user?._id!;

    const { message, data } = await UserService.update(userId, req.body);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }

  static async delete(req: Request, res: Response) {
    const userId = req.user?._id!;

    const { message, data } = await UserService.delete(userId);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }
}
