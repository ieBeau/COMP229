import express from 'express';
import contactsController from '../controllers/contact.controller.js';

const router = express.Router();

router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getContact);
router.post('/', contactsController.createContact);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);
router.delete('/', contactsController.deleteAllContacts);

export default router;