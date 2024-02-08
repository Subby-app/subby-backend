import { Schema, model } from 'mongoose';
import { IApplication } from '../interfaces/IApplication';

const FamilySchema = new Schema(
  {
    appName: {
      type: String,
      required: true,
    },
    planId: {
      type: Schema.Types.ObjectId,
      ref: 'Plan',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Application = model<IApplication>('Application', FamilySchema);
