import { Contact } from '../db/contactModel.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/constants.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const dataCount = await Contact.countDocuments(filter);
  const data = await Contact.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(dataCount, perPage, page);
  return { data: data, ...paginationData };
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
