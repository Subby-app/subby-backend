import { Document } from 'mongoose';

export interface IWallet extends Document {
  userId: string;
  balance: number;
  availableBalance: number;
  status: string;
}

export type TWalletFilter = {
  _id?: string;
  userId?: string;
};

export type TUpdateBalance = {
  balance?: number;
  availableBalance?: number;
};
