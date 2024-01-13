import { Request, Response, NextFunction } from 'express';
import { HttpException, HttpStatus } from '../utils/exceptions';

export function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
  let message = error.message;
  if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
    console.log(error);
    message = 'Something went wrong, please reach out to our support';
  }
  res.status(status).json({ error: message });
}
