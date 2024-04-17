import { IPlan } from '@/data/interfaces/IPlan';

export class CreatePlanRequestDto {
  static create(plan: IPlan): CreatePlanRequestDto {
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
}
