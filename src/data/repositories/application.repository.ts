import {
  TCreateApplicationBody,
  TFindApplicationQuery,
  TUpdateApplicationBodySchema,
} from '@/web/validators/application.validation';
import { Application } from '../models/application.model';
import BaseRepository from './base.repository';

export class ApplicationRepository extends BaseRepository {
  static async create(createDto: TCreateApplicationBody) {
    try {
      const application = new Application(createDto);
      await application.save();

      return application;
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async find(filter: TFindApplicationQuery) {
    return Application.find(filter);
  }

  static async findById(id: string) {
    return Application.findById(id);
  }

  static async findOne(filter: TFindApplicationQuery) {
    return Application.findOne(filter);
  }

  static async update(id: any, updateDto: TUpdateApplicationBodySchema) {
    try {
      return Application.findByIdAndUpdate(id, updateDto, { new: true });
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async delete(id: string) {
    return Application.findByIdAndDelete(id);
  }
}
