import { User } from '../models';
import BaseRepository from './base.repository';

export class UserRepository extends BaseRepository {
  static async create(entity: any) {
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

  static async findOne(filter: any) {
    return User.findOne(filter);
  }

  static async findEmail(email: string) {
    return User.findOne({ email }).select('+password').exec();
  }

  static async update(id: any, entity: any) {
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
