import { createObjectId } from '../../../data/database/mongoose.util';
import {
  TransanctionType,
  TransanctionStatus,
  TransanctionCurrency,
} from '../../../utils/helpers/transaction.helpers';
import { ObjectId } from 'mongoose';

interface TransactionMethod {
  channel: string | null;
  bank: string | null;
  cardType: string | null;
}

export class TransactionResponseDto {
  _id: typeof createObjectId;
  userId: ObjectId;
  type: TransanctionType;
  status: TransanctionStatus;
  amount: number;
  method: TransactionMethod;
  tax: number;
  currency: TransanctionCurrency;
  recipent: string | null;
  createdAt?: Date;
  updatedAt?: Date;

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
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static from(transaction: Partial<TransactionResponseDto>): TransactionResponseDto {
    return new TransactionResponseDto(transaction as TransactionResponseDto);
  }

  static fromMany(transactions: TransactionResponseDto[]): TransactionResponseDto[] {
    return transactions.map((transaction) => TransactionResponseDto.from(transaction));
  }
}
