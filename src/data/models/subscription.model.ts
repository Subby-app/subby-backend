import { Schema, model } from 'mongoose';
import { ISubscription } from '../../data/interfaces/ISubscription';

const SubscriptionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    familyId: {
      type: Schema.Types.ObjectId,
      ref: 'Family',
      required: true,
    },
    transactionId: {
      type: Schema.Types.ObjectId,
      ref: 'Transaction',
      // required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Subscription = model<ISubscription>('Subscription', SubscriptionSchema);
