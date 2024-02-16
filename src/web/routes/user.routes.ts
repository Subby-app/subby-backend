import { Router } from 'express';
import { UserController } from '../controllers/index';
import { authenticated, validateRequest } from '../middlewares/index';
import { createUser, updateUser } from '../../web/validators/user.validation';

export const userRouter = Router();

userRouter.post('/', validateRequest(createUser), UserController.create);

userRouter.get('/', authenticated, UserController.getAll);

userRouter.get('/:id', authenticated, UserController.getById);

userRouter.patch('/:id', authenticated, validateRequest(updateUser), UserController.update);

userRouter.delete('/:id', authenticated, UserController.delete);
