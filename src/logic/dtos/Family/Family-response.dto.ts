import { IFamily, TFamilyOverview } from '@/data/interfaces/IFamily';
import { ISubscriber, TSubscriberOverview } from '@/data/interfaces/ISubscriber';
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
      activeSubscribers: family.activeSubscribers,
      availableSlots: family.availableSlots,
      subscriptionStart: family.subscriptionStart,
      subscriptionEnd: family.subscriptionEnd,
      tenure: family.tenure,
      isFull: family.isFull,
      isActive: family.isActive,
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

  static familyOverview(overview: TFamilyOverview) {
    return {
      totalFamiliesCreated: overview.familiesCreated,
      totalActiveSubscribers: overview.totalActiveSubs,
    };
  }

  static subscriptionsOverview(subOverview: TSubscriberOverview) {
    return {
      activeSubscriptions: subOverview.activeSubscriptions,
      inActiveSubscriptions: subOverview.inActiveSubscriptions,
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

  static getFamilyId(subscriberDoc: ISubscriber) {
    return subscriberDoc.familyId;
  }

  static getFamiliesId(subscriberDocs: ISubscriber[]) {
    return subscriberDocs.map((subscriberDoc) => this.getFamilyId(subscriberDoc));
  }
}
