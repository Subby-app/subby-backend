import {
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
  TUpdateFamilyBody,
} from '@/web/validators/family.validation';
import { SubscriptionService } from './subscription.service';
import { ApplicationRepository } from '@/data/repositories/application.repository';
import { PlanRepository } from '@/data/repositories/plan.repository';
import { calcEndDate } from '@/utils/end-date.util';
import { SubscriptionRepository } from '@/data/repositories';
import { ISubscription } from '@/data/interfaces/ISubscription';
import { SubscriberService } from './subscriber.service';
import { createObjectId } from '@/data/lib/createId';

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
    else if (familyData.availableSlots > plan.accountSlots)
      throw new ForbiddenException({
        message: "the number of available slots is larger than the plan's capacity",
      });

    if (familyData.onboarding.type !== app.onBoardingType)
      throw new ForbiddenException({
        message: "the family's onboarding type does not match the applications onboarding type",
      });

    const isFull = familyData.activeSubscribers === plan.accountSlots;
    const subscriptionEnd = calcEndDate(familyData.subscriptionStart, familyData.tenure);

    const family = await FamilyRepository.create(
      familyData,
      ownerId,
      plan.accountSlots,
      isFull,
      subscriptionEnd,
    );

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

  static async getOverview(ownerId: string) {
    const overview = await FamilyRepository.getOverview(ownerId);
    return {
      message: 'family owner overview',
      data: FamilyResponseDto.overview(overview),
    };
  }

  static async joinFamily(familyId: string, userId: string) {
    const family = await FamilyRepository.findByIdWithSubs(familyId);

    if (!family) throw new NotFoundException('No family found');
    else if (family.isFull) throw new ForbiddenException({ message: 'this family is full' });
    else if (family.owner.equals(userId))
      throw new ForbiddenException({ message: 'family owner cannot be a subscriber' });

    if (await SubscriptionRepository.findOne({ familyId, userId }))
      throw new ForbiddenException({ message: 'you already belong to this family' });

    const activeSubs = ++family.activeSubscribers;
    const slots = family.availableSlots === 0 ? 0 : --family.availableSlots;
    const maxed = activeSubs === family.maxSubscribers;
    family.activeSubscribers = activeSubs;
    family.availableSlots = slots;
    family.isFull = maxed;
    family.subscribers.push(createObjectId(userId));

    await family.save();
    const subscription = await SubscriptionService.create({ userId, familyId });
    await SubscriberService.create(familyId, userId, 'join'); // TODO get joinMethod from req query

    return {
      message: 'user has been added to the family',
      data: subscription,
    };
  }

  static async getFamiliesToJoin(filter: TFindFamiliesQuery, userId: string) {
    const { paginationDetails, families } = await FamilyRepository.findFamiliesToJoin(
      filter,
      userId,
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
    const family = await FamilyRepository.findById(familyId);
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
    const family = await FamilyRepository.findById(familyId);
    if (!family) {
      throw new NotFoundException('No family found');
    }
    // !use subscriber service method to find subscribers with 'familyId'

    return {
      message: 'Family fetched',
      data: FamilyResponseDto.fromMany([family]),
    };
  }

  static async getSubscribedFamilies(filter: TFindFamiliesQuery, userId: string) {
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

    if (
      newData.availableSlots &&
      newData.availableSlots > family.maxSubscribers - family.activeSubscribers
    )
      throw new ForbiddenException({
        message: "the available slots provided exceeds the available family's capacity",
      });

    const updatedFamily = await FamilyRepository.update(familyId, newData);

    if (!updatedFamily) {
      throw new NotFoundException('No family found after update');
    }

    return {
      message: 'Family Updated',
      data: FamilyResponseDto.from(updatedFamily.toObject()),
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
