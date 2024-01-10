import { Router } from 'express';
import { authenticated, validation } from '../../middlewares';
import * as familyController from './family.controller';
import * as validate from './family.validation';

export const familyRouter = Router();

const basePath = '/family';

familyRouter.get(
  `${basePath}`,
  validation(validate.findOne, 'query'),
  authenticated,
  familyController.findOne,
);

familyRouter.post(
  basePath,
  validation(validate.create, 'body'),
  authenticated,
  familyController.create,
);

familyRouter.post(
  `${basePath}/subscriber`,
  validation(validate.addSubscriber, 'body'),
  authenticated,
  familyController.addSubscriber,
);
