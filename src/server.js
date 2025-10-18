import express from 'express';
import { pinoHttp } from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

dotenv.config();

const PORT = process.env.PORT;

export const setupServer = () => {
  const app = express();

  //middleware
  app.use(cors());
  app.use(express.json());

  //pinohttp and pino pretty
  app.use(pinoHttp());

  // Basic route
  app.get('/', (req, res) => {
    res.json({
      message: 'Server is running',
      status: 'success',
      code: 200,
    });
  });
  // routes
  app.use(contactRouter);
  // not found handler (404)
  app.use('', notFoundHandler);
  // error handler
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
