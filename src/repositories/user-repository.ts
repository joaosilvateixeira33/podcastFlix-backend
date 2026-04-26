import { supabase } from "../data/supabase";
import { UserModel } from "../models/user-model";

export const getUsers = async (): Promise<UserModel[] | undefined> => {
    const { data, error } = await supabase
        .from("users")
        .select("id, name, email, categories"); 

    if (error) {
        console.error(`Erro ao buscar usuários: ${error.message}`);
        return undefined;
    }

    return data as UserModel[];
};

export const getUserById = async (id: string): Promise<UserModel | undefined> => {
    const { data, error } = await supabase
        .from("users")
        .select("id, name, email, categories")
        .eq("id", id) 
        .single();   

    if (error) {
        console.error(`Erro ao buscar usuário por ID: ${error.message}`);
        return undefined;
    }

    return data as UserModel;
};

export const createUser = async (user: UserModel): Promise<UserModel | null> => {
    const { id, ...userData } = user;

    const { data, error } = await supabase
        .from("users")
        .insert([userData])
        .select("id, name, email, categories")
        .single();

    if (error) {
        console.error(`Erro ao criar usuário no Supabase: ${error.message}`);
        return null;
    }

    return data as UserModel;
};

export const removeUser = async (id: string): Promise<boolean> => {
    const { error } = await supabase
        .from("users")
        .delete()
        .eq("id", id); 

    if (error) {
        console.error(`Erro ao remover usuário no Supabase: ${error.message}`);
        return false;
    }

    return true;
};

export const updateUser = async (id: string, name: string, email: string): Promise<UserModel | null> => {
    const { data, error } = await supabase
        .from("users")
        .update({ name, email })
        .eq("id", id)             
        .select("id, name, email, categories") 
        .single();                

    if (error) {
        console.error(`Erro ao atualizar usuário: ${error.message}`);
        return null;
    }

    return data as UserModel;
};