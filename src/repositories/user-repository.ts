import { supabase } from "../data/supabase";
import { UserModel } from "../models/user-model";

export const getUsers = async (): Promise<UserModel[] | undefined> => {
    try {
        const { data, error } = await supabase
            .from("users")
            .select("id, name, email, categories"); 

        if (error) {
            console.error(`[Supabase Error]: ${error.message} (Code: ${error.code})`);
            return undefined; 
        }
        return (data as UserModel[]) ?? [];

    } catch (err) {
        console.error(`[Critical Error]: Falha inesperada ao acessar a tabela de usuários.`);
        return undefined;
    }
};

export const getUserById = async (id: string): Promise<UserModel | undefined> => {
    try {
        const { data, error } = await supabase
            .from("users")
            .select("id, name, email, categories")
            .eq("id", id.trim()) 
            .single();   

        if (error) {
            if (error.code === 'PGRST116') {
                return undefined; 
            }

            console.error(`[Database Error]: ${error.message} (Code: ${error.code})`);
            throw error; 
        }

        return data as UserModel;

    } catch (err: any) {
        console.error(`[Critical Error]: Falha ao buscar usuário pelo ID ${id}`);
        return undefined; 
    }
};

export const createUser = async (user: UserModel): Promise<UserModel | null> => {
    const { id, ...userData } = user;

    try {
        const { data, error } = await supabase
            .from("users")
            .insert([userData])
            .select("id, name, email, categories")
            .single();

        if (error) {
            if (error.code === '23505') {
                console.warn(`[Conflict]: O e-mail ${userData.email} já está em uso.`);
            } else {
                console.error(`[Supabase Error]: ${error.message} (Code: ${error.code})`);
            }
            return null;
        }

        return data as UserModel;

    } catch (err) {
        console.error("[Critical Error]: Falha inesperada ao criar usuário.");
        return null;
    }
};

export const removeUser = async (id: string): Promise<boolean> => {
    try {
        const { error, count } = await supabase
            .from("users")
            .delete({ count: 'planned' }) 
            .eq("id", id.trim());         

        if (error) {
            console.error(`[Database Error]: ${error.message}`);
            return false;
        }

        if (count === 0) {
            console.warn(`[Delete Warning]: Nenhuma linha removida para o ID ${id}`);
            return false;
        }

        return true;

    } catch (err) {
        console.error("[Critical Error]: Falha inesperada ao remover usuário.");
        return false;
    }
};

export const updateUser = async (id: string, name: string, email: string): Promise<UserModel | null> => {
    try {
        const { data, error } = await supabase
            .from("users")
            .update({ name, email })
            .eq("id", id.trim()) 
            .select("id, name, email, categories") 
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                console.warn(`[Update Warning]: Usuário ID ${id} não localizado.`);
                return null;
            }

            console.error(`[Database Error]: ${error.message} (Code: ${error.code})`);
            return null;
        }

        return data as UserModel;

    } catch (err) {
        console.error("[Critical Error]: Falha inesperada durante a atualização do usuário.");
        return null;
    }
};