import express from 'express';
import multer from 'multer';

import serviceController from '../controllers/service.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

// Public routes
router.get('/api/services/', authMiddleware.requireSignin, serviceController.getAllServices); 
router.get('/api/services/:id', authMiddleware.requireSignin, serviceController.getService);

// Protected routes
router.post('/api/services/', upload.single('image'), authMiddleware.requireSignin, authMiddleware.hasAuthorization, serviceController.createService);
router.put('/api/services/:id', upload.single('image'), authMiddleware.requireSignin, authMiddleware.hasAuthorization, serviceController.updateService);
router.delete('/api/services/:id', authMiddleware.requireSignin, authMiddleware.hasAuthorization, serviceController.deleteService);
router.delete('/api/services/', authMiddleware.requireSignin, authMiddleware.hasAuthorization, serviceController.deleteAllServices);

export default router;