import { IUser } from 'data/interfaces/IUser';

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}
