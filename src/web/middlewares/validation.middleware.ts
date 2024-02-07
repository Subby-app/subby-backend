import { HttpStatus } from '@/utils/exceptions';
import { BaseHttpResponse } from '@/utils/base-Http-response.utils';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export function validateRequest(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({ body: req.body, params: req.params, query: req.query });

    const errors: string[] = [];
    if (!result.success) {
      result.error.errors.forEach((issue) => {
        errors.push(`${issue.path.join('.')} is ${issue.message}`);
      });
      const response = BaseHttpResponse.failed('validation error', errors);
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(response);
    } else {
      req.query = result.data.query;
      req.params = result.data.params;
      req.body = result.data.body;
      return next();
    }
  };
}
