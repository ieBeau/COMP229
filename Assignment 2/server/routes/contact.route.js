import express from 'express';
import contactsController from '../controllers/contact.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/api/contacts/', authMiddleware.requireSignin, contactsController.getAllContacts);
router.get('/api/contacts/:id', authMiddleware.requireSignin, contactsController.getContact);
router.post('/api/contacts/', authMiddleware.requireSignin, contactsController.createContact);
router.put('/api/contacts/:id', authMiddleware.requireSignin, contactsController.updateContact);
router.delete('/api/contacts/:id', authMiddleware.requireSignin, contactsController.deleteContact);
router.delete('/api/contacts/', authMiddleware.requireSignin, authMiddleware.hasAuthorization, contactsController.deleteAllContacts);

export default router;