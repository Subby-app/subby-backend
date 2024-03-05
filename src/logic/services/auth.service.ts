import { NotFoundException, UnauthorizedException } from '../../utils/exceptions/index';
import * as token from '@/utils/token.util';
import { ConflictException } from '@/utils/exceptions/conflict.exception';
import { UserResponseDto } from '../../logic/dtos/User/User-response.dto';
import { UserRepository, WalletRepository } from '../../data/repositories/index';
import { UserService } from './user.service';
import { Encryption } from '@/utils/encryption.utils';
import { TCreateUserBody } from '@/web/validators/user.validation';

export class AuthService {
  static async signup(userEntity: TCreateUserBody): Promise<{ message: string; data: any }> {
    return UserService.create(userEntity);
  }

  static async verify(email: string): Promise<{ message: string; data: any }> {
    const user = await UserRepository.findEmail(email);

    if (!user) {
      throw new NotFoundException('No user with this email found');
    }

    if (user.verified) throw new ConflictException({ message: 'You are already verified' });

    const [verifiedUser, wallet] = await Promise.all([
      UserRepository.update(user._id, { verified: true }),
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
    const user = await UserService.authFind(
      { email },
      { sensitive: true, sensitiveFields: '+password' },
    );

    const isMatch = Encryption.compare(user.password, password);

    if (!isMatch) throw new UnauthorizedException({ message: 'Invalid email or password' });

    return {
      message: 'Successful login',
      data: {
        accessToken: token.createToken({ id: user._id }),
        user: UserResponseDto.login(user),
      },
    };
  }
}
