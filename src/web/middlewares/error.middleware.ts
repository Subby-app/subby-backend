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
    const response = BaseHttpResponse.failed(error.message, error);
    logger.error(error.innerException?.message || 'Unknown error', error.innerException?.stack);
    return res.status(error.status).json(response);
  }

  if (error instanceof ConflictException) {
    const response = BaseHttpResponse.failed(error.message, error.errors);
    return res.status(error.status).json(response);
  }

  if (error instanceof ApiException) {
    const response = BaseHttpResponse.failed(error.message, error.errors);
    return res.status(error.status).json(response);
  }

  if (error instanceof Error) {
    // Check for MongoDB duplicate key error (E11000) related to a specific field
    if (error.message.includes('duplicate key error collection')) {
      const fieldNameMatch = error.message.match(/index: (\w+)_1/);
      const fieldName = fieldNameMatch ? fieldNameMatch[1] : 'unknown';

      const errorMessage = getDuplicateKeyErrorMessage(error.message, fieldName);
      const conflictError = new ConflictException({ message: errorMessage });
      const response = BaseHttpResponse.failed(conflictError.message, conflictError.errors);
      return res.status(conflictError.status).json(response);
    }

    // Handle other errors
    logger.error(error.message, error.stack);
    const response = BaseHttpResponse.failed('Something Went Wrong');
    return res.status(500).json(response);
  }

  return next();
}

// Update the getDuplicateKeyErrorMessage function
export function getDuplicateKeyErrorMessage(errorMessage: string, fieldName: string): string {
  // Log the full MongoDB error message for debugging purposes
  logger.error(`MongoDB Duplicate Key Error: ${errorMessage}`);

  // If there's a specific error message related to the duplicate key, use it
  const match = errorMessage.match(/"errmsg": "(.+?)"/);
  const duplicateErrorMessage = match ? match[1] : 'already exist';

  return `${fieldName}: ${duplicateErrorMessage}`;
}
