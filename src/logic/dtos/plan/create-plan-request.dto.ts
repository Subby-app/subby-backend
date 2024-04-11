import { IPlan } from '@/data/interfaces/IPlan';

export class CreatePlanRequestDto {
  static create(plan: IPlan): CreatePlanRequestDto {
    return {
      _id: plan._id,
      applicationId: plan.applicationId,
      planName: plan.planName,
      planIcon: plan.planIcon,
      accountSlots: plan.accountSlots,
    };
  }
}
