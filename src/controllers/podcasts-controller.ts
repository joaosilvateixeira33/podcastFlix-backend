import { Request, Response } from "express";
import { getPodcastService } from "../services/podcasts-service";
import { ok } from "../utils/http-helper";

export const getPodcast = async (req: Request, res: Response) => {
    const data = await getPodcastService();
    const response = await ok(data);

    res.status(response.statusCode).json(response.body);
}