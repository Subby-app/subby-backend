import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IAdmin } from '../interfaces/IAdmin';

const AdminSchema = new Schema(
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
    role: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    otpEnabled: {
      type: Boolean,
      default: false,
    },
    otpVerified: {
      type: Boolean,
      default: false,
    },
    otpBase32Secret: {
      type: String,
      select: false,
    },
    otpAuthUrl: {
      type: String,
      select: false,
    },
    recoveryCodes: {
      type: [{ hash: String, used: Boolean }],
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

AdminSchema.pre<IAdmin>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

AdminSchema.methods.isValidPassword = async function (password: string): Promise<Error | boolean> {
  return await bcrypt.compare(password, this.password);
};

export const AdminModel = model<IAdmin>('Admin', AdminSchema);
