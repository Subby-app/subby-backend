import { NotFoundException, UnauthorizedException } from '../../utils/exceptions/index';
import * as token from '@/utils/token.util';
import { ConflictException } from '@/utils/exceptions/conflict.exception';
import { UserResponseDto } from '../../logic/dtos/User/User-response.dto';
import { UserRepository } from '../../data/repositories/user.repository';
import { UserEntity } from '../../data/entities';
import { Encryption } from '../../utils/encrption.utils';

export class AuthService {
  static async register(userDto: any): Promise<{ message: string; data: any }> {
    const userEntity = UserEntity.make(userDto);
    const user = await UserRepository.create(userEntity);

    if (!user) {
      throw new NotFoundException('Failed to create user');
    }
    return {
      message: 'User Created',
      data: user.email,
    };
  }

  static async login(email: string, password: string): Promise<{ message: string; data: any }> {
    const user = await UserRepository.findEmail(email);

    if (!user) throw new ConflictException({ message: 'User not found' });

    const isMatch = Encryption.compare(user.password, password);

    if (!isMatch) throw new UnauthorizedException({ message: 'Invalid email or password' });

    return {
      message: 'Successful login',
      data: {
        accessToken: token.createToken({ id: user._id }),
        user: UserResponseDto.from(user),
      },
    };
  }
}
