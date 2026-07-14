import express from 'express';
import { register, login, logout, getCurrentUser } from '../controllers/authController.js';
import { authMiddleware, validateRequest } from '../middlewares/auth.js';
import { registerSchema, loginSchema } from '../validators/auth.js';

const router = express.Router();

// Public routes
router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);

// Protected routes
router.get('/me', authMiddleware, getCurrentUser);
router.post('/logout', authMiddleware, logout);

export default router;
