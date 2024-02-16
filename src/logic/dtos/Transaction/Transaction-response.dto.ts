import {
  TransactionType,
  TransactionStatus,
  TransactionCurrency,
} from '../../../utils/helpers/transaction.helpers';
import { ObjectId } from 'mongoose';

interface TransactionMethod {
  channel: string | null;
  bank: string | null;
  cardType: string | null;
}

export class TransactionResponseDto {
  _id: ObjectId;
  userId: ObjectId;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  method: TransactionMethod;
  tax: number;
  currency: TransactionCurrency;
  recipient: string | null;
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
    recipient: recipient,
  }: TransactionResponseDto) {
    this._id = _id;
    this.userId = userId;
    this.type = type;
    this.status = status;
    this.amount = amount;
    this.method = method;
    this.tax = tax;
    this.currency = currency;
    this.recipient = recipient;
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
