import { Document, Types } from 'mongoose';

export type TPlanCreate = {
  applicationId: string;
  planIcon: string;
  planName: string;
  instructions: string;
  price: number;
  accountSlots: number;
};
type TPlanDoc = Omit<TPlanCreate, 'applicationId'>;

export interface IPlan extends TPlanDoc, Document {
  applicationId: Types.ObjectId;
}

export type TPlan = Pick<Partial<TPlanCreate>, 'applicationId'>;
