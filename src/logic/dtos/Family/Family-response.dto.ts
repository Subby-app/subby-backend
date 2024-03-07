import { IFamily } from '@/data/interfaces/IFamily';

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
    };
  }

  static fromMany(families: IFamily[]) {
    return families.map((family) => FamilyResponseDto.from(family));
  }

  static create(family: IFamily, subscriptionId: string, appName: string, planName: string) {
    return {
      id: family._id,
      name: family.name,
      appName,
      planName,
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
}
