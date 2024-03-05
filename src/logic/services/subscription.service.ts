import { SubscriptionRepository } from '@/data/repositories';
import { TSubscriptionCreate, TSubscriptionFilter } from '@/data/interfaces/ISubscription';
import { NotFoundException, ServerException } from '@/utils/exceptions';

export class SubscriptionService {
  static async create(entity: TSubscriptionCreate) {
    const subscription = await SubscriptionRepository.create(entity);
    if (!subscription) throw new ServerException({ message: 'failed to create subscription' });

    return subscription;
  }

  static async findAll(filter: TSubscriptionFilter) {
    const subscriptions = await SubscriptionRepository.find(filter);
    return subscriptions;
  }

  static async findById(subscriptionId: string) {
    const subscription = await SubscriptionRepository.findById(subscriptionId);
    if (!subscription) throw new NotFoundException('subscription not found');

    return subscription;
  }

  static async findOne(filter: TSubscriptionFilter) {
    const subscription = await SubscriptionRepository.findOne(filter);
    if (!subscription) throw new NotFoundException('subscription not found');

    return subscription;
  }

  static async updateOne() {}

  static async deleteOne() {}
}
