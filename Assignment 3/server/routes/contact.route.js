import express from 'express';
import multer from 'multer';

import contactsController from '../controllers/contact.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

// Public route
router.post('/api/contacts/', upload.single('image'), authMiddleware.requireSignin, contactsController.createContact);

// Protected routes
router.get('/api/contacts/', authMiddleware.requireSignin, authMiddleware.hasAuthorization, contactsController.getAllContacts);
router.get('/api/contacts/:id', authMiddleware.requireSignin, authMiddleware.hasAuthorization, contactsController.getContact);
router.put('/api/contacts/:id', upload.single('image'), authMiddleware.requireSignin, authMiddleware.hasAuthorization, contactsController.updateContact);
router.delete('/api/contacts/:id', authMiddleware.requireSignin, authMiddleware.hasAuthorization, contactsController.deleteContact);
router.delete('/api/contacts/', authMiddleware.requireSignin, authMiddleware.hasAuthorization, contactsController.deleteAllContacts);

export default router;