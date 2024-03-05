import { NotFoundException } from '../../utils/exceptions/index';
import { UserRepository } from '../../data/repositories/user.repository';
import { UserResponseDto } from '../../logic/dtos/User';
import { TCreateUserBody, TUpdateUserBody } from '@/web/validators/user.validation';
import { Encryption } from '@/utils/encryption.utils';
import { TUserFilter, TFilterOptions } from '@/data/interfaces/IUser';

export class UserService {
  static async getAll(): Promise<{ message: string; data: UserResponseDto[] }> {
    const users = await UserRepository.find();
    if (!users || users.length === 0) {
      throw new NotFoundException('No user found');
    }

    return {
      message: 'Users fetched',
      data: UserResponseDto.fromMany(users),
    };
  }

  static async create(userEntity: TCreateUserBody): Promise<{ message: string; data: any }> {
    const password = await Encryption.encryptText(userEntity.password, 12);
    const user = await UserRepository.create({ ...userEntity, password });

    if (!user) {
      throw new NotFoundException('Failed to create user');
    }

    return {
      message: 'User Created',
      data: UserResponseDto.signup(user.toObject()),
    };
  }

  static async getById(UserId: string): Promise<{ message: string; data: UserResponseDto }> {
    const user = await UserRepository.findById(UserId);
    if (!user) {
      throw new NotFoundException('No user found');
    }

    return {
      message: 'User fetched',
      data: UserResponseDto.from(user.toObject()),
    };
  }

  static async authFind(filter: TUserFilter, options?: TFilterOptions) {
    const user = await UserRepository.authFind(filter, options);
    if (!user) throw new NotFoundException('No user found');
    return user;
  }

  static async update(
    userId: string,
    updateUserDto: TUpdateUserBody,
  ): Promise<{ message: string; data: UserResponseDto }> {
    const updatedUser = await UserRepository.update(userId, updateUserDto);

    if (!updatedUser) {
      throw new NotFoundException('No user found after update');
    }

    return {
      message: 'User Updated',
      data: UserResponseDto.from(updatedUser.toObject()),
    };
  }

  static async delete(userId: string): Promise<{ message: string; data?: UserResponseDto }> {
    const user = await UserRepository.delete(userId);
    if (!user) {
      throw new NotFoundException('No user found');
    }

    return {
      message: 'User deleted',
    };
  }
}
