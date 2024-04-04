import express, { Application, Router } from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorMiddleware, handleInvalidRoutes } from './web/middlewares';
import logger from './utils/logger.utils';

import { corsOptions } from '@/config/cors.config';

class App {
  private express: Application;
  private port: number;

  constructor(apiRoutes: Router, port: number) {
    this.express = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeRoutes(apiRoutes);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.express.use(helmet());
    this.express.use(cors(corsOptions));
    this.express.use(morgan('dev'));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  private initializeRoutes(apiRoutes: Router) {
    this.express.use('/api/v1', apiRoutes);
    this.express.use('*', handleInvalidRoutes);
  }

  private initializeErrorHandling() {
    this.express.use(errorMiddleware);
  }

  public listen() {
    this.express.listen(this.port, () =>
      logger.info(
        `server running in "${process.env.NODE_ENV}" and listening on port "${this.port}"`,
      ),
    );
  }
}

export { App };
