import { Router } from 'express';
import { UserController } from '../controllers/index';
import { authenticated, ValidateRequest } from '../middlewares/index';
import { createTransactionValidation } from '../../web/validators/transaction.validation';
import { CreateTransactionRequestDto } from '../../logic/dtos/Transaction/index';

export const userRouter = Router();

userRouter.post(
  '/',
  // authenticated,
  //   ValidateRequest.with(createTransactionValidation, CreateTransactionRequestDto),
  UserController.create,
);

userRouter.get('/', UserController.getAll);

userRouter.get('/:id', UserController.getById);

userRouter.patch('/:id', UserController.update);

userRouter.delete('/', UserController.delete);
