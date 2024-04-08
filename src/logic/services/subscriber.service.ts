import { SubscriberRepository } from '@/data/repositories/subscriber.repository';
import { ForbiddenException } from '@/utils/exceptions';
import { TFindSubFamiliesQuery, TJoinMethod } from '@/web/validators/family.validation';

export class SubscriberService {
  static async create(familyId: string, userId: string, joinMethod: TJoinMethod) {
    if (await SubscriberRepository.findOne({ familyId, userId }))
      throw new ForbiddenException({ message: 'you are already subscribed to this family' });

    return await SubscriberRepository.create({ familyId, userId, joinMethod });
  }

  static async findSubscribedFamilies(filter: TFindSubFamiliesQuery, userId: string) {
    return await SubscriberRepository.findSubscribedFamilies(filter, userId);
  }
}
