import { Router } from 'express';
import { WalletController } from '../controllers/wallet.controller';
import { authenticated, ValidateRequest } from '../middlewares/index';
import { CreateWalletValidation } from '../../web/validators/wallet.validation';
import { CreateWalletRequestDto } from '../../logic/dtos/Wallet';

export const walletRouter = Router();

walletRouter.post(
  '/',
  //   authenticated,
  ValidateRequest.with(CreateWalletValidation, CreateWalletRequestDto),
  WalletController.create,
);

walletRouter.get('/:userId', authenticated, WalletController.getWallet);

walletRouter.get('/', authenticated, WalletController.updateBalance);
