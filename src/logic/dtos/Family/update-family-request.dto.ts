export class UpdateFamilyRequestDto {
  name?: string;
  label?: string;
  maxSubscribers?: number;
  spotsAvailable?: number;
  isFull?: boolean;
  membershipPrice?: number;
  subscribeLinks?: string[];

  constructor(family: UpdateFamilyRequestDto) {
    this.name = family.name;
    this.label = family.label;
    this.maxSubscribers = family.maxSubscribers;
    this.spotsAvailable = family.spotsAvailable;
    this.isFull = family.isFull;
    this.membershipPrice = family.membershipPrice;
    this.subscribeLinks = family.subscribeLinks;
  }

  static from(family: any): UpdateFamilyRequestDto {
    return new UpdateFamilyRequestDto({
      name: family.name,
      label: family.label,
      maxSubscribers: family.maxSubscribers,
      spotsAvailable: family.spotsAvailable,
      isFull: family.isFull,
      membershipPrice: family.membershipPrice,
      subscribeLinks: family.subscribeLinks,
    });
  }
}
