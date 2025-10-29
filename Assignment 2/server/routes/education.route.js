import express from 'express';
import educationController from '../controllers/education.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/api/education/', authMiddleware.requireSignin, educationController.getAllEducation);
router.get('/api/education/:id', authMiddleware.requireSignin, educationController.getEducation);
router.post('/api/education/', authMiddleware.requireSignin, educationController.createEducation);
router.put('/api/education/:id', authMiddleware.requireSignin, educationController.updateEducation);
router.delete('/api/education/:id', authMiddleware.requireSignin, educationController.deleteEducation);
router.delete('/api/education/', authMiddleware.requireSignin, authMiddleware.hasAuthorization, educationController.deleteAllEducation);

export default router;