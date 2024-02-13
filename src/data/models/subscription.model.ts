import { Schema, model } from 'mongoose';
import { ISubscription } from '../../data/interfaces/ISubscription';
import { OnboardingSchema } from './family.model';

const SubscriptionSchema = new Schema(
  {
    appId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // !ref App
      required: true,
    },
    planId: {
      type: Schema.Types.ObjectId,
      ref: 'User', //! ref Plan
      required: true,
    },
    slotsAvailable: {
      type: Number,
      required: true,
    },
    renewal: {
      type: String,
      required: true,
    },
    onboarding: {
      type: OnboardingSchema,
      required: true,
      _id: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Subscription = model<ISubscription>('Subscription', SubscriptionSchema);
