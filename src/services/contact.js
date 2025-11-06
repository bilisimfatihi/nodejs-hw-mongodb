import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/constants.js';
import { ContactCollection } from '../models/contact.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const dataCount = await ContactCollection.countDocuments(filter);
  const data = await ContactCollection.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(dataCount, perPage, page);
  return { data: data, ...paginationData };
};

export const getContactById = async (id) => {
  const data = await ContactCollection.findById(id);
  return data;
};

export const createContact = async (payload) => {
  const data = await ContactCollection.create(payload);
  return data;
};

export const updateContact = async (contactId, payload) => {
  const data = await ContactCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
    },
  );
  return data;
};

export const deleteContact = async (contactId) => {
  const data = await ContactCollection.findByIdAndDelete(contactId);
  return data;
};
