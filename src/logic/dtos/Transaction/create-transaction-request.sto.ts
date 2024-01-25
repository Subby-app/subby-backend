import {
  TransanctionType,
  TransanctionStatus,
  TransanctionCurrency,
} from '../../../utils/helpers/transaction.helpers';

export class TransactionRequestDto {
  userId: string;
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

  constructor(transaction: TransactionRequestDto) {
    this.userId = transaction.userId;
    this.type = transaction.type;
    this.status = transaction.status;
    this.amount = transaction.amount;
    this.method = transaction.method;
    this.currency = transaction.currency;
    this.recipent = transaction.recipent;
  }

  static from(transaction: any): TransactionRequestDto {
    return new TransactionRequestDto({
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
