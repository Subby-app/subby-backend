import {
  TCreateFamilyBody,
  TUpdateFamilyBody,
  TFindFamiliesQuery,
} from '@/web/validators/family.validation';
import { Family } from '../models/index';
import BaseRepository from './base.repository';
import { TOverview } from '../interfaces/IFamily';

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

  static async getOverview(ownerId: string): Promise<TOverview> {
    const familiesCreated = await Family.countDocuments({ owner: ownerId });
    let totalActiveSubs = 0;
    (await Family.find({ owner: ownerId }).exec()).forEach(
      (family) => (totalActiveSubs += family.activeSubscribers),
    );

    return { familiesCreated, totalActiveSubs };
  }

  static async find(filter: TFindFamiliesQuery) {
    return Family.find(filter).populate('planId').exec();
  }

  static async findFamiliesToJoin(filter: TFindFamiliesQuery, userId: string) {
    const families = await Family.find({
      ...filter,
      owner: { $ne: userId },
      subscribers: { $nin: [userId] },
    })
      .populate('appId')
      .populate('planId');
    return families;
  }

  static async findById(id: string) {
    return Family.findById(id).populate('appId').populate('planId').exec();
  }

  static async findByIdWithSubs(id: string) {
    return Family.findById(id).select('+subscribers').populate('appId').populate('planId').exec();
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
