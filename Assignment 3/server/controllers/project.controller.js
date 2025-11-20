import { bufferImage } from '../utils/bufferImage.js';

import ProjectModel from '../models/project.model.js'

const getAllProjects = async (req, res) => {
    try {
        const projects = await ProjectModel.find();

        const formatted = projects.map(project => {
            let obj = project.toObject();

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

const getProject = async (req, res) => {
    try {
        const project = await ProjectModel.findById(req.params.id);
        
        if (!project) return res.status(404).json({ message: 'Project not found' });
        
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProject = async (req, res) => {
    try {
        let buffer;
        if (req.file) buffer = await bufferImage(req.file); 

        // Create buffer to store image
        const newProject = new ProjectModel({
            ...req.body,
            descriptions: req.body.descriptions.split("\n,").map(desc => desc.trim()),
            image: buffer ? { data: buffer, contentType: req.file.mimetype } : null
        });

        await newProject.save();
        
        let formattedProject = newProject.toObject();

        for (const key in formattedProject) {
            if (formattedProject[key] === 'null') formattedProject[key] = null;
        }

        // Unbuffer image for response
        const project = {
            ...formattedProject,
            image: buffer
                ? `data:${newProject.image.contentType};base64,${newProject.image.data.toString('base64')}`
                : null
        };

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProject = async (req, res) => {
    try {
        let buffer;

        if (req.file) buffer = await bufferImage(req.file);

        const updatedProject = await ProjectModel.findByIdAndUpdate(
            req.params.id, 
            {
                ...req.body,
                descriptions: req.body.descriptions.split("\n,").map(desc => desc.trim()),
                image: req.file ? { data: req.file.buffer, contentType: req.file.mimetype } : undefined,
            }, 
            { new: true }
        );
        
        if (!updatedProject) return res.status(404).json({ message: 'Project not found' });

        let formattedProject = updatedProject.toObject();

        for (const key in formattedProject) {
            if (formattedProject[key] === 'null') formattedProject[key] = null;
        }

        // Unbuffer image for response
        const project = {
            ...formattedProject,
            image: buffer
                ? `data:${updatedProject.image.contentType};base64,${updatedProject.image.data.toString('base64')}`
                : updatedProject.image.toObject() ? req.body.image : null
        };
        
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        const deletedProject = await ProjectModel.findByIdAndDelete(req.params.id);
        
        if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
        
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAllProjects = async (req, res) => {
    try {
        await ProjectModel.deleteMany({});
        res.status(200).json({ message: 'All projects deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default { getAllProjects, getProject, createProject, updateProject, deleteProject, deleteAllProjects };