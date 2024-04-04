import logger from '@/utils/logger.utils';
import { createTransporter, generateSignupEmailContent } from '../../utils/nodemailer.utils';

export async function sendSignupEmail(email: string, subject: string, message: string) {
  try {
    const transporter = await createTransporter();
    const mailOptions = generateSignupEmailContent(email, subject, message);

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    logger.error({ message: error });
  }
}
