import { NotFoundException } from '../../utils/exceptions/index';
import { FamilyRepository } from '../../data/repositories/family.repository';
import { FamilyResponseDto } from '../../logic/dtos/Family';
import { FamilyEntity } from '../../data/entities/family.entity';

export class FamilyService {
  static async getAll(): Promise<{ message: string; data: FamilyResponseDto[] }> {
    const families = await FamilyRepository.find();
    if (!families || families.length === 0) {
      throw new NotFoundException('No families found');
    }

    return {
      message: 'Families fetched',
      data: FamilyResponseDto.fromMany(families),
    };
  }

  static async create(createFamilyDto: any): Promise<{ message: string; data: any }> {
    const familyEntity = FamilyEntity.make(createFamilyDto);
    const family = await FamilyRepository.create(familyEntity);

    if (!family) {
      throw new NotFoundException('Failed to create family');
    }

    return {
      message: 'Family Created',
      data: FamilyResponseDto.from(family.toObject()),
    };
  }

  static async getById(familyId: string): Promise<{ message: string; data: FamilyResponseDto }> {
    const family = await FamilyRepository.findById(familyId);
    if (!family) {
      throw new NotFoundException('No family found');
    }

    return {
      message: 'Family fetched',
      data: FamilyResponseDto.from(family.toObject()),
    };
  }

  static async getFamilyOwner(
    owner: string,
  ): Promise<{ message: string; data: FamilyResponseDto[] }> {
    const family = await FamilyRepository.findOwners({ owner });
    if (!family) {
      throw new NotFoundException('No family found');
    }

    return {
      message: 'Family fetched',
      data: FamilyResponseDto.fromMany(family),
    };
  }

  static async getFamilySubscribers(
    subscribers: string,
  ): Promise<{ message: string; data: FamilyResponseDto[] }> {
    const family = await FamilyRepository.getSubscribers({ subscribers });
    if (!family) {
      throw new NotFoundException('No family found');
    }

    return {
      message: 'Family fetched',
      data: FamilyResponseDto.fromMany(family),
    };
  }

  static async update(
    familyId: string,
    updateFamilyDto: any,
  ): Promise<{ message: string; data: FamilyResponseDto }> {
    const family = await FamilyRepository.findById(familyId);
    if (!family) {
      throw new NotFoundException('No family found');
    }

    const updatedFamily = await FamilyRepository.update(familyId, updateFamilyDto);

    if (!updatedFamily) {
      throw new NotFoundException('No family found after update');
    }

    return {
      message: 'Family Updated',
      data: FamilyResponseDto.from(updatedFamily.toObject()),
    };
  }

  static async delete(familyId: string): Promise<{ message: string; data?: FamilyResponseDto }> {
    const family = await FamilyRepository.delete(familyId);
    if (!family) {
      throw new NotFoundException('No family found');
    }

    return {
      message: 'Family deleted',
    };
  }
}
