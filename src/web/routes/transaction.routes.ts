import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { authenticated } from '../middlewares';

export const transactionRouter = Router();

transactionRouter.post('/', authenticated, TransactionController.create);
transactionRouter.get('/user/:userId', TransactionController.getUserTransaction);
transactionRouter.get('/', TransactionController.getAll);
transactionRouter.get('/:id', TransactionController.getById);
transactionRouter.patch('/:id', TransactionController.edit);
