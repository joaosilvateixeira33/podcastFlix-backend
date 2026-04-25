import { PodcastModel } from "../models/podcast-model";
import * as PodcastRepository from "../repositories/podcasts-repository";
import { getYoutubeVideoData } from "../utils/extract-video-data-helper";
import { extractYoutubeVideoId } from "../utils/extract-video-id-helper";
import * as HttpResponse from "../utils/http-helper";

export const getPodcastService = async() => {

    const data = await PodcastRepository.findAllPodcasts();

    if(data && data.length > 0) {
        return await HttpResponse.ok(data);
    }
    
    return await HttpResponse.noContent();
};

export const getPodcastByIdService = async(id: string) => {
    const data = await PodcastRepository.findPodcastById(id);

    if (data) {
        return await HttpResponse.ok(data);
    } else {
        return await HttpResponse.notFound(); 
    }
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

    const newPodcast: Omit<PodcastModel, 'id'> = {
        podcastName: videoData.channelTitle, 
        episode: videoData.title,            
        videoId: videoId as string,
        category: category
    };
    
    const createdPodcast = await PodcastRepository.addPodcastByVideoId(newPodcast as PodcastModel);

    if (createdPodcast) {
        return await HttpResponse.ok(createdPodcast); 
    } else {
        return { statusCode: 400, body: { message: "Erro ao persistir no banco." } };
    }
}; 

export const deletePodcastService = async (id: string) => {
    const success = await PodcastRepository.deleteOnePodcast(id);

    if (!success) {
        return await HttpResponse.noContent(); 
    }

    return await HttpResponse.ok({ message: "deleted successfully" });
}

export const updatePodcastService = async (id: string, category: string[]) => {
    const data = await PodcastRepository.findAndModifyPodcast(id, category);

    if (!data) {
        return await HttpResponse.notFound(); 
    }

    return await HttpResponse.ok(data);
}