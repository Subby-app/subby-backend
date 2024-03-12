import { Router } from 'express';

import { authRouter } from './auth.routes';
import { applicationRouter } from './application.routes';
import { userRouter } from './user.routes';
import { familyRouter } from './family.routes';
import { imageRouter } from './image.routes';
import { transactionRouter } from './transaction.routes';
import { walletRouter } from './wallet.routes';
import { planRouter } from './plan.routes';

export const apiRouters = Router();

apiRouters.use('/applications', applicationRouter);
apiRouters.use('/auth', authRouter);
apiRouters.use('/families', familyRouter);
apiRouters.use('/images', imageRouter);
apiRouters.use('/plans', planRouter);
apiRouters.use('/users', userRouter);
apiRouters.use('/transactions', transactionRouter);
apiRouters.use('/wallets', walletRouter);
