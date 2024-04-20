import { SubscriberRepository } from '@/data/repositories/subscriber.repository';
import { ConflictException, ForbiddenException, NotFoundException } from '@/utils/exceptions';
import { TFindSubFamiliesQuery, TJoinMethod } from '@/web/validators/family.validation';
import { FamilyResponseDto } from '../dtos/Family';

export class SubscriberService {
  static async create(familyId: string, userId: string, joinMethod: TJoinMethod) {
    if (await SubscriberRepository.findOne({ familyId, userId }))
      throw new ForbiddenException({ message: 'you are already subscribed to this family' });

    return await SubscriberRepository.create({ familyId, userId, joinMethod });
  }

  static async findOne(familyId: string, userId: string) {
    const subscriber = await SubscriberRepository.findOne({ familyId, userId });
    if (!subscriber)
      throw new NotFoundException({ message: 'this user is not subscribed to this family' });
    return subscriber;
  }

  static async findSubscribedFamilies(filter: TFindSubFamiliesQuery, userId: string) {
    return await SubscriberRepository.findSubscribedFamilies(filter, userId);
  }

  static async getSubscribedFamiliesIds(userId: string) {
    const familiesIds = await SubscriberRepository.findSubscribedFamiliesId(userId);
    return FamilyResponseDto.getFamiliesId(familiesIds);
  }

  static async getOverview(userId: string) {
    return await SubscriberRepository.getOverview(userId);
  }

  static async activate(familyId: string, userId: string) {
    const _filter = { familyId, userId };
    const subscriber = await SubscriberRepository.findOne(_filter);

    if (!subscriber)
      throw new NotFoundException({ message: 'this user is not subscribed to this family' });
    if (subscriber.isActive)
      throw new ConflictException({ message: 'this subscriber is already active' });

    // business logic

    const activatedSubscriber = await SubscriberRepository.update(_filter, { isActive: true });

    if (!activatedSubscriber)
      throw new NotFoundException({ message: 'subscriber not found after update' });

    return { message: 'subscriber has been activated', subscriber: activatedSubscriber };
  }

  static async deactivate(familyId: string, userId: string) {
    const _filter = { familyId, userId };
    const subscriber = await SubscriberRepository.findOne(_filter);

    if (!subscriber)
      throw new NotFoundException({ message: 'this user is not subscribed to this family' });
    if (!subscriber.isActive)
      throw new ConflictException({ message: 'this subscriber is already inactive' });

    // business logic

    const deactivatedSubscriber = await SubscriberRepository.update(_filter, { isActive: false });

    if (!deactivatedSubscriber)
      throw new NotFoundException({ message: 'subscriber not found after update' });

    return { message: 'subscriber has been deactivated', subscriber: deactivatedSubscriber };
  }
}
