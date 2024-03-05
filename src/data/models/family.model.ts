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
    url: {
      type: String,
      select: false,
    },
    email: {
      type: String,
      select: false,
    },
    password: {
      type: String,
      select: false,
    },
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
    noOfAccounts: {
      type: Number,
      required: true,
    },
    subscriptionStart: {
      type: Date,
      required: true,
    },
    subscriptionEnd: {
      type: Date,
      required: true,
    },
    tenure: {
      type: String,
      required: true,
    },
    onboarding: {
      type: OnboardingSchema,
      required: true,
    },
    isFull: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

FamilySchema.plugin(autopopulate);
export const Family = model<IFamily>('Family', FamilySchema);
