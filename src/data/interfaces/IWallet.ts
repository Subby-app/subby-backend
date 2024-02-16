import { EWalletStatus } from '@/utils/helpers/wallet.helpers';
import { Document, ObjectId } from 'mongoose';

export interface IWallet extends Document {
  userId: ObjectId;
  balance: number;
  availableBalance: number;
  status: EWalletStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TWalletFilter = {
  _id?: string;
  userId?: string;
};

export type TUpdateWallet = {
  balance?: number;
  availableBalance?: number;
  status?: EWalletStatus;
};
