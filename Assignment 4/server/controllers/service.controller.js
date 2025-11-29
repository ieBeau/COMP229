import { bufferImage } from '../utils/bufferImage.js';

import ServiceModel from '../models/service.model.js'

const getAllServices = async (req, res) => {
    try {
        const services = await ServiceModel.find();
        const formatted = services.map(service => {
            let obj = service.toObject();

            for (const key in obj) {
                if (obj[key] === 'null') obj[key] = null;
            }

            return {
                ...obj,
                image: obj.image
                    ? `data:${obj.image.contentType};base64,${obj.image.data.toString('base64')}`
                    : null
            };
        });
                
        res.status(200).json(formatted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getService = async (req, res) => {
    try {
        const service = await ServiceModel.findById(req.params.id);
        
        if (!service) return res.status(404).json({ message: 'Service not found' });
        
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createService = async (req, res) => {
    try {
        let buffer;
        if (req.file) buffer = await bufferImage(req.file); 

        // Create buffer to store image
        const newService = new ServiceModel({
            ...req.body,
            descriptions: req.body.descriptions.split("\n,").map(desc => desc.trim()),
            image: buffer ? { data: buffer, contentType: req.file.mimetype } : null
        });

        await newService.save();
        
        let formattedService = newService.toObject();

        for (const key in formattedService) {
            if (formattedService[key] === 'null') formattedService[key] = null;
        }

        // Unbuffer image for response
        const service = {
            ...formattedService,
            image: buffer
                ? `data:${newService.image.contentType};base64,${newService.image.data.toString('base64')}`
                : null
        };

        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateService = async (req, res) => {
    try {
        let buffer;
        if (req.file) buffer = await bufferImage(req.file); 

        const updatedService = await ServiceModel.findByIdAndUpdate(
            req.params.id, 
            {
                ...req.body,
                descriptions: req.body.descriptions.split("\n,").map(desc => desc.trim()),
                image: req.file ? { data: req.file.buffer, contentType: req.file.mimetype } : undefined,
            }, 
            { new: true }
        );
        
        if (!updatedService) return res.status(404).json({ message: 'Service not found' });

        let formattedService = updatedService.toObject();

        for (const key in formattedService) {
            if (formattedService[key] === 'null') formattedService[key] = null;
        }

        // Unbuffer image for response
        const service = {
            ...formattedService,
            image: buffer
                ? `data:${updatedService.image.contentType};base64,${updatedService.image.data.toString('base64')}`
                : updatedService.image.toObject() ? req.body.image : null
        };
        
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteService = async (req, res) => {
    try {
        const deletedService = await ServiceModel.findByIdAndDelete(req.params.id);
        
        if (!deletedService) return res.status(404).json({ message: 'Service not found' });
        
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAllServices = async (req, res) => {
    try {
        await ServiceModel.deleteMany({});
        res.status(200).json({ message: 'All services deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default { getAllServices, getService, createService, updateService, deleteService, deleteAllServices };