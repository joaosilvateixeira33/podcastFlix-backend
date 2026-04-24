import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world!");
});

app.listen(3333, () => {
    console.log("Server rodando na porta 3333");
});