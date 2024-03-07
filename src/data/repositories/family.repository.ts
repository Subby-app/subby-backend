import {
  TCreateFamilyBody,
  TUpdateFamilyBody,
  TFindFamiliesQuery,
} from '@/web/validators/family.validation';
import { Family } from '../models/index';
import BaseRepository from './base.repository';

export class FamilyRepository extends BaseRepository {
  static async create(
    familyData: TCreateFamilyBody,
    ownerId: string,
    maxSubscribers: number,
    isFull: boolean,
    subscriptionEnd: Date,
  ) {
    try {
      const family = new Family({
        ...familyData,
        owner: ownerId,
        maxSubscribers,
        isFull,
        subscriptionEnd,
      });
      await family.save();

      return family;
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async find(filter: TFindFamiliesQuery) {
    return Family.find(filter);
  }

  static async findById(id: string) {
    return Family.findById(id).populate('appId').populate('planId').exec();
  }

  static async findOne(filter: TFindFamiliesQuery) {
    return Family.findOne(filter);
  }

  static async findOwner(filter: { owner: string }) {
    return Family.find(filter).populate('appId').populate('planId').exec();
  }

  static async update(id: string, newData: TUpdateFamilyBody) {
    try {
      return Family.findByIdAndUpdate(id, newData, { new: true });
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async delete(id: string) {
    return Family.findByIdAndDelete(id);
  }
}
