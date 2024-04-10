import { User } from '../models';
import BaseRepository from './base.repository';
import { TCreateUserBody } from '@/web/validators/user.validation';
import { TFilterOptions, TUserFilter, TUpdateUser } from '../interfaces/IUser';

export class UserRepository extends BaseRepository {
  static async create(entity: TCreateUserBody) {
    try {
      const user = new User(entity);
      await user.save();

      return user;
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async find() {
    return User.find();
  }

  static async findById(id: string) {
    return User.findById(id);
  }

  static async findOne(filter: TUserFilter) {
    return User.findOne(filter);
  }

  static async findEmail(email: string) {
    return User.findOne({ email })
      .select(['email', '+password', 'otp', 'verified', 'otpExpiration'])
      .exec();
  }

  static async authFind(filter: TUserFilter, options?: TFilterOptions) {
    const query = User.findOne(filter);
    if (options?.sensitive) query.select(options?.sensitiveFields);
    return await query;
  }

  static async update(id: string, entity: TUpdateUser) {
    try {
      return User.findByIdAndUpdate(id, entity, { new: true });
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async delete(id: string) {
    return User.findByIdAndDelete(id);
  }
}
