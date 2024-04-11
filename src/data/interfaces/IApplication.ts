import { Document } from 'mongoose';

export interface IApplication extends Document {
  applicationName: string;
  applicationIcon: string;
  description: string;
  onBoardingType: string;
}
