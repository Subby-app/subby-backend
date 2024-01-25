import { Schema, model } from 'mongoose';
import {
  TransanctionCurrency,
  TransanctionStatus,
  TransanctionType,
} from '../../utils/helpers/transaction.helpers';
import { ITransaction } from 'data/interfaces/transaction.interface';

const TransactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

  type: {
    type: String,
    enum: TransanctionType,
    required: true,
    index: true,
  },

  status: {
    type: String,
    enum: TransanctionStatus,
    required: true,
    index: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  method: {
    channel: {
      type: String,
      default: null,
    },
    bank: {
      type: String,
      default: null,
    },

    cardType: {
      type: String,
      default: null,
    },
  },

  tax: {
    type: Number,
    default: 0,
  },

  currency: {
    type: String,
    enum: TransanctionCurrency,
    default: 'NGN',
  },

  recipent: {
    type: String,
    default: null,
  },
});

export const Transaction = model<ITransaction>('Transaction', TransactionSchema);
