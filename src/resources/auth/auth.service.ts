import { HttpException, HttpStatus } from '@/utils/exceptions';
import { UserService } from '../user/user.service';
import * as token from '@/utils/token.util';
import { generateOtp } from '@/utils/otp.util';
import { ISerializedUser, IUser } from '../user/user.interface';

class AuthService {
  private UserService = new UserService();

  public async register(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    username: string,
    phoneNumber: string,
  ) {
    return await this.UserService.register(
      email,
      firstName,
      lastName,
      password,
      username,
      phoneNumber,
    );
  }

  public async login(email: string, password: string) {
    const user = await this.UserService.getFullUser({ email });
    if (!(await user.isValidPassword(password))) {
      throw new HttpException(HttpStatus.BAD_REQUEST, 'invalid email or password');
    }
    return {
      accessToken: token.createToken({ id: user._id }),
      user: this.serializeUser(user),
    };
  }

  public serializeUser(user: IUser): ISerializedUser {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, otp, otpExpiration, accountBalance, recoveryCodes, ...serializedUser } = user;
    return serializedUser;
  }

  public async sendOtp(email: string) {
    const user = await this.UserService.getFullUser({ email });

    const otp = generateOtp();
    const futureDate = new Date();
    futureDate.setMinutes(futureDate.getMinutes() + 5);
    const expiration = futureDate.getTime().toString();

    user.otp = otp;
    user.otpExpiration = expiration;
    await user.save();
    // *send to user's email
    return { otpSent: true, email: user.email };
  }

  public async verifyOtp(email: string, otp: string) {
    const user = await this.UserService.getFullUser({ email });

    if (otp !== user.otp || parseInt(user.otpExpiration) < new Date().getTime()) {
      throw new HttpException(HttpStatus.FORBIDDEN, 'otp expired or invalid');
    }
    user.otp = '';
    user.otpExpiration = '';
    await user.save();
    return { validOtp: true };
  }

  public async verifyAccount(email: string) {
    const user = await this.UserService.findOne({ email });
    if (user.verified) throw new HttpException(HttpStatus.BAD_REQUEST, 'user is already verified');

    await this.sendOtp(email);
  }

  public async verifyEmail(email: string, otp: string) {
    const user = await this.UserService.findOne({ email });

    const { validOtp } = await this.verifyOtp(email, otp);
    if (validOtp) {
      user.verified = true;
      await user.save();
    }
    return { accountVerified: true, email };
  }

  public async resetPasswordRequest(email: string) {
    const user = await this.UserService.findOne({ email });
    return await this.sendOtp(user.email);
  }

  public async resetPassword(email: string, newPassword: string) {
    const user = await this.UserService.getFullUser({ email });
    // !security: better to verify otp and newPassword in one request
    if (await user.isValidPassword(newPassword)) {
      throw new HttpException(
        HttpStatus.FORBIDDEN,
        'old password cannot be new password, use a different password',
      );
    }
    user.password = newPassword;
    await user.save();
    return { passwordReset: true };
  }
}

export { AuthService };
