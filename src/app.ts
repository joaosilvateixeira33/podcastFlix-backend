import express, { json, Request, Response } from "express";

export const createApp = () => {
    const app = express();

    app.use(json());

    app.get("/", (req: Request, res: Response) => {
        res.status(200).json({ message: "Hello world!" });
    });

    return app;
}

