import { Request, Response } from "express";
import { createPodcastService, getPodcastByIdService, getPodcastService } from "../services/podcasts-service";

export const getPodcast = async (req: Request, res: Response) => {
    const HttpResponse = await getPodcastService();
    res.status(HttpResponse.statusCode).json(HttpResponse.body);
};

export const getPodcastById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const HttpResponse = await getPodcastByIdService(id);

    res.status(HttpResponse.statusCode).json(HttpResponse.body);
}

export const createPodcast = async (req: Request, res: Response) => {
    const { url, category } = req.body;

    if (!url ) {
        return res.status(400).json({ message: "URL é obrigatória" });
    }

    const httpResponse = await createPodcastService(url, category);

    res.status(httpResponse.statusCode).json(httpResponse.body);
};