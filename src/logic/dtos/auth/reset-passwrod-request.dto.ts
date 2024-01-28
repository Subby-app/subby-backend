export class ResetPasswordRequestDto {
  newPassword: string;
  otp: string;

  constructor(resetPassword: ResetPasswordRequestDto) {
    this.newPassword = resetPassword.newPassword;
    this.otp = resetPassword.otp;
  }

  static from(resetPassword: any): ResetPasswordRequestDto {
    return new ResetPasswordRequestDto({
      newPassword: resetPassword.newPassword,
      otp: resetPassword.otp,
    });
  }
}
