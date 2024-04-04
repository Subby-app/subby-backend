import 'dotenv/config';

export const gmailConfig = {
  clientId: process.env.MAILER_CLIENT_ID,
  clientSecret: process.env.MAILER_CLIENT_SECRET,
  authRedirectUrl: process.env.MAILER_AUTH_REDIRECT_URL,
  refreshToken: process.env.MAILER_REFRESH_TOKEN,
  userEmail: process.env.MAILER_USER_EMAIL || ' ',
};
