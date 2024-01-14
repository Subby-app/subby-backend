import { authRouter } from '../routes/auth.routes';
import { adminRouter } from '../routes/admin.routes';
import { userRouter } from '../routes/user.routes';
import { familyRouter } from '../routes/family.routes';

export const apiRouters = [authRouter, adminRouter, userRouter, familyRouter];
