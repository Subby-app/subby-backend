import { Schema, model } from 'mongoose';
import { IApplication } from '../interfaces/IApplication';

const FamilySchema = new Schema(
  {
    appName: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Application = model<IApplication>('Application', FamilySchema);
