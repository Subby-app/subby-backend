import { Request, Response } from 'express';
import { WalletService } from '../../logic/services/wallet.service';
import { HttpStatus } from '@/utils/exceptions';

export class WalletController {
  static async create(req: Request, res: Response) {
    console.log('sdgssd');
    const result = await WalletService.create(req.body);
    res.status(HttpStatus.OK).json(result);
  }

  static async getWallet(req: Request, res: Response) {
    const { userId } = req.params;

    const result = await WalletService.getWallet(userId);
    res.status(HttpStatus.OK).json(result);
  }

  static async updateBalance(req: Request, res: Response) {
    const { userId, amount } = req.body;

    const result = await WalletService.updateBalance(userId, amount);
    res.status(HttpStatus.OK).json(result);
  }
}
