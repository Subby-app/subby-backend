// import { Router } from 'express';
// import { authenticated } from '../middlewares';
// import * as familyController from '../controllers/family.controller';

// export const familyRouter = Router();

// familyRouter.get(
//   '/',
//   // ValidateRequest(validate.find, 'query'),
//   authenticated,
//   familyController.findMany,
// );

// familyRouter.get('/owner', authenticated, familyController.familyOwner);

// familyRouter.get('/overview', authenticated, familyController.familyOverview);

// familyRouter.get('/subscriptions', authenticated, familyController.subscriptions);

// familyRouter.get(
//   '/:familyId',
//   // ValidateRequest(validate.familyId, 'params'),
//   // ValidateRequest(validate.find, 'query'),
//   authenticated,
//   familyController.findOne,
// );

// familyRouter.post(
//   '/',
//   // ValidateRequest(validate.create, 'body'),
//   authenticated,
//   familyController.create,
// );

// familyRouter.post(
//   '/:familyId/subscribers',
//   // ValidateRequest(validate.familyId, 'params'),
//   authenticated,
//   familyController.joinFamily,
// );

// familyRouter.post(
//   '/:familyId/subscribers/:subscriberId',
//   // ValidateRequest(validate.familySubscribers, 'params'),
//   authenticated,
//   familyController.inviteSubscriber,
// );

// familyRouter.patch(
//   '/:familyId/subscribers/:subscriberId',
//   // ValidateRequest(validate.familySubscribers, 'params'),
//   // ValidateRequest(validate.patchSubscriber, 'query'),
//   authenticated,
//   familyController.updateSubscriber,
// );

// familyRouter.delete(
//   '/:familyId/subscribers',
//   // ValidateRequest(validate.familyId, 'params'),
//   authenticated,
//   familyController.removeSubscriber,
// );
