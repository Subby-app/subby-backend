import { Router } from 'express';
import { FamilyController } from '../controllers/family.controller';
import { authenticated, validateRequest } from '../middlewares/index';
import { createFamily, updateFamily } from '../../web/validators/family.validation';

export const familyRouter = Router();

familyRouter.post(
  '/',
  // authenticated, validateRequest(createFamily),
  FamilyController.create,
);

familyRouter.get('/owner', FamilyController.getOwner);

familyRouter.get('/', authenticated, FamilyController.getAll);

familyRouter.get('/:id', authenticated, FamilyController.getById);

familyRouter.patch('/:id', authenticated, validateRequest(updateFamily), FamilyController.update);

familyRouter.delete('/:id', authenticated, FamilyController.delete);
