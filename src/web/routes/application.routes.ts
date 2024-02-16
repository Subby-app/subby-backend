import { Router } from 'express';
import { authenticated, validateRequest } from '../middlewares';
import {
  createApplicationSchema,
  updateApplicationSchema,
} from '../validators/application.validation';
import { ApplicationController } from '../controllers/application.controller';

export const applicationRouter = Router();

applicationRouter.post(
  '/',
  authenticated,
  validateRequest(createApplicationSchema),
  ApplicationController.create,
);

applicationRouter.get('/', authenticated, ApplicationController.getAll);

applicationRouter.get('/:id', authenticated, ApplicationController.getById);

applicationRouter.patch(
  '/:id',
  authenticated,
  validateRequest(updateApplicationSchema),
  ApplicationController.update,
);

applicationRouter.delete('/:id', authenticated, ApplicationController.delete);
