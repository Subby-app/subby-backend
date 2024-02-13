import { Document, Types } from 'mongoose';

export interface ISubscriber extends Document {
  userId: Types.ObjectId;
  familyId: Types.ObjectId;
  joinMethod: string;
  isActive: boolean;
  revokeAccess: boolean;
}
