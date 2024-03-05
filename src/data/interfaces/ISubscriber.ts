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
}

export type TSubscriberFilter = Partial<Pick<TSubscriber, 'userId' | 'familyId' | 'joinMethod'>>;
