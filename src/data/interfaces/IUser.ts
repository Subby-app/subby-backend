import { Document, Types } from 'mongoose';

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
  maxFamilies: number;
  accountNumber: string;
  _id: Types.ObjectId;
  wallet: Types.ObjectId;
  earnings: number;

  isValidPassword(password: string): Promise<Error | boolean>;
}

export type TUserFilter = {
  id?: Types.ObjectId;
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
