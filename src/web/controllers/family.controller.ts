import { Request, Response } from 'express';
import { FamilyService } from '../../logic/services/family.service';
import { BaseHttpResponse } from '../../utils/base-Http-response.utils';
import { HttpStatus } from '../../utils/exceptions/http-status.enum';
import { TFindFamiliesQuery, TFindFamilyQuery } from '../validators/family.validation';

export class FamilyController {
  static async create(req: Request, res: Response) {
    const owner = req.user?._id;
    const { message, data } = await FamilyService.create(owner, req.body);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.CREATED).json(result);
  }

  static async getAll(req: Request, res: Response) {
    const filter = req.query as unknown as TFindFamiliesQuery;
    const { message, data } = await FamilyService.getAll(filter);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }

  static async getFamiliesToJoin(req: Request, res: Response) {
    const { message, data } = await FamilyService.getFamiliesToJoin(
      req.query as unknown as TFindFamiliesQuery,
      req.user?._id,
    );
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }

  static async getOverview(req: Request, res: Response) {
    const { message, data } = await FamilyService.getOverview(req.user?._id);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }

  static async joinFamily(req: Request, res: Response) {
    const { message, data } = await FamilyService.joinFamily(req.params.id, req.user?._id);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }

  static async getById(req: Request, res: Response) {
    const familyId = req.params.id;
    const query = req.query as TFindFamilyQuery;

    const { message, data } = await FamilyService.getById(familyId, query);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }

  static async getOwner(req: Request, res: Response) {
    const reqUser = req.user?._id;
    const filter = req.query as unknown as TFindFamiliesQuery;
    const { message, data } = await FamilyService.getFamilyOwner(filter, reqUser);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }

  static async getSubscribedFamilies(req: Request, res: Response) {
    const filter = req.query as unknown as TFindFamiliesQuery;
    const { message, data } = await FamilyService.getSubscribedFamilies(filter, req.user?._id);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }

  static async update(req: Request, res: Response) {
    const familyId = req.params.id;
    const reqUser = req.user?._id;

    const { message, data } = await FamilyService.update(familyId, req.body, reqUser);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }

  static async delete(req: Request, res: Response) {
    const familyId = req.params.id;
    const reqUser = req.user?._id;

    const { message, data } = await FamilyService.delete(familyId, reqUser);
    const result = BaseHttpResponse.success(message, data);

    res.status(HttpStatus.OK).json(result);
  }
}
