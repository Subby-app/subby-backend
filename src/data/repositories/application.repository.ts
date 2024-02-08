import { Application } from '../models/application.model';
import BaseRepository from './base.repository';

export class ApplicationRepository extends BaseRepository {
  static async create(entity: any) {
    try {
      const application = new Application(entity);
      await application.save();

      return application;
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async find() {
    return Application.find();
  }

  static async findById(id: string) {
    return Application.findById(id);
  }

  static async findOne(filter: any) {
    return Application.findOne(filter);
  }

  static async findEmail(email: string) {
    return Application.findOne({ email }).exec();
  }

  static async update(id: any, entity: any) {
    try {
      return Application.findByIdAndUpdate(id, entity, { new: true });
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async delete(id: string) {
    return Application.findByIdAndDelete(id);
  }
}
