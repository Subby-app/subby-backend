import { Document, ObjectId } from 'mongoose';

export interface ISubscription extends Document {
  users: ObjectId;
  family: ObjectId;
}

export type TSubscribers = {
  subscriber: ObjectId;
  joinedAt: string;
  joinMethod: string;
  isActive: boolean;
  revokeAccess: boolean;
}[];
