import { Document, ObjectId } from 'mongoose';

export interface IFamily extends Document {
  owner: ObjectId;
  name: string;
  label: TFamilyLabel;
  maxSubscribers: number;
  spotsAvailable: number;
  isFull: boolean;
  membershipPrice: number;
  subscribeLinks: string[];
}

export type TFamilyLabel = 'netflix' | 'spotify';

export type TFamilyFilter = Pick<Partial<IFamily>, '_id' | 'name' | 'owner' | 'label' | 'isFull'>;
