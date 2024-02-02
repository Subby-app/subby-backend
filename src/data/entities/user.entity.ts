import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import { ValidationException } from '../../utils/exceptions';
import { Encryption } from '../../utils/encrption.utils';
import { UserRole } from '@/utils/helpers/user.helper';
import Id from '../lib/makeId';
import { createObjectId, isEqualObjectId } from 'data/database/mongoose.util';

export class UserEntity {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
  phoneNumber: string;
  role: string;
  verified: boolean;
  families: ObjectId[];
  maxFamilies: number;
  subscriptions: ObjectId[];
  accountNumber: string;
  wallet: string;
  earnings: number;
  id: Types.ObjectId;

  constructor({
    id,
    email,
    firstName,
    lastName,
    password,
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
  }: {
    id: Types.ObjectId;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    username: string;
    phoneNumber: string;
    role: string;
    verified: boolean;
    families: ObjectId[];
    maxFamilies: number;
    subscriptions: ObjectId[];
    accountNumber: string;
    wallet: string;
    earnings: number;
  }) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
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
  }

  static make({
    email,
    firstName,
    lastName,
    password,
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
    _id,
  }: {
    _id: Types.ObjectId;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    username: string;
    phoneNumber: string;
    role: string;
    verified: boolean;
    families: ObjectId[];
    maxFamilies: number;
    subscriptions: ObjectId[];
    accountNumber: string;
    wallet: string;
    earnings: number;
  }): UserEntity {
    if (_id && !isEqualObjectId(_id)) {
      throw new ValidationException({
        path: 'id',
        message: 'User entity must have a valid id.',
      });
    }

    if (!email) {
      throw new ValidationException({
        path: 'email',
        message: 'User entity must have an email.',
      });
    }

    if (!firstName) {
      throw new ValidationException({
        path: 'firstName',
        message: 'User entity must have a first name.',
      });
    }

    if (!lastName) {
      throw new ValidationException({
        path: 'lastName',
        message: 'User entity must have a last name.',
      });
    }

    if (!password) {
      throw new ValidationException({
        path: 'password',
        message: 'User entity must have a password.',
      });
    }

    if (!username) {
      throw new ValidationException({
        path: 'username',
        message: 'User entity must have a username.',
      });
    }

    if (!phoneNumber) {
      throw new ValidationException({
        path: 'phoneNumber',
        message: 'User entity must have a phone number.',
      });
    }

    const hash = Encryption.isEncrypted(password) ? password : Encryption.encryptText(password);
    return this.#create({
      email,
      firstName,
      lastName,
      password: hash,
      username,
      phoneNumber,
      role,
      verified,
      families,
      maxFamilies,
      subscriptions,
      accountNumber,
      wallet,
      id: _id,
      earnings,
    });
  }

  static #create({
    email,
    firstName,
    lastName,
    password,
    username,
    phoneNumber,
    verified,
    families,
    maxFamilies,
    subscriptions,
    accountNumber,
    wallet,
    earnings,
    role = UserRole.USER,
    id = createObjectId(),
  }: {
    id: Types.ObjectId;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    username: string;
    phoneNumber: string;
    role: string;
    verified: boolean;
    families: ObjectId[];
    maxFamilies: number;
    subscriptions: ObjectId[];
    accountNumber: string;
    wallet: string;
    earnings: number;
  }): UserEntity {
    return new UserEntity({
      id,
      email,
      firstName,
      lastName,
      password,
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
    });
  }
}
