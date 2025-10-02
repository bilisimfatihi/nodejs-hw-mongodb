import express from 'express';
import { pinoHttp } from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { getAllContacts, getContactById } from './services/contact.js';

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

  // Get all contacts
  app.get('/contacts', async (req, res) => {
    const data = await getAllContacts();

    res.status(200).send({
      status: 200,
      message: 'Successfully found contacts!',
      data: data,
    });
  });

  // Get all contacts
  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const data = await getContactById(contactId);
    if (!data) {
      return res.status(404).json({
        message: 'Contact not found',
      });
    }

    res.status(200).send({
      status: 200,
      message: `Successfully found contact with id ${contactId}`,
      data: data,
    });
  });

  //404
  app.use((req, res) => {
    res.status(404).json({
      message: 'Not Found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
