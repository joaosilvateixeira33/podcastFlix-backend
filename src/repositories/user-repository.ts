import { UserModel } from "../models/user-model";
import { writeData2 } from "../utils/escreve-dados-json";
import { readData2 } from "../utils/ler-dados-json";

export const getUsers = async (): Promise<UserModel[] | undefined> => {
    return await readData2();
}

export const getUserById = async(id: string): Promise<UserModel | undefined>  => {
    const users = await readData2();
    return users.find(user => user.id === id);
}

export const createUser = async(user: UserModel): Promise<UserModel> => {
    const users = await readData2();
    users.push(user);
    await writeData2(users);

    return user;
}

export const removeUser = async(id: string):Promise<boolean> => {
    const users = await readData2(); 
    const index = users.findIndex(user => user.id === id);
    
    if (index !== -1) {
        users.splice(index, 1);    
        await writeData2(users);     
        return true;
    }
    return false;
}

export const updateUser = async (id: string, name: string, email: string) => {
    const users = await readData2();
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex !== -1) {
        users[userIndex].name = name; 
        users[userIndex].email = email; 
        await writeData2(users);                  
        
        return users[userIndex];
    }

    return null;
}