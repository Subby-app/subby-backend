import { Router } from 'express';
import { authenticated, validation } from '../../middlewares';
import * as familyController from './family.controller';
import * as validate from './family.validation';

export const familyRouter = Router();

const basePath = '/family';

familyRouter.get(
  `${basePath}`,
  validation(validate.find, 'query'),
  authenticated,
  familyController.findMany,
);

familyRouter.get(`${basePath}/owner`, authenticated, familyController.familyOwner);

familyRouter.get(`${basePath}/subscriptions`, authenticated, familyController.subscriptions);

familyRouter.get(
  `${basePath}/:familyId`,
  validation(validate.familyId, 'params'),
  validation(validate.find, 'query'),
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
  `${basePath}/:familyId/subscribers`,
  validation(validate.familyId, 'params'),
  authenticated,
  familyController.joinFamily,
);

familyRouter.post(
  `${basePath}/:familyId/subscribers/:subscriberId`,
  validation(validate.familySubscribers, 'params'),
  authenticated,
  familyController.inviteSubscriber,
);

familyRouter.patch(
  `${basePath}/:familyId/subscribers/:subscriberId`,
  validation(validate.familySubscribers, 'params'),
  validation(validate.patchSubscriber, 'query'),
  authenticated,
  familyController.updateSubscriber,
);

familyRouter.delete(
  `${basePath}/:familyId/subscribers`,
  validation(validate.familyId, 'params'),
  authenticated,
  familyController.removeSubscriber,
);
