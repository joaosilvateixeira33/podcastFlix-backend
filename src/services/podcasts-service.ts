import { PodcastModel } from "../models/podcast-model";
import { addPodcastByVideoId, findAllPodcasts, findPodcastById } from "../repositories/podcasts-repository";
import { getYoutubeVideoData } from "../utils/extract-video-data-helper";
import { extractYoutubeVideoId } from "../utils/extract-video-id-helper";
import { noContent, ok } from "../utils/http-helper";

export const getPodcastService = async() => {

    const data = await findAllPodcasts();

    let response = null;

    if(data) {
        response = await ok(data);
    } else {
        response = await noContent();
    }
    
    return response;
};

export const getPodcastByIdService = async(id: string) => {
    const data = await findPodcastById(id);
    let response = null;

    if(data) {
        response = await ok(data);
    } else {
        response = await noContent();
    }

    return response;
};

export const createPodcastService = async (url: string, category: string[]) => {
    const videoId = extractYoutubeVideoId(url);
    const videoData = await getYoutubeVideoData(url);

    if (!videoData) {
        return {
            statusCode: 400,
            body: { message: "Não foi possível obter os dados do vídeo." }
        };
    }

    const newPodcast: PodcastModel = {
        id: crypto.randomUUID(),
        podcastName: videoData.channelTitle, 
        episode: videoData.title,            
        videoId: videoId as string,
        category: category
    };
    
    const createdPodcast = await addPodcastByVideoId(newPodcast);

    if (createdPodcast) {
        return ok(createdPodcast);
    } else {
        return noContent();
    }
};