import { HttpException, HttpStatus } from '@/utils/exceptions';
import { UserService } from '../user/user.service';
import * as token from '@/utils/token.util';
import { generateOtp } from '@/utils/otp.util';
import { ISerializedUser, IUser } from '../user/user.interface';

class AuthService {
  private UserService = new UserService();

  public async register(
    email:string,
    firstName: string,
    lastName: string,
    password: string,
    username: string,
    phoneNumber: string,
  ) {
    return await this.UserService.register(email, firstName, lastName, password, username, phoneNumber);
  }

  public async login(email: string, password: string) {
    const user = await this.UserService.getFullUser({email});
    if (!(await user.isValidPassword(password))) {
      throw new HttpException(HttpStatus.BAD_REQUEST, 'invalid email or password');
    }
    return {
      accessToken: token.createToken({id: user._id}),
      user: this.serializeUser(user),
    };
  }

  public serializeUser(user: IUser): ISerializedUser {
    const {password, otp, otpCreatedAt, accountBalance, recoveryCodes, ...serializedUser} = user;
    return serializedUser;
  }

  public async generateOtp(email: string) {
    const user = await this.UserService.getFullUser({email});

    user.otp = generateOtp();
    // !handle otp expiration
    user.save();
    return { otpGenerated: true, email: user.email};
  }

  public async validateOtp(email: string, otp: string) {
    const user = await this.UserService.getFullUser({email});

    if (otp !== user.otp) {
      // !handle otp expiration
      throw new HttpException(HttpStatus.BAD_REQUEST, 'otp expired or invalid');
    }
    return {validOtp: true};
  }
}

export { AuthService };