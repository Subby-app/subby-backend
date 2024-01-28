import { Router } from 'express';

import { authRouter } from './auth.routes';
import { adminRouter } from './admin.routes';
import { userRouter } from './user.routes';
import { familyRouter } from './family.routes';
import { transactionRouter } from './transaction.routes';
import { walletRouter } from './wallet.routes';

export const apiRouters = Router();

apiRouters.use('/admin', adminRouter);
apiRouters.use('/auth', authRouter);
apiRouters.use('/family', familyRouter);
apiRouters.use('/user', userRouter);
apiRouters.use('/transactions', transactionRouter);
apiRouters.use('/wallets', walletRouter);
