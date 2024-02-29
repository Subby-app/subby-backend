import { Router } from 'express';
import { FamilyController } from '../controllers/family.controller';
import { authenticated, validateRequest } from '../middlewares/index';
import {
  createFamily,
  findFamilies,
  updateFamily,
  deleteFamily,
} from '../../web/validators/family.validation';

export const familyRouter = Router();

const subscribers = 'subscribers';

familyRouter.get('/', validateRequest(findFamilies), FamilyController.getAll);

familyRouter.get('/owner', authenticated, FamilyController.getOwner);

familyRouter.get('/subscriptions', authenticated, FamilyController.getSubscriptions);

familyRouter.get('/:id', FamilyController.getById);

familyRouter.get(`/:id/${subscribers}`, FamilyController.getSubscribers);

familyRouter.post('/', validateRequest(createFamily), authenticated, FamilyController.create);

familyRouter.post(`/:id/${subscribers}`, authenticated, FamilyController.createSubscriber);

familyRouter.patch('/:id', validateRequest(updateFamily), authenticated, FamilyController.update);

familyRouter.patch(`/:id/${subscribers}/:userId`, authenticated, FamilyController.updateSubscriber);

familyRouter.delete('/:id', validateRequest(deleteFamily), authenticated, FamilyController.delete);

familyRouter.delete(
  `/:id/${subscribers}/:userId`,
  authenticated,
  FamilyController.deleteSubscriber,
);
