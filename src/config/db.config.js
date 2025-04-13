import mongoose from 'mongoose';
import { envs } from './envs.config.js';
import { DataBaseError } from '../errors/TypeError.js';
import { updateDocsDB } from '../services/db/updateDocs.js';

const { db } = envs;

export const dbConnect = async({updateDocs = false} = {}) => {
    try {
        await mongoose.connect(db.uri);
        console.log('Nos conectamos a MongoDB!');

        if(updateDocs)
            await updateDocsDB();
        console.log('Documentos actualizados con exito');


    } catch (error) {
        throw new DataBaseError('No nos pudimos conectar a la base de datos de Mongo :c', 500, error);
    }

};
