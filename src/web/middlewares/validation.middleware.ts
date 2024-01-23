import { HttpStatus } from '@/utils/exceptions';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';

export type TRequestField = 'body' | 'params' | 'query' | 'headers';

/**
 * Validates the incoming request field {@link TRequestField}.
 *
 * Utilizes joi.
 * @param schema - joi schema.
 * @param requestField - request field to validate {@link TRequestField}.
 */
export function validation(schema: Joi.Schema, requestField: TRequestField): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const validationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    const dataToValidate = req[requestField];
    try {
      const value = await schema.validateAsync(dataToValidate, validationOptions);
      req[requestField] = value;
      next();
    } catch (e: any) {
      const errors: string[] = [];
      e.details.forEach((error: Joi.ValidationErrorItem) => {
        errors.push(error.message);
      });
      res.status(HttpStatus.BAD_REQUEST).send({ errors: errors });
    }
  };
}
