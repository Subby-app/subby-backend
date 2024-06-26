import { NotFoundException, UnauthorizedException } from '../../utils/exceptions/index';
import { createToken } from '@/utils/token.util';
import { ConflictException } from '@/utils/exceptions/conflict.exception';
import { UserResponseDto } from '../../logic/dtos/User/User-response.dto';
import { UserRepository } from '../../data/repositories/index';
import { UserService } from './user.service';
import { Encryption } from '@/utils/encryption.utils';
import { TCreateUserBody } from '@/web/validators/user.validation';
import { generateOtp } from '@/utils/otp.util';
import { userOtpSubject, verificationMessage } from '@/utils/email-message-constant';
import { sendSignupEmail } from './mail.service';

export class AuthService {
  static async signup(userEntity: TCreateUserBody): Promise<{ message: string; data: any }> {
    return UserService.create(userEntity);
  }

  static async verify(email: string, otp: string): Promise<{ message: string }> {
    const user = await UserRepository.findEmail(email);

    if (!user) {
      throw new NotFoundException('No user found');
    }

    if (user.verified) {
      throw new ConflictException({ message: 'User already verified' });
    }

    if (parseInt(user.otpExpiration) < Date.now() || user.otp !== otp) {
      throw new ConflictException({ message: 'Invalid or expired OTP' });
    }

    user.otp = '';
    user.verified = true;
    await user.save();

    return {
      message: 'Email Verification Successful',
    };
  }

  static async sendOTP(email: string): Promise<{ message: string }> {
    const user = await UserRepository.findEmail(email);
    if (!user) {
      throw new NotFoundException('No user found');
    }

    // Generate veritfication token
    const { otp: verificationToken, expirationTime } = generateOtp();

    user.otp = verificationToken;
    user.otpExpiration = expirationTime;
    await user.save();

    const sendVerificationEmail = verificationMessage(user.firstName, verificationToken);
    await sendSignupEmail(user.email, userOtpSubject, sendVerificationEmail);

    return {
      message: 'Verification OTP sent to your Mail',
    };
  }

  static async login(email: string, password: string): Promise<{ message: string; data: any }> {
    const user = await UserService.authFind(
      { email },
      { sensitive: true, sensitiveFields: '+password' },
    );

    const isMatch = await Encryption.compare(user.password, password);
    if (!isMatch) throw new UnauthorizedException({ message: 'Invalid email or password' });

    return {
      message: 'Successful login',
      data: {
        accessToken: createToken({ id: user._id }),
        user: UserResponseDto.login(user),
      },
    };
  }

  static async changePassword(email: string, currentPassword: string, newPassword: string) {
    const user = await UserRepository.findEmail(email);
    if (!user) {
      throw new NotFoundException('No user found');
    }

    const isCurrentPasswordCorrect = await Encryption.compare(user.password, currentPassword);
    if (!isCurrentPasswordCorrect) {
      throw new ConflictException({ message: 'Password incorrect' });
    }

    const isNewPasswordSimilar = await Encryption.compare(user.password, newPassword);
    if (isNewPasswordSimilar) {
      throw new ConflictException({ message: 'Password is similar to old password' });
    }

    const hashedNewPassword = await Encryption.encryptText(newPassword);
    user.password = hashedNewPassword;
    await user.save();

    return { message: 'Password changed successfully' };
  }

  static async forgotPassword(email: string) {
    const user = await UserRepository.findEmail(email);
    if (!user) {
      throw new NotFoundException('No user found');
    }

    const { otp: verificationToken, expirationTime } = generateOtp();
    user.otp = verificationToken;
    user.otpExpiration = expirationTime;
    await user.save();

    const sendPasswordResetEmail = verificationMessage(user.firstName, verificationToken);
    await sendSignupEmail(user.email, userOtpSubject, sendPasswordResetEmail);

    return {
      message: 'Password reset OTP sent to your Mail',
    };
  }

  static async resetPassword(email: string, otp: string, newPassword: string) {
    const user = await UserRepository.findEmail(email);
    if (!user) {
      throw new NotFoundException('No user found');
    }

    if (parseInt(user.otpExpiration) < Date.now() || user.otp !== otp) {
      throw new ConflictException({ message: 'Invalid or expired OTP' });
    }

    const isNewPasswordSimilar = await Encryption.compare(user.password, newPassword);
    if (isNewPasswordSimilar) {
      throw new ConflictException({ message: 'Password is similar to old password' });
    }

    const newHashedPassword = await Encryption.encryptText(newPassword);

    user.password = newHashedPassword;
    await user.save();

    return {
      message: 'Password Reset successfully',
    };
  }
}
