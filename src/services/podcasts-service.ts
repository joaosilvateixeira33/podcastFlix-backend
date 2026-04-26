import { PodcastModel } from "../models/podcast-model";
import * as PodcastRepository from "../repositories/podcasts-repository";
import { getYoutubeVideoData } from "../utils/extract-video-data-helper";
import { extractYoutubeVideoId } from "../utils/extract-video-id-helper";
import * as HttpResponse from "../utils/http-helper";

export const getPodcastService = async () => {
    const data = await PodcastRepository.findAllPodcasts();

    if (!data) {
        return await HttpResponse.serverError("Não foi possível carregar os podcasts. Tente novamente mais tarde.");
    }

    if (data.length > 0) {
        return await HttpResponse.ok(data);
    }
    
    return await HttpResponse.noContent();
};

export const getPodcastByIdService = async (id: string) => {
    const data = await PodcastRepository.findPodcastById(id);

    if (data) {
        return await HttpResponse.ok(data);
    } 
    
    return await HttpResponse.notFound(`Podcast com ID ${id} não foi encontrado.`);
};

export const createPodcastService = async (url: string, category: string[]) => {
    const videoId = extractYoutubeVideoId(url);
    if (!videoId) {
        return await HttpResponse.badRequest("URL do YouTube inválida.");
    }

    const videoData = await getYoutubeVideoData(url);
    if (!videoData) {
        return await HttpResponse.badRequest("Não foi possível obter os dados do vídeo. Verifique se ele é público.");
    }

    const newPodcast: Omit<PodcastModel, 'id'> = {
        podcastName: videoData.channelTitle, 
        episode: videoData.title,            
        videoId: videoId,
        category: category
    };
    
    const createdPodcast = await PodcastRepository.addPodcastByVideoId(newPodcast as PodcastModel);

    if (createdPodcast) {
        return await HttpResponse.created(createdPodcast); 
    } 

    return await HttpResponse.badRequest("Este podcast já está cadastrado ou houve um erro de comunicação com o banco.");
};

export const deletePodcastService = async (id: string) => {
    const success = await PodcastRepository.deleteOnePodcast(id);

    if (!success) {
        return await HttpResponse.notFound(`Não foi possível deletar: Podcast com ID ${id} não encontrado.`);
    }

    return await HttpResponse.ok({ message: "deleted successfully" });
}

export const updatePodcastService = async (id: string, category: string[]) => {
    if (!id || !category) {
        return await HttpResponse.badRequest("ID e categorias são obrigatórios para a atualização.");
    }

    const data = await PodcastRepository.findAndModifyPodcast(id, category);

    if (!data) {
        return await HttpResponse.notFound(`Podcast com ID ${id} não encontrado.`); 
    }

    return await HttpResponse.ok(data);
}