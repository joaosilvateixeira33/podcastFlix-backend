import { noContent, ok } from "../utils/http-helper";

export const getPodcastService = async() => {

    const data = { 
        "podcastName": "flow",
        "episode": "ANITTA - Flow #592",
        "videoId": "UrinbwR5nrE",
        "category": ["musica", "cantor"]
    }

    let response = null;

    if(data) {
        response = await ok(data);
    } else {
        response = await noContent();
    }
    
    return response;
}