// VerifyOtpRequestDto.ts
export class VerifyOtpRequestDto {
  otp: string;

  constructor(verifyOtp: VerifyOtpRequestDto) {
    this.otp = verifyOtp.otp;
  }

  static from(verifyOtp: any): VerifyOtpRequestDto {
    return new VerifyOtpRequestDto({
      otp: verifyOtp.otp,
    });
  }
}
