import { TFindSubFamiliesQuery } from '@/web/validators/family.validation';
import { TSubscriber, TSubscriberFilter } from '../interfaces/ISubscriber';
import { Subscriber } from '../models/subscriber.model';
import BaseRepository from './base.repository';

export class SubscriberRepository extends BaseRepository {
  static async create(entity: TSubscriber) {
    try {
      const subscriber = await Subscriber.create(entity);
      return subscriber;
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async findAll(filter: TSubscriberFilter) {
    const subscribers = await Subscriber.find(filter);
    return subscribers;
  }

  static async findSubscribedFamilies(filter: TFindSubFamiliesQuery, userId: string) {
    const { page, limit, sort, sortField, ...search } = filter;
    const _filter = { ...search, userId }; // TODO add check for family.isActive

    const totalSubscribedFamilies = await Subscriber.countDocuments(_filter);
    const paginationDetails = this.calcPaginationDetails(page, limit, totalSubscribedFamilies);

    const subscribedFamilies = await Subscriber.find(_filter)
      .skip((paginationDetails.currentPage - 1) * limit)
      .limit(limit)
      .sort({ [sortField]: sort })
      .populate({
        path: 'familyId',
        select: '-owner -appId -updatedAt -__v',
        populate: { path: 'planId' },
      });

    return { paginationDetails, subscribedFamilies };
  }

  static async findOne(filter: TSubscriberFilter) {
    const subscriber = await Subscriber.findOne(filter);
    return subscriber;
  }

  static async update(filter: TSubscriberFilter) {
    const subscriber = await Subscriber.findOneAndUpdate(filter, {}, { new: true });
    return subscriber;
  }

  static async delete(filter: TSubscriberFilter) {
    const subscriber = await Subscriber.findOneAndDelete(filter);
    return subscriber;
  }
}
