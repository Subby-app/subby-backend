import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { authenticated, validateRequest } from '../middlewares/index';
import { createTransaction } from '../../web/validators/transaction.validation';

export const transactionRouter = Router();

transactionRouter.post(
  '/',
  // authenticated,
  validateRequest(createTransaction),
  TransactionController.create,
);

transactionRouter.get('/user/:userId', authenticated, TransactionController.getUserTransaction);

transactionRouter.get('/', TransactionController.getAll);

transactionRouter.get('/:id', TransactionController.getById);

transactionRouter.patch('/:id', TransactionController.edit);
