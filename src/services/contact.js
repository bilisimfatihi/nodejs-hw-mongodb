import { Contact } from '../db/contactModel.js';

export const getAllContacts = async () => {
  const data = await Contact.find();
  return data;
};

export const getContactById = async (id) => {
  const data = await Contact.findById(id);
  return data;
};

export const createContact = async (payload) => {
  const data = await Contact.create(payload);
  return data;
};

export const updateContact = async (contactId, payload) => {
  const data = await Contact.findOneAndUpdate({ _id: contactId }, payload, {
    new: true,
  });
  return data;
};

export const deleteContact = async (contactId) => {
  const data = await Contact.findByIdAndDelete(contactId);
  return data;
};
