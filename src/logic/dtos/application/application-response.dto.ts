import { IApplication } from '@/data/interfaces/IApplication';

export class ApplicationResponseDto {
  static from(application: IApplication): ApplicationResponseDto {
    return {
      _id: application._id,
      applicationName: application.applicationName,
      applicationIcon: application.applicationIcon,
      description: application.description,
      onBoardingType: application.onBoardingType,
    };
  }

  static fromMany(applications: IApplication[]): ApplicationResponseDto {
    return applications.map((application) => ApplicationResponseDto.from(application));
  }
}
