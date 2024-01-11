import { UserModel } from './user.model';
import { HttpStatus, HttpException } from '@/utils/exceptions';
import { TUserFilter, TFilterOptions, TUpdateUser } from './user.interface';

class UserService {
  private user = UserModel;
  private sensitiveUserFields = ['+password', '+otp', '+otpCreatedAt', '+recoveryCodes'];

  public async register(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    username: string,
    phoneNumber: string,
  ) {
    if (await this.user.findOne({ email })) {
      throw new HttpException(HttpStatus.FORBIDDEN, 'email already exists');
    }
    if (await this.user.findOne({ username })) {
      throw new HttpException(HttpStatus.FORBIDDEN, 'username already taken');
    }
    if (await this.user.findOne({ phoneNumber })) {
      throw new HttpException(HttpStatus.FORBIDDEN, 'phoneNumber already taken');
    }
    const role = 'user';
    await this.user.create({ email, firstName, lastName, password, username, phoneNumber, role });

    return { accountCreated: true, email };
  }

  public async findAll() {
    return await this.user.find({});
  }

  public async findOne(filter: TUserFilter, options?: TFilterOptions) {
    const query = this.user.findOne(filter);
    if (options?.sensitiveFields) query.select(this.sensitiveUserFields);
    const user = await query;
    if (!user) {
      throw new HttpException(HttpStatus.NOT_FOUND, `user with filter '${filter}' not found`);
    }
    return user;
  }

  public async getFullUser(filter: TUserFilter) {
    return await this.findOne(filter, { sensitiveFields: true });
  }

  public async updateUser(filter: TUserFilter, updateFields: TUpdateUser) {
    const user = await this.user.findOneAndUpdate(filter, updateFields, { new: true });
    if (!user)
      throw new HttpException(HttpStatus.NOT_FOUND, `user with filter '${filter}' not found`);
    return user;
  }

  public async getFamily(userId: string) {
    return (await this.findOne({ _id: userId })).populate('families');
  }

  public async addFamily(ownerId: string, familyId: string) {
    await this.user
      .findOneAndUpdate({ _id: ownerId }, { $push: { families: familyId } })
      .populate('families');
  }

  public async removeFamily(ownerId: string, familyId: string) {
    await this.user
      .findOneAndUpdate({ _id: ownerId }, { $pull: { families: familyId } })
      .populate('families');
  }

  public async isSubscribed(userId: string, familyId: string) {
    const user = await this.findOne({ _id: userId });
    let isSubscribed = false;
    user.subscriptions.forEach((subscription) => {
      if (subscription.toString() === familyId.toString()) isSubscribed = true;
    });
    return isSubscribed;
  }

  public async addSubscription(subscriberId: string, familyId: string) {
    await this.user
      .findOneAndUpdate({ _id: subscriberId }, { $push: { subscriptions: familyId } })
      .populate('subscriptions');
  }

  public async getSubscriptions(userId: string) {
    return (await this.findOne({ _id: userId })).populate('subscriptions');
  }

  public async removeSubscription(subscriberId: string, familyId: string) {
    await this.user
      .findOneAndUpdate({ _id: subscriberId }, { $pull: { subscriptions: familyId } })
      .populate('subscriptions');
  }

  public async deleteUser(filter: TUserFilter) {
    const user = await this.user.findOneAndDelete(filter);
    if (!user)
      throw new HttpException(HttpStatus.NOT_FOUND, `user with filter '${filter}' not found`);
    // !delete user's families
    return { accountDeleted: true, email: user.email };
  }
}

export { UserService };
