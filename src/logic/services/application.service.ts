import { ApplicationRepository } from '@/data/repositories/application.repository';
import { NotFoundException } from '@/utils/exceptions';
import {
  TCreateApplicationBody,
  TFindApplicationQuery,
  TUpdateApplicationBodySchema,
} from '@/web/validators/application.validation';
import { ApplicationResponseDto } from '../dtos/application/application-response.dto';

export class ApplicationService {
  static async create(createDto: TCreateApplicationBody): Promise<{ message: string; data: any }> {
    const application = await ApplicationRepository.create(createDto);

    return {
      message: 'Application created',
      data: application,
    };
  }

  static async getAll(
    filter: TFindApplicationQuery,
  ): Promise<{ message: string; data: ApplicationResponseDto }> {
    const application = await ApplicationRepository.find(filter);

    // if (!application || application.length === 0) {
    //   throw new NotFoundException('No application found');
    // }
    return {
      message: 'Application fetched',
      data: ApplicationResponseDto.fromMany(application),
    };
  }

  static async getById(
    applicationId: string,
  ): Promise<{ message: string; data: ApplicationResponseDto }> {
    const application = await ApplicationRepository.findById(applicationId);

    if (!application) {
      throw new NotFoundException('No application found');
    }
    return {
      message: 'Application fetched',
      data: ApplicationResponseDto.from(application),
    };
  }

  static async update(
    applicationId: string,
    updateDto: TUpdateApplicationBodySchema,
  ): Promise<{ message: string; data: ApplicationResponseDto }> {
    const application = await ApplicationRepository.update(applicationId, updateDto);

    if (!application) {
      throw new NotFoundException('No application found');
    }

    return {
      message: 'Application fetched',
      data: ApplicationResponseDto.from(application),
    };
  }

  static async delete(applicationId: string): Promise<{ message: string }> {
    const application = await ApplicationRepository.delete(applicationId);

    if (!application) {
      throw new NotFoundException('No application found');
    }
    return {
      message: 'Application delete',
    };
  }
}
