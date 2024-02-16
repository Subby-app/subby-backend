import { Router } from 'express';
import { WalletController } from '../controllers/wallet.controller';
import { authenticated, validateRequest } from '../middlewares/index';
import { createWallet } from '../../web/validators/wallet.validation';

export const walletRouter = Router();

walletRouter.post(
  '/',
  //   authenticated,
  validateRequest(createWallet),
  WalletController.create,
);

walletRouter.get('/:userId', authenticated, WalletController.getWallet);

walletRouter.get('/', authenticated, WalletController.updateBalance);
