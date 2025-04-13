import { registerService, loginService, getUserById, updateUserService } from '../services/auth.service.js';

export const register = async(req, res, next) =>{
    try {
        const userData = req.body;
        const user = await registerService(userData);

        res.status(201).json({
            menssage:'Usuario creado con éxito',
            statusCode: 201,
            data: user
    
        });
    
    } catch (error) {
        next(error);
    
    }
};


export const login = async(req, res, next) => {
    try {
        const [ user, token ] = await loginService(req.body);
        const custom = {
            token
        };

        res.status(201).json({
            menssage:'Usuario logeado con éxito',
            statusCode: 201,
            data: user,
            custom: custom
    
        });
    
    } catch (error) {
        next(error);
    }
};

export const verifySession = async (req, res, next) => {
    try {
        const user = await getUserById(req.user.uid);

        res.status(200).json({
            message: 'Sesión activa',
            statusCode:200,
            data: user
        });
    } catch (error) {
        next(error);
    }
};


export const updateUserProfile = async (req, res, next) => {
    try {
        const uid = req.user.uid;
        const updatedUser = await updateUserService(uid, req.body);

        res.status(200).json({
            message: 'Perfil actualizado correctamente',
            statusCode:200,
            data: updatedUser
        });
    } catch (error) {
        next(error);
    }
};