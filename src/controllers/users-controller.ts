import { Request, Response } from 'express';
import * as userService from '../services/users-service';

export const listAllUsers = async(req: Request, res:Response) => {
    const httpResponse = await userService.listUsersService();
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const getById = async(req: Request, res:Response) => {
    const id = String(req.params.id); 
    const httpResponse = await userService.getUserService(id);
    
    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const createUser = async(req: Request, res:Response) => {
    const body = req.body;
    const httpResponse = await userService.createUserService(body);

    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const deleteUser = async(req: Request, res: Response) => {
    const id = req.params.id as string;
    const httpResponse = await userService.deleteUserService(id);

    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const updateUser = async(req: Request, res: Response) => {
    const id = req.params.id as string;
    const { name, email } = req.body;
    const httpResponse = await userService.updateUserService(id, name, email);

    res.status(httpResponse.statusCode).json(httpResponse.body);
}