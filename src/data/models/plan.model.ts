import { Schema, model } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import { IPlan } from '../interfaces/IPlan';

const PlanSchema = new Schema(
  {
    applicationId: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },

    planIcon: {
      type: String,
    },

    planName: {
      type: String,
      required: true,
    },

    instructions: {
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
  },
  {
    timestamps: true,
  },
);

PlanSchema.plugin(autopopulate);
export const Plan = model<IPlan>('Plan', PlanSchema);
