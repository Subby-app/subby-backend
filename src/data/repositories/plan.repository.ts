import {
  TFindPlanQuery,
  TcreatePlanBody,
  TupdatePlanBodySchema,
} from '@/web/validators/plan.validation';
import BaseRepository from './base.repository';
import { Plan } from '../models/plan.model';

export class PlanRepository extends BaseRepository {
  static async create(createDto: TcreatePlanBody) {
    try {
      const plan = new Plan(createDto);
      await plan.save();

      return plan;
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async find(filter: TFindPlanQuery) {
    const dbFilter = this.mapFilterObject(filter);
    return Plan.find(dbFilter).sort({ name: 1 });
  }

  static async findApplication(applicationId: string) {
    return Plan.find({ applicationId });
  }

  static async findById(id: string) {
    return Plan.findById(id);
  }

  static async findOne(filter: TFindPlanQuery) {
    return Plan.findOne(filter);
  }

  static async update(id: any, updateDto: TupdatePlanBodySchema) {
    try {
      return Plan.findByIdAndUpdate(id, updateDto, { new: true });
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async delete(id: string) {
    return Plan.findByIdAndDelete(id);
  }
}
