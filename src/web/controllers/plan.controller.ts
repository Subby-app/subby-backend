import { PlanService } from '@/logic/services/plan.service';
import { BaseHttpResponse } from '@/utils/base-Http-response.utils';
import { HttpStatus } from '@/utils/exceptions';
import { Request, Response } from 'express';

export class PlanController {
  static async create(req: Request, res: Response) {
    const { message, data } = await PlanService.create(req.body);
    const result = await BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }

  static async getAll(req: Request, res: Response) {
    const { message, data } = await PlanService.getAll(req.query);
    const result = await BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }

  static async getById(req: Request, res: Response) {
    const { message, data } = await PlanService.getById(req.params.id);
    const result = await BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }

  static async update(req: Request, res: Response) {
    const { message, data } = await PlanService.update(req.params.id, req.body);
    const result = await BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }

  static async delete(req: Request, res: Response) {
    const { message } = await PlanService.delete(req.params.id);
    const result = await BaseHttpResponse.success(message);

    res.status(HttpStatus.OK).json(result);
  }
}
