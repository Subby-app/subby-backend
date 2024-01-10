/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@/utils/exceptions';
import { FamilyService } from './family.service';

const familyService = new FamilyService();

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, label } = req.body;
    const data = await familyService.create(req.user?._id!, name, label);

    res.status(HttpStatus.CREATED).json({
      message: 'family created',
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.query;
    const data = await familyService.findOne({ _id: id as string });

    res.status(HttpStatus.OK).json({
      message: 'family found',
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function addSubscriber(req: Request, res: Response, next: NextFunction) {
  try {
    const { familyId, newSubscriberId, joinMethod } = req.body;
    const data = await familyService.addSubscriber(familyId, newSubscriberId, joinMethod);

    res.status(HttpStatus.OK).json({
      message: 'subscriber added to family successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
}
