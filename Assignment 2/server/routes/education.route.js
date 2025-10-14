import express from 'express';
import educationController from '../controllers/education.controller.js';

const router = express.Router();

router.get('/api/education/', educationController.getAllEducation);
router.get('/api/education/:id', educationController.getEducation);
router.post('/api/education/', educationController.createEducation);
router.put('/api/education/:id', educationController.updateEducation);
router.delete('/api/education/:id', educationController.deleteEducation);
router.delete('/api/education/', educationController.deleteAllEducation);

export default router;