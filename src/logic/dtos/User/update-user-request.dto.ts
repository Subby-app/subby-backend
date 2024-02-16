export class UpdateUserRequestDto {
  firstName?: string;
  lastName?: string;
  username?: string;
  phoneNumber?: string;
  verified?: boolean;
  accountNumber?: string;

  constructor(user: UpdateUserRequestDto) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.username = user.username;
    this.phoneNumber = user.phoneNumber;
    this.verified = user.verified;
    this.accountNumber = user.accountNumber;
  }

  static from(user: any): UpdateUserRequestDto {
    return new UpdateUserRequestDto({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      phoneNumber: user.phoneNumber,
      verified: user.verified,
      accountNumber: user.accountNumber,
    });
  }
}
