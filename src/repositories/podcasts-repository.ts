import { supabase } from "../data/supabase";
import { PodcastModel } from "../models/podcast-model";
import { writeData } from "../utils/escreve-dados-json";
import { readData } from "../utils/ler-dados-json";

export const findAllPodcasts = async (): Promise<PodcastModel[]> => {
    const {data, error} = await supabase
    .from("podcasts")
    .select("id, podcastName, episode, videoId, category");

    if(error) {
        console.log(`Erro ao listar: ${error.message}`);
        return [];
    }

    return (data as PodcastModel[]) || [];
}

export const findPodcastById = async (id: string): Promise<PodcastModel | undefined> => {
    const {data, error} = await supabase
    .from("podcasts")
    .select("*")
    .eq("id", id)
    .single();

    if (error) {
        console.error(`Erro ao buscar podcast por ID: ${error.message}`);
        return undefined;
    }

    return data as PodcastModel;
}

export const addPodcastByVideoId = async (podcast: PodcastModel): Promise<PodcastModel | null> => {
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
        console.error("Erro real do Supabase:", error.message);
        return null;
    }

    return data as PodcastModel;
};

export const deleteOnePodcast = async (id: string): Promise<boolean> => {
    console.log("Tentando deletar o ID:", id); // Confira se o ID aparece limpo no terminal

    const { error, count } = await supabase
        .from("podcasts")
        .delete()
        .eq("id", id.trim());

    if (error) {
        console.error("Erro no Supabase:", error.message);
        return false;
    }

    return true;
};

export const findAndModifyPodcast = async (id: string, category: string[]): Promise<PodcastModel | null> => {
    const { data, error } = await supabase
        .from("podcasts")
        .update({ category: category }) 
        .eq("id", id)                  
        .select()                      
        .single();                    

    if (error) {
        console.error(`Erro ao atualizar no Supabase: ${error.message}`);
        return null;
    }

    return data as PodcastModel;
}