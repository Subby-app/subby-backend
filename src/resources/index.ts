import { authRouter } from './auth/auth.routes';
import { adminRouter } from './admin/admin.routes';
import { userRouter } from './user/user.routes';
import { familyRouter } from './family/family.routes';

export const apiRouters = [
  authRouter,
  adminRouter,
  userRouter,
  familyRouter,
];