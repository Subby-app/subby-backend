import { Document, Types } from 'mongoose';

export type TApplicationCreate = {
  appName: string;
  planId: string;
};

type TApplicationDoc = Omit<TApplicationCreate, 'planId'>;

export interface IApplication extends TApplicationDoc, Document {
  planId: Types.ObjectId;
}

export type TApplicationFilter = Pick<Partial<TApplicationCreate>, 'planId'>;
