import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
  ServerException,
} from '../../utils/exceptions/index';
import { FamilyRepository } from '../../data/repositories/family.repository';
import { FamilyResponseDto } from '../../logic/dtos/Family';
import {
  TCreateFamilyBody,
  TFindFamiliesQuery,
  TFindFamilyQuery,
  TFindSubFamiliesQuery,
  TUpdateFamilyBody,
  TUpdateSubscriberQuery,
} from '@/web/validators/family.validation';
import { SubscriptionService } from './subscription.service';
import { ApplicationRepository } from '@/data/repositories/application.repository';
import { PlanRepository } from '@/data/repositories/plan.repository';
import { calcEndDate } from '@/utils/end-date.util';
import { SubscriptionRepository } from '@/data/repositories';
import { ISubscription } from '@/data/interfaces/ISubscription';
import { ISubscriber } from '@/data/interfaces/ISubscriber';
import { SubscriberService } from './subscriber.service';

export class FamilyService {
  static async create(ownerId: string, familyData: TCreateFamilyBody) {
    const app = await ApplicationRepository.findById(familyData.appId);
    if (!app) throw new NotFoundException('Application not found');

    const plan = await PlanRepository.findById(familyData.planId);
    if (!plan) throw new NotFoundException('Plan not found');

    if (plan.applicationId.toString() !== app._id.toString())
      throw new ForbiddenException({
        message: 'the selected plan does not belong to this application',
      });

    if (familyData.activeSubscribers > plan.accountSlots)
      throw new ForbiddenException({
        message: "the number of active accounts is larger than the plan's capacity",
      });
    if (familyData.availableSlots > plan.accountSlots - familyData.activeSubscribers)
      throw new ForbiddenException({
        message:
          'the available slots provided exceeds the expected available capacity for this plan',
      });

    if (familyData.onboarding.type !== app.onBoardingType)
      throw new ForbiddenException({
        message: "the family's onboarding type does not match the applications onboarding type",
      });

    const isFull = familyData.activeSubscribers === plan.accountSlots;
    const subscriptionEnd = calcEndDate(familyData.subscriptionStart, familyData.tenure);

    const family = await FamilyRepository.create(familyData, ownerId, isFull, subscriptionEnd);

    if (!family) {
      throw new ServerException({ message: 'Failed to create family' });
    }

    const subscription = await SubscriptionService.create({
      userId: ownerId,
      familyId: family._id,
    });

    return {
      message: 'Family Created',
      data: FamilyResponseDto.create(
        family.toObject(),
        subscription._id,
        app.applicationName,
        plan.planName,
        +plan.price,
      ),
    };
  }

  static async getFamilyOverview(ownerId: string) {
    const overview = await FamilyRepository.getOverview(ownerId);
    return {
      message: 'family owner overview',
      data: FamilyResponseDto.familyOverview(overview),
    };
  }

  static async getSubscriptionsOverview(ownerId: string) {
    const subOverview = await SubscriberService.getOverview(ownerId);
    return {
      message: 'subscriptions overview',
      data: FamilyResponseDto.subscriptionsOverview(subOverview),
    };
  }

  static async joinFamily(familyId: string, userId: string) {
    const family = await FamilyRepository.findById(familyId);
    if (!family) throw new NotFoundException('no family found');

    if (!family.availableSlots)
      throw new ForbiddenException({ message: 'this family has no available slots' });
    else if (family.isFull) throw new ForbiddenException({ message: 'this family is full' });
    else if (family.owner.equals(userId))
      throw new ForbiddenException({ message: 'family owner cannot be a subscriber' });
    else if (!family.isActive) throw new ForbiddenException({ message: 'this family is inactive' });

    // use subscriber service
    if (await SubscriptionRepository.findOne({ familyId, userId }))
      throw new ForbiddenException({ message: 'you already belong to this family' });

    const familyPlan = await PlanRepository.findById(family.planId.toString());
    if (!familyPlan) throw new NotFoundException('family plan not found');

    const activeSubs = ++family.activeSubscribers;
    const slots = --family.availableSlots;
    const maxed = activeSubs === familyPlan.accountSlots;
    family.activeSubscribers = activeSubs;
    family.availableSlots = slots;
    family.isFull = maxed;

    await family.save();
    const subscription = await SubscriptionService.create({ userId, familyId });
    await SubscriberService.create(familyId, userId, 'join'); // TODO get joinMethod from req query

    return {
      message: 'user has been added to the family',
      data: subscription,
    };
  }

  static async getFamiliesToJoin(filter: TFindFamiliesQuery, userId: string) {
    const subbedFamiliesId = await SubscriberService.getSubscribedFamiliesIds(userId);
    const { paginationDetails, families } = await FamilyRepository.findFamiliesToJoin(
      filter,
      userId,
      subbedFamiliesId,
    );

    return {
      message: 'available families to join',
      data: FamilyResponseDto.paginateFamilies(paginationDetails, families),
    };
  }

  static async getAll(
    filter: TFindFamiliesQuery,
  ): Promise<{ message: string; data: FamilyResponseDto[] }> {
    const families = await FamilyRepository.find(filter);

    // if (!families.length) {
    //   throw new NotFoundException('No families found');
    // }

    return {
      message: 'Families fetched',
      data: FamilyResponseDto.fromMany(families),
    };
  }

  static async getById(
    familyId: string,
    query: TFindFamilyQuery,
  ): Promise<{ message: string; data: FamilyResponseDto }> {
    const family = await FamilyRepository.findByIdAndPopulate(familyId);
    if (!family) {
      throw new NotFoundException('No family found');
    }

    let subscriptions: ISubscription[] | undefined;
    if (query.subscriptions)
      subscriptions = await SubscriptionService.findAll({ familyId: family._id });
    else subscriptions = undefined;

    return {
      message: 'Family fetched',
      data: { family: FamilyResponseDto.from(family), subscriptions },
    };
  }

  static async getFamilyOwner(filter: TFindFamiliesQuery, userId: string) {
    const { paginationDetails, families } = await FamilyRepository.findOwner(filter, userId);

    // if (!families.length) {
    //   throw new NotFoundException('you do not own any family');
    // }

    return {
      message: 'Family fetched',
      data: FamilyResponseDto.paginateFamilies(paginationDetails, families),
    };
  }

  static async getSubscribers(familyId: string) {
    const family = await FamilyRepository.findByIdAndPopulate(familyId);
    if (!family) {
      throw new NotFoundException('No family found');
    }
    // !use subscriber service method to find subscribers with 'familyId'

    return {
      message: 'Family fetched',
      data: FamilyResponseDto.fromMany([family]),
    };
  }

  static async getSubscribedFamilies(filter: TFindSubFamiliesQuery, userId: string) {
    const { paginationDetails, subscribedFamilies } =
      await SubscriberService.findSubscribedFamilies(filter, userId);
    // if (!subscribedFamilies.length)
    //   throw new NotFoundException('you are not subscribed to any family');

    return {
      message: 'all subscribed families',
      data: FamilyResponseDto.paginateSubscribers(paginationDetails, subscribedFamilies),
    };
  }

  static async update(familyId: string, newData: TUpdateFamilyBody, reqUser: string) {
    const family = await FamilyRepository.findById(familyId);
    if (!family) {
      throw new NotFoundException('No family found');
    }

    if (!family.owner.equals(reqUser))
      throw new ForbiddenException({ message: "you are not the family's owner" });

    const familyPlan = await PlanRepository.findById(family.planId.toString());
    if (!familyPlan) throw new NotFoundException('family plan not found');
    //? DRY, search if req obj can be referenced in z.schema.parse() or encapsulate checks into a fn
    if (
      newData.availableSlots &&
      newData.availableSlots > familyPlan.accountSlots - family.activeSubscribers
    ) {
      throw new ForbiddenException({
        message: "the available slots provided exceeds the available family's capacity",
      });
    }
    if (
      newData.activeSubscribers &&
      newData.activeSubscribers > familyPlan.accountSlots - family.availableSlots
    ) {
      throw new ForbiddenException({
        message: "the active subscriber provided exceeds the available family's capacity",
      });
    }

    const updatedFamily = await FamilyRepository.update(familyId, newData);

    if (!updatedFamily) {
      throw new NotFoundException('no family found after update');
    }

    return {
      message: 'Family Updated',
      data: FamilyResponseDto.from(updatedFamily.toObject()),
    };
  }

  static async activate(familyId: string, reqUser: string) {
    const family = await FamilyRepository.findById(familyId);
    if (!family) throw new NotFoundException('No family found');
    if (family.isActive) throw new ConflictException({ message: 'this family is already active' });

    if (!family.owner.equals(reqUser))
      throw new ForbiddenException({ message: "you are not the family's owner" });

    // business logic

    const updatedFamily = await FamilyRepository.update(familyId, { isActive: true });
    if (!updatedFamily) throw new NotFoundException('no family found after update');

    return {
      message: 'family has been activated',
      data: FamilyResponseDto.from(updatedFamily),
    };
  }

  static async deactivate(familyId: string, reqUser: string) {
    const family = await FamilyRepository.findById(familyId);
    if (!family) throw new NotFoundException('No family found');
    if (!family.isActive)
      throw new ConflictException({ message: 'this family is already inactive' });

    if (!family.owner.equals(reqUser))
      throw new ForbiddenException({ message: "you are not the family's owner" });

    // business logic

    const updatedFamily = await FamilyRepository.update(familyId, { isActive: false });
    if (!updatedFamily) throw new NotFoundException('no family found after update');

    return {
      message: 'family has been deactivated',
      data: FamilyResponseDto.from(updatedFamily),
    };
  }

  static async updateSubscriber(familyId: string, userId: string, query: TUpdateSubscriberQuery) {
    const family = await FamilyRepository.findById(familyId);
    if (!family) throw new NotFoundException('family not found');
    let message: string, subscriber: ISubscriber;

    switch (query.action) {
      case 'activate':
        ({ message, subscriber } = await SubscriberService.activate(familyId, userId));
        break;
      case 'deactivate':
        ({ message, subscriber } = await SubscriberService.deactivate(familyId, userId));
        break;
      default:
        subscriber = await SubscriberService.findOne(familyId, userId); //if data is in req.body, update subscriber
        message = 'no updates where made to this subscriber';
        break;
    }

    const data = FamilyResponseDto.subscribedFamily(subscriber);
    return {
      message,
      data,
    };
  }

  static async delete(familyId: string, reqUser: string) {
    const family = await FamilyRepository.findById(familyId);
    if (!family) {
      throw new NotFoundException('No family found');
    }
    if (!family.owner.equals(reqUser))
      throw new ForbiddenException({ message: "you are not the family's owner" });

    await FamilyRepository.delete(familyId);

    return {
      message: 'Family deleted',
      data: {},
    };
  }
}
