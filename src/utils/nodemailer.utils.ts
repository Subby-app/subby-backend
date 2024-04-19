import { OAuth2Client } from 'google-auth-library';
import * as nodemailer from 'nodemailer';
import { gmailConfig } from '../config/mail.config';

export async function getOAuth2Client() {
  const oAuth2Client = new OAuth2Client(
    gmailConfig.clientId,
    gmailConfig.clientSecret,
    gmailConfig.authRedirectUrl,
  );
  oAuth2Client.setCredentials({ refresh_token: gmailConfig.refreshToken });
  return oAuth2Client;
}

export async function createTransporter() {
  const oAuth2Client = await getOAuth2Client();
  const accessToken = await oAuth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: gmailConfig.userEmail,
      clientId: gmailConfig.clientId,
      clientSecret: gmailConfig.clientSecret,
      refreshToken: gmailConfig.refreshToken,
      accessToken: accessToken as string,
    },
  });
}

/**
 *
 * @param {string} email - The recipient's mail service.
 * @param {string} subject - The email subject.
 * @param {string} message - The html content of the mail
 */
export function generateSignupEmailContent(
  email: string,
  subject: string,
  message: string,
): { from: string; to: string; subject: string; html: string } {
  return {
    from: gmailConfig.userEmail,
    to: email,
    subject: subject,
    html: message,
  };
}
