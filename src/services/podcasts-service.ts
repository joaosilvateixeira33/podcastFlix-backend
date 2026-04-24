import { findAllPodcasts, findPodcastById } from "../repositories/podcasts-repository";
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