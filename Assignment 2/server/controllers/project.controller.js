import ProjectModel from '../models/project.model.js'

const getAllProjects = async (req, res) => {
    try {
        const projects = await ProjectModel.find();
        res.status(200).json(projects);
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
        const newProject = new ProjectModel(req.body);
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProject = async (req, res) => {
    try {
        const updatedProject = await ProjectModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
        
        res.status(200).json(updatedProject);
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