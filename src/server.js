import express from 'express';
import { pinoHttp } from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from '../src/utils/env.js';
import routers from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = env('PORT', '3000');

export const setupServer = () => {
  const app = express();

  //middleware
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  //pinohttp and pino pretty
  app.use(pinoHttp());

  // routers
  app.use(routers);

  // not found handler (404)
  app.use('', notFoundHandler);

  // error handler
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
