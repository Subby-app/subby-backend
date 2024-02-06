import { ObjectId } from 'mongoose';
import { IFamily, TFamilyLabel } from '../../../data/interfaces/IFamily';

export class FamilyResponseDto {
  _id: ObjectId;
  owner: ObjectId;
  name: string;
  label: TFamilyLabel;
  maxSubscribers: number;
  spotsAvailable: number;
  isFull: boolean;
  membershipPrice: number;
  subscribeLinks: string[];

  constructor(family: FamilyResponseDto) {
    this._id = family._id;
    this.owner = family.owner;
    this.name = family.name;
    this.label = family.label;
    this.maxSubscribers = family.maxSubscribers;
    this.spotsAvailable = family.spotsAvailable;
    this.isFull = family.isFull;
    this.membershipPrice = family.membershipPrice;
    this.subscribeLinks = family.subscribeLinks;
  }

  static from(family: IFamily): FamilyResponseDto {
    return new FamilyResponseDto({
      _id: family._id,
      owner: family.owner,
      name: family.name,
      label: family.label,
      maxSubscribers: family.maxSubscribers,
      spotsAvailable: family.spotsAvailable,
      isFull: family.isFull,
      membershipPrice: family.membershipPrice,
      subscribeLinks: family.subscribeLinks,
    });
  }

  static fromMany(families: IFamily[]): FamilyResponseDto[] {
    return families.map((family) => FamilyResponseDto.from(family));
  }
}
