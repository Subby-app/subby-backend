import { Schema, model } from 'mongoose';
import { ISubscriber } from '../../data/interfaces/ISubscriber';

const SubscriberSchema = new Schema(
  {
    familyId: {
      type: Schema.Types.ObjectId,
      ref: 'Family',
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    joinMethod: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    revokeAccess: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Subscriber = model<ISubscriber>('Subscriber', SubscriberSchema);
