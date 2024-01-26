import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { authenticated, validation } from '../middlewares';
import { createTransactionValidation } from '../../web/validators/transaction.validation';

export const transactionRouter = Router();

transactionRouter.post(
  '/',
  authenticated,
  validation(createTransactionValidation, 'body'),
  TransactionController.create,
);
transactionRouter.get('/user/:userId', authenticated, TransactionController.getUserTransaction);

transactionRouter.get('/', authenticated, TransactionController.getAll);

transactionRouter.get('/:id', authenticated, TransactionController.getById);

transactionRouter.patch('/:id', authenticated, TransactionController.edit);
