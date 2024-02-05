import { Document, ObjectId } from 'mongoose';

export interface ISubscription extends Document {
  userId: ObjectId;
  familyId: ObjectId;
  joinMethod: string;
  isActive: boolean;
  revokeAccess: boolean;
}
