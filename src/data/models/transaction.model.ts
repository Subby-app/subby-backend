import { Schema, model } from 'mongoose';
import {
  TransactionCurrency,
  TransactionStatus,
  TransactionType,
} from '../../utils/helpers/transaction.helpers';
import { ITransaction } from 'data/interfaces/ITransaction';

const TransactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: TransactionType,
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: TransactionStatus,
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
      enum: TransactionCurrency,
      default: 'NGN',
    },

    recipient: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

export const Transaction = model<ITransaction>('Transaction', TransactionSchema);
