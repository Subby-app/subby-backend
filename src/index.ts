import 'dotenv/config';
import 'module-alias/register';
import { mongooseConnect } from './data/database/mongoose';
import { App } from './app';
import { apiRouters } from './web/routes/index';

process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing server...');
  // Perform cleanup tasks if necessary
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Closing server...');
  // Perform cleanup tasks if necessary
  process.exit(0);
});

mongooseConnect();

const app = new App(apiRouters, +process.env.PORT!);
app.listen();
