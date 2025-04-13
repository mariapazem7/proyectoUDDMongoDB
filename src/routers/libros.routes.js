import { Router } from 'express';
import { createLibros, deleteLibrosById, getDeleteAllLibros, getAllLibros, getDeleteLibrosbyId, getLibrosbyId, updateLibroById } from '../controllers/libros.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { verifyAdmin } from '../middlewares/verifyAdmin.middleware.js';


const router = Router();

router.get('/', getAllLibros);
router.get('/:id', getLibrosbyId);
router.post('/', authMiddleware, createLibros);
router.put('/:id', authMiddleware, updateLibroById);
router.delete('/:id', authMiddleware, verifyAdmin, deleteLibrosById);


// Administrador

router.get('/admin/erased', authMiddleware, verifyAdmin, getDeleteAllLibros);
router.get('/admin/erased/:id', authMiddleware, verifyAdmin, getDeleteLibrosbyId);

export default router;