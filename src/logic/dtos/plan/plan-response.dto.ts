import { IPlan } from '@/data/interfaces/IPlan';

export class PlanResponseDto {
  static from(plan: IPlan): PlanResponseDto {
    return {
      _id: plan._id,
      applicationId: plan.applicationId,
      name: plan.name,
      price: plan.price,
      accountSlots: plan.accountSlots,
      onBoarding: plan.onBoarding,
    };
  }

  static fromMany(plans: IPlan[]): PlanResponseDto {
    return plans.map((plan) => PlanResponseDto.from(plan));
  }
}
