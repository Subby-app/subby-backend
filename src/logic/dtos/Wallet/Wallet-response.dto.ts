import { EWalletStatus } from '../../../utils/helpers/wallet.helpers';
import { IWallet } from '../../../data/interfaces/wallet.interface';
import { ObjectId } from 'mongoose';
import { createObjectId } from 'data/database/mongoose.util';

export class WalletResponseDto {
  _id: typeof createObjectId;
  userId: ObjectId;
  balance: number;
  availableBalance: number;
  status: EWalletStatus;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({ _id, userId, balance, availableBalance, status, createdAt, updatedAt }: IWallet) {
    this._id = _id;
    this.userId = userId;
    this.balance = balance;
    this.availableBalance = availableBalance;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from(wallet: IWallet): WalletResponseDto {
    return new WalletResponseDto(wallet);
  }

  static fromMany(wallets: IWallet[]): WalletResponseDto[] {
    return wallets.map((wallet) => WalletResponseDto.from(wallet));
  }
}
