import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../utils/exceptions';

export function handleInvalidRoutes(req: Request, res: Response, next: NextFunction) {
  res.status(HttpStatus.NOT_FOUND).json({ error: 'not found' });
}
