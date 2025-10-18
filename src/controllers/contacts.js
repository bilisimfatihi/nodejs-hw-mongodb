import createHttpError from 'http-errors';
import { getAllContacts, getContactById } from '../services/contact.js';

export const getContactsController = async (req, res) => {
  const data = await getAllContacts();

  res.status(200).send({
    status: 200,
    message: 'Successfully found contacts!',
    data: data,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);

  if (!data) {
    /*     next(new Error('Contact not found'));
    return; */
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).send({
    status: 200,
    message: `Successfully found contact with id ${contactId}`,
    data: data,
  });
};
