import { IUser } from 'data/interfaces/user.interface';

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}
