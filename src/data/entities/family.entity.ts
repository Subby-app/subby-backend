import { Types } from 'mongoose';
import { ValidationException } from '../../utils/exceptions';
import { createObjectId, isEqualObjectId } from '../lib/createId';

export class FamilyEntity {
  owner: Types.ObjectId;
  name: string;
  label: string;
  maxSubscribers: number;
  spotsAvailable: number;
  isFull: boolean;
  membershipPrice: number;
  subscribeLinks: string[];
  id: Types.ObjectId;

  constructor({
    id,
    owner,
    name,
    label,
    maxSubscribers,
    spotsAvailable,
    isFull,
    membershipPrice,
    subscribeLinks,
  }: {
    id: Types.ObjectId;
    owner: Types.ObjectId;
    name: string;
    label: string;
    maxSubscribers: number;
    spotsAvailable: number;
    isFull: boolean;
    membershipPrice: number;
    subscribeLinks: string[];
  }) {
    this.id = id;
    this.owner = owner;
    this.name = name;
    this.label = label;
    this.maxSubscribers = maxSubscribers;
    this.spotsAvailable = spotsAvailable;
    this.isFull = isFull;
    this.membershipPrice = membershipPrice;
    this.subscribeLinks = subscribeLinks;
  }

  static make({
    owner,
    name,
    label,
    maxSubscribers,
    spotsAvailable,
    isFull,
    membershipPrice,
    subscribeLinks,
    _id,
  }: {
    _id: Types.ObjectId;
    owner: Types.ObjectId;
    name: string;
    label: string;
    maxSubscribers: number;
    spotsAvailable: number;
    isFull: boolean;
    membershipPrice: number;
    subscribeLinks: string[];
  }): FamilyEntity {
    if (_id && !isEqualObjectId(_id)) {
      throw new ValidationException({
        path: 'id',
        message: 'Family entity must have a valid id.',
      });
    }
    if (!owner) {
      throw new ValidationException({
        path: 'owner',
        message: 'Family entity must have an owner.',
      });
    }

    if (!name) {
      throw new ValidationException({
        path: 'name',
        message: 'Family entity must have a name.',
      });
    }

    if (!label) {
      throw new ValidationException({
        path: 'label',
        message: 'Family entity must have a label.',
      });
    }

    if (maxSubscribers === undefined || maxSubscribers < 0) {
      throw new ValidationException({
        path: 'maxSubscribers',
        message: 'Family entity must have a valid maximum subscribers count.',
      });
    }

    if (spotsAvailable === undefined || spotsAvailable < 0) {
      throw new ValidationException({
        path: 'spotsAvailable',
        message: 'Family entity must have a valid spots available count.',
      });
    }

    if (membershipPrice === undefined || membershipPrice < 0) {
      throw new ValidationException({
        path: 'membershipPrice',
        message: 'Family entity must have a valid membership price.',
      });
    }

    return this.#create({
      owner,
      name,
      label,
      maxSubscribers,
      spotsAvailable,
      isFull,
      membershipPrice,
      subscribeLinks,
      id: _id,
    });
  }

  static #create({
    owner,
    name,
    label,
    maxSubscribers,
    spotsAvailable,
    isFull,
    membershipPrice,
    subscribeLinks,
    id = createObjectId(),
  }: {
    id: Types.ObjectId;
    owner: Types.ObjectId;
    name: string;
    label: string;
    maxSubscribers: number;
    spotsAvailable: number;
    isFull: boolean;
    membershipPrice: number;
    subscribeLinks: string[];
  }): FamilyEntity {
    return new FamilyEntity({
      id,
      owner,
      name,
      label,
      maxSubscribers,
      spotsAvailable,
      isFull,
      membershipPrice,
      subscribeLinks,
    });
  }
}
