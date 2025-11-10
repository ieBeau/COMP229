import express from 'express';
import projectController from '../controllers/project.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/api/projects/', authMiddleware.requireSignin, projectController.getAllProjects); 
router.get('/api/projects/:id', authMiddleware.requireSignin, projectController.getProject);
router.post('/api/projects/', authMiddleware.requireSignin, projectController.createProject);
router.put('/api/projects/:id', authMiddleware.requireSignin, projectController.updateProject);
router.delete('/api/projects/:id', authMiddleware.requireSignin, projectController.deleteProject);
router.delete('/api/projects/', authMiddleware.requireSignin, authMiddleware.hasAuthorization, projectController.deleteAllProjects);

export default router;