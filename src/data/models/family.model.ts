import { Schema, model } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import { IFamily } from '../interfaces/IFamily';
import { TOnboarding } from '@/web/validators/family.validation';

export const OnboardingSchema = new Schema<TOnboarding>(
  {
    type: {
      type: String,
      required: true,
    },
    url: String,
    email: String,
    password: String,
  },
  {
    _id: false,
    id: false,
    timestamps: false,
  },
);

const FamilySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      // autopopulate: { select: 'firstName lastName' },
    },
    name: {
      type: String,
      required: true,
    },
    appId: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    planId: {
      type: Schema.Types.ObjectId,
      ref: 'Plan',
      required: true,
    },
    maxSubscribers: {
      type: Number,
      required: true,
    },
    slotsAvailable: {
      type: Number,
      required: true,
    },
    subscriptionStart: {
      type: Date,
      required: true,
    },
    renewal: {
      type: String,
      required: true,
    },
    onboarding: {
      type: OnboardingSchema,
      required: true,
    },
    isFull: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

FamilySchema.plugin(autopopulate);
export const Family = model<IFamily>('Family', FamilySchema);
