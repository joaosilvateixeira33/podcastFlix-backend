import express, { json } from "express";
import routerPodcast from "./routes/podcast.routes";
import routerUsers from "./routes/user.routes";
import cors from "cors";

export const createApp = () => {
    const app = express();

    app.use(json());
    app.use(cors());

    app.use(cors({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE"]
    }));

    app.use("/api", routerPodcast);
    app.use("/api", routerUsers);

    return app;
}

