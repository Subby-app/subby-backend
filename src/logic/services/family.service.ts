import { ForbiddenException, NotFoundException } from '../../utils/exceptions/index';
import { FamilyRepository } from '../../data/repositories/family.repository';
import { FamilyResponseDto } from '../../logic/dtos/Family';
import {
  TCreateFamilyBody,
  TFindFamiliesQuery,
  TUpdateFamilyBody,
} from '@/web/validators/family.validation';
import { SubscriptionService } from './subscription.service';

export class FamilyService {
  static async create(
    ownerId: string,
    familyData: TCreateFamilyBody,
  ): Promise<{ message: string; data: any }> {
    // !get app
    // !get plan -> plan.maxSubs use in family
    // ! possible transactions {3}
    const family = await FamilyRepository.create(familyData, ownerId);

    if (!family) {
      throw new NotFoundException('Failed to create family');
    }

    const subscription = await SubscriptionService.create({
      appId: ownerId, //!app._id
      planId: ownerId, //!plan._id
      onboarding: familyData.onboarding,
      slotsAvailable: family.slotsAvailable,
      renewal: family.renewal,
      userId: ownerId,
    });

    return {
      message: 'Family Created',
      data: FamilyResponseDto.create(family.toObject(), subscription._id),
    };
  }

  static async getAll(
    filter: TFindFamiliesQuery,
  ): Promise<{ message: string; data: FamilyResponseDto[] }> {
    const families = await FamilyRepository.find(filter);
    // *OpenApi spec: even if array is empty res.status is 200
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

  static async getFamilySubscribers(
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
}
