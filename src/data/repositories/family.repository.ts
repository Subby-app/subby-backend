import { ObjectId } from 'mongoose';
import { Transaction } from '../models/index';
import BaseRepository from './base.repository';

export class FamilyRepository extends BaseRepository {
  static async create(entity: any, session: any) {
    try {
      const user = new Transaction(entity);
      await user.save({ session });

      return user;
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async find() {
    try {
      return Transaction.find();
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async findById(id: ObjectId) {
    try {
      return Transaction.findById(id);
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async findOne(filter: string) {
    try {
      return Transaction.findById(filter);
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async findEmail(email: string) {
    try {
      return Transaction.findById({ email });
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async update(entity: any, session: any) {
    try {
      return Transaction.findByIdAndUpdate(entity.id, entity, { new: true, session });
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }
}
