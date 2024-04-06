import { customAlphabet } from 'nanoid';

/**
 * Generates an OTP with expiration time.
 * @param {number} otpSize - The length of the OTP.
 * @param {number} expirationTimeInSeconds - The expiration time of the OTP in seconds.
 * @returns {Object} An object containing the OTP and its expiration time.
 */
export function generateOtp(otpSize = 6, expirationTimeInSeconds = 300) {
  const otpChars = process.env.OTP_CHARS!;
  const otp = customAlphabet(otpChars, otpSize)();
  const expirationTime = (Date.now() + expirationTimeInSeconds * 1000).toString();
  return { otp, expirationTime };
}
