import { Transaction } from 'data/models/transaction.model';
import {
  TransactionRequestDto,
  TransactionResponseDto,
  UpdateTransactionRequestDto,
} from '../dtos/Transaction/index';
import { ITransactionFilter } from 'data/interfaces/transaction.interface';
import { HttpException, HttpStatus } from '@/utils/exceptions';

export class TransactionService {
  public async create(transactionDto: TransactionRequestDto): Promise<TransactionResponseDto> {
    const transaction = await Transaction.create(transactionDto);
    return TransactionResponseDto.from(transaction);
  }

  public async getAll(): Promise<TransactionResponseDto[]> {
    const transactions = await Transaction.find();
    return TransactionResponseDto.fromMany(transactions);
  }

  public async getById(transactionId: string): Promise<TransactionResponseDto | null> {
    const transaction = await Transaction.findById(transactionId);

    if (!transaction) throw new HttpException(HttpStatus.NOT_FOUND, 'Transaction not found');
    return TransactionResponseDto.from(transaction);
  }

  public async getUserTransaction(userId: string): Promise<TransactionResponseDto[] | null> {
    const transactions = await Transaction.find({ userId });

    if (!transactions || transactions.length === 0) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Transactions not found for the user');
    }

    return TransactionResponseDto.fromMany(transactions);
  }

  public async update(
    transactionId: string,
    transactionDto: UpdateTransactionRequestDto,
  ): Promise<TransactionResponseDto | null> {
    const transaction = await Transaction.findByIdAndUpdate(transactionId, transactionDto, {
      new: true,
    });

    return TransactionResponseDto.from(transaction);
  }
}
