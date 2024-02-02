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
  // authenticated,
  ValidateRequest.with(CreateFamilyValidation, CreateFamilyRequestDto),
  FamilyController.create,
);

familyRouter.get('/', FamilyController.getAll);

familyRouter.get('/:id', FamilyController.getById);

familyRouter.patch(
  '/:id',
  ValidateRequest.with(UpdateFamilyValidation, UpdateFamilyRequestDto),
  FamilyController.update,
);

familyRouter.delete('/:id', FamilyController.delete);
