import { ObjectId } from 'mongoose';

export class CreateWalletRequestDto {
  userId: ObjectId;
  balance: number;
  availableBalance: number;
  status: string;

  constructor(wallet: CreateWalletRequestDto) {
    this.userId = wallet.userId;
    this.balance = wallet.balance;
    this.availableBalance = wallet.availableBalance;
    this.status = wallet.status;
  }

  static from(wallet: any): CreateWalletRequestDto {
    return new CreateWalletRequestDto({
      userId: wallet.userId,
      balance: wallet.balance,
      availableBalance: wallet.availableBalance,
      status: wallet.status,
    });
  }
}
