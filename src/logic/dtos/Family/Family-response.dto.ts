import { IFamily, TOverview } from '@/data/interfaces/IFamily';
import { ISubscriber } from '@/data/interfaces/ISubscriber';
import { TPaginate } from '@/data/repositories';

export class FamilyResponseDto {
  static from(family: IFamily) {
    return {
      id: family._id,
      owner: family.owner,
      name: family.name,
      app: family.appId,
      plan: family.planId,
      onboarding: family.onboarding,
      maxSubscribers: family.maxSubscribers,
      activeSubscribers: family.activeSubscribers,
      subscriptionStart: family.subscriptionStart,
      subscriptionEnd: family.subscriptionEnd,
      isFull: family.isFull,
      createdAt: family.createdAt,
      updatedAt: family.updatedAt,
    };
  }

  static fromMany(families: IFamily[]) {
    return families.map((family) => FamilyResponseDto.from(family));
  }

  static create(
    family: IFamily,
    subscriptionId: string,
    applicationName: string,
    planName: string,
    planPrice: number,
  ) {
    return {
      id: family._id,
      name: family.name,
      applicationName,
      planName,
      planPrice,
      subscriptionId,
      maxSubscribers: family.maxSubscribers,
      activeSubscribers: family.activeSubscribers,
      subscriptionStart: family.subscriptionStart,
      subscriptionEnd: family.subscriptionEnd,
      completed: null,
      pending: null,
      revoked: null,
    };
  }

  static subscribedFamily(subscriber: ISubscriber) {
    return {
      id: subscriber._id,
      family: subscriber.familyId,
      isActive: subscriber.isActive,
      revokeAccess: subscriber.revokeAccess,
      joinedAt: subscriber.createdAt,
      joinMethod: subscriber.joinMethod,
    };
  }

  static subscribedFamilies(subscribedFamilies: ISubscriber[]) {
    return subscribedFamilies.map((subscriber) => FamilyResponseDto.subscribedFamily(subscriber));
  }

  static overview(overview: TOverview) {
    return {
      totalFamiliesCreated: overview.familiesCreated,
      totalActiveSubscribers: overview.totalActiveSubs,
    };
  }

  static paginateFamilies(paginationDetails: TPaginate, families: IFamily[]) {
    return {
      totalFamiliesFound: paginationDetails.totalResourceFound,
      currentPage: paginationDetails.currentPage,
      prevPage: paginationDetails.prevPage,
      nextPage: paginationDetails.nextPage,
      lastPage: paginationDetails.lastPage,
      families: this.fromMany(families),
    };
  }

  static paginateSubscribers(paginationDetails: TPaginate, subscribedFamilies: ISubscriber[]) {
    return {
      totalFamiliesFound: paginationDetails.totalResourceFound,
      currentPage: paginationDetails.currentPage,
      prevPage: paginationDetails.prevPage,
      nextPage: paginationDetails.nextPage,
      lastPage: paginationDetails.lastPage,
      families: this.subscribedFamilies(subscribedFamilies),
    };
  }
}
