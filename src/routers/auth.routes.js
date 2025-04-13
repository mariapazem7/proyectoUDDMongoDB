import { Router } from 'express';
import { login, register, updateUserProfile, verifySession } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/session', authMiddleware, verifySession);
router.put('/profile', authMiddleware, updateUserProfile);

export default router;