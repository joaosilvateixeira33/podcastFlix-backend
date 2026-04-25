import { UserModel } from "../models/user-model";
import * as userRepository from "../repositories/user-repository";
import * as HttpResponse from "../utils/http-helper";

export const listUsersService = async () => {
    const data = await userRepository.getUsers();
    
    let response = null;
    
    if(data) {
        response = await HttpResponse.ok(data);
    } else {
        response = await HttpResponse.noContent();
    }
        
    return response;
};

export const getUserService = async(id: string) => {
    const data = await userRepository.getUserById(id);
    let response = null;
    
    if(data) {
        response = await HttpResponse.ok(data);
    } else {
        response = await HttpResponse.noContent();
    }
        
    return response;
}

export const createUserService = async(userData: UserModel) => {
    
    if (!userData.email || !userData.password) {
        return await HttpResponse.badRequest("Os campos email ou usuario devem ser preenchidos.");
    }

    
    const newUser: UserModel = {
        ...userData,
        id: crypto.randomUUID(),
        categories: userData.categories ?? []
    };
    
    const data = await userRepository.createUser(newUser);

    return await HttpResponse.ok(data);
}

export const deleteUserService = async(id: string) => {
    let response = null;
    await userRepository.removeUser(id);

    response = await HttpResponse.ok({ message: "deleted sucefully"});
    return response;
}

export const updateUserService = async(id: string, name: string, email: string) => {
    let response = null;
    const data = await userRepository.updateUser(id, name, email);

    response = await HttpResponse.ok(data);
    return response;
}