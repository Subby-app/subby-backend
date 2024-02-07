import { Router } from 'express';
import { UserController } from '../controllers/index';
import { authenticated, ValidateRequest, validateZ } from '../middlewares/index';
import { createUser, CreateUserValidation, UpdateUserValidation } from '../../web/validators/user.validation';
import { CreateUserRequestDto, UpdateUserRequestDto } from '../../logic/dtos/User/index';

export const userRouter = Router();

userRouter.post(
  '/',
  ValidateRequest.with(CreateUserValidation, CreateUserRequestDto),
  // validateZ(createUser),
  UserController.create,
);

userRouter.get('/', authenticated, UserController.getAll);

userRouter.get('/:id', authenticated, UserController.getById);

userRouter.patch(
  '/:id',
  authenticated,
  ValidateRequest.with(UpdateUserValidation, UpdateUserRequestDto),
  UserController.update,
);

userRouter.delete('/:id', authenticated, UserController.delete);
