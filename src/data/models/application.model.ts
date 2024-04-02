import { Schema, model } from 'mongoose';
import { IApplication } from '../interfaces/IApplication';
import { ApplicationOnBoardingTypes } from '@/utils/helpers/application.helper';

const FamilySchema = new Schema(
  {
    applicationIcon: {
      type: String,
    },

    applicationName: {
      type: String,
      required: true,
      index: true,
    },

    onBoardingType: {
      type: String,
      enum: ApplicationOnBoardingTypes,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Application = model<IApplication>('Application', FamilySchema);
