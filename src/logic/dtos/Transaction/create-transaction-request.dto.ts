import { ObjectId } from 'mongoose';
import {
  TransactionType,
  TransactionStatus,
  TransactionCurrency,
} from '../../../utils/helpers/transaction.helpers';

export class CreateTransactionRequestDto {
  userId: ObjectId;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  method: {
    channel: string | null;
    bank: string | null;
    cardType: string | null;
  };
  currency: TransactionCurrency;
  recipent: string | null;

  constructor(transaction: CreateTransactionRequestDto) {
    this.userId = transaction.userId;
    this.type = transaction.type;
    this.status = transaction.status;
    this.amount = transaction.amount;
    this.method = transaction.method;
    this.currency = transaction.currency;
    this.recipent = transaction.recipent;
  }

  static from(transaction: any): CreateTransactionRequestDto {
    return new CreateTransactionRequestDto({
      userId: transaction.userId,
      type: transaction.type,
      status: transaction.status,
      amount: transaction.amount,
      method: transaction.method,
      currency: transaction.currency,
      recipent: transaction.recipent,
    });
  }
}
