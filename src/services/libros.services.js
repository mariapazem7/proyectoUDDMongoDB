
import { LibrosError, NotFoundError } from '../errors/TypeError.js';
import { Libros } from '../model/Libros.models.js';
import { validateLibroCreate } from '../utils/validateLibroCreate.js';
import { validateLibroUpdate } from '../utils/validatelibroUpdate.js';

export const getAllLibrosService = async () => {
    try {
        const libros = await Libros.find({isActive: true}); 

        if(libros.length === 0 || libros === null) {
            throw new NotFoundError(
                'No pudimos encontrar los libros',
                'No pudimos encontrar libros en la base de datos en la coleccion de libros'
            );
        }
        return libros;

    } catch (error) {
        throw new LibrosError('Error al encontrar todos los libros', 500, error);
        
    }

};

export const getLibrosbyIdService = async (id) => {
    try {
        const libro = await Libros.findById({ _id: id, isActive: true });

        if(!libro || !libro.isActive) {
            throw new NotFoundError(
                `No pudimos encontrar el libro con le id: ${id}`,
                `No pudimos encontrar el libro con le id: ${id} en la base de datos en la coleccion de libros`
            );
        }

        return libro;

    } catch (error) {
        throw new LibrosError('Error al encontrar el libro por id', 500, error);
        
    }
};

export const createLibrosService = async (dataLibro) => {
    try {
        validateLibroCreate(dataLibro);
        const libro =  await Libros.create(dataLibro);
    
        return libro;
    } catch (error) {
        throw new LibrosError('Error al intentar crear una libro', 500, error);
    }

};

export const updateLibroByIdService = async (id, dataLibro) => {
    try {
        validateLibroUpdate(dataLibro);
        
        const libroSinActualizar = await Libros.findOneAndUpdate({_id:id, isActive: true}, dataLibro);

        const librosActualizados = await Libros.findById(id);

        if(!libroSinActualizar) {
            throw new NotFoundError(
                `No pudimos encontrar el libro con le id: ${id}`,
                `No pudimos encontrar el libro con le id: ${id} en la base de datos en la coleccion de libros`
            ); 
        }

        return [libroSinActualizar, librosActualizados];
        
    } catch (error) {
        throw new LibrosError('Error al acutualizar los datos del libro por id', 500, error);
    }

};

export const deleteLibrosByIdService = async (id) => {
    try { 
        const libro = await Libros.findByIdAndUpdate(id, {isActive: false});

        if(!libro) {
            throw new NotFoundError(
                `No pudimos encontrar el libro con le id: ${id}`,
                `No pudimos encontrar el libro con le id: ${id} en la base de datos en la coleccion de libros`
            );
        }

        return libro;

    } catch (error) {
        throw new LibrosError('Error al acutualizar los datos del libro por id', 500, error);
    }
};

// Administrador 

export const getDeleteAllLibrosService = async () => {
    try {
        const libros = await Libros.find({isActive: false}); 

        if(libros.length === 0 || libros === null) {
            throw new NotFoundError(
                'No pudimos encontrar los libros',
                'No pudimos encontrar libros en la base de datos en la coleccion de libros'
            );
        }
        return libros;

    } catch (error) {
        throw new LibrosError('Error al encontrar todos los libros', 500, error);
        
    }

};

export const getDeleteLibrosbyIdService = async (id) => {
    try {
        const libro = await Libros.findById({ _id: id, isActive: false });

        if(!libro) {
            throw new NotFoundError(
                `No pudimos encontrar el libro con le id: ${id}`,
                `No pudimos encontrar el libro con le id: ${id} en la base de datos en la coleccion de libros`
            );
        }
        
        return libro;

    } catch (error) {
        throw new LibrosError('Error al encontrar el libro por id', 500, error);
        
    }
};