import { ObjectId, Document } from 'mongoose';
import { IFamily, TFamilyLabel } from 'data/interfaces/IFamily';

type SubscriberData = {
  subscriber: string;
  joinedAt: string;
  joinMethod: string;
  isActive: boolean;
  revokeAccess: boolean;
};

type FamilyData = Omit<IFamily, keyof Document> & {
  subscribers: SubscriberData[];
};

export class CreateFamilyRequestDto {
  owner: ObjectId;
  name: string;
  subscribers: SubscriberData[];
  label: TFamilyLabel;
  maxSubscribers: number;
  spotsAvailable: number;
  isFull: boolean;
  membershipPrice: number;
  subscribeLinks: string[];

  constructor(family: FamilyData) {
    this.owner = family.owner;
    this.name = family.name;
    this.subscribers = family.subscribers;
    this.label = family.label;
    this.maxSubscribers = family.maxSubscribers;
    this.spotsAvailable = family.spotsAvailable;
    this.isFull = family.isFull;
    this.membershipPrice = family.membershipPrice;
    this.subscribeLinks = family.subscribeLinks;
  }

  static from(family: FamilyData): CreateFamilyRequestDto {
    return new CreateFamilyRequestDto({
      owner: family.owner,
      name: family.name,
      subscribers: family.subscribers,
      label: family.label,
      maxSubscribers: family.maxSubscribers,
      spotsAvailable: family.spotsAvailable,
      isFull: family.isFull,
      membershipPrice: family.membershipPrice,
      subscribeLinks: family.subscribeLinks,
    });
  }
}
