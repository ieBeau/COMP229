import express from 'express';
import projectController from '../controllers/project.controller.js';

const router = express.Router();

router.get('/api/projects/', projectController.getAllProjects); 
router.get('/api/projects/:id', projectController.getProject);
router.post('/api/projects/', projectController.createProject);
router.put('/api/projects/:id', projectController.updateProject);
router.delete('/api/projects/:id', projectController.deleteProject);
router.delete('/api/projects/', projectController.deleteAllProject);

export default router;