import { FamilyModel } from './family.model';
import { HttpStatus, HttpException } from '@/utils/exceptions';
import { UserService } from '../user/user.service';
import { familyLabels } from './family.config';
import { TFamilyLabel, TFamilyFilter } from './family.interface';
import mongoose from 'mongoose';

class FamilyService {
  private family = FamilyModel;
  private UserService = new UserService();

  public async create(owner: string, name: string, label: TFamilyLabel) {
    const familyLabel = familyLabels[label];

    await this.family.create({
      owner,
      name,
      label: familyLabel.label,
      maxSubscribers: familyLabel.maxSubs,
      spotsAvailable: familyLabel.maxSubs,
      membershipPrice: familyLabel.price,
    });
    // !add family to owners families[]
    return { familyCreated: true, name };
  }

  public async findOne(query: TFamilyFilter) {
    const family = await this.family.findOne(query);
    if (!family) throw new HttpException(HttpStatus.NOT_FOUND, 'family not found');
    return family;
  }

  public async addSubscriber(familyId: string, newSubscriberId: string, joinMethod: string) {
    const family = await this.findOne({ _id: familyId });
    if (family.isFull) throw new HttpException(HttpStatus.BAD_REQUEST, 'family is full');

    const ownerObjId = new mongoose.Types.ObjectId(family.owner);
    if (ownerObjId.equals(newSubscriberId))
      throw new HttpException(HttpStatus.FORBIDDEN, 'family owner cannot be a subscriber');

    let isSubscriber = false;
    family.subscribers.forEach((subscriber) => {
      if (subscriber.subscriber.toString() === newSubscriberId.toString()) isSubscriber = true;
    });

    if (isSubscriber)
      throw new HttpException(HttpStatus.FORBIDDEN, 'new subscriber is already in this family');

    const joinedAt = Date.now().toString();

    // !improve queries, don't use 'save()' method in memory
    family.subscribers.push({
      subscriber: newSubscriberId,
      joinMethod,
      isActive: true,
      revokeAccess: false,
      joinedAt,
    });
    const updatedFamily = await family.save();
    // !add family to subscriber's subscriptions[]
    return { newSubscriber: true, familY: updatedFamily };
  }
}

export { FamilyService };
