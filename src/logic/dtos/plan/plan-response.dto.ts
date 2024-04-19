import { IPlan } from '@/data/interfaces/IPlan';

export class PlanResponseDto {
  static from(plan: IPlan): PlanResponseDto {
    return {
      _id: plan._id,
      applicationId: plan.applicationId,
      planIcon: plan.planIcon,
      planName: plan.planName,
      price: plan.price,
      instructions: plan.instructions,
      accountSlots: plan.accountSlots,
    };
  }

  static fromMany(plans: IPlan[]): PlanResponseDto {
    return plans.map((plan) => PlanResponseDto.from(plan));
  }
}
