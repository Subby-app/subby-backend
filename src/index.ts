import 'dotenv/config';
import 'module-alias/register';
import { mongooseConnect } from './data/database/mongoose';
import { App } from './app';
import { apiRouters } from './web/routes/index';

mongooseConnect();

const app = new App(apiRouters, +process.env.PORT!);
app.listen();