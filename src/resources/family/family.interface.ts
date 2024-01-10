import { Document } from 'mongoose';
import { IUser } from '../user/user.interface';

export interface IFamily extends Document {
  owner: string;
  name: string;
  subscribers: {
    subscriber: IUser;
    joinedAt: string;
    joinMethod: string;
    isActive: boolean;
    revokeAccess: boolean;
  }[];
  type: string;
  maxSubscribers: number;
  spotsAvailable: number;
  isFull: boolean;
  membershipPrice: number;
  subscribeLinks: string[];
}
