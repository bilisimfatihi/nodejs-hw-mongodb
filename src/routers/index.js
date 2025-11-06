import { Router } from 'express';
import authRouter from './auth.js';
import contactsRouter from './contacts.js';

const router = Router();
// Basic route
router.get('/', (req, res) => {
  res.json({
    message: 'Server is running',
    status: 'success',
    code: 200,
  });
});
router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);

export default router;
