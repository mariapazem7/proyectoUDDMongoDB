
import { createLibrosService, deleteLibrosByIdService, getAllLibrosService, getLibrosbyIdService, updateLibroByIdService, getDeleteAllLibrosService, getDeleteLibrosbyIdService } from '../services/libros.services.js';

export const getAllLibros = async(req, res, next) => {
    try {
        const libros = await getAllLibrosService();

        res.status(200).json({
            menssage:'Libros encontrados con exito',
            statusCode: 200,
            data: libros
        });
        
    } catch (error) {
        next(error);

    }

};

export const getLibrosbyId = async(req, res, next) => {
    try {
        const {id} = req.params;
        const libros = await getLibrosbyIdService(id);

        res.status(200).json({
            menssage:`Libro con el id: ${id} encontrado con exito`,
            statusCode: 200,
            data: libros
        });
        
    } catch (error) {
        next(error);
    }
};

export const createLibros = async(req, res, next) => {
    try {
        const dataLibro = req.body;
        const libro = await createLibrosService(dataLibro);

        res.status(201).json({
            menssage:'Libro creado con éxito',
            statusCode: 200,
            data: libro
        });

        
    } catch (error) {
        next(error);
    }
};

export const updateLibroById = async(req, res, next) => {
    try {
        const {id} = req.params;
        const dataLibro = req.body;

        const [libroSinActualizar, librosActualizados] = await updateLibroByIdService(id, dataLibro);
        const custom = {
            oldData: libroSinActualizar
        };

        res.status(201).json({
            menssage:`Libro con el id: ${id} actualizado con éxito`,
            statusCode: 200,
            data: librosActualizados,
            custom
        });
        
    } catch (error) {
        next(error);
    }
};

export const deleteLibrosById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const libro = await deleteLibrosByIdService(id);

        res.status(200).json({
            menssage:`Libro con el id: ${id} eliminado con exito`,
            statusCode: 200,
            data: libro
        });
        
    } catch (error) {
        next(error);
        
    }

};

// Administrador

export const getDeleteAllLibros = async(req, res, next) => {
    try {
        const libros = await getDeleteAllLibrosService();

        res.status(200).json({
            menssage:'Libros encontrados con exito',
            statusCode: 200,
            data: libros
        });
        
    } catch (error) {
        next(error);

    }

};

export const getDeleteLibrosbyId = async(req, res, next) => {
    try {
        const {id} = req.params;
        const libros = await getDeleteLibrosbyIdService(id);

        res.status(200).json({
            menssage:`Libro con el id: ${id} encontrado con exito`,
            statusCode: 200,
            data: libros
        });
        
    } catch (error) {
        next(error);
    }
};


