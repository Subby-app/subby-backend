import { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  username: string,
  phoneNumber: string,
  role: string,
  verified: boolean,
  otp: string,
  otpCreatedAt: string,
  recoveryCodes: {
    hash: string,
    used: boolean,
  }[],
  createdFamilies: string[],
  joinedFamilies: string[],
  accountNumber: string,
  accountBalance: number,

  isValidPassword(password: string): Promise<Error | boolean>,
}

type safeFields = '_id' | 'id' | 'email' | 'firstName' | 'lastName' | 'username' | 'phoneNumber' | 'role';
export type ISerializedUser = Pick<IUser , safeFields>;

export type TUserFilter = {
  _id?: string,
  email?: string,
  username?: string,
  phoneNumber?: string,
}

export type TFilterOptions = {
  sensitiveFields?: boolean,
  populateFields?: boolean,
}

export type TUpdateUser = {
  firstName?: string,
  lastName?: string,
}