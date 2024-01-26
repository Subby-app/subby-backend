import { Transaction } from '../../data/models/transaction.model';
import { TransactionResponseDto, UpdateTransactionRequestDto } from '../dtos/Transaction/index';
import { HttpException, HttpStatus } from '@/utils/exceptions';

export class TransactionService {
  static async create(transactionDto: any): Promise<TransactionResponseDto> {
    const transaction = await Transaction.create(transactionDto);
    return TransactionResponseDto.from(transaction);
  }

  static async getAll(): Promise<TransactionResponseDto[]> {
    const transactions = await Transaction.find();
    if (transactions.length === 0)
      throw new HttpException(HttpStatus.NOT_FOUND, 'No transaction found');

    return TransactionResponseDto.fromMany(transactions);
  }

  static async getById(transactionId: string): Promise<TransactionResponseDto | null> {
    const transaction = await Transaction.findById(transactionId);

    if (!transaction) throw new HttpException(HttpStatus.NOT_FOUND, 'Transaction not found');
    return TransactionResponseDto.from(transaction);
  }

  static async getUserTransaction(userId: string): Promise<TransactionResponseDto[]> {
    const updateTransactions = await Transaction.find({ userId });
    if (updateTransactions.length === 0)
      throw new HttpException(HttpStatus.NOT_FOUND, 'No user transaction found');

    return TransactionResponseDto.fromMany(updateTransactions);
  }

  static async update(
    transactionId: string,
    transactionDto: UpdateTransactionRequestDto,
  ): Promise<TransactionResponseDto | null> {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Transaction not found');
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transaction._id,
      transactionDto,
      {
        new: true,
      },
    );

    return TransactionResponseDto.from(updatedTransaction);
  }
}
