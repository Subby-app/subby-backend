import { IUser } from '../../../data/interfaces/IUser';
import { Document, Types } from 'mongoose';

export class UserResponseDto {
  _id: Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  role: string;
  verified: boolean;
  maxFamilies: number;
  accountNumber?: string;
  wallet?: Types.ObjectId;
  earnings: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(user: UserResponseDto) {
    this._id = user._id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.username = user.username;
    this.phoneNumber = user.phoneNumber;
    this.role = user.role;
    this.verified = user.verified;
    this.maxFamilies = user.maxFamilies;
    this.accountNumber = user.accountNumber;
    this.wallet = user.wallet;
    this.earnings = user.earnings;
  }

  static from(user: IUser): UserResponseDto {
    return new UserResponseDto({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      phoneNumber: user.phoneNumber,
      role: user.role,
      verified: user.verified,
      maxFamilies: user.maxFamilies,
      accountNumber: user.accountNumber,
      wallet: user.wallet,
      earnings: user.earnings,
    });
  }

  static fromMany(
    users: (Document<unknown, {}, IUser> & IUser & { _id: Types.ObjectId })[],
  ): UserResponseDto[] {
    return users.map((user) => UserResponseDto.from(user.toObject()));
  }
}
