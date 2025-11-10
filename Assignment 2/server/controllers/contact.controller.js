import ContactModel from '../models/contact.model.js'

const getAllContacts = async (req, res) => {
    try {
        const contacts = await ContactModel.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getContact = async (req, res) => {
    try {
        const contact = await ContactModel.findById(req.params.id);

        if (!contact) return res.status(404).json({ message: 'Contact not found' });

        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createContact = async (req, res) => {
    try {
        const newContact = new ContactModel(req.body);
        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateContact = async (req, res) => {
    try {
        const updatedContact = await ContactModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!updatedContact) return res.status(404).json({ message: 'Contact not found' });
        
        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const deletedContact = await ContactModel.findByIdAndDelete(req.params.id);
        
        if (!deletedContact) return res.status(404).json({ message: 'Contact not found' });
        
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAllContacts = async (req, res) => {
    try {
        await ContactModel.deleteMany({});
        res.status(200).json({ message: 'All contacts deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default { getAllContacts, getContact, createContact, updateContact, deleteContact, deleteAllContacts };