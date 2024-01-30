import { IUser } from '../../../data/interfaces/user.interface';
import { Document, ObjectId } from 'mongoose';

export class UserResponseDto {
  _id: ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  role: string;
  verified: boolean;
  families: ObjectId[];
  maxFamilies: number;
  subscriptions: ObjectId[];
  accountNumber?: string;
  wallet?: string;
  earnings: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    _id,
    email,
    firstName,
    lastName,
    username,
    phoneNumber,
    role,
    verified,
    families,
    maxFamilies,
    subscriptions,
    accountNumber,
    wallet,
    earnings,
    createdAt,
    updatedAt,
  }: UserResponseDto) {
    this._id = _id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.phoneNumber = phoneNumber;
    this.role = role;
    this.verified = verified;
    this.families = families;
    this.maxFamilies = maxFamilies;
    this.subscriptions = subscriptions;
    this.accountNumber = accountNumber;
    this.wallet = wallet;
    this.earnings = earnings;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from({
    _id,
    email,
    firstName,
    lastName,
    username,
    phoneNumber,
    role,
    verified,
    families,
    maxFamilies,
    subscriptions,
    accountNumber,
    wallet,
    earnings,
    createdAt,
    updatedAt,
  }: {
    _id: ObjectId;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
    role: string;
    verified: boolean;
    families: ObjectId[];
    maxFamilies: number;
    subscriptions: ObjectId[];
    accountNumber?: string;
    wallet?: string;
    earnings: number;
    createdAt?: Date;
    updatedAt?: Date;
  }): UserResponseDto {
    return new UserResponseDto({
      _id,
      email,
      firstName,
      lastName,
      username,
      phoneNumber,
      role,
      verified,
      families,
      maxFamilies,
      subscriptions,
      accountNumber,
      wallet,
      earnings,
      createdAt: createdAt || undefined,
      updatedAt: updatedAt || undefined,
    });
  }

  static fromMany(
    users: (Document<unknown, {}, IUser> & IUser & { _id: ObjectId })[],
  ): UserResponseDto[] {
    return users.map((user) => UserResponseDto.from(user.toObject()));
  }
}
