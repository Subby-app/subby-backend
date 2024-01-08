import { Document } from 'mongoose';

export interface IFamily extends Document {
  creator: string;
  name: string;
  members: string[];
  type: string;
  maxCount: number;
  membershipPrice: number;
  membersLinks: string[];
}
