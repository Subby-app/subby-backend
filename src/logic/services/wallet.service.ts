import { WalletResponseDto } from '../../logic/dtos/Wallet';
import { WalletModel } from '../../data/models/wallet.model';
import { HttpException, HttpStatus } from '@/utils/exceptions';

export class WalletService {
  static async create(walletDto: any): Promise<{ message: string; data: WalletResponseDto }> {
    const wallet = await WalletModel.create(walletDto);

    return {
      message: 'Wallet created',
      data: WalletResponseDto.from(wallet),
    };
  }

  static async getWallet(userId: string): Promise<{ message: string; data: any }> {
    const wallet = await WalletModel.findOne({ userId });

    if (!wallet) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Wallet not found');
    }

    return {
      message: 'Wallet retrieved',
      data: wallet,
    };
  }

  static async updateBalance(
    userId: string,
    amount: number,
  ): Promise<{ message: string; data: any }> {
    const wallet = await WalletModel.findOne({ userId });

    if (!wallet) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Wallet not found');
    }

    wallet.balance += amount;
    wallet.availableBalance = wallet.balance;

    await wallet.save();

    return {
      message: 'Wallet balance updated',
      data: wallet,
    };
  }
}
