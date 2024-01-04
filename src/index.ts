import 'dotenv/config';
import 'module-alias/register';
import { mongooseConnect } from './utils/database/mongoose';
import { App } from './app';
import { apiRouters } from './resources';

mongooseConnect();

const app = new App(apiRouters, +(process.env.PORT!));
app.listen();