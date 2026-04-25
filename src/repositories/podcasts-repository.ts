import { PodcastModel } from "../models/podcast-model";
import { writeData } from "../utils/escreve-dados-json";
import { readData } from "../utils/ler-dados-json";

export const findAllPodcasts = async (): Promise<PodcastModel[]> => {
    return await readData();
}

export const findPodcastById = async (id: string): Promise<PodcastModel | undefined> => {
    const podcasts = await readData(); 
    return podcasts.find(podcast => podcast.id === id);
}

export const addPodcastByVideoId = async (podcast: PodcastModel): Promise<PodcastModel> => {
    const podcasts = await readData(); 
    podcasts.push(podcast);            
    await writeData(podcasts);        
    
    return podcast;
};

export const deleteOnePodcast = async (id: string): Promise<boolean> => {
    const podcasts = await readData(); 
    const index = podcasts.findIndex(podcast => podcast.id === id);

    if (index !== -1) {
        podcasts.splice(index, 1);    
        await writeData(podcasts);     
        return true;
    }
    return false;
}

export const findAndModifyPodcast = async (id: string, category: string[]) => {
    const podcasts = await readData();
    const podcastIndex = podcasts.findIndex(podcast => podcast.id === id);

    if (podcastIndex !== -1) {
        podcasts[podcastIndex].category = category; 
        await writeData(podcasts);                  
        
        return podcasts[podcastIndex];
    }

    return null;
}