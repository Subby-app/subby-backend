import { Document } from 'mongoose';

export interface IAdmin extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  verified: boolean;
  otpEnabled: boolean;
  otpVerified: boolean;
  otpBase32Secret: string;
  otpAuthUrl: string;
  recoveryCodes: {
    hash: string;
    used: boolean;
  }[];
}
