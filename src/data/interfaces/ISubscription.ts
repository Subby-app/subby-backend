import { Document, Types } from 'mongoose';
import { TOnboarding, TRenewal } from '@/web/validators/family.validation';

export type TSubscriptionCreate = {
  appId: string;
  planId: string;
  slotsAvailable: number;
  renewal: TRenewal;
  onboarding: TOnboarding;
  userId: string;
};

type TSubscriptionDoc = Omit<TSubscriptionCreate, 'appId' | 'planId' | 'userId'>;

export interface ISubscription extends TSubscriptionDoc, Document {
  appId: Types.ObjectId;
  planId: Types.ObjectId;
  userId: Types.ObjectId;
}

export type TSubscriptionFilter = Pick<
  Partial<TSubscriptionCreate>,
  'appId' | 'planId' | 'userId' | 'renewal'
>;
