import { FamilyModel } from './family.model';
import { HttpStatus, HttpException } from '@/utils/exceptions';
import { UserService } from '../user/user.service';
import { familyLabels } from './family.config';
import { TFamilyLabel, TFamilyFilter } from './family.interface';

class FamilyService {
  private family = FamilyModel;
  private UserService = new UserService();

  public async create(owner: string, name: string, label: TFamilyLabel) {
    const familyLabel = familyLabels[label];

    this.family.create({
      owner,
      name,
      label: familyLabel.label,
      maxSubscribers: familyLabel.maxSubs,
      spotsAvailable: familyLabel.maxSubs,
      membershipPrice: familyLabel.price,
    });
  }

  public async findOne(query: TFamilyFilter) {
    const family = await this.family.findOne(query);
    if (!family) throw new HttpException(HttpStatus.NOT_FOUND, 'family not found');
    return family;
  }

  public async addSubscriber(familyId: string, newSubscriberId: string, joinMethod: string) {
    const family = await this.findOne({ _id: familyId });
    if (family.isFull) throw new HttpException(HttpStatus.BAD_REQUEST, 'family is full');

    if (family.owner === newSubscriberId)
      throw new HttpException(HttpStatus.FORBIDDEN, 'family owner cannot be a subscriber');

    let isSubscriber = false;
    family.subscribers.forEach((subscriber) => {
      if (subscriber.subscriber.toString() === newSubscriberId.toString()) isSubscriber = true;
    });

    if (isSubscriber)
      throw new HttpException(HttpStatus.FORBIDDEN, 'new subscriber is already in this family');

    const joinedAt = Date.now().toString();

    family.subscribers.push({
      subscriber: newSubscriberId,
      joinMethod,
      isActive: true,
      revokeAccess: false,
      joinedAt,
    });
    const updatedFamily = await family.save();
    return { newSubscriber: true, familY: updatedFamily };
  }
}

export { FamilyService };
