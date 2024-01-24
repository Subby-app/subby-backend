import { WalletModel } from '../../data/models';
import { createObjectId } from '../../data/database/mongoose.util';
import { TUpdateWallet, TWalletFilter } from '../../data/interfaces/wallet.interface';
import { HttpException, HttpStatus } from '@/utils/exceptions';

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

  public async safeFind(filter: TWalletFilter) {
    return await this.wallet.findOne(filter);
  }

  public async update(filter: TWalletFilter, newData: TUpdateWallet) {
    return await this.wallet.findOneAndUpdate(filter, newData, { new: true });
  }
}

export { WalletService };
