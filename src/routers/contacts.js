import { Router } from 'express';
import {
  getContactByIdController,
  getContactsController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contact.js';

const router = Router();

router.use(authenticate);
// Get all contacts
router.get('/', ctrlWrapper(getContactsController));
// Get contact by id
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));
// Create contact
router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
// Update contact
router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);
// Delete contact
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;
