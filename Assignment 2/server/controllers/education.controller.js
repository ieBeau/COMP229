import EducationModel from "../models/education.model.js";

const getAllEducation = async (req, res) => {
    try {
        const education = await EducationModel.find();
        res.status(200).json(education);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEducation = async (req, res) => {
    try {
        const education = await EducationModel.findById(req.params.id);
        if (!education) {
            return res.status(404).json({ message: 'Education not found' });
        }
        res.status(200).json(education);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createEducation = async (req, res) => {
    try {
        const newEducation = new EducationModel(req.body);
        await newEducation.save();
        res.status(201).json(newEducation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateEducation = async (req, res) => {
    try {
        const updatedEducation = await EducationModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEducation) {
            return res.status(404).json({ message: 'Education not found' });
        }
        res.status(200).json(updatedEducation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteEducation = async (req, res) => {
    try {
        const deletedEducation = await EducationModel.findByIdAndDelete(req.params.id);
        if (!deletedEducation) {
            return res.status(404).json({ message: 'Education not found' });
        }
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