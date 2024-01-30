import { NotFoundException } from '@/utils/exceptions';
import { UserRepository } from '../../data/repositories/user.repository';
import { UserResponseDto } from '../../logic/dtos/User';
import { UserEntity } from '../../data/entities';

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

  static async create(createUserDto: any): Promise<{ message: string; data: any }> {
    const userEntity = UserEntity.make(createUserDto);
    const user = await UserRepository.create(userEntity);
    console.log('user', user);

    if (!user) {
      throw new NotFoundException('Failed to create user');
    }

    return {
      message: 'Users Created',
      data: UserResponseDto.from(user.toObject()),
    };
  }

  static async getById(UserId: string): Promise<{ message: string; data: UserResponseDto }> {
    const user = await UserRepository.findById(UserId);
    if (!user) {
      throw new NotFoundException('No user found');
    }

    return {
      message: 'User fetched',
      data: UserResponseDto.from(user.toObject()), // Ensure 'toObject' is called
    };
  }

  static async update(
    UserId: string,
    updateUserDto: Partial<UserEntity>,
  ): Promise<{ message: string; data: UserResponseDto }> {
    const user = await UserRepository.findById(UserId);
    if (!user) {
      throw new NotFoundException('No user found');
    }

    const updatedUser = await UserRepository.update(user, updateUserDto);

    if (!updatedUser) {
      throw new NotFoundException('No user found after update');
    }

    return {
      message: 'User Updated',
      data: UserResponseDto.from(updatedUser.toObject()),
    };
  }

  static async delete(UserId: string): Promise<{ message: string; data?: UserResponseDto }> {
    const user = await UserRepository.delete(UserId);
    if (!user) {
      throw new NotFoundException('No user found');
    }

    return {
      message: 'User deleted',
    };
  }
}
