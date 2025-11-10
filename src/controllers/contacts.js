import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contact.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import cloudinary from '../utils/saveFileToCloudinary.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const { filter } = parseFilterParams(req.query);

  // userId'yi filtreye ekle
  const userId = req.user._id;
  const userFilter = { ...filter, userId };

  const data = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter: userFilter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}`,
    data: data,
  });
};

export const createContactController = async (req, res) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  if (!name || !phoneNumber || !contactType) {
    throw createHttpError(
      400,
      'Missing required fields: name, phonenumber or contacttype',
    );
  }

  let photoUrl = null;

  // Eğer dosya yüklendiyse Cloudinary'e gönder
  if (req.file) {
    try {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'contacts' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        stream.end(req.file.buffer);
      });

      photoUrl = result.secure_url;
    } catch (error) {
      console.error('Cloudinary upload failed:', error);
      throw createHttpError(500, 'Failed to upload image');
    }
  }

  const created = await createContact({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
    photo: photoUrl,
    userId: req.user._id,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: created,
  });
};

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const updateData = req.body;

  // Eğer dosya yüklendiyse Cloudinary'e gönder
  if (req.file) {
    try {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'contacts' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        stream.end(req.file.buffer);
      });

      updateData.photo = result.secure_url;
    } catch (error) {
      console.error('Cloudinary upload failed:', error);
      throw createHttpError(500, 'Failed to upload image');
    }
  }

  const updated = await updateContact(contactId, updateData);
  if (!updated) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updated,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const deleted = await deleteContact(contactId);
  if (!deleted) {
    throw createHttpError(404, 'Contact not found');
  }
  // 204 No Content — gövde olmamalı
  res.status(204).send();
};
