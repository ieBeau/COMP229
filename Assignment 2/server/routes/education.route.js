import express from 'express';
import educationController from '../controllers/education.controller.js';

const router = express.Router();

router.get('/', educationController.getAllEducation);
router.get('/:id', educationController.getEducation);
router.post('/', educationController.createEducation);
router.put('/:id', educationController.updateEducation);
router.delete('/:id', educationController.deleteEducation);
router.delete('/', educationController.deleteAllEducation);

export default router;