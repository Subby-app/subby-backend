import Joi from 'joi';
import { nameSchema, objectIdSchema } from './lib/common-schema-validation';

export const CreateFamilyValidation = Joi.object({
  body: Joi.object({
    owner: objectIdSchema.required().label('Owner'),
    name: nameSchema.required().label('Name'),
    label: nameSchema.required().label('Label'),
    maxSubscribers: Joi.number().required().label('Max Subscribers'),
    spotsAvailable: Joi.number().required().label('Spots Available'),
    isFull: Joi.boolean().default(false).label('Is Full'),
    membershipPrice: Joi.number().required().label('Membership Price'),
    subscribeLinks: Joi.array().items(Joi.string()).label('Subscribe Links'),
  }),
});

export const UpdateFamilyValidation = Joi.object({
  body: Joi.object({
    name: nameSchema.label('Name'),
    label: Joi.string().label('Label'),
    maxSubscribers: Joi.number().label('Max Subscribers'),
    spotsAvailable: Joi.number().label('Spots Available'),
    isFull: Joi.boolean().label('Is Full'),
    membershipPrice: Joi.number().label('Membership Price'),
    subscribeLinks: Joi.array().items(Joi.string()).label('Subscribe Links'),
  }),
  params: Joi.object({
    id: objectIdSchema.required(),
  }),
});

export const FamilySubscribersValidation = Joi.object({
  body: Joi.object({
    subscribers: Joi.array().items(objectIdSchema).label('Subscribers'),
  }),
  params: Joi.object({
    familyId: objectIdSchema.required(),
  }),
});

export const PatchSubscriberValidation = Joi.object({
  body: Joi.object({
    joinedAt: Joi.string().label('Joined At'),
    joinMethod: Joi.string().label('Join Method'),
    isActive: Joi.boolean().label('Is Active'),
    revokeAccess: Joi.boolean().label('Revoke Access'),
  }),
  params: Joi.object({
    familyId: objectIdSchema.required(),
    subscriberId: objectIdSchema.required(),
  }),
});

export const AddSubscriberValidation = Joi.object({
  params: Joi.object({
    familyId: objectIdSchema.required(),
  }),
  body: Joi.object({
    subscriberId: objectIdSchema.required().label('Subscriber ID'),
    joinedAt: Joi.string().required().label('Joined At'),
    joinMethod: Joi.string().required().label('Join Method'),
    isActive: Joi.boolean().required().label('Is Active'),
    revokeAccess: Joi.boolean().required().label('Revoke Access'),
  }),
});
