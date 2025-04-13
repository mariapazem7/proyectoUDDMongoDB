
import { Router } from 'express';
import libroRouter from './libros.routes.js';
import authRouter from './auth.routes.js';


const router = Router();

router.use('/libros', libroRouter);
router.use('/auth', authRouter);

export default router;