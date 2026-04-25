import { PodcastModel } from "../models/podcast-model";
import * as PodcastRepository from "../repositories/podcasts-repository";
import { getYoutubeVideoData } from "../utils/extract-video-data-helper";
import { extractYoutubeVideoId } from "../utils/extract-video-id-helper";
import * as HttpResponse from "../utils/http-helper";

export const getPodcastService = async() => {

    const data = await PodcastRepository.findAllPodcasts();

    let response = null;

    if(data) {
        response = await HttpResponse.ok(data);
    } else {
        response = await HttpResponse.noContent();
    }
    
    return response;
};

export const getPodcastByIdService = async(id: string) => {
    const data = await PodcastRepository.findPodcastById(id);
    let response = null;

    if(data) {
        response = await HttpResponse.ok(data);
    } else {
        response = await HttpResponse.noContent();
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
    
    const createdPodcast = await PodcastRepository.addPodcastByVideoId(newPodcast);

    if (createdPodcast) {
        return await HttpResponse.ok(createdPodcast);
    } else {
        return await HttpResponse.noContent();
    }
}; 

export const deletePodcastService = async(id: string) => {
    let response = null;
    await PodcastRepository.deleteOnePodcast(id);

    response = await HttpResponse.ok({ message: "deleted sucefully"});
    return response;
}

export const updatePodcastService = async(id: string, category: string[]) => {
    let response = null;
    const data = await PodcastRepository.findAndModifyPodcast(id, category);

    response = await HttpResponse.ok(data);
    return response;
}