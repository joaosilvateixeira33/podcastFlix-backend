import { Request, Response } from "express";
import { getPodcastByIdService, getPodcastService } from "../services/podcasts-service";

export const getPodcast = async (req: Request, res: Response) => {
    const HttpResponse = await getPodcastService();
    res.status(HttpResponse.statusCode).json(HttpResponse.body);
};

export const getPodcastById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const HttpResponse = await getPodcastByIdService(id);

    res.status(HttpResponse.statusCode).json(HttpResponse.body);
}