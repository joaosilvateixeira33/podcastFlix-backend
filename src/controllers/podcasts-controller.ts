import { Request, Response } from "express";
import { getPodcastService } from "../services/podcasts-service";

export const getPodcast = async (req: Request, res: Response) => {
    const data = await getPodcastService();
    res.status(200).json(data);
}