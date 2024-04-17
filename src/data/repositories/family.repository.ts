import { TCreateFamilyBody, TFindFamiliesQuery } from '@/web/validators/family.validation';
import { Family } from '../models/index';
import BaseRepository from './base.repository';
import { TOverview, TUpdateFamily } from '../interfaces/IFamily';

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
    const familiesCreated = await Family.countDocuments({ owner: ownerId, isActive: true });
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
    const { page, limit, sort, sortField, ...search } = filter;
    const _filter = {
      ...search,
      owner: { $ne: userId },
      subscribers: { $nin: [userId] },
      isActive: true,
    };

    const totalFamilies = await Family.countDocuments(_filter);
    const paginationDetails = this.calcPaginationDetails(page, limit, totalFamilies);

    const families = await Family.find(_filter)
      .skip((paginationDetails.currentPage - 1) * limit)
      .limit(limit)
      .sort({ [sortField]: sort })
      .populate('appId')
      .populate('planId');

    return { paginationDetails, families };
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

  static async findOwner(filter: TFindFamiliesQuery, userId: string) {
    const { page, limit, sort, sortField, ...search } = filter;
    const _filter = { ...search, owner: userId, isActive: true };

    const totalFamilies = await Family.countDocuments(_filter);
    const paginationDetails = this.calcPaginationDetails(page, limit, totalFamilies);

    const families = await Family.find(_filter)
      .skip((paginationDetails.currentPage - 1) * limit)
      .limit(limit)
      .sort({ [sortField]: sort })
      .populate('appId')
      .populate('planId');

    return { paginationDetails, families };
  }

  static async update(id: string, newData: TUpdateFamily) {
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
