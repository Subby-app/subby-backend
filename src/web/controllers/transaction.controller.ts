import { Request, Response, NextFunction } from 'express';
import { TransactionService } from '../../logic/services/transaction.service';
import { HttpStatus } from '@/utils/exceptions';

export class TransactionController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await TransactionService.create(req.body);

      res.status(HttpStatus.OK).json({
        message: 'Transaction created',
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await TransactionService.getAll();

      res.status(HttpStatus.OK).json({
        message: 'Transactions fetched',
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await TransactionService.getById(req.params.id);

      res.status(HttpStatus.OK).json({
        message: 'Transaction fetched',
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await TransactionService.getUserTransaction(req.params.userId);

      res.status(HttpStatus.OK).json({
        message: 'User transaction fetched',
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await TransactionService.update(req.params.id, req.body);

      res.status(HttpStatus.OK).json({
        message: 'Transaction updated',
        result,
      });
    } catch (error) {
      next(error);
    }
  }
}
