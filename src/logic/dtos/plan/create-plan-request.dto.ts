import { IPlan } from '@/data/interfaces/IPlan';

export class CreatePlanRequestDto {
  static create(plan: IPlan): CreatePlanRequestDto {
    return {
      _id: plan._id,
      applicationId: plan.applicationId,
      name: plan.name,
      accountSlots: plan.accountSlots,
      onBoardingType: plan.onBoardingType,
    };
  }
}
