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
