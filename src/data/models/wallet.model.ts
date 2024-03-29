import { Schema, model } from 'mongoose';
import { IWallet } from '../interfaces/IWallet';
import { EWalletStatus } from '../../utils/helpers/wallet.helpers';

const WalletSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      // index: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    availableBalance: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: EWalletStatus,
      default: EWalletStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
  },
);

export const Wallet = model<IWallet>('Wallet', WalletSchema);
