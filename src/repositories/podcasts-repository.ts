import { PodcastModel } from "../models/podcast-model";


const database: PodcastModel[] = [
    {
        id: "1",
        podcastName: "flow",
        episode: "ANITTA - Flow #592",
        videoId: "UrinbwR5nrE",
        category: ["musica", "cantor"]
    },
    {
        id: "2",
        podcastName: "inteligencia",
        episode: "SÉRGIO SACANI (SPACE TODAY) - Inteligência Ltda. Podcast #450",
        videoId: "qU04jIt67Jg",
        category: ["ciencia", "tecnologia"]
    },
    {
        id: "3",
        podcastName: "minecast",
        episode: "JAZZGHOST PODCAST - MineCast #19",
        videoId: "CS8cjJbhMJ0",
        category: ["minecraft", "jogos"]
    },
];


export const findAllPodcasts = async ():Promise <PodcastModel[]> => {
    return database;
}

export const findPodcastById = async (id: string):Promise <PodcastModel | undefined> => {
    return database.find(podcast => podcast.id === id);
}

export const addPodcastByVideoId = async (
    podcast: PodcastModel
): Promise<PodcastModel> => {

    database.push(podcast);

    return podcast;
};


export const deleteOnePodcast = async(id: string) => {
    const index = database.findIndex(podcast => podcast.id === id);

    if(index !== -1) {
        database.splice(index, 1);
      
    }
}

export const findAndModifyPodcast = async(id: string,  category: string[]) => {
    const podcastindex = database.findIndex(podcast => podcast.id === id);

    if(podcastindex !== -1) {
        database[podcastindex].category = category;
    }

    return database[podcastindex];
}