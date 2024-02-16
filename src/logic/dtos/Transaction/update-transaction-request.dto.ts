import { TransactionStatus } from '../../../utils/helpers/transaction.helpers';

export class UpdateTransactionRequestDto {
  status: TransactionStatus;
  amount: number;
  method: {
    channel: string | null;
    bank: string | null;
    cardType: string | null;
  };

  constructor(transaction: UpdateTransactionRequestDto) {
    this.status = transaction.status;
    this.amount = transaction.amount;
    this.method = transaction.method;
  }

  static from(transaction: any): UpdateTransactionRequestDto {
    return new UpdateTransactionRequestDto({
      status: transaction.status,
      amount: transaction.amount,
      method: transaction.method,
    });
  }
}
