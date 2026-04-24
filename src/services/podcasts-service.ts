import { findAllPodcasts } from "../repositories/podcasts-repository";
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
}