import { DataBaseError } from '../../errors/typeError.js';
import { Libros } from '../../model/Libros.models.js';

export const updateDocsDB = async() => {
    try {
        await Libros.updateMany(
            { isActive: { $exists: false} }, 
            { $set: { isActive: true } }
        );    
        
    } catch (error) {
        throw new DataBaseError('No pudimos actualizar los documentos en la base de datos', 500, error);

    }
};