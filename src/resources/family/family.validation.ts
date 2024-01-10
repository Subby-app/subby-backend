import Joi from 'joi';

const id = Joi.string();
const label = Joi.string();
const name = Joi.string();

export const create = Joi.object({
  name: name.required(),
  label: label.required(),
});

export const findOne = Joi.object({
  id,
  owner: id,
  name,
  label,
  isFull: Joi.bool(),
});

export const addSubscriber = Joi.object({
  familyId: id.required(),
  newSubscriberId: id.required(),
  joinMethod: Joi.string().required(),
});
