import { PlanRepository } from '@/data/repositories/plan.repository';
import {
  TFindPlanQuery,
  TcreatePlanBody,
  TupdatePlanBodySchema,
} from '@/web/validators/plan.validation';
import { PlanResponseDto } from '../dtos/plan/plan-response.dto';
import { NotFoundException } from '@/utils/exceptions';

export class PlanService {
  static async create(
    createDto: TcreatePlanBody,
  ): Promise<{ message: string; data: PlanResponseDto }> {
    const plan = await PlanRepository.create(createDto);
    return {
      message: 'Plan created',
      data: PlanResponseDto.from(plan),
    };
  }

  static async getAll(filter: TFindPlanQuery): Promise<{ message: string; data: PlanResponseDto }> {
    const plan = await PlanRepository.find(filter);

    if (!plan || plan.length === 0) {
      throw new NotFoundException('No plan found');
    }

    return {
      message: 'Plan fetched',
      data: PlanResponseDto.fromMany(plan),
    };
  }

  static async getById(planId: string): Promise<{ message: string; data: PlanResponseDto }> {
    const plan = await PlanRepository.findById(planId);

    if (!plan) {
      throw new NotFoundException('No plan found');
    }

    return {
      message: 'Plan fetched',
      data: PlanResponseDto.from(plan),
    };
  }

  static async update(
    planId: string,
    updateDto: TupdatePlanBodySchema,
  ): Promise<{ message: string; data: PlanResponseDto }> {
    const plan = await PlanRepository.update(planId, updateDto);

    if (!plan) {
      throw new NotFoundException('No plan found');
    }

    return {
      message: 'Plan updated',
      data: PlanResponseDto.from(plan),
    };
  }

  static async delete(planId: string): Promise<{ message: string }> {
    const plan = await PlanRepository.delete(planId);

    if (!plan) {
      throw new NotFoundException('No plan found');
    }

    return {
      message: 'Plan deleted',
    };
  }
}
