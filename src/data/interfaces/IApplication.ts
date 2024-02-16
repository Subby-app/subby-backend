import { Document } from 'mongoose';

export interface IApplication extends Document {
  appName: string;
}
