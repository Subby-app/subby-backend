import { Schema, model } from 'mongoose';
import { IWallet } from '../../data/interfaces/wallet.interface';
import { EWalletStatus } from '../../data/enums/wallet.enum';

const WalletSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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

export const WalletModel = model<IWallet>('Wallet', WalletSchema);
