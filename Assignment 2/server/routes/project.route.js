import express from 'express';
import projectController from '../controllers/project.controller.js';

const router = express.Router();

router.get('/', projectController.getAllProjects); 
router.get('/:id', projectController.getProject);
router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);
router.delete('/', projectController.deleteAllProject);

export default router;