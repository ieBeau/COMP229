import express from 'express';
import userController from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/api/users/', userController.createUser);

router.get('/api/users/', authMiddleware.requireSignin, userController.getAllUsers);
router.get('/api/users/:id', authMiddleware.requireSignin, userController.getUser);
router.put('/api/users/:id', authMiddleware.requireSignin, authMiddleware.hasAuthorization, userController.updateUser);
router.delete('/api/users/:id', authMiddleware.requireSignin, authMiddleware.hasAuthorization, userController.deleteUser);
router.delete('/api/users/', authMiddleware.requireSignin, authMiddleware.hasAuthorization, userController.deleteAllUsers);

export default router;