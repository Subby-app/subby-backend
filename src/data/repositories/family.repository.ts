import { TCreateFamilyBody, TFindFamiliesQuery } from '@/web/validators/family.validation';
import { Family } from '../models/index';
import BaseRepository from './base.repository';
import { TOverview, TUpdateFamily } from '../interfaces/IFamily';
import { Types } from 'mongoose';
import { SubscriberRepository } from './subscriber.repository';

export class FamilyRepository extends BaseRepository {
  static async create(
    familyData: TCreateFamilyBody,
    ownerId: string,
    isFull: boolean,
    subscriptionEnd: Date,
  ) {
    try {
      const family = new Family({
        ...familyData,
        owner: ownerId,
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
    const _filter = { owner: ownerId, isActive: true };
    const familiesCreated = await Family.countDocuments(_filter);

    // let totalActiveSubs = 0;
    // (await Family.find(_filter).exec()).forEach(
    //   (family) => (totalActiveSubs += family.activeSubscribers), //!some subscribers may be unknown to the app
    // );
    const createdFamiliesId = (await Family.find(_filter).exec()).map((family) => family._id);
    const totalActiveSubs = await SubscriberRepository.countSubscribers(createdFamiliesId);
    return { familiesCreated, totalActiveSubs };
  }

  static async find(filter: TFindFamiliesQuery) {
    return Family.find(filter).populate('planId').exec();
  }

  static async findFamiliesToJoin(
    filter: TFindFamiliesQuery,
    userId: string,
    subbedFamiliesId: Types.ObjectId[],
  ) {
    const { page, limit, sort, sortField, ...search } = filter;
    const _filter = {
      ...search,
      owner: { $ne: userId },
      _id: { $nin: subbedFamiliesId },
      isActive: true,
    };

    const totalFamilies = await Family.countDocuments(_filter);
    const paginationDetails = this.calcPaginationDetails(page, limit, totalFamilies);

    const families = await Family.find(_filter)
      .skip(paginationDetails.skip)
      .limit(limit)
      .sort({ [sortField]: sort })
      .populate('appId')
      .populate('planId');

    return { paginationDetails, families };
  }

  static async findById(id: string) {
    return Family.findById(id).populate('appId').populate('planId').exec();
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
      .skip(paginationDetails.skip)
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
