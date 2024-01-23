import Joi from 'joi';

const _id = Joi.string().hex().length(24);
const label = Joi.string();
const name = Joi.string();

export const create = Joi.object({
  name: name.required(),
  label: label.required(),
});

export const find = Joi.object({
  _id,
  owner: _id,
  name,
  label,
  isFull: Joi.bool(),
});

export const familyId = Joi.object({
  familyId: _id.required(),
});

export const familySubscribers = Joi.object({
  familyId: _id.required(),
  subscriberId: _id.required(),
});

export const patchSubscriber = Joi.object({
  revoke: Joi.bool(),
});

export const addSubscriber = Joi.object({
  familyId: _id.required(),
  newSubscriberId: _id.required(),
  joinMethod: Joi.string().required(),
});
