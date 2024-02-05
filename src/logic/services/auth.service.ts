import { NotFoundException, UnauthorizedException } from '../../utils/exceptions/index';
import * as token from '@/utils/token.util';
import { ConflictException } from '@/utils/exceptions/conflict.exception';
import { UserResponseDto } from '../../logic/dtos/User/User-response.dto';
import { UserRepository, WalletRepository } from '../../data/repositories/index';
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

  static async verify(email: string): Promise<{ message: string; data: any }> {
    const user = await UserRepository.findEmail(email);

    if (!user) {
      throw new NotFoundException('No user with this email found');
    }

    if (user.verified) throw new ConflictException({ message: 'You are already verified' });

    const [verifiedUser, wallet] = await Promise.all([
      UserRepository.update({ _id: user._id }, { verified: true }),
      WalletRepository.create({ userId: user._id }),
    ]);

    if (!verifiedUser || !wallet) {
      throw new NotFoundException({ message: 'Verification or wallet creation failed' });
    }

    verifiedUser.wallet = wallet._id;
    await verifiedUser.save();

    return {
      message: 'Verified Successful',
      data: {
        accessToken: token.createToken({ id: user._id }),
        user: UserResponseDto.from(verifiedUser),
      },
    };
  }

  static async login(email: string, password: string): Promise<{ message: string; data: any }> {
    const user = await UserRepository.findEmail(email);

    if (!user || !user.verified) {
      throw new ConflictException({ message: user ? 'User not verified' : 'User not found' });
    }
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
