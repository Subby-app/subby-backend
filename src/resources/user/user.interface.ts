import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  username: string,
  role: string,
  verified: boolean,
  emailToken: string,
  passwordToken: string,
  passwordResetRequest: boolean,
  grantPasswordReset: boolean,
  otpEnabled: boolean,
  otpVerified: boolean,
  otpBase32Secret: string,
  otpAuthUrl: string,
  recoveryCodes: {
    hash: string,
    used: boolean,
  }[],
  createdFamilies: string[],
  joinedFamilies: string[],
  accountNumber: number,
  accountBalance: number,

  isValidPassword(password: string): Promise<Error | boolean>,
}