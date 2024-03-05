import { Document, Types } from 'mongoose';

export type TSubscriptionCreate = {
  userId: string;
  familyId: string;
  transactionId?: string;
};

type TSubscriptionDoc = Omit<TSubscriptionCreate, 'userId' | 'familyId' | 'transactionId'>;

export interface ISubscription extends TSubscriptionDoc, Document {
  userId: Types.ObjectId;
  familyId: Types.ObjectId;
  transactionId: Types.ObjectId;
}

export type TSubscriptionFilter = Pick<Partial<TSubscriptionCreate>, 'userId' | 'familyId'>;
