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

familyRouter.get('/', validateRequest(findFamilies), FamilyController.getAll);

familyRouter.get('/owner', authenticated, FamilyController.getOwner);

familyRouter.get('/:id', FamilyController.getById);

familyRouter.post('/', validateRequest(createFamily), authenticated, FamilyController.create);

familyRouter.patch('/:id', validateRequest(updateFamily), authenticated, FamilyController.update);

familyRouter.delete('/:id', validateRequest(deleteFamily), authenticated, FamilyController.delete);
