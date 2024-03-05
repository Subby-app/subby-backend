import { Schema, model } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import { IPlan } from '../interfaces/IPlan';
import { PlanOnBoardingTypes } from '@/utils/helpers/plan.helper';

const FamilySchema = new Schema(
  {
    applicationId: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    accountSlots: {
      type: Number,
      required: true,
    },

    onBoardingType: {
      type: String,
      enum: PlanOnBoardingTypes,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

FamilySchema.plugin(autopopulate);
export const Plan = model<IPlan>('Plan', FamilySchema);
