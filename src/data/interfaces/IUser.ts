import { Document, Types } from 'mongoose';
import { TUpdateUserBody } from '@/web/validators/user.validation';

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
  wallet: Types.ObjectId;
  earnings: number;
}
type TUpdateUserDoc = Pick<Partial<IUser>, 'verified'>;

export type TUpdateUser = TUpdateUserBody | TUpdateUserDoc;

export type TUserFilter = Pick<Partial<IUser>, '_id' | 'email' | 'username' | 'phoneNumber'>;

type TSensitiveFields = '+password' | '+otp' | '+recoveryCodes' | '+otpExpiration';

export type TFilterOptions = {
  sensitive: boolean;
  sensitiveFields: TSensitiveFields | [TSensitiveFields];
};
