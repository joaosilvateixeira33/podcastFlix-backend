import { Request, Response } from "express";
import { getPodcastService } from "../services/podcasts-service";

export const getPodcast = async (req: Request, res: Response) => {
    const HttpResponse = await getPodcastService();
    res.status(HttpResponse.statusCode).json(HttpResponse.body);
}