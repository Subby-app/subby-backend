import { FilterQuery } from 'mongoose';
import { Subscription } from '../models/index';
import BaseRepository from './base.repository';
import { ISubscription } from '../interfaces/ISubscription';

export class SubscriptionRepository extends BaseRepository {
  static async create(entity: any) {
    try {
      const subscription = new Subscription(entity);
      await subscription.save();

      return subscription;
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async find() {
    return Subscription.find();
  }

  static async findById(id: string) {
    return Subscription.findById(id);
  }

  static async findOne(filter: FilterQuery<ISubscription>) {
    return Subscription.findOne(filter);
  }

  static async findOwners(filter: FilterQuery<ISubscription>) {
    return Subscription.find(filter);
  }

  static async getSubscribers(subscribers: FilterQuery<ISubscription>) {
    return Subscription.find(subscribers);
  }

  static async update(id: string, entity: any) {
    try {
      return Subscription.findByIdAndUpdate(id, entity, { new: true });
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async delete(id: string) {
    return Subscription.findByIdAndDelete(id);
  }
}
