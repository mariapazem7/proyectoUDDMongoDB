import { CustomError } from '../errors/CustomError.js';
import { InternalServerError } from '../errors/TypeError.js';

export const errorHandler = (err, req, res, _next) => {

    if(!(err instanceof CustomError)) {
        err = new InternalServerError(
            err.message || 'Error inesperado!',
            err.statusCode || 500,
            err.details ||'Ups! tenemos un error imprevisto, contacta al soporte'
        );

    }

    const errorResponse = {
        status: 'ERROR',
        message: err.message,
        statusCode: err.statusCode,
        details: err.details
    };

    console.error(
        `ERROR: ${errorResponse.message} ----- Deatils: ${errorResponse.details} ----- Status: ${errorResponse.statusCode}`
    );

    res.status(err.statusCode).json(errorResponse);
    
};