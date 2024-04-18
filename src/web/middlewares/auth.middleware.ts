import { Request, Response, NextFunction } from 'express';
import { verifyToken, Token } from '@/utils/token.util';
import { User } from '../../data/models/user.model';
import { NotFoundException, UnauthorizedException } from '@/utils/exceptions/index';
import jwt from 'jsonwebtoken';

/**
 * Checks if the incoming request has authorization bearer header.
 */
export async function authenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  const authError = new UnauthorizedException({ message: 'You are not authorized' });
  try {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
      return next(authError);
    }

    const accessToken = bearer.split('Bearer ')[1].trim();

    const payload: Token | jwt.JsonWebTokenError = await verifyToken(accessToken);

    if (payload instanceof jwt.JsonWebTokenError) {
      return next(authError);
    }

    const user = await User.findById(payload.id).exec();

    if (!user) {
      return next(new NotFoundException({ message: 'user not found' }));
    }

    req.user = user;
    return next();
  } catch (error) {
    return next(authError);
  }
}
