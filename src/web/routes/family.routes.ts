import { Router } from 'express';
import { FamilyController } from '../controllers/family.controller';
import { authenticated, validateRequest } from '../middlewares/index';
import {
  createFamily,
  findFamilies,
  updateFamily,
  deleteFamily,
  joinFamily,
  findFamily,
} from '../../web/validators/family.validation';

export const familyRouter = Router();

const subscribers = 'subscribers';

familyRouter.get('/', validateRequest(findFamilies), FamilyController.getAll);

familyRouter.get('/owner', authenticated, FamilyController.getOwner);

familyRouter.get('/subscriptions', authenticated, FamilyController.getSubscriptions);

familyRouter.get('/:id', validateRequest(findFamily), FamilyController.getById);

familyRouter.post('/', validateRequest(createFamily), authenticated, FamilyController.create);

familyRouter.post(
  `/:id/${subscribers}`,
  validateRequest(joinFamily),
  authenticated,
  FamilyController.joinFamily,
);

familyRouter.patch('/:id', validateRequest(updateFamily), authenticated, FamilyController.update);

familyRouter.delete('/:id', validateRequest(deleteFamily), authenticated, FamilyController.delete);
