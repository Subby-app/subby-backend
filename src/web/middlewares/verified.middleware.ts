/* eslint-disable @typescript-eslint/no-unused-vars */
import { ForbiddenException } from '@/utils/exceptions';
import { authenticated } from './auth.middleware';
import { Request, Response, NextFunction } from 'express';
/**
 * Allows access to a resource depending on the verified status of a user
 *
 * Must be mounted after the {@link authenticated} middleware
 * to avoid `req.user` being undefined
 * @param verifiedUser defines what verification status should proceed
 */
export function verifiedGuard(verifiedUser: boolean) {
  return (req: Request, res: Response, next: NextFunction) => {
    switch (verifiedUser) {
      case true:
        if (req.user?.verified) next();
        else
          next(
            new ForbiddenException({
              message: 'only verified users can access this resource',
            }),
          );
        break;
      case false:
        if (!req.user?.verified) next();
        else
          next(
            new ForbiddenException({
              message: 'only unverified users can access this resource',
            }),
          );
        break;
      default:
        break;
    }
  };
}
