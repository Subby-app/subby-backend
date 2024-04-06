import { Document, Types } from 'mongoose';
import { TCreateFamilyBody } from '@/web/validators/family.validation';

type TFamilyDoc = Omit<TCreateFamilyBody, 'appId' | 'planId'>;

export interface IFamily extends TFamilyDoc, Document {
  owner: Types.ObjectId;
  appId: Types.ObjectId;
  planId: Types.ObjectId;
  maxSubscribers: number;
  subscriptionEnd: Date;
  isFull: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TFamilyFilter = Pick<
  Partial<IFamily>,
  'appId' | 'owner' | 'planId' | 'isFull' | 'tenure' | 'name'
>;

export type TOverview = {
  familiesCreated: number;
  totalActiveSubs: number;
};
