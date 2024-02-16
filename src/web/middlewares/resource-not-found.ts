import { NotFoundException } from '../../utils/exceptions/not-found.exception';
import { Request, Response, NextFunction } from 'express';

export function resourceNotFoundHandler(req: Request, res: Response, next: NextFunction) {
  const error = new NotFoundException({
    message: 'Resource Not Found',
    path: req.originalUrl,
  });

  next(error);
}
