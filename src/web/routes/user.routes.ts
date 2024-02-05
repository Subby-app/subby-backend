import { Router } from 'express';
import { UserController } from '../controllers/index';
import { authenticated, ValidateRequest } from '../middlewares/index';
import { CreateUserValidation, UpdateUserValidation } from '../../web/validators/user.validation';
import { CreateUserRequestDto, UpdateUserRequestDto } from '../../logic/dtos/User/index';

export const userRouter = Router();

userRouter.post(
  '/',
  ValidateRequest.with(CreateUserValidation, CreateUserRequestDto),
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
