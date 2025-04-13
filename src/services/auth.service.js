import jwt from 'jsonwebtoken';

import { AuthError} from '../errors/TypeError.js';
import { Usuario } from '../model/Usuario.model.js';
import { formateUserData } from '../utils/formateUserCreate.js';
import { comparePassword, hashPassword } from '../utils/hashPassword.js';

import { envs } from '../config/envs.config.js';

const { secretKey, jwtExpiration  } = envs.auth;

export const registerService = async({
    nombre, 
    apellido, 
    correo, 
    telefono, 
    fecha_nacimiento, 
    password, 
    isAdmin = false
}) => {
    try {
        const existingUser = await Usuario.findOne({ correo });
        if (existingUser) {
            throw new AuthError('El correo ya está registrado', 409);
        }

        const hashedPassword = await hashPassword(password);

        const userData = formateUserData({
            nombre,
            apellido,
            correo,
            telefono,
            fecha_nacimiento,
            isAdmin,
            password: hashedPassword
        });

        const user = await Usuario.create(userData);

        return user;
        
    } catch (error) {
        throw new Error(`Error al registrar usuario: ${error.message}`);
        
    }
};

export const loginService = async({ correo, password }) => {
    try {
        const user = await Usuario.findOne({ correo });

        const passwordMatch = await comparePassword(password, user.password);

        if (!user || !passwordMatch){
            throw new AuthError('Credenciales incorrectas', 401);
        }

        const token = jwt.sign({
            uid: user._id,
            nombre: user.nombre,
            correo: user.correo,
            isAdmin: user.isAdmin,

        }, secretKey, {
            expiresIn: jwtExpiration
        });

        return [ user, token ];
        
    } catch (error) {
        throw new AuthError('Error al intentar iniciar sesión', 500, error);
    }

};

export const getUserById = async (id) => {
    const user = await Usuario.findById(id).select('-password');
    if (!user) {
        throw new AuthError('Usuario no encontrado', 404);
    }
    return user;
};


export const updateUserService = async (uid, dataToUpdate) => {
    try {
        const user = await Usuario.findById(uid);

        if (!user) {
            throw new AuthError('Usuario no encontrado', 404);
        }

        const {
            nombre,
            apellido,
            correo,
            telefono,
            fecha_nacimiento,
            password
        } = dataToUpdate;

        
        if (correo && correo !== user.correo) {
            const existingUser = await Usuario.findOne({ correo });
            if (existingUser) {
                throw new AuthError('El correo ya está registrado por otro usuario', 409);
            }
            user.correo = correo;
        }

        
        if (nombre) user.nombre = nombre;
        if (apellido) user.apellido = apellido;
        if (telefono) user.telefono = telefono;
        if (fecha_nacimiento) user.fecha_nacimiento = fecha_nacimiento;

        if (password) {
            const hashedPassword = await hashPassword(password);
            user.password = hashedPassword;
        }

        await user.save();

        const updatedUser = user.toObject();
        delete updatedUser.password;

        return updatedUser;

    } catch (error) {
        throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
};


