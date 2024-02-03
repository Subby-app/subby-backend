import { FilterQuery } from 'mongoose';
import { Family } from '../models/index';
import BaseRepository from './base.repository';
import { IFamily } from '../interfaces/IFamily';

export class FamilyRepository extends BaseRepository {
  static async create(entity: any) {
    try {
      const user = new Family(entity);
      await user.save();

      return user;
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async find() {
    return Family.find();
  }

  static async findById(id: string) {
    return Family.findById(id);
  }

  static async findOne(filter: FilterQuery<IFamily>) {
    return Family.findOne(filter);
  }

  static async findOwners(filter: FilterQuery<IFamily>) {
    return Family.find(filter);
  }

  static async getSubscribers(subscribers: FilterQuery<IFamily>) {
    return Family.findOne(subscribers);
  }

  static async findEmail(email: string) {
    return Family.findOne({ email });
  }

  static async update(id: string, entity: any) {
    try {
      return Family.findByIdAndUpdate(id, entity, { new: true });
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async delete(id: string) {
    return Family.findByIdAndDelete(id);
  }
}
