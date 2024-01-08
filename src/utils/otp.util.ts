import { customAlphabet } from 'nanoid';

export function generateOtp(otpSize?: number) {
  const _otpSize = otpSize || +process.env.OTP_SIZE!;
  return customAlphabet(process.env.OTP_CHARS!, _otpSize)();
}
