import { Router } from 'express';
import {
  getContactByIdController,
  getContactsController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
// Get all contacts
router.get('/contacts', ctrlWrapper(getContactsController));

// Get all contacts
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

export default router;
