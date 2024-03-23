import { IApplication } from '@/data/interfaces/IApplication';

export class ApplicationResponseDto {
  static from(application: IApplication): ApplicationResponseDto {
    return {
      _id: application._id,
      appName: application.appName,
      onBoardingType: application.onBoardingType,
    };
  }

  static fromMany(applications: IApplication[]): ApplicationResponseDto {
    return applications.map((application) => ApplicationResponseDto.from(application));
  }
}
