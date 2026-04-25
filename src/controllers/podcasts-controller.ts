import { Request, Response } from "express";
import * as PodcastService from "../services/podcasts-service";

export const getPodcast = async (req: Request, res: Response) => {
    const HttpResponse = await PodcastService.getPodcastService();
    res.status(HttpResponse.statusCode).json(HttpResponse.body);
};

export const getPodcastById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const HttpResponse = await PodcastService.getPodcastByIdService(id);

    res.status(HttpResponse.statusCode).json(HttpResponse.body);
}

export const createPodcast = async (req: Request, res: Response) => {
    const { url, category } = req.body;

    if (!url) {
        return res.status(400).json({ message: "URL é obrigatória" });
    }

    const httpResponse = await PodcastService.createPodcastService(url, category);

    res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const deletePodcast = async(req: Request, res: Response) => {
    const id = req.params.id as string;
    const httpResponse = await PodcastService.deletePodcastService(id);

    res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const updatePodcast = async(req: Request, res: Response) => {
    const id = req.params.id as string;
    const { category } = req.body;
    const httpResponse = await PodcastService.updatePodcastService(id, category);

    res.status(httpResponse.statusCode).json(httpResponse.body);
}
