import { ValidationError } from '../errors/TypeError.js';

export const validateLibroCreate = (data) => {
    const rules = {
        titulo: v => typeof v === 'string' && v.trim().length >= 3,
        autor: v => typeof v === 'string' && v.trim().length >= 3,
        genero: v => typeof v === 'string' && v.trim().length > 0,
        precio: v => typeof v === 'number' && v >= 0,
        stock: v => Number.isInteger(v) && v >= 0,
        ano_publicacion: v => Number.isInteger(v) && v >= 0
    };
  
    const requiredFields = Object.keys(rules);
    const errors = [];
  
    
    requiredFields.forEach(field => {
        if (!(field in data)) {
            errors.push(`Falta el campo obligatorio: '${field}'`);
        }
    });
  
    Object.entries(data).forEach(([key, value]) => {
        if (!rules[key]) {
            errors.push(`Campo no permitido: '${key}'`);
        } else if (!rules[key](value)) {
            errors.push(`Campo inválido: '${key}'`);
        }
    });
  
    if (errors.length) {
        throw new ValidationError('Datos inválidos al crear libro', errors.join(', '));
    }
};