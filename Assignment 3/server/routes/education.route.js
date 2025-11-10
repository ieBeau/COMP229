import express from 'express';
import multer from 'multer';

import educationController from '../controllers/education.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get('/api/education/', authMiddleware.requireSignin, educationController.getAllEducation);
router.get('/api/education/:id', authMiddleware.requireSignin, educationController.getEducation);
router.post('/api/education/', upload.single('image'), authMiddleware.requireSignin, authMiddleware.hasAuthorization, educationController.createEducation);
router.put('/api/education/:id', upload.single('image'), authMiddleware.requireSignin, authMiddleware.hasAuthorization, educationController.updateEducation);
router.delete('/api/education/:id', authMiddleware.requireSignin, authMiddleware.hasAuthorization, educationController.deleteEducation);
router.delete('/api/education/', authMiddleware.requireSignin, authMiddleware.hasAuthorization, educationController.deleteAllEducation);

export default router;