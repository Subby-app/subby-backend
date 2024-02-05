import { Request, Response, NextFunction } from 'express';
import logger from '../../utils/logger.utils';
import { BaseHttpResponse } from '../../utils/base-Http-response.utils';
import { ServerException } from '../../utils/exceptions/server.exception';
import { ApiException } from '@/utils/exceptions/api.exception';
import { ConflictException } from '@/utils/exceptions/conflict.exception';

export function errorMiddleware(
  error: Error | BaseHttpResponse,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof SyntaxError && 'body' in error) {
    const response = BaseHttpResponse.failed(`Error parsing JSON: ${error.message}`, error);
    return res.status(400).json(response);
  }

  if (error instanceof ServerException) {
    logger.error(error.innerException?.message || 'Unknown error', error.innerException?.stack);
    const response = BaseHttpResponse.failed(error.message, error);
    return res.status(error.status).json(response);
  }

  if (error instanceof ConflictException) {
    const response = BaseHttpResponse.failed(error.message, error.errors);
    return res.status(error.status).json(response);
  }

  if (error instanceof ApiException) {
    const response = BaseHttpResponse.failed(error.message, error);
    return res.status(error.status).json(response);
  }

  if (error instanceof Error) {
    logger.error(error.message, error.stack);
    const response = BaseHttpResponse.failed('Something Went Wrong');
    return res.status(500).json(response);
  }

  return next();
}
