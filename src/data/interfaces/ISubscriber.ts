import { Document, Types } from 'mongoose';
import { TJoinMethod } from '@/web/validators/family.validation';

export type TSubscriber = {
  userId: string;
  familyId: string;
  joinMethod: TJoinMethod;
};

type TSubscriberDoc = Omit<TSubscriber, 'userId' | 'familyId'>;
export interface ISubscriber extends TSubscriberDoc, Document {
  userId: Types.ObjectId;
  familyId: Types.ObjectId;
  isActive: boolean;
  revokeAccess: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TUpdateSubscriber = Partial<Pick<ISubscriber, 'isActive' | 'revokeAccess'>>;

export type TSubscriberFilter = Partial<Pick<TSubscriber, 'userId' | 'familyId' | 'joinMethod'>>;

export type TSubscriberOverview = {
  activeSubscriptions: number;
  inActiveSubscriptions: number;
};
