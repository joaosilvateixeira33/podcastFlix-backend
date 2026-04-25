import { PodcastModel } from "../models/podcast-model";
import fs from "fs/promises";

// Definindo o caminho do arquivo como uma constante para evitar erros de digitação
const FILE_PATH = "./src/data/podcasts.json";

const database: PodcastModel[] = [
];

const syncFile = async () => {
    try {
        await fs.writeFile(FILE_PATH, JSON.stringify(database, null, 2), "utf-8");
    } catch (error) {
        console.error("Erro ao sincronizar arquivo:", error);
    }
};

export const findAllPodcasts = async (): Promise<PodcastModel[]> => {
    // Se quiser que o arquivo seja sempre a fonte da verdade:
    const data = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(data);
}

export const findPodcastById = async (id: string): Promise<PodcastModel | undefined> => {
    return database.find(podcast => podcast.id === id);
}

export const addPodcastByVideoId = async (podcast: PodcastModel): Promise<PodcastModel> => {
    database.push(podcast);
    await syncFile(); 
    return podcast;
};

export const deleteOnePodcast = async (id: string): Promise<boolean> => {
    const index = database.findIndex(podcast => podcast.id === id);

    if (index !== -1) {
        database.splice(index, 1);
        await syncFile(); 
        return true;
    }
    return false;
}

export const findAndModifyPodcast = async (id: string, category: string[]) => {
    const podcastindex = database.findIndex(podcast => podcast.id === id);

    if (podcastindex !== -1) {
        database[podcastindex].category = category;
        await syncFile(); 
    }

    return database[podcastindex];
}