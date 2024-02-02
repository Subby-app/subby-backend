import { Request, Response } from 'express';
import { FamilyService } from '../../logic/services/family.service';
import { BaseHttpResponse } from '../../utils/base-Http-response.utils';
import { HttpStatus } from '../../utils/exceptions/http-status.enum';

export class FamilyController {
  static async getAll(req: Request, res: Response) {
    const { message, data } = await FamilyService.getAll();
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }

  static async create(req: Request, res: Response) {
    const { message, data } = await FamilyService.create(req.body);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.CREATED).json(result);
  }

  static async getById(req: Request, res: Response) {
    const familyId = req.params.id;

    const { message, data } = await FamilyService.getById(familyId);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }

  static async getOwner(req: Request, res: Response) {
    const { message, data } = await FamilyService.getById(req.body);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }

  static async update(req: Request, res: Response) {
    const familyId = req.params.id;

    const { message, data } = await FamilyService.update(familyId, req.body);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }

  static async delete(req: Request, res: Response) {
    const familyId = req.params.id;

    const { message, data } = await FamilyService.delete(familyId);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }
}
