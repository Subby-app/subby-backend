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
  TJoinMethod,
  TUpdateFamilyBody,
} from '@/web/validators/family.validation';
import { SubscriptionService } from './subscription.service';
import { ApplicationRepository } from '@/data/repositories/application.repository';
import { PlanRepository } from '@/data/repositories/plan.repository';
import { SubscriberRepository } from '@/data/repositories/subscriber.repository';

export class FamilyService {
  static async create(
    ownerId: string,
    familyData: TCreateFamilyBody,
  ): Promise<{ message: string; data: any }> {
    const app = await ApplicationRepository.findById(familyData.appId);
    if (!app) throw new NotFoundException('Application not found');

    const plan = await PlanRepository.findById(familyData.planId);
    if (!plan) throw new NotFoundException('Plan not found');
    // ! possible transactions {3}
    const family = await FamilyRepository.create(familyData, ownerId, plan.accountSlots);

    if (!family) {
      throw new NotFoundException('Failed to create family');
    }

    const subscription = await SubscriptionService.create({
      appId: familyData.appId,
      planId: familyData.planId,
      onboarding: familyData.onboarding,
      slotsAvailable: familyData.slotsAvailable,
      renewal: familyData.renewal,
      userId: ownerId,
    });

    return {
      message: 'Family Created',
      data: FamilyResponseDto.create(family.toObject(), subscription._id, app.appName),
    };
  }

  static async createSubscriber(familyId: string, userId: string, joinMethod: string) {
    const family = await FamilyRepository.findById(familyId);
    if (!family) throw new NotFoundException('No family found');
    else if (family.isFull) throw new ForbiddenException({ message: 'this family is full' });
    else if (family.owner.equals(userId))
      throw new ForbiddenException({ message: 'family owner cannot be a subscriber' });

    if (await SubscriberRepository.findOne({ familyId, userId }))
      throw new ForbiddenException({ message: 'you already belong to this family' });

    const subscriber = await SubscriberRepository.create({
      familyId,
      userId,
      joinMethod: joinMethod as TJoinMethod,
    });
    if (!subscriber)
      throw new ServerException({
        'failed to create a subscriber': `familyId: ${familyId}, userId: ${userId}`,
        message: 'failed to create a subscriber',
      });

    const slots = --family.slotsAvailable;
    const maxed = slots === 0;
    family.slotsAvailable = slots;
    family.isFull = maxed;

    const updatedFamily = await (
      await family.save()
    ).populate({
      path: 'appId',
      select: 'appName',
    });

    const user = await subscriber.populate({
      path: 'userId',
      select: 'username',
    });

    return {
      message: 'subscriber added to family',
      data: { subscriber: user, family: updatedFamily },
    };
  }

  static async getAll(
    filter: TFindFamiliesQuery,
  ): Promise<{ message: string; data: FamilyResponseDto[] }> {
    const families = await FamilyRepository.find(filter);

    if (!families || families.length === 0) {
      throw new NotFoundException('No families found');
    }

    return {
      message: 'Families fetched',
      data: FamilyResponseDto.fromMany(families),
    };
  }

  static async getById(familyId: string): Promise<{ message: string; data: FamilyResponseDto }> {
    const family = await FamilyRepository.findById(familyId);
    if (!family) {
      throw new NotFoundException('No family found');
    }

    return {
      message: 'Family fetched',
      data: FamilyResponseDto.from(family.toObject()),
    };
  }

  static async getFamilyOwner(
    reqUser: string,
  ): Promise<{ message: string; data: FamilyResponseDto[] }> {
    const family = await FamilyRepository.find({ owner: reqUser });
    if (!family) {
      throw new NotFoundException('No family found');
    }

    return {
      message: 'Family fetched',
      data: FamilyResponseDto.fromMany(family),
    };
  }

  static async getSubscribers(
    familyId: string,
  ): Promise<{ message: string; data: FamilyResponseDto[] }> {
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

  static async update(
    familyId: string,
    newData: TUpdateFamilyBody,
    reqUser: string,
  ): Promise<{ message: string; data: FamilyResponseDto }> {
    const family = await FamilyRepository.findById(familyId);
    if (!family) {
      throw new NotFoundException('No family found');
    }

    if (!family.owner.equals(reqUser))
      throw new ForbiddenException({ message: "you are not the family's owner" });

    const updatedFamily = await FamilyRepository.update(familyId, newData);

    if (!updatedFamily) {
      throw new NotFoundException('No family found after update');
    }

    return {
      message: 'Family Updated',
      data: FamilyResponseDto.from(updatedFamily.toObject()),
    };
  }

  static async updateSubscriber() {}

  static async delete(
    familyId: string,
    reqUser: string,
  ): Promise<{ message: string; data?: FamilyResponseDto }> {
    const family = await FamilyRepository.findById(familyId);
    if (!family) {
      throw new NotFoundException('No family found');
    }
    if (!family.owner.equals(reqUser))
      throw new ForbiddenException({ message: "you are not the family's owner" });

    await FamilyRepository.delete(familyId);

    return {
      message: 'Family deleted',
    };
  }

  static async deleteSubscriber() {}
}
