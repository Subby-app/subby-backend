import { Document, ObjectId } from 'mongoose';

export interface IFamily extends Document {
  owner: ObjectId;
  name: string;
  subscribers: {
    subscriber: string;
    joinedAt: string;
    joinMethod: string;
    isActive: boolean;
    revokeAccess: boolean;
  }[];
  label: TFamilyLabel;
  maxSubscribers: number;
  spotsAvailable: number;
  isFull: boolean;
  membershipPrice: number;
  subscribeLinks: string[];
}

export type TFamilyLabel = 'netflix' | 'spotify';

export type TFamilyFilter = {
  _id?: string;
  name?: string;
  owner?: ObjectId;
  label?: string;
  isFull?: boolean;
};

export type TSubscribers = {
  subscriber: ObjectId;
  joinedAt: string;
  joinMethod: string;
  isActive: boolean;
  revokeAccess: boolean;
}[];
