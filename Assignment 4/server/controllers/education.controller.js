import { bufferImage } from '../utils/bufferImage.js';

import EducationModel from "../models/education.model.js";

const getAllEducation = async (req, res) => {
    try {
        const education = await EducationModel.find();

        const formatted = education.map(edu => {
            let obj = edu.toObject();

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

const getEducation = async (req, res) => {
    try {
        const education = await EducationModel.findById(req.params.id);
        
        if (!education) return res.status(404).json({ message: 'Education not found' });
        
        res.status(200).json(education);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createEducation = async (req, res) => {
    try {
        let buffer;
        if (req.file) buffer = await bufferImage(req.file); 

        // Create buffer to store image
        const newEducation = new EducationModel({
            ...req.body,
            image: buffer ? { data: buffer, contentType: req.file.mimetype } : null
        });

        await newEducation.save();

        let formattedEducation = newEducation.toObject();

        for (const key in formattedEducation) {
            if (formattedEducation[key] === 'null') formattedEducation[key] = null;
        }
        
        // Unbuffer image for response
        const education = {
            ...formattedEducation,
            image: buffer
                ? `data:${newEducation.image.contentType};base64,${newEducation.image.data.toString('base64')}`
                : null
        };

        res.status(201).json(education);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateEducation = async (req, res) => {
    try {
        let buffer;
        if (req.file) buffer = await bufferImage(req.file); 

        const updatedEducation = await EducationModel.findByIdAndUpdate(
            req.params.id, 
            {
                ...req.body,
                image: req.file ? { data: req.file.buffer, contentType: req.file.mimetype } : undefined,
            },  
            { new: true }
        );
        
        if (!updatedEducation) return res.status(404).json({ message: 'Education not found' });
        
        let formattedEducation = updatedEducation.toObject();

        for (const key in formattedEducation) {
            if (formattedEducation[key] === 'null') formattedEducation[key] = null;
        }

        // Unbuffer image for response
        const education = {
            ...formattedEducation,
            image: buffer
                ? `data:${updatedEducation.image.contentType};base64,${updatedEducation.image.data.toString('base64')}`
                : updatedEducation.image.toObject() ? req.body.image : null
        };

        res.status(200).json(education);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteEducation = async (req, res) => {
    try {
        const deletedEducation = await EducationModel.findByIdAndDelete(req.params.id);
        
        if (!deletedEducation) return res.status(404).json({ message: 'Education not found' });
        
        res.status(200).json({ message: 'Education deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAllEducation = async (req, res) => {
    try {
        await EducationModel.deleteMany({});
        res.status(200).json({ message: 'All education records deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default { getAllEducation, getEducation, createEducation, updateEducation, deleteEducation, deleteAllEducation };