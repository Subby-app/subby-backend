import { Schema, model } from 'mongoose';
// import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/IUser';
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
    maxFamilies: {
      type: Number,
      default: 0,
    },
    accountNumber: {
      type: String,
    },
    wallet: {
      type: Schema.Types.ObjectId,
      ref: 'Wallet',
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

// UserSchema.pre<IUser>('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   const hash = await bcrypt.hash(this.password, 10);
//   this.password = hash;
//   next();
// });

// UserSchema.methods.isValidPassword = async function (password: string): Promise<Error | boolean> {
//   return await bcrypt.compare(password, this.password);
// };

export const User = model<IUser>('User', UserSchema);
