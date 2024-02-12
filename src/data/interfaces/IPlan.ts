import { Document, Types } from 'mongoose';

export type TPlanCreate = {
  applicationId: string;
  name: string;
  accountSlots: Number;
  onBoarding: string;
};
type TPlanDoc = Omit<TPlanCreate, 'applicationId'>;

export interface IPlan extends TPlanDoc, Document {
  applicationId: Types.ObjectId;
}

export type TPlan = Pick<Partial<TPlanCreate>, 'applicationId'>;
