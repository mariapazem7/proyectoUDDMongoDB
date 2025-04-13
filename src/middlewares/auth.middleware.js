import jwt from 'jsonwebtoken';
import { AuthError } from '../errors/TypeError.js';
import { envs } from '../config/envs.config.js';

const { secretKey } = envs.auth; 

export const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.startsWith('Bearer ') 
            ? authorization.slice(7) 
            : null;

        if(!token) throw new AuthError('Token no proporcionado', 401);

        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;

        next();

    } catch (error) {
        throw new AuthError('Token invalido', 500, error);
    }
};