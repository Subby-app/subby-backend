import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { authenticated, ValidateRequest } from '../middlewares/index';
import { createTransactionValidation } from '../../web/validators/transaction.validation';
import { CreateTransactionRequestDto } from '../../logic/dtos/Transaction/index';

export const transactionRouter = Router();

transactionRouter.post(
  '/',
  // authenticated,
  ValidateRequest.with(createTransactionValidation, CreateTransactionRequestDto),
  TransactionController.create,
);
transactionRouter.get('/user/:userId', authenticated, TransactionController.getUserTransaction);

transactionRouter.get('/', TransactionController.getAll);

transactionRouter.get('/:id', TransactionController.getById);

transactionRouter.patch('/:id', TransactionController.edit);
