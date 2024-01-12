import { FamilyModel } from './family.model';
import { HttpStatus, HttpException } from '@/utils/exceptions';
import { UserService } from '../user/user.service';
import { familyLabels } from './family.config';
import { TFamilyLabel, TFamilyFilter } from './family.interface';
import * as mongooseUtil from '@/utils/database/mongoose.util';
import { TSubscribers } from './family.interface';

class FamilyService {
  private family = FamilyModel;
  private UserService = new UserService();

  public async create(owner: string, name: string, label: TFamilyLabel) {
    const familyLabel = familyLabels[label];

    const _id = mongooseUtil.createObjectId();
    await this.family.create({
      _id,
      owner,
      name,
      label: familyLabel.label,
      maxSubscribers: familyLabel.maxSubs,
      spotsAvailable: familyLabel.maxSubs,
      membershipPrice: familyLabel.price,
    });

    await this.UserService.addFamily(owner, _id.toString());
    return { familyCreated: true, id: _id };
  }

  public async findOne(query: TFamilyFilter) {
    const family = await this.family.findOne(query).populate('subscribers.subscriber');
    if (!family) throw new HttpException(HttpStatus.NOT_FOUND, 'family not found');
    return family;
  }

  public async familyOverview(ownerId: string) {
    const families = await this.family
      .find({ owner: ownerId })
      .populate('owner', 'name')
      .populate('subscribers.subscriber', 'name');

    const familyCount = families.length;
    let subCount = 0;
    families.forEach((family) => {
      const activeSubs = family.subscribers.filter((subscriber) => (subscriber.isActive = true));
      subCount = activeSubs.length;
    });

    return {
      totalFamilies: familyCount,
      activeSubs: subCount,
      families,
    };
  }

  public async addSubscriber(familyId: string, newSubscriberId: string, joinMethod: string) {
    const family = await this.findOne({ _id: familyId });
    if (family.isFull) throw new HttpException(HttpStatus.BAD_REQUEST, 'family is full');

    if (mongooseUtil.isEqualObjectId(family.owner, newSubscriberId))
      throw new HttpException(HttpStatus.FORBIDDEN, 'family owner cannot be a subscriber');

    // prevent multiple subscriptions to same family
    if (await this.UserService.isSubscribed(newSubscriberId, familyId))
      throw new HttpException(HttpStatus.FORBIDDEN, 'user is already subscribed');

    // prevent multiple subscribers to same family
    if (this.isSubscribed(family.subscribers, newSubscriberId))
      throw new HttpException(HttpStatus.FORBIDDEN, 'subscriber is already in this family');

    const joinedAt = Date.now().toString();

    const addSub = await this.family.findOneAndUpdate(
      { _id: familyId },
      {
        $push: {
          subscribers: {
            subscriber: newSubscriberId,
            joinMethod,
            isActive: true,
            revokeAccess: false,
            joinedAt,
          },
        },
        $inc: { spotsAvailable: -1 },
      },
      { new: true },
    );
    const full = addSub?.spotsAvailable === 0;
    const updatedFamily = await this.family
      .findOneAndUpdate({ _id: familyId }, { $set: { isFull: full } }, { new: true })
      .populate('subscribers.subscriber');

    await this.UserService.addSubscription(newSubscriberId, familyId);
    return { newSubscriber: true, family: updatedFamily };
  }

  public isSubscribed(subscribers: TSubscribers, subscriberId: string) {
    let isSubscriber = false;
    subscribers.forEach((subscriber) => {
      if (subscriber.subscriber.toString() === subscriberId.toString()) isSubscriber = true;
    });
    return isSubscriber;
  }

  public async revokeAccess(ownerId: string, familyId: string, subscriberId: string) {
    const family = await this.findOne({ _id: familyId });

    if (!mongooseUtil.isEqualObjectId(family.owner, ownerId))
      throw new HttpException(HttpStatus.FORBIDDEN, `you are not the family's owner`);

    const updatedFamily = await this.family.findOneAndUpdate(
      { _id: familyId },
      {
        $set: {
          subscribers: {
            subscriber: subscriberId,
            revokeAccess: true,
          },
        },
      },
      { new: true },
    );
    return updatedFamily;
  }

  public async leaveFamily(familyId: string, subscriberId: string) {
    const removeSub = await this.family.findOneAndUpdate(
      { _id: familyId },
      {
        $pull: {
          subscribers: {
            subscriber: subscriberId,
          },
        },
        $inc: { spotsAvailable: 1 },
      },
      { new: true },
    );
    const full = removeSub?.spotsAvailable === 0;
    await this.family
      .findOneAndUpdate({ _id: familyId }, { $set: { isFull: full } }, { new: true })
      .populate('subscribers.subscriber');
    await this.UserService.removeSubscription(subscriberId, familyId);
    const subscriptions = await this.UserService.getSubscriptions(subscriberId);
    return subscriptions;
  }

  public async deleteFamily(familyId: string, ownerId: string) {
    const family = await this.findOne({ _id: familyId });

    if (!mongooseUtil.isEqualObjectId(family.owner, ownerId))
      throw new HttpException(HttpStatus.FORBIDDEN, `you are not the family's owner`);

    await this.UserService.removeFamily(ownerId, familyId);

    family.subscribers.forEach(async (subscriberObj) => {
      await this.UserService.removeSubscription(subscriberObj.subscriber, familyId);
    });
    await family.deleteOne();
    return { familyDeleted: true };
  }
}

export { FamilyService };
