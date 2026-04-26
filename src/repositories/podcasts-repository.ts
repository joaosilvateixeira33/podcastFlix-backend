import { supabase } from "../data/supabase";
import { PodcastModel } from "../models/podcast-model";

export const findAllPodcasts = async (): Promise<PodcastModel[]> => {
    try {
        const { data, error } = await supabase
            .from("podcasts")
            .select("id, podcastName, episode, videoId, category");

        if (error) {
            console.error(`[Supabase Error]: ${error.message} - Code: ${error.code}`);
            throw new Error(`Falha na consulta ao banco de dados: ${error.message}`);
        }

        return (data as PodcastModel[]) ?? [];

    } catch (err: any) {
        console.error(`[Critical Error]: Ocorreu um erro inesperado ao buscar podcasts.`);
        
        return [];
    }
}

export const findPodcastById = async (id: string): Promise<PodcastModel | undefined> => {
    try {
        const { data, error } = await supabase
            .from("podcasts")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                console.error(`[Database Error]: ${error.message} (Code: ${error.code})`);
                throw error;
            }
        }

        return data as PodcastModel;

    } catch (err: any) {
        console.error(`[Critical Error]: Falha ao processar busca por ID ${id}`);
        return undefined;
    }
}

export const addPodcastByVideoId = async (podcast: PodcastModel): Promise<PodcastModel | null> => {
    try {
        const { data, error } = await supabase
            .from("podcasts")
            .insert([{
                podcastName: podcast.podcastName,
                episode: podcast.episode,
                videoId: podcast.videoId,
                category: podcast.category
            }])
            .select()
            .single();

        if (error) {
            if (error.code === '23505') {
                console.warn(`[Conflict]: O vídeo ${podcast.videoId} já está cadastrado.`);
            } else {
                console.error(`[Supabase Error]: ${error.message}`);
            }
            return null;
        }

        return data as PodcastModel;

    } catch (err) {
        console.error("[Critical Error]: Falha inesperada ao inserir podcast.");
        return null;
    }
};

export const deleteOnePodcast = async (id: string): Promise<boolean> => {
    try {
        const { error, count } = await supabase
            .from("podcasts")
            .delete({ count: 'planned' }) 
            .eq("id", id.trim());

        if (error) {
            console.error(`[Database Error]: ${error.message}`);
            return false;
        }

        if (count === 0) {
            console.warn(`[Warning]: Tentativa de deletar ID inexistente: ${id}`);
            return false; 
        }

        return true;

    } catch (err) {
        console.error("[Critical Error]: Falha inesperada ao processar deleção.");
        return false;
    }
};

export const findAndModifyPodcast = async (id: string, category: string[]): Promise<PodcastModel | null> => {
    try {
        const { data, error } = await supabase
            .from("podcasts")
            .update({ category: category }) 
            .eq("id", id.trim())               
            .select()                      
            .single();                    

        if (error) {
            if (error.code === 'PGRST116') {
                console.warn(`[Update Warning]: Podcast com ID ${id} não encontrado para atualização.`);
                return null;
            }

            console.error(`[Database Error]: ${error.message} (Code: ${error.code})`);
            return null;
        }

        return data as PodcastModel;

    } catch (err) {
        console.error("[Critical Error]: Falha inesperada durante o update.");
        return null;
    }
}