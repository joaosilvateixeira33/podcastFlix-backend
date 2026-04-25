import express, { json } from "express";
import router from "./routes/routes";
import cors from "cors";

export const createApp = () => {
    const app = express();

    app.use(json());
    app.use(cors());

    app.use(cors({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE"]
    }));

    app.use("/api", router);

    return app;
}

