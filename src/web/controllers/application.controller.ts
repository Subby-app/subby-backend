import { Request, Response } from 'express';
import { ApplicationService } from '@/logic/services/application.service';
import { BaseHttpResponse } from '@/utils/base-Http-response.utils';
import { HttpStatus } from '@/utils/exceptions';

export class ApplicationController {
  static async create(req: Request, res: Response) {
    const { message, data } = await ApplicationService.create(req.body);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }

  static async getAll(req: Request, res: Response) {
    const { message, data } = await ApplicationService.getAll(req.query);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }

  static async getById(req: Request, res: Response) {
    const { message, data } = await ApplicationService.getById(req.params.id);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }

  static async update(req: Request, res: Response) {
    const { message, data } = await ApplicationService.update(req.params.id, req.body);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }
  static async delete(req: Request, res: Response) {
    const { message } = await ApplicationService.delete(req.params.id);
    const result = BaseHttpResponse.success(message);

    res.status(HttpStatus.OK).json(result);
  }
}
