import { IFamily } from '@/data/interfaces/IFamily';

export class FamilyResponseDto {
  static from(family: IFamily): FamilyResponseDto {
    return {
      _id: family._id,
      owner: family.owner,
      name: family.name,
      maxSubscribers: family.maxSubscribers,
      slotsAvailable: family.slotsAvailable,
      isFull: family.isFull,
    };
  }

  static fromMany(families: IFamily[]): FamilyResponseDto[] {
    return families.map((family) => FamilyResponseDto.from(family));
  }

  static create(family: IFamily, subscriptionId: string) {
    return {
      id: family._id,
      name: family.name,
      appName: 'app.name',
      subscriptionId,
      maxUsers: 'plan.maxUsers',
      slotsAvailable: family.slotsAvailable,
      completed: 'transactionIds[]',
      pending: 'transactionIds[]',
      revoked: 'transactionIds[]',
    };
  }
}
