import express from 'express';
import contactsController from '../controllers/contact.controller.js';

const router = express.Router();

router.get('/api/contacts/', contactsController.getAllContacts);
router.get('/api/contacts/:id', contactsController.getContact);
router.post('/api/contacts/', contactsController.createContact);
router.put('/api/contacts/:id', contactsController.updateContact);
router.delete('/api/contacts/:id', contactsController.deleteContact);
router.delete('/api/contacts/', contactsController.deleteAllContacts);

export default router;