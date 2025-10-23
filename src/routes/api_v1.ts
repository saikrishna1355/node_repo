import { Router } from 'express';
import * as authService from '../services/authService';
import * as userService from '../services/userService';
import authenticateJWT from '../middlewares/authMiddleware';

const router = Router();

// Public routes
router.post('/login', authService.login);

// Protected routes
router.get('/users', authenticateJWT, userService.getAllUsers);
router.post('/logout', authenticateJWT, authService.logout);

export default router;

