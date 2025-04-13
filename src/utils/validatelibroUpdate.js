import { ValidationError } from '../errors/TypeError.js';

export const validateLibroUpdate = (data) => {
    const rules = {
        titulo: v => typeof v === 'string' && v.trim().length >= 3,
        autor: v => typeof v === 'string' && v.trim().length >= 3,
        genero: v => typeof v === 'string' && v.trim().length > 0,
        precio: v => typeof v === 'number' && v >= 0,
        stock: v => Number.isInteger(v) && v >= 0,
        ano_publicacion: v => Number.isInteger(v) && v >= 0
    };
  
    const errors = Object.entries(data).flatMap(([key, value]) => {
        if (!rules[key]) return [`Campo no permitido: '${key}'`];
        if (!rules[key](value)) return [`Campo inválido: '${key}'`];
        return [];
    });
  
    if (errors.length) {
        throw new ValidationError('Datos inválidos para actualización de libro', errors.join(', '));
    }
};