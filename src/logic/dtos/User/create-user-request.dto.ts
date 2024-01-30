export class CreateUserRequestDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
  phoneNumber: string;
  role: string;
  verified: boolean;
  otp: string;
  otpExpiration: string;
  recoveryCodes: { hash: string; used: boolean }[];
  families: string[];
  maxFamilies: number;
  subscriptions: string[];
  accountNumber: string;
  wallet: string;
  earnings: number;

  constructor(user: CreateUserRequestDto) {
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.password = user.password;
    this.username = user.username;
    this.phoneNumber = user.phoneNumber;
    this.role = user.role;
    this.verified = user.verified;
    this.otp = user.otp;
    this.otpExpiration = user.otpExpiration;
    this.recoveryCodes = user.recoveryCodes;
    this.families = user.families;
    this.maxFamilies = user.maxFamilies;
    this.subscriptions = user.subscriptions;
    this.accountNumber = user.accountNumber;
    this.wallet = user.wallet;
    this.earnings = user.earnings;
  }

  static from(user: any): CreateUserRequestDto {
    return new CreateUserRequestDto({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      username: user.username,
      phoneNumber: user.phoneNumber,
      role: user.role,
      verified: user.verified,
      otp: user.otp,
      otpExpiration: user.otpExpiration,
      recoveryCodes: user.recoveryCodes,
      families: user.families,
      maxFamilies: user.maxFamilies,
      subscriptions: user.subscriptions,
      accountNumber: user.accountNumber,
      wallet: user.wallet,
      earnings: user.earnings,
    });
  }
}
