import express, { json } from "express";
import { getPodcast } from "./controllers/podcasts-controller";

export const createApp = () => {
    const app = express();

    app.use(json());

    app.get("/", getPodcast);

    return app;
}

