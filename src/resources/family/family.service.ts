import { FamilyModel } from './family.model';
import { HttpStatus, HttpException } from '@/utils/exceptions';
import { UserService } from '../user/user.service';
import { familyLabels } from './family.config';
import { TFamilyLabel, TFamilyFilter } from './family.interface';
import * as mongooseUtil from '@/utils/database/mongoose.util';

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

  public async addSubscriber(familyId: string, newSubscriberId: string, joinMethod: string) {
    const family = await this.findOne({ _id: familyId });
    if (family.isFull) throw new HttpException(HttpStatus.BAD_REQUEST, 'family is full');

    if (mongooseUtil.isEqualObjectId(family.owner, newSubscriberId))
      throw new HttpException(HttpStatus.FORBIDDEN, 'family owner cannot be a subscriber');

    let isSubscriber = false;
    family.subscribers.forEach((subscriber) => {
      if (subscriber.subscriber.toString() === newSubscriberId.toString()) isSubscriber = true;
    });

    if (isSubscriber)
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
}

export { FamilyService };
