import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from './user.interface';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
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
      required: true,
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

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password: string): Promise<Error | boolean> {
  return await bcrypt.compare(password, this.password);
};

export const UserModel = model<IUser>('User', UserSchema);
