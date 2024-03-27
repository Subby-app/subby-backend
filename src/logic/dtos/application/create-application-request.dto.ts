import { IApplication } from '@/data/interfaces/IApplication';

export class CreateApplicationRequestDto {
  static create(application: IApplication): CreateApplicationRequestDto {
    return {
      _id: application._id,
      applicationName: application.applicationName,
      onBoardingType: application.onBoardingType,
    };
  }
}
