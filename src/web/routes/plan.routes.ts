import { Router } from 'express';
import { authenticated, validateRequest } from '../middlewares';
import {} from '../validators/application.validation';
import { PlanController } from '../controllers/plan.controller';
import { createPlanSchema, updatePlanSchema } from '../validators/plan.validation';

export const planRouter = Router();

planRouter.post('/', authenticated, validateRequest(createPlanSchema), PlanController.create);

planRouter.get('/', authenticated, PlanController.getAll);

planRouter.get('/:id', authenticated, PlanController.getById);

planRouter.patch('/:id', authenticated, validateRequest(updatePlanSchema), PlanController.update);

planRouter.delete('/:id', authenticated, PlanController.delete);
