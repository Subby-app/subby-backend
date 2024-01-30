import { ObjectId } from 'mongoose';
import { Wallet } from '../models/index';
import BaseRepository from './base.repository';

export class WalletRepository extends BaseRepository {
  static async create(entity: any, session: any) {
    try {
      const user = new Wallet(entity);
      await user.save({ session });

      return user;
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async findById(id: ObjectId) {
    try {
      return Wallet.findById(id);
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async findOne(filter: string) {
    try {
      return Wallet.findById(filter);
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async findEmail(email: string) {
    try {
      return Wallet.findById({ email });
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async update(entity: any, session: any) {
    try {
      return Wallet.findByIdAndUpdate(entity.id, entity, { new: true, session });
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }
}
