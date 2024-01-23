import { Document } from 'mongoose';

export interface IFamily extends Document {
  owner: string;
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
  owner?: string;
  label?: string;
  isFull?: boolean;
};

export type TSubscribers = {
  subscriber: string;
  joinedAt: string;
  joinMethod: string;
  isActive: boolean;
  revokeAccess: boolean;
}[];
