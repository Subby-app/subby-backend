import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
  phoneNumber: string;
  role: string;
  verified: boolean;
  otp: string;
  otpExpiration: string;
  recoveryCodes: {
    hash: string;
    used: boolean;
  }[];
  families: string[];
  subscriptions: string[];
  transactions: string[];
  accountNumber: string;
  wallet: string;
  earnings: number;

  isValidPassword(password: string): Promise<Error | boolean>;
}

export type TUserFilter = {
  _id?: string;
  email?: string;
  username?: string;
  phoneNumber?: string;
};

export type TFilterOptions = {
  sensitiveFields?: boolean;
  populateFields?: boolean;
};

export type TUpdateUser = {
  firstName?: string;
  lastName?: string;
};
