import { Router } from 'express';
import { authenticated, validation } from '../middlewares';
import * as familyController from '../controllers/family.controller';
import * as validate from '../validators/family.validation';

export const familyRouter = Router();

familyRouter.get('/', validation(validate.find, 'query'), authenticated, familyController.findMany);

familyRouter.get('/owner', authenticated, familyController.familyOwner);

familyRouter.get('/overview', authenticated, familyController.familyOverview);

familyRouter.get('/subscriptions', authenticated, familyController.subscriptions);

familyRouter.get(
  '/:familyId',
  validation(validate.familyId, 'params'),
  validation(validate.find, 'query'),
  authenticated,
  familyController.findOne,
);

familyRouter.post('/', validation(validate.create, 'body'), authenticated, familyController.create);

familyRouter.post(
  '/:familyId/subscribers',
  validation(validate.familyId, 'params'),
  authenticated,
  familyController.joinFamily,
);

familyRouter.post(
  '/:familyId/subscribers/:subscriberId',
  validation(validate.familySubscribers, 'params'),
  authenticated,
  familyController.inviteSubscriber,
);

familyRouter.patch(
  '/:familyId/subscribers/:subscriberId',
  validation(validate.familySubscribers, 'params'),
  validation(validate.patchSubscriber, 'query'),
  authenticated,
  familyController.updateSubscriber,
);

familyRouter.delete(
  '/:familyId/subscribers',
  validation(validate.familyId, 'params'),
  authenticated,
  familyController.removeSubscriber,
);
