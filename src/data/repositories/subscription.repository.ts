import { Subscription } from '../models/index';
import BaseRepository from './base.repository';
import { TSubscriptionCreate, TSubscriptionFilter } from '../interfaces/ISubscription';

export class SubscriptionRepository extends BaseRepository {
  static async create(entity: TSubscriptionCreate) {
    try {
      const subscription = new Subscription(entity);
      await subscription.save();
      const subscription = new Subscription(entity);
      await subscription.save();

      return subscription;
      return subscription;
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async find(filter: TSubscriptionFilter) {
    return Subscription.find(filter);
  }

  static async findById(id: string) {
    return Subscription.findById(id);
  }

  static async findOne(filter: TSubscriptionFilter) {
    return Subscription.findOne(filter);
  }

  static async update() {}

  static async delete() {}
}
