import { Contact } from '../db/contactModel.js';

export const getAllContacts = async () => {
  const data = await Contact.find();
  return data;
};

export const getContactById = async (id) => {
  const data = await Contact.findById(id);
  return data;
};
