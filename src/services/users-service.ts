import { UserModel } from "../models/user-model";
import * as userRepository from "../repositories/user-repository";
import * as HttpResponse from "../utils/http-helper";

export const listUsersService = async () => {
    const data = await userRepository.getUsers();

    if (data === undefined) {
        return await HttpResponse.serverError("Erro ao conectar com o serviço de usuários.");
    }

    if (data.length > 0) {
        return await HttpResponse.ok(data);
    } 
    
    return await HttpResponse.noContent();
};

export const getUserService = async (id: string) => {
    const data = await userRepository.getUserById(id);

    if (data) {
        return await HttpResponse.ok(data);
    }

    return await HttpResponse.notFound(`Usuário com ID ${id} não encontrado.`);
};

export const createUserService = async (userData: UserModel) => {
    if (!userData.email || !userData.password) {
        return await HttpResponse.badRequest("E-mail e senha são obrigatórios.");
    }

    const userToCreate = {
        name: userData.name,
        email: userData.email,
        password: userData.password, 
        categories: userData.categories ?? []
    };

    const data = await userRepository.createUser(userToCreate as UserModel);

    if (data) {
        return await HttpResponse.created(data); 
    }

    return await HttpResponse.badRequest("Erro ao criar usuário. Verifique se o e-mail já existe.");
}

export const deleteUserService = async (id: string) => {
    const isDeleted = await userRepository.removeUser(id);

    if (!isDeleted) {
        return await HttpResponse.notFound(`Não foi possível deletar: Usuário com ID ${id} não encontrado.`);
    }

    return await HttpResponse.ok({ message: "deleted successfully" });
};

export const updateUserService = async (id: string, name: string, email: string) => {
    const data = await userRepository.updateUser(id, name, email);

    if (data) {
        return await HttpResponse.ok(data);
    }

    return await HttpResponse.notFound(`Não foi possível atualizar: Usuário com ID ${id} não encontrado.`);
};