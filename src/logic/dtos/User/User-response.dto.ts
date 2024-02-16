import { IUser } from '@/data/interfaces/IUser';
import { Document, Types } from 'mongoose';

export class UserResponseDto {
  static from(user: IUser): UserResponseDto {
    return {
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
    };
  }

  static fromMany(
    users: (Document<unknown, {}, IUser> & IUser & { _id: Types.ObjectId })[],
  ): UserResponseDto[] {
    return users.map((user) => UserResponseDto.from(user.toObject()));
  }

  static signup(user: IUser) {
    return {
      email: user.email,
    };
  }

  static login(user: IUser) {
    return {
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
    };
  }
}
