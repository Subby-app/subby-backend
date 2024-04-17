import { Document, Types } from 'mongoose';
import { TCreateFamilyBody, TUpdateFamilyBody } from '@/web/validators/family.validation';

type TFamilyDoc = Omit<TCreateFamilyBody, 'appId' | 'planId'>;

export interface IFamily extends TFamilyDoc, Document {
  owner: Types.ObjectId;
  appId: Types.ObjectId;
  planId: Types.ObjectId;
  subscribers: Types.ObjectId[];
  maxSubscribers: number;
  subscriptionEnd: Date;
  isFull: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TUpdateFamilyState = { isActive: boolean };

export type TUpdateFamily = TUpdateFamilyBody | TUpdateFamilyState;

export type TFamilyFilter = Pick<
  Partial<IFamily>,
  'appId' | 'owner' | 'planId' | 'isFull' | 'tenure' | 'name'
>;

export type TOverview = {
  familiesCreated: number;
  totalActiveSubs: number;
};
