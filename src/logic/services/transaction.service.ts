import { Transaction } from '../../data/models/transaction.model';
import { TransactionResponseDto, UpdateTransactionRequestDto } from '../dtos/Transaction/index';
import { HttpException, HttpStatus } from '@/utils/exceptions';
import { WalletService } from './wallet.service';
import { NotFoundException } from '@/utils/exceptions/not-found.exception';

export class TransactionService {
  static async create(
    transactionDto: any,
  ): Promise<{ message: string; data: TransactionResponseDto }> {
    const transaction = await Transaction.create(transactionDto);

    if (transaction.type === 'credit') {
      const creditWallet = await WalletService.updateBalance(
        transactionDto.userId,
        transactionDto.amount,
      );
      if (!creditWallet) throw new NotFoundException('Not Found');
    }
    return {
      message: 'Transaction created',
      data: TransactionResponseDto.from(transaction),
    };
  }

  static async getAll(): Promise<{ message: string; data: TransactionResponseDto[] }> {
    const transactions = await Transaction.find();
    if (transactions.length === 0)
      throw new HttpException(HttpStatus.NOT_FOUND, 'No transaction found');

    return {
      message: 'successful login',
      data: TransactionResponseDto.fromMany(transactions),
    };
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
  ): Promise<TransactionResponseDto> {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Transaction not found');
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(transactionId, transactionDto, {
      new: true,
    });

    if (!updatedTransaction) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Transaction not found');
    }

    return TransactionResponseDto.from(updatedTransaction);
  }
}
