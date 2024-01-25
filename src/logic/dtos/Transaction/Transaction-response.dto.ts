import { createObjectId } from 'data/database/mongoose.util';
import {
  TransanctionType,
  TransanctionStatus,
  TransanctionCurrency,
} from '../../../utils/helpers/transaction.helpers';
import { ObjectId } from 'mongoose';

export class TransactionResponseDto {
  _id: typeof createObjectId;
  userId: ObjectId;
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

  constructor({
    _id,
    userId,
    type,
    status,
    amount,
    method,
    tax,
    currency,
    recipent,
  }: TransactionResponseDto) {
    this._id = _id;
    this.userId = userId;
    this.type = type;
    this.status = status;
    this.amount = amount;
    this.method = method;
    this.tax = tax;
    this.currency = currency;
    this.recipent = recipent;
  }

  static from(transaction: any): TransactionResponseDto {
    const { _id, userId, type, status, amount, method, tax, currency, recipent } = transaction;

    return new TransactionResponseDto({
      _id,
      userId,
      type,
      status,
      amount,
      method,
      tax,
      currency,
      recipent,
    });
  }

  static fromMany(transactions: TransactionResponseDto[]): TransactionResponseDto[] {
    return transactions.map((transaction) => TransactionResponseDto.from(transaction));
  }
}
