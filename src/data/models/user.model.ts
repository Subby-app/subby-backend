import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import { UserRole } from '../../utils/helpers/user.helper';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: UserRole,
      default: UserRole.USER,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      select: false,
    },
    otpExpiration: {
      type: String,
      select: false,
    },
    recoveryCodes: {
      type: [{ hash: String, used: Boolean }],
      select: false,
    },
    families: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Family',
      },
    ],
    maxFamilies: {
      type: Number,
      default: 0,
    },
    subscriptions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Family',
      },
    ],
    accountNumber: {
      type: String,
    },
    wallet: {
      type: String,
    },
    earnings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<IUser>('User', UserSchema);
