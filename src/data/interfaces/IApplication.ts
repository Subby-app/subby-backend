import { Document } from 'mongoose';

export interface IApplication extends Document {
  applicationName: string;
  onBoardingType: string;
}
