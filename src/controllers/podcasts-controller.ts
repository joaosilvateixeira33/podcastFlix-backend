import { Request, Response } from "express";

export const getPodcast = (req: Request, res: Response) => {
    res.status(200).json({ 
        "podcastName": "flow",
        "episode": "ANITTA - Flow #592",
        "videoId": "UrinbwR5nrE",
        "category": ["musica", "cantor"]
    });
}