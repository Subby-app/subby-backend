import logger from '@/utils/logger.utils';
import { createTransporter, generateSignupEmailContent } from '../../utils/nodemailer.utils';

export async function sendSignupEmail(email: string, subject: string, message: string) {
  try {
    const transporter = await createTransporter();
    const mailOptions = generateSignupEmailContent(email, subject, message);

    await transporter.sendMail(mailOptions);
    logger.info('Verification Email Sent to your mail');
  } catch (error) {
    logger.error({ message: error });
  }
}
