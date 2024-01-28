import { Document, Schema } from 'mongoose';
import {
  TransanctionCurrency,
  TransanctionStatus,
  TransanctionType,
} from '../../utils/helpers/transaction.helpers';

export interface ITransaction extends Document {
  userId: Schema.Types.ObjectId;
  type: TransanctionType;
  status: TransanctionStatus;
  amount: number;
  method: {
    channel: string | null;
    bank: string | null;
    cardType: string | null;
  };
  tax: number;
  currency: TransanctionCurrency;
  recipent: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ITransactionFilter = {
  _id?: string;
  userId?: string;
};

export type IUpdateTransactionFilter = {
  status?: string;
  amount?: number;
  method?: string;
};
