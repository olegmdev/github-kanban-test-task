'use strict';

import express, { type Express } from 'express';
import cors from 'cors';
import { sequelize } from './db';
import router from './routes/routes';


export function createServer(): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  sequelize.authenticate().then(async () => {
    console.log('Connected!');
  }).catch((err: Error) => {
    console.log(err);
  });

  app.use('/', router);

  return app;
}
