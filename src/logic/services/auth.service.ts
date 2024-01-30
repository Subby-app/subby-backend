import {
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '../../utils/exceptions/index';
import * as token from '@/utils/token.util';
import { IUser } from '../../data/interfaces/user.interface';
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
      message: 'Users Created',
      data: UserResponseDto.from(user.toObject()),
    };
  }

  static async login(email: string, password: string): Promise<{ message: string; data: any }> {
    const user = await UserRepository.findEmail(email);

    if (!user) throw new ConflictException({ message: 'User not found' });

    const isMatch = Encryption.compare(user.password, password);

    if (!isMatch) throw new UnauthorizedException({ message: 'Invalid email or password' });

    return {
      message: 'successful login',
      data: {
        accessToken: token.createToken({ id: user._id }),
        data: UserResponseDto.from(user),
      },
    };
  }

  //   public async sendOtp(email: string) {
  //     const user = await this.UserService.getFullUser({ email });

  //     const otp = generateOtp();
  //     const futureDate = new Date();
  //     futureDate.setMinutes(futureDate.getMinutes() + 5);
  //     const expiration = futureDate.getTime().toString();

  //     user.otp = otp;
  //     user.otpExpiration = expiration;
  //     await user.save();
  //     // *send to user's email
  //     return { otpSent: true, email: user.email };
  //   }

  //   public async verifyOtp(email: string, otp: string) {
  //     const user = await this.UserService.getFullUser({ email });
  //     if (user.otp == '') throw new HttpException(HttpStatus.BAD_REQUEST, 'user has no otp');

  //     if (otp !== user.otp || parseInt(user.otpExpiration) < new Date().getTime()) {
  //       throw new HttpException(HttpStatus.FORBIDDEN, 'otp expired or invalid');
  //     }
  //     user.otp = '';
  //     user.otpExpiration = '';
  //     await user.save();
  //     return { validOtp: true };
  //   }

  //   public async verifyAccount(email: string) {
  //     const user = await this.UserService.findOne({ email });
  //     if (user.verified) throw new HttpException(HttpStatus.BAD_REQUEST, 'user is already verified');

  //     return await this.sendOtp(email);
  //   }

  //   public async verifyEmail(email: string, otp: string) {
  //     const user = await this.UserService.findOne({ email });

  //     const { validOtp } = await this.verifyOtp(email, otp);
  //     if (validOtp) {
  //       user.verified = true;
  //       await user.save();
  //     }
  //     return { accountVerified: true, email };
  //   }

  //   public async resetPasswordRequest(email: string) {
  //     const user = await this.UserService.findOne({ email });
  //     return await this.sendOtp(user.email);
  //   }

  //   public async resetPassword(email: string, newPassword: string, otp: string) {
  //     const user = await this.UserService.getFullUser({ email });

  //     if (await user.isValidPassword(newPassword)) {
  //       throw new HttpException(
  //         HttpStatus.FORBIDDEN,
  //         'old password cannot be new password, use a different password',
  //       );
  //     }
  //     await this.verifyOtp(email, otp);
  //     user.password = newPassword;
  //     await user.save();
  //     return { passwordReset: true };
  //   }
}
