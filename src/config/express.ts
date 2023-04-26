import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import locationRouter from '../controller/location/location.router';
import errorHandler from '../middleware/errorHandler';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const createServer = (): express.Application => {
  const app = express();
  mongoose.connect(MONGODB_URI).then(_ => {
    console.log(`Mongo connected`);
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.json());

  app.disable('x-powered-by');

  app.get('/health', (_req, res) => {
    res.send('UP');
  });

  app.use('/', locationRouter);

  app.use(errorHandler);

  return app;
};

export { createServer };
