import {
  TransanctionType,
  TransanctionStatus,
  TransanctionCurrency,
} from '../../../utils/helpers/transaction.helpers';

export class TransactionResponseDto {
  userId: string;
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

  constructor(transaction: TransactionResponseDto) {
    this.userId = transaction.userId;
    this.type = transaction.type;
    this.status = transaction.status;
    this.amount = transaction.amount;
    this.method = transaction.method;
    this.tax = transaction.tax;
    this.currency = transaction.currency;
    this.recipent = transaction.recipent;
  }

  // Additional static method to create a TransactionResponseDto from a raw transaction
  static from(transaction: any): TransactionResponseDto {
    return new TransactionResponseDto({
      userId: transaction.userId,
      type: transaction.type,
      status: transaction.status,
      amount: transaction.amount,
      method: transaction.method,
      tax: transaction.tax,
      currency: transaction.currency,
      recipent: transaction.recipent,
    });
  }

  static fromMany(transactions: TransactionResponseDto[]): TransactionResponseDto[] {
    return transactions.map((transaction) => TransactionResponseDto.from(transaction));
  }
}
