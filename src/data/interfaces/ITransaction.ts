import { Document, Schema } from 'mongoose';
import {
  TransactionCurrency,
  TransactionStatus,
  TransactionType,
} from '../../utils/helpers/transaction.helpers';

export interface ITransaction extends Document {
  userId: Schema.Types.ObjectId;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  method: {
    channel: string | null;
    bank: string | null;
    cardType: string | null;
  };
  tax: number;
  currency: TransactionCurrency;
  recipient: string | null;
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
