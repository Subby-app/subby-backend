import { WalletModel } from '../../data/models';
import { createObjectId } from '../../data/database/mongoose.util';
import { TUpdateBalance, TWalletFilter } from '../../data/interfaces/wallet.interface';
import { HttpException, HttpStatus } from '@/utils/exceptions';
import { EWalletStatus } from 'data/enums/wallet.enum';

class WalletService {
  private wallet = WalletModel;

  public async create(userId: string) {
    const walletId = createObjectId();
    await this.wallet.create({ _id: walletId, userId });
    return walletId;
  }

  public async findOne(filter: TWalletFilter) {
    const wallet = await this.wallet.findOne(filter);
    if (!wallet) throw new HttpException(HttpStatus.NOT_FOUND, 'wallet not found');
    return wallet;
  }

  public async updateBalance(filter: TWalletFilter, newBalance: TUpdateBalance) {
    return await this.wallet.findOneAndUpdate(filter, newBalance, { new: true });
  }

  public async updateStatus(filter: TWalletFilter, status: EWalletStatus) {
    return await this.wallet.findOneAndUpdate(filter, { status }, { new: true });
  }
}

export { WalletService };
