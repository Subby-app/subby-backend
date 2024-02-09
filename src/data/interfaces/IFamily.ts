import { Document, Types } from 'mongoose';
import { TCreateFamilyBody } from '@/web/validators/family.validation';

type TFamilyDoc = Omit<TCreateFamilyBody, 'appId' | 'planId'>;

export interface IFamily extends TFamilyDoc, Document {
  owner: Types.ObjectId;
  appId: Types.ObjectId;
  planId: Types.ObjectId;
  maxSubscribers: number; //from planId.maxSubs
  isFull: boolean;
}

export type TFamilyFilter = Pick<
  Partial<IFamily>,
  'appId' | 'owner' | 'planId' | 'isFull' | 'renewal' | 'name'
>;
