import { Router } from 'express';
import {
  getContactByIdController,
  getContactsController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
// Get all contacts
router.get('/contacts', ctrlWrapper(getContactsController));
// Get contact by id
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
// Create contact
router.post('/contacts', ctrlWrapper(createContactController));
// Update contact
router.patch('/contacts/:contactId', ctrlWrapper(updateContactController));
// Delete contact
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
