import { Router } from 'express';
import { UserController } from '../controllers/index';
import { authenticated, ValidateRequest } from '../middlewares/index';
import { CreateUserValidation, UpdateUserValidation } from '../../web/validators/user.validation';
import { CreateUserRequestDto, UpdateUserRequestDto } from '../../logic/dtos/User/index';

export const userRouter = Router();

userRouter.post(
  '/',
  // authenticated,
  ValidateRequest.with(CreateUserValidation, CreateUserRequestDto),
  UserController.create,
);

userRouter.get('/', UserController.getAll);

userRouter.get('/:id', UserController.getById);

userRouter.patch(
  '/:id',
  ValidateRequest.with(UpdateUserValidation, UpdateUserRequestDto),
  UserController.update,
);

userRouter.delete('/', UserController.delete);
