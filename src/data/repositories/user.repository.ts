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
    try {
      return User.findById(id);
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async findOne(filter: string) {
    try {
      return User.findById(filter);
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async findEmail(email: string) {
    try {
      return User.findById({ email });
    } catch (error) {
      this.handleRepositoryError(error);
    }
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
