import { ObjectId } from 'mongoose';
import {
  TransanctionType,
  TransanctionStatus,
  TransanctionCurrency,
} from '../../../utils/helpers/transaction.helpers';

export class CreateTransactionRequestDto {
  userId: ObjectId;
  type: TransanctionType;
  status: TransanctionStatus;
  amount: number;
  method: {
    channel: string | null;
    bank: string | null;
    cardType: string | null;
  };
  currency: TransanctionCurrency;
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
