import { Router } from 'express';
import { FamilyController } from '../controllers/family.controller';
import { authenticated, ValidateRequest } from '../middlewares/index';
import {
  CreateFamilyValidation,
  UpdateFamilyValidation,
} from '../../web/validators/family.validation';
import { CreateFamilyRequestDto, UpdateFamilyRequestDto } from '../../logic/dtos/Family/index';

export const familyRouter = Router();

familyRouter.post(
  '/',
  authenticated,
  ValidateRequest.with(CreateFamilyValidation, CreateFamilyRequestDto),
  FamilyController.create,
);

familyRouter.get('/owner', FamilyController.getOwner);

// familyRouter.get('/', authenticated, FamilyController.getAll);

// familyRouter.get('/:id', authenticated, FamilyController.getById);

familyRouter.patch(
  '/:id',
  authenticated,
  ValidateRequest.with(UpdateFamilyValidation, UpdateFamilyRequestDto),
  FamilyController.update,
);

familyRouter.delete('/:id', authenticated, FamilyController.delete);
